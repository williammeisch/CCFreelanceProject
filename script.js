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

// Project media behavior:
// - Each .project-card owns its own image data in data-project-images (JSON array).
// - No shared/merged image pool is used.
// - Modal only shows images from the selected card.
const setupProjectMediaGalleries = () => {
  const cards = Array.from(document.querySelectorAll('.project-card[data-project-images]'));
  if (!cards.length) return;
  const projectImageMap = {
    'https://sun.wnba.com/news/connecticut-sun-partners-with-blueforge-alliance-to-promote-buildsubmarines-com': [
      { src: 'images/ConnecticutSun-Thumbnail.jpeg', alt: 'Connecticut Sun and BlueForge Alliance partnership' },
      { src: 'https://picsum.photos/seed/cornelia-sun-1/1200/900', alt: 'Connecticut Sun activation placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-sun-2/1200/900', alt: 'Connecticut Sun activation placeholder image 2' },
    ],
    'https://www.buildsubmarines.com/newsroom/rfk-racing-and-blueforge-alliance-join-forces': [
      { src: 'images/FullThrottle-Thumbnail.jpeg', alt: 'RFK Racing partnership activation' },
      { src: 'https://picsum.photos/seed/cornelia-rfk-1/1200/900', alt: 'RFK collaboration placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-rfk-2/1200/900', alt: 'RFK collaboration placeholder image 2' },
    ],
    'https://www.mlb.com/press-release/press-release-blueforge-alliance-announces-mlb-and-milb-partnership-topromote-buildsubmarines-com-and-recruit-skilled-workers': [
      { src: 'images/MLBMiLB-Thumbnail.jpeg', alt: 'MLB and MiLB recruitment partnership' },
      { src: 'https://picsum.photos/seed/cornelia-mlbmilb-1/1200/900', alt: 'MLB MiLB placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-mlbmilb-2/1200/900', alt: 'MLB MiLB placeholder image 2' },
    ],
    'https://www.linkedin.com/feed/update/urn:li:activity:7265121710092251136/': [
      { src: 'images/CareerExploration-Thumbnail.jpeg', alt: 'Career exploration panel with students' },
      { src: 'https://picsum.photos/seed/cornelia-redsox-1/1200/900', alt: 'Red Sox scholars placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-redsox-2/1200/900', alt: 'Red Sox scholars placeholder image 2' },
    ],
    'https://web.witcontests.com/sun/bracket/best-partner-activations-of-20-250923': [
      { src: 'images/HeadtoHead-Thumbnail.jpeg', alt: 'Partner activation awards' },
      { src: 'https://picsum.photos/seed/cornelia-headtohead-1/1200/900', alt: 'Partner activation placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-headtohead-2/1200/900', alt: 'Partner activation placeholder image 2' },
    ],
    'images/RedSoxNASCAR-Thumbnail.jpeg': [
      { src: 'images/RedSoxNASCAR-Thumbnail.jpeg', alt: 'BuildSubmarines MLB NASCAR collaboration' },
      { src: 'https://picsum.photos/seed/cornelia-nascar-1/1200/900', alt: 'NASCAR collaboration placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-nascar-2/1200/900', alt: 'NASCAR collaboration placeholder image 2' },
    ],
    'https://sun.wnba.com/news/connecticut-sun-and-buildsubmarines-com-revitalize-washington-park-basketball-courts': [
      { src: 'images/WashingtonPark-Thumbnail.jpeg', alt: 'Washington Park court revitalization' },
      { src: 'https://picsum.photos/seed/cornelia-washingtonpark-1/1200/900', alt: 'Washington Park placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-washingtonpark-2/1200/900', alt: 'Washington Park placeholder image 2' },
    ],
    'images/SpeedwayClassic-Thumbnail.jpeg': [
      { src: 'images/SpeedwayClassic-Thumbnail.jpeg', alt: 'MLB Speedway Classic activation' },
      { src: 'https://picsum.photos/seed/cornelia-speedway-1/1200/900', alt: 'Speedway classic placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-speedway-2/1200/900', alt: 'Speedway classic placeholder image 2' },
    ],
    'https://sun.wnba.com/news/stem-back-to-school-night-presented-by-buildsubmarines-com-recap': [
      { src: 'images/STEM-Thumbnail.jpeg', alt: 'STEM Back to School Night' },
      { src: 'https://picsum.photos/seed/cornelia-stem-1/1200/900', alt: 'STEM placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-stem-2/1200/900', alt: 'STEM placeholder image 2' },
    ],
    'https://sun.wnba.com/news/the-connecticut-sun-announces-buildsubmarines-com-partnership-for-2025-season': [
      { src: 'images/CSPartnership-Thumbnail.jpeg', alt: 'Connecticut Sun partnership renewal' },
      { src: 'https://picsum.photos/seed/cornelia-cspartnership-1/1200/900', alt: 'Connecticut Sun partnership placeholder image 1' },
      { src: 'https://picsum.photos/seed/cornelia-cspartnership-2/1200/900', alt: 'Connecticut Sun partnership placeholder image 2' },
    ],
  };

  cards.forEach((card) => {
    // Project card rendering source:
    // image objects are taken only from this card's own data-project-images.
    const gallery = card.querySelector('[data-project-gallery]');
    if (!gallery) return;

    let images = [];
    try {
      images = JSON.parse(card.dataset.projectImages || '[]');
    } catch (_error) {
      images = [];
    }
    if (!Array.isArray(images) || images.length === 0) return;
    const mappedImages = projectImageMap[card.dataset.cardLink];
    if (Array.isArray(mappedImages) && mappedImages.length > 0) {
      images = mappedImages;
    }

    const imageEl = gallery.querySelector('.project-image');
    if (!imageEl) return;
    let currentIndex = 0;
    imageEl.src = images[0].src;
    imageEl.alt = images[0].alt || imageEl.alt;

    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'project-carousel-arrow prev';
    prevButton.setAttribute('aria-label', 'Previous project image');
    prevButton.textContent = '←';

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'project-carousel-arrow next';
    nextButton.setAttribute('aria-label', 'Next project image');
    nextButton.textContent = '→';

    const updateImage = () => {
      const selected = images[currentIndex];
      imageEl.src = selected.src;
      imageEl.alt = selected.alt || imageEl.alt;
      const singleImage = images.length <= 1;
      prevButton.disabled = singleImage;
      nextButton.disabled = singleImage;
    };

    prevButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (images.length <= 1) return;
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
    });

    nextButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (images.length <= 1) return;
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
    });

    gallery.appendChild(prevButton);
    gallery.appendChild(nextButton);
    updateImage();

    const target = card.dataset.cardLink;
    const external = card.dataset.cardLinkExternal === 'true';
    if (target) {
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Open project link');

      const openCardTarget = () => {
        if (external) {
          window.open(target, '_blank', 'noopener,noreferrer');
          return;
        }
        window.open(target, '_blank', 'noopener');
      };

      card.addEventListener('click', (event) => {
        if (event.target.closest('.project-media-item') || event.target.closest('.project-carousel-arrow')) return;
        openCardTarget();
      });

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCardTarget();
        }
      });
    }
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
