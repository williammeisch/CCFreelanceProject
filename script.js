const setupRecommendationsCarousel = () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  if (!track || !prevButton || !nextButton) return;

  const sourceCards = Array.from(track.children).map((card, idx) => ({
    html: card.innerHTML,
    theme: card.classList.contains('theme-1')
      ? 'theme-1'
      : card.classList.contains('theme-2')
        ? 'theme-2'
        : 'theme-3',
    label: card.getAttribute('aria-label') || `recommendation-${idx + 1}`,
  }));

  if (sourceCards.length < 3) return;

  let centerIndex = 1;

  const render = () => {
    const total = sourceCards.length;
    const leftIndex = (centerIndex - 1 + total) % total;
    const rightIndex = (centerIndex + 1) % total;
    const slots = [
      { index: leftIndex, pos: 'left' },
      { index: centerIndex, pos: 'center' },
      { index: rightIndex, pos: 'right' },
    ];

    track.innerHTML = slots
      .map(({ index, pos }) => {
        const item = sourceCards[index];
        return `<article class="recommendation-card ${item.theme} ${pos}" aria-label="${item.label}">${item.html}</article>`;
      })
      .join('');
  };

  const setActive = (button) => {
    prevButton.classList.toggle('is-active', button === prevButton);
    nextButton.classList.toggle('is-active', button === nextButton);
  };

  prevButton.addEventListener('click', () => {
    centerIndex = (centerIndex - 1 + sourceCards.length) % sourceCards.length;
    setActive(prevButton);
    render();
  });

  nextButton.addEventListener('click', () => {
    centerIndex = (centerIndex + 1) % sourceCards.length;
    setActive(nextButton);
    render();
  });

  setActive(nextButton);
  render();
};

const setupRevealAnimation = () => {
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((element) => observer.observe(element));
    return;
  }

  revealElements.forEach((element) => element.classList.add('visible'));
};

const setupProjectsToggle = () => {
  const extraWrapper = document.getElementById('projects-extra');
  const toggle = document.getElementById('projects-toggle');
  if (!extraWrapper || !toggle) return;

  const icon = toggle.querySelector('.projects-toggle-icon');
  const text = toggle.querySelector('.projects-toggle-text');

  const setCollapsed = () => {
    extraWrapper.style.maxHeight = '0px';
    extraWrapper.classList.remove('is-expanded');
    extraWrapper.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    if (icon) icon.textContent = '↓';
    if (text) text.textContent = 'Show More';
  };

  const setExpanded = () => {
    extraWrapper.classList.add('is-expanded');
    extraWrapper.setAttribute('aria-hidden', 'false');
    extraWrapper.style.maxHeight = `${extraWrapper.scrollHeight}px`;
    toggle.setAttribute('aria-expanded', 'true');
    if (icon) icon.textContent = '↑';
    if (text) text.textContent = 'Show Less';
  };

  setCollapsed();

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      setCollapsed();
      return;
    }
    setExpanded();
  });

  window.addEventListener('resize', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      extraWrapper.style.maxHeight = `${extraWrapper.scrollHeight}px`;
    }
  });
};

const setupProjectMediaGalleries = () => {
  const galleries = Array.from(document.querySelectorAll('[data-project-gallery]'));
  const lightbox = document.getElementById('project-lightbox');
  const lightboxImage = document.getElementById('project-lightbox-image');
  const lightboxCaption = document.getElementById('project-lightbox-caption');
  const lightboxClose = document.getElementById('project-lightbox-close');
  const lightboxPrev = document.getElementById('project-lightbox-prev');
  const lightboxNext = document.getElementById('project-lightbox-next');

  if (!galleries.length || !lightbox || !lightboxImage || !lightboxCaption || !lightboxClose || !lightboxPrev || !lightboxNext) {
    return;
  }

  let currentGallery = [];
  let currentIndex = 0;
  let previousFocus = null;

  const updateLightboxView = () => {
    const image = currentGallery[currentIndex];
    if (!image) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || '';
    lightboxCaption.textContent = image.caption || '';
    const single = currentGallery.length <= 1;
    lightboxPrev.disabled = single;
    lightboxNext.disabled = single;
  };

  const openLightbox = (galleryImages, startIndex, triggerEl) => {
    previousFocus = triggerEl || document.activeElement;
    currentGallery = galleryImages;
    currentIndex = startIndex;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    updateLightboxView();
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  };

  const goNext = () => {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxView();
  };

  const goPrev = () => {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxView();
  };

  galleries.forEach((gallery) => {
    const items = Array.from(gallery.querySelectorAll('.project-media-item'));
    if (!items.length) return;

    const images = items.map((item) => ({
      src: item.dataset.gallerySrc || '',
      alt: item.dataset.galleryAlt || '',
      caption: item.dataset.galleryCaption || '',
    }));

    if (images.length > 2) {
      gallery.classList.add(images.length === 3 ? 'three-images' : images.length === 4 ? 'four-images' : 'multi-images');
    }

    items.forEach((item, index) => {
      const moreCount = images.length - 4;
      if (index === 3 && moreCount > 0) {
        item.classList.add('is-overflow');
        item.dataset.moreLabel = `+${moreCount} more`;
      }
      if (index > 3 && images.length > 4) {
        item.hidden = true;
      }

      item.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openLightbox(images, index, item);
      });
    });

    const parentCard = gallery.closest('.project-card');
    const target = gallery.dataset.cardLink;
    const external = gallery.dataset.cardLinkExternal === 'true';
    if (parentCard && target) {
      parentCard.setAttribute('role', 'link');
      parentCard.setAttribute('tabindex', '0');
      parentCard.setAttribute('aria-label', 'Open project link');

      const openCardTarget = () => {
        if (external) {
          window.open(target, '_blank', 'noopener,noreferrer');
          return;
        }
        window.open(target, '_blank', 'noopener');
      };

      parentCard.addEventListener('click', (event) => {
        if (event.target.closest('.project-media-item')) return;
        openCardTarget();
      });

      parentCard.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCardTarget();
        }
      });
    }
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', goPrev);
  lightboxNext.addEventListener('click', goNext);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') goNext();
    if (event.key === 'ArrowLeft') goPrev();
  });
};

const setupContactModal = () => {
  const openButton = document.getElementById('open-contact-modal');
  const closeButton = document.getElementById('close-contact-modal');
  const overlay = document.getElementById('contact-modal-overlay');
  const modal = document.getElementById('contact-modal');
  if (!openButton || !closeButton || !overlay || !modal) return;

  let previousFocus = null;

  const closeModal = () => {
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  };

  const openModal = () => {
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };

  openButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hidden) closeModal();
  });
};

setupRecommendationsCarousel();
setupRevealAnimation();
setupProjectsToggle();
setupContactModal();
setupProjectMediaGalleries();
