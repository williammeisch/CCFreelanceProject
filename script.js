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
  const dotsContainer = carousel.parentElement?.querySelector('[data-carousel-dots]');

  if (dotsContainer) {
    dotsContainer.innerHTML = sourceCards
      .map((_, index) => `<button class="carousel-dot" type="button" aria-label="Go to recommendation ${index + 1}" data-dot-index="${index}"></button>`)
      .join('');
  }

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

    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === centerIndex);
      });
    }
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

  dotsContainer?.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const dot = target.closest('.carousel-dot');
    if (!dot) return;
    const nextIndex = Number(dot.getAttribute('data-dot-index'));
    if (Number.isNaN(nextIndex)) return;
    centerIndex = nextIndex;
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
