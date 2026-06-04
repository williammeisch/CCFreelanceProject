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
  const cards = Array.from(document.querySelectorAll('.project-card[data-card-link]'));
  if (!cards.length) return;

  cards.forEach((card) => {
    const target = card.dataset.cardLink;
    const external = card.dataset.cardLinkExternal === 'true';
    if (!target) return;

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

    card.addEventListener('click', () => {
      openCardTarget();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCardTarget();
      }
    });
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

const extractNaturalSortKey = (path) => {
  const name = path.split('/').pop() || path;
  const parts = name.match(/(\d+|\D+)/g) || [name];
  return parts.map((part) => (/\d+/.test(part) ? Number(part) : part.toLowerCase()));
};

const shuffleArray = (items) => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const setupMediaGalleryPage = async () => {
  const galleryGrid = document.getElementById('media-gallery-grid');
  if (!galleryGrid) return;

  const videoFeaturesGrid = document.getElementById('video-features-grid');
  const overlay = document.getElementById('gallery-lightbox');
  const closeBtn = document.getElementById('gallery-lightbox-close');
  const prevBtn = document.getElementById('gallery-lightbox-prev');
  const nextBtn = document.getElementById('gallery-lightbox-next');
  const mediaHost = document.getElementById('gallery-lightbox-media');
  if (!overlay || !closeBtn || !prevBtn || !nextBtn || !mediaHost) return;

  const supportedImageExts = new Set(['jpg', 'jpeg', 'png']);
  const supportedVideoExts = new Set(['mov', 'mp4']);

  const isSupportedMedia = (file) => {
    const clean = (file || '').trim();
    const ext = clean.split('.').pop()?.toLowerCase();
    if (!ext || clean.toLowerCase().endsWith('.gitkeep') || ext === 'txt' || ext === 'heic') return false;
    return supportedImageExts.has(ext) || supportedVideoExts.has(ext);
  };

  const mediaTypeFromPath = (path) => (supportedVideoExts.has(path.split('.').pop().toLowerCase()) ? 'video' : 'image');

  // GitHub Pages-compatible static media source.
  // Add/remove filenames here as media changes in /images/gallery/.
  const MEDIA_GALLERY_FILES = [
    'CCPortfolioPic1.png',
    'CCPortfolioPic2-1.png',
    'CCPortfolioPic2-2.png',
    'CCPortfolioPic2-3.png',
    'CCPortfolioPic3.png',
    'CCPortfolioPic4.jpg',
    'CCPortfolioPic5.jpg',
    'CCPortfolioPic6.png',
    'CCPortfolioPic7.JPG',
    'CCPortfolioPic8.jpeg',
    'CCPortfolioPic9.JPG',
    'CCPortfolioPic10.JPG',
    'CCPortfolioPic11.jpeg',
    'CCPortfolioPic12.JPG',
    'CCPortfolioPic13.JPG',
    'CCPortfolioPic14.JPG',
    'CCPortfolioPic18.JPG',
    'CCPortfolioPic20.jpg',
    'CCPortfolioPic21.jpg',
    'CCPortfolioPic22.jpg',
    'CCPortfolioPic23.JPG',
    'CCPortfolioPic24.JPG',
    'CCPortfolioPic25.jpg',
    'CCPortfolioPic26.JPG',
    'CCPortfolioPic27.jpeg',
    'CCPortfolioPic28.jpg',
    'CCPortfolioPic29.jpg',
    'CCPortfolioPic30.JPG',
    'CCPortfolioPic31.jpg',
    'CCPortfolioPic32.jpg',
    'CCPortfolioPic33.jpeg',
    'CCPortfolioPic35.jpeg',
    'CCPortfolioPic36.png',
    'CCPortfolioPic37.jpeg',
    'CCPortfolioPic39.png',
    'CCPortfolioPic40.png',
    'CCPortfolioPic41.png',
    'CCPortfolioPic42.png',
    'CCPortfolioPic43.png',
    'CCPortfolioPic44.png',
    'CCPortfolioPic45.png',
    'CCPortfolioPic46.png',
    'CCPortfolioPic47.png',
    'CCPortfolioPic48.png',
    'CCPortfolioPic49.png',
    'CCPortfolioPic50.png',
    'CCPortfolioPic51.png',
    'CCPortfolioPic52.png',
    'CCPortfolioPic53.png',
    'CCPortfolioPic54.png',
    'CCPortfolioPic55.png',
    'CCPortfolioPic56.png',
    'CCPortfolioPic57.png',
    'CCPortfolioPic58.png',
    'CCPortfolioPic59.png',
    'CCPortfolioPic60.png',
    'CCPortfolioPic61.png',
    'CCPortfolioPic62.png',
    'CCPortfolioPic63.png',
    'CCPortfolioPic64.jpg',
    'CCPortfolioPic66.jpg',
    'CCPortfolioPic67.jpg',
    'CCPortfolioPic68.jpg',
    'CCPortfolioPic69.jpg',
    'CCPortfolioPic70.jpg',
    'CCPortfolioPic71.jpg',
    'CCPortfolioPic72.jpg',
    'CCPortfolioPic73.jpg',
    'CCPortfolioPic74.jpg',
    'CCPortfolioPic75.jpg',
    'CCPortfolioPic76.jpg',
    'CCPortfolioPic77.jpg',
    'CCPortfolioPic78.jpg',
    'CCPortfolioPic79.JPG',
    'CCPortfolioPic80.JPG',
    'CCPortfolioPic81.JPG',
    'CCPortfolioPic82.jpg',
    'CCPortfolioPic83.jpg',
    'CCPortfolioPic84.JPG',
    'CCPortfolioPic85.jpg',
    'CCPortfolioPic86.jpg',
    'CCPortfolioPic87.JPEG',
    'CCPortfolioPic88.png',
    'CCPortfolioPic89.png',
    'CCPortfolioPic90.png',
    'CCPortfolioPic91.png',
    'CCPortfolioMov1.mov',
    'CCPortfolioMov2.MOV',
  ];

  const mediaPaths = [...new Set(MEDIA_GALLERY_FILES)]
    .filter(isSupportedMedia)
    .map((file) => `/CCFreelanceProject/images/gallery/${file}`);
  const allMediaItems = mediaPaths.map((path) => ({ path, type: mediaTypeFromPath(path) }));
  const imageItems = shuffleArray(allMediaItems.filter((item) => item.type === 'image'));
  const videoItems = allMediaItems.filter((item) => item.type === 'video');
  const mediaItems = [...imageItems, ...videoItems];
  mediaItems.forEach((item) => {
    console.log('Gallery media path:', item.path);
  });

  if (!imageItems.length) {
    galleryGrid.innerHTML = '<p class="gallery-empty">No gallery media found in <code>/images/gallery/</code>.</p>';
    return;
  }

  galleryGrid.innerHTML = imageItems
    .map((item, index) => `<article class="project-card gallery-card" data-gallery-index="${index}">
      <img class="project-image gallery-image" src="${item.path}" alt="Gallery media ${index + 1}" loading="lazy" />
    </article>`)
    .join('');

  if (videoFeaturesGrid && videoItems.length) {
    videoFeaturesGrid.insertAdjacentHTML(
      'beforeend',
      videoItems
        .map((item) => `<article class="featured-video-card">
          <div class="featured-video-embed">
            <video src="${item.path}" controls preload="metadata" playsinline></video>
          </div>
        </article>`)
        .join('')
    );
  }

  let currentIndex = 0;
  let previousFocus = null;

  const renderCurrentMedia = () => {
    const item = imageItems[currentIndex];
    if (!item) return;
    if (item.type === 'video') {
      mediaHost.innerHTML = `<video class="gallery-lightbox-video" src="${item.path}" controls autoplay playsinline></video>`;
    } else {
      mediaHost.innerHTML = `<img id="gallery-lightbox-image" src="${item.path}" alt="Gallery media ${currentIndex + 1}" />`;
    }
  };

  const openAt = (index, trigger) => {
    currentIndex = index;
    previousFocus = trigger || document.activeElement;
    renderCurrentMedia();
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    overlay.hidden = true;
    mediaHost.innerHTML = '';
    document.body.style.overflow = '';
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  };

  const next = () => {
    currentIndex = (currentIndex + 1) % imageItems.length;
    renderCurrentMedia();
  };

  const prev = () => {
    currentIndex = (currentIndex - 1 + imageItems.length) % imageItems.length;
    renderCurrentMedia();
  };

  galleryGrid.querySelectorAll('.gallery-card').forEach((card) => {
    const index = Number(card.dataset.galleryIndex);
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => openAt(index, card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openAt(index, card);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener('keydown', (event) => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') prev();
  });
};

setupRecommendationsCarousel();
setupRevealAnimation();
setupProjectsToggle();
setupContactModal();
setupProjectMediaGalleries();
setupMediaGalleryPage();
