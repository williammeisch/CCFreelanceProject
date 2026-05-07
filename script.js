const projectData = [
  {
    title: 'Connecticut Sun Partners with BlueForge Alliance to Promote BuildSubmarines.com',
    description:
      'Secured and managed a multi-year, seven-figure partnership with the Connecticut Sun and the WNBA to expand access to STEM education and careers in advanced manufacturing for women. The partnership spanned sponsorship, brand integration, live events, and scholarship funding, creating sustained pathways for visibility, engagement, and career opportunity while aligning mission-driven impact with a high-profile sports platform.',
    link: 'https://sun.wnba.com/news/connecticut-sun-partners-with-blueforge-alliance-to-promote-buildsubmarines-com',
    external: true,
    images: [
      { src: 'images/ConnecticutSun-Thumbnail.jpeg', alt: 'Connecticut Sun and BlueForge Alliance partnership' },
    ],
  },
  {
    title: 'Full Throttle for the Future: RFK Racing and BuildSubmarines.com Forge New Partnership',
    description:
      'Supported strategic management of multi-year partnership between BuildSubmarines.com and RFK Racing that leveraged NASCAR to raise awareness of careers within the Submarine Industrial Base. By reaching a highly engaged fan base, the partnership promoted stable, well-paying manufacturing jobs that support the U.S. Navy’s next-generation submarines and strengthen the national manufacturing workforce.',
    link: 'https://www.buildsubmarines.com/newsroom/rfk-racing-and-blueforge-alliance-join-forces',
    external: true,
    images: [
      { src: 'images/FullThrottle-Thumbnail.jpeg', alt: 'RFK Racing partnership activation' },
    ],
  },
  {
    title: 'MLB and MiLB Partnership Promoting BuildSubmarines.com Workforce Recruitment',
    description:
      'Drove a multi-year, multi-million-dollar partnership with MLB and MiLB to promote BuildSubmarines.com, a platform built to recruit more than 10,000 skilled manufacturing workers each year for the U.S. Navy’s submarine fleet. The partnership launched with the 2024 MLB Opening Day and includes promotions across MLB Jewel Events such as All-Star Week, Speedway Classic, and the Postseason, as well as activations in 40 Minor League ballparks.',
    link: 'https://www.mlb.com/press-release/press-release-blueforge-alliance-announces-mlb-and-milb-partnership-topromote-buildsubmarines-com-and-recruit-skilled-workers',
    external: true,
    images: [
      { src: 'images/MLBMiLB-Thumbnail.jpeg', alt: 'MLB and MiLB recruitment partnership' },
    ],
  },
  {
    title: 'Speaking to Red Sox Scholars About Career Exploration Programs for Red Sox Foundation',
    description:
      'Serving on the Red Sox Scholarship Foundation panel, supporting scholarship review and conversations around access and opportunity. She participates in career exploration programs, speaking directly with students about career paths and practical guidance for navigating early professional decisions.',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7265121710092251136/',
    external: true,
    images: [{ src: 'images/CareerExploration-Thumbnail.jpeg', alt: 'Career exploration panel with students' }],
  },
  {
    title: 'BuildSubmarines.com Goes Head to Head: Two Activations Competing for Best Partner Activation of 2025',
    description:
      'Out of 16 partnership activations, both of her lead supported activations took the top two spots. One delivered lasting impact through a community park restoration, while the other drove high-energy engagement with a T-shirt cannon moment. Different executions, same mission, and a clear win for the brand and community.',
    link: 'https://web.witcontests.com/sun/bracket/best-partner-activations-of-20-250923',
    external: true,
    images: [{ src: 'images/HeadtoHead-Thumbnail.jpeg', alt: 'Partner activation awards' }],
  },
  {
    title: 'BuildSubmarines.com + MLB + NASCAR = Winning Partnership Collaboration',
    description:
      'Supported multi-partner collaborations designed to amplify outreach and deepen fan engagement. By aligning teams, brands, and platforms around shared campaigns, she helped expand reach, drive awareness, and strengthen the top of the pipeline with measurable campaign impact.',
    link: 'images/RedSoxNASCAR-Thumbnail.jpeg',
    external: false,
    images: [{ src: 'images/RedSoxNASCAR-Thumbnail.jpeg', alt: 'BuildSubmarines MLB NASCAR collaboration' }],
  },
  {
    title: 'Connecticut Sun and BuildSubmarines.com Revitalize Washington Park Basketball Courts',
    description:
      'Supported a community court revitalization project at Groton’s Washington Park by helping secure financial backing, contributing to event planning, hosting community announcement filming, and attending the ribbon-cutting ceremony. In partnership with the City of Groton, Electric Boat, and BuildSubmarines.com, the Connecticut Sun unveiled upgraded community courts.',
    link: 'https://sun.wnba.com/news/connecticut-sun-and-buildsubmarines-com-revitalize-washington-park-basketball-courts',
    external: true,
    images: [{ src: 'images/WashingtonPark-Thumbnail.jpeg', alt: 'Washington Park court revitalization' }],
  },
  {
    title: 'BuildSubmarines.com Becomes Founding Partner of MLB Speedway Classic Presented by BuildSubmarines.com',
    description:
      'Supported activation strategy and event execution for the MLB Speedway Classic partnership, helping connect a landmark baseball event with workforce awareness goals. The campaign linked high-visibility sports engagement with practical pathways into submarine manufacturing careers.',
    link: 'images/SpeedwayClassic-Thumbnail.jpeg',
    external: false,
    images: [{ src: 'images/SpeedwayClassic-Thumbnail.jpeg', alt: 'MLB Speedway Classic activation' }],
  },
  {
    title: 'STEM Back to School Night, Presented by BuildSubmarines.com',
    description:
      'Supported event execution through concourse activity coordination and branded giveaways for STEM Back to School Night. BuildSubmarines.com enabled hands-on STEM experiences for fans and local youth while spotlighting science and technology career pathways.',
    link: 'https://sun.wnba.com/news/stem-back-to-school-night-presented-by-buildsubmarines-com-recap',
    external: true,
    images: [{ src: 'images/STEM-Thumbnail.jpeg', alt: 'STEM Back to School Night' }],
  },
  {
    title: 'The Connecticut Sun Announces Continued BuildSubmarines.com Partnership for 2025 Season',
    description:
      'Secured the renewal and continuation of the partnership based on strong performance across events and brand integration, yielding measurable return on investment. The WNBA partnership exceeded goals and demonstrated sustained value and impact.',
    link: 'https://sun.wnba.com/news/the-connecticut-sun-announces-buildsubmarines-com-partnership-for-2025-season',
    external: true,
    images: [{ src: 'images/CSPartnership-Thumbnail.jpeg', alt: 'Connecticut Sun partnership renewal' }],
  },
];

const setupRecommendationsCarousel = () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const track = carousel.querySelector('[data-carousel-track]');
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  if (!track || !prevButton || !nextButton) return;

  const sourceCards = Array.from(track.children).map((card, idx) => ({
    html: card.innerHTML,
    theme: card.classList.contains('theme-1') ? 'theme-1' : card.classList.contains('theme-2') ? 'theme-2' : 'theme-3',
    label: card.getAttribute('aria-label') || `recommendation-${idx + 1}`,
  }));
  if (sourceCards.length < 3) return;
  let centerIndex = 1;

  const render = () => {
    const total = sourceCards.length;
    const leftIndex = (centerIndex - 1 + total) % total;
    const rightIndex = (centerIndex + 1) % total;
    track.innerHTML = [
      { index: leftIndex, pos: 'left' },
      { index: centerIndex, pos: 'center' },
      { index: rightIndex, pos: 'right' },
    ]
      .map(({ index, pos }) => `<article class="recommendation-card ${sourceCards[index].theme} ${pos}" aria-label="${sourceCards[index].label}">${sourceCards[index].html}</article>`)
      .join('');
  };

  prevButton.addEventListener('click', () => {
    centerIndex = (centerIndex - 1 + sourceCards.length) % sourceCards.length;
    render();
  });
  nextButton.addEventListener('click', () => {
    centerIndex = (centerIndex + 1) % sourceCards.length;
    render();
  });
  render();
};

const renderProjects = () => {
  const primary = document.getElementById('projects-grid');
  const extra = document.getElementById('projects-extra');
  if (!primary || !extra) return;

  const buildCard = (project, index) => `
    <article class="project-card reveal" data-project-index="${index}" data-card-link="${project.link}" data-card-link-external="${String(project.external)}">
      <div class="project-media" data-project-carousel>
        <button class="project-carousel-arrow prev" type="button" aria-label="Previous project image" data-project-prev>←</button>
        <img class="project-image" src="${project.images[0].src}" alt="${project.images[0].alt}" loading="lazy" data-project-image />
        <button class="project-carousel-arrow next" type="button" aria-label="Next project image" data-project-next>→</button>
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    </article>`;

  primary.innerHTML = projectData.slice(0, 4).map(buildCard).join('');
  extra.innerHTML = `<div class="projects-grid projects-grid-extra">${projectData.slice(4).map((p, i) => buildCard(p, i + 4)).join('')}</div>`;
};

const setupProjectCarousels = () => {
  document.querySelectorAll('.project-card[data-project-index]').forEach((card) => {
    const index = Number(card.dataset.projectIndex);
    const project = projectData[index];
    const image = card.querySelector('[data-project-image]');
    const prev = card.querySelector('[data-project-prev]');
    const next = card.querySelector('[data-project-next]');
    if (!project || !image || !prev || !next) return;

    let imageIndex = 0;
    const update = () => {
      const current = project.images[imageIndex];
      image.src = current.src;
      image.alt = current.alt;
      const hidden = project.images.length <= 1;
      prev.hidden = hidden;
      next.hidden = hidden;
    };

    prev.addEventListener('click', (event) => {
      event.stopPropagation();
      imageIndex = (imageIndex - 1 + project.images.length) % project.images.length;
      update();
    });
    next.addEventListener('click', (event) => {
      event.stopPropagation();
      imageIndex = (imageIndex + 1) % project.images.length;
      update();
    });

    card.addEventListener('click', (event) => {
      if (event.target.closest('.project-carousel-arrow')) return;
      if (project.external) {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      } else {
        window.open(project.link, '_blank', 'noopener');
      }
    });

    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') card.click();
    });

    update();
  });
};

const setupRevealAnimation = () => {
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
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
  toggle.addEventListener('click', () => (toggle.getAttribute('aria-expanded') === 'true' ? setCollapsed() : setExpanded()));
  window.addEventListener('resize', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') extraWrapper.style.maxHeight = `${extraWrapper.scrollHeight}px`;
  });
};

const setupContactModal = () => {
  const openButton = document.getElementById('open-contact-modal');
  const closeButton = document.getElementById('close-contact-modal');
  const overlay = document.getElementById('contact-modal-overlay');
  if (!openButton || !closeButton || !overlay) return;
  let previousFocus = null;
  const closeModal = () => {
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  };
  openButton.addEventListener('click', () => {
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  });
  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hidden) closeModal();
  });
};

renderProjects();
setupRecommendationsCarousel();
setupProjectsToggle();
setupProjectCarousels();
setupRevealAnimation();
setupContactModal();
