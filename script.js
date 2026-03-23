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
  const grid = document.getElementById('projects-grid');
  const toggle = document.getElementById('projects-toggle');
  if (!grid || !toggle) return;

  const extraCards = Array.from(grid.querySelectorAll('.extra-project'));
  if (extraCards.length === 0) {
    toggle.hidden = true;
    return;
  }

  const icon = toggle.querySelector('.projects-toggle-icon');
  const text = toggle.querySelector('.projects-toggle-text');

  const animateHeight = (expand) => {
    const start = grid.getBoundingClientRect().height;
    extraCards.forEach((card) => {
      card.hidden = expand ? false : true;
      if (expand) card.classList.add('visible');
    });
    if (!expand) {
      extraCards.forEach((card) => (card.hidden = false));
    }
    const end = (() => {
      if (expand) return grid.getBoundingClientRect().height;
      extraCards.forEach((card) => (card.hidden = true));
      return grid.getBoundingClientRect().height;
    })();

    if (!expand) extraCards.forEach((card) => (card.hidden = false));
    grid.style.height = `${start}px`;
    grid.style.overflow = 'hidden';
    grid.style.transition = 'height .32s ease';
    requestAnimationFrame(() => {
      grid.style.height = `${end}px`;
    });
    const onDone = () => {
      grid.style.height = '';
      grid.style.overflow = '';
      grid.style.transition = '';
      if (!expand) extraCards.forEach((card) => (card.hidden = true));
      grid.removeEventListener('transitionend', onDone);
    };
    grid.addEventListener('transitionend', onDone);
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    const next = !expanded;
    toggle.setAttribute('aria-expanded', String(next));
    if (icon) icon.textContent = next ? '↑' : '↓';
    if (text) text.textContent = next ? 'Show Less' : 'Show More';
    animateHeight(next);
  });
};

const setCurrentYear = () => {
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
};

setupRecommendationsCarousel();
setupRevealAnimation();
setupProjectsToggle();
setCurrentYear();
