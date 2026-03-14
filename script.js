const portfolioData = {
  expertise: [
    {
      title: 'Strategic Partnerships',
      icon: '🤝',
      description:
        'Builds high-value partnerships across corporate, education, sports, and government sectors to accelerate talent, visibility, and growth outcomes.',
    },
    {
      title: 'Corporate Outreach Strategy',
      icon: '🏛️',
      description:
        'Designs outreach strategies that align stakeholders, strengthen community trust, and connect partnership activity to mission-critical objectives.',
    },
    {
      title: 'Sponsorship & Brand Activations',
      icon: '📣',
      description:
        'Leads sponsorship campaigns and brand-safe activations that expand awareness while delivering measurable ROI and strategic relevance.',
    },
    {
      title: 'Workforce Pipeline Development',
      icon: '🎯',
      description:
        'Creates scalable pathways between educators, employers, and technical training ecosystems to support long-term workforce readiness.',
    },
    {
      title: 'Digital Audience Strategy',
      icon: '🧭',
      description:
        'Combines digital marketing, social strategy, and audience behavior insights to drive engagement, recruitment performance, and market reach.',
    },
    {
      title: 'Revenue & Growth Impact',
      icon: '📈',
      description:
        'Connects partnership and marketing execution to business metrics such as applications, cost efficiency, brand reputation, and pipeline growth.',
    },
  ],
  experience: [
    {
      role: 'Regional Partnership Director – Corporate Partnerships and Outreach Strategy',
      organization: 'BlueForge Alliance',
      dates: 'May 2023 – Present',
      summary:
        'Leads multi-million-dollar outreach, education, and workforce initiatives focused on Navy and DoD manufacturing ecosystems, aligning partnerships, sponsorships, and campaigns to strategic talent and visibility outcomes.',
      achievements: [
        'Built partnerships across MLB, WNBA, NCAA, NASCAR, and higher education to expand workforce pipeline reach.',
        'Led workforce sponsorship strategy as outreach SME, ensuring brand-safe execution and ROI alignment to defense priorities.',
        'Negotiated high-impact partner/vendor agreements enabling agile delivery across events, internships, training, and activations.',
      ],
    },
    {
      role: 'Global Manager, Recruitment Marketing and Strategic Partnerships',
      organization: 'Jacobs',
      dates: 'Dec 2021 – Mar 2023',
      summary:
        'Directed global recruitment marketing and partnership initiatives with HR and talent leadership to improve candidate attraction, pipeline quality, and employer brand outcomes.',
      achievements: [
        'Increased applications by 20% through improved attraction and sourcing strategies and stronger employer brand positioning.',
        'Supported cross-team social impact and talent campaigns reaching 1.2M+ LinkedIn followers across business lines.',
        'Lowered cost-per-hire by 15% through global recruiting, retention, and inclusion strategy integration.',
      ],
    },
    {
      role: 'Sr. Strategist for Global Outreach Attraction and Branding',
      organization: 'Halliburton',
      dates: 'Aug 2018 – Jun 2021',
      summary:
        'Led global outreach and recruitment branding initiatives across social channels, reputation platforms, and university recruiting partnerships to improve attraction and retention performance.',
      achievements: [
        'Developed Glassdoor and Indeed reputation strategy, improving overall company rating by 1.1%.',
        'Created and executed recruitment marketing social media strategy that increased followers by more than 100K.',
        'Partnered with global HR and talent teams to strengthen sourcing strategies, candidate experience, and retention initiatives.',
      ],
    },
    {
      role: 'Sr. Digital Outreach Strategist',
      organization: 'NuCerity International Inc.',
      dates: 'Aug 2016 – Aug 2018',
      summary:
        'Advanced mission-driven outreach and digital partnership strategy to close market gaps and convert social channels into measurable growth drivers.',
      achievements: [
        'Activated impact-focused partnerships and storytelling campaigns, including Glassdoor and Indeed launches.',
        'Improved media engagement from 0.23% to 1.8% through optimized digital strategy and audience-focused execution.',
        'Built compelling brand and product messaging to strengthen credibility, emotional connection, and loyalty.',
      ],
    },
    {
      role: 'Director of Digital Media Marketing',
      organization: 'Social Media Management International (SMMI)',
      dates: 'Jan 2015 – Aug 2016',
      summary:
        'Directed digital strategy and analytics for multiple brands, including Fortune 500 clients, with a focus on performance marketing and brand consideration.',
      achievements: [
        'Collaborated with top-tier brands including Mercedes-Benz and Domino’s to support sales growth and brand consideration.',
        'Developed digital strategy for 35 brands, including 5 Fortune 500 organizations.',
        'Delivered analytics-driven recommendations that reduced bounce rates by more than 30%.',
      ],
    },
  ],
  recommendations: [
    {
      quote:
        'Cornelia leads complex partnership portfolios with executive precision and consistently converts outreach strategy into measurable workforce results.',
      author: 'Executive Stakeholder',
      title: 'Defense Manufacturing Program Partner',
      organization: 'BlueForge Alliance Collaboration',
    },
    {
      quote:
        'She built high-credibility collaborations across sports, education, and community systems that expanded visibility and accelerated talent pipelines.',
      author: 'National Program Collaborator',
      title: 'Sponsorship & Outreach Leader',
    },
    {
      quote:
        'Her recruitment marketing strategy raised application performance, improved candidate experience, and strengthened long-term brand relevance.',
      author: 'Global Talent Leader',
      title: 'HR & Talent Partnerships',
      organization: 'Jacobs',
    },
    {
      quote:
        'Cornelia combines audience insight with disciplined execution—campaigns are not only creative, they are accountable to KPIs.',
      author: 'Cross-Functional Partner',
      title: 'Global Outreach & Branding',
      organization: 'Halliburton',
    },
    {
      quote:
        'She is exceptional at aligning stakeholders quickly, turning ambiguity into a clear roadmap, and driving momentum across teams.',
      author: 'Program Collaborator',
      title: 'Corporate & Community Relations',
    },
    {
      quote:
        'From sponsorship design to activation, Cornelia protects brand integrity while delivering real growth impact and partner trust.',
      author: 'Senior Marketing Partner',
      title: 'Brand & Sponsorship Strategy',
    },
    {
      quote:
        'Her leadership style is strategic, collaborative, and outcomes-first—exactly what organizations need during high-stakes growth initiatives.',
      author: 'Executive Advisor',
      title: 'Strategic Partnerships Council',
    },
  ],
};

const renderList = (items) => items.map((item) => `<li>${item}</li>`).join('');

const expertiseGrid = document.getElementById('expertise-grid');
if (expertiseGrid) {
  expertiseGrid.innerHTML = portfolioData.expertise
    .map(
      ({ title, icon, description }) =>
        `<article class="capability-card"><div class="capability-icon" aria-hidden="true">${icon}</div><h3>${title}</h3><p>${description}</p></article>`
    )
    .join('');
}

const experienceTimeline = document.getElementById('experience-timeline');
if (experienceTimeline) {
  experienceTimeline.innerHTML = portfolioData.experience
    .map(
      ({ role, organization, dates, summary, achievements }) => `
      <article class="timeline-item reveal">
        <div class="timeline-marker" aria-hidden="true"></div>
        <div class="timeline-content">
          <div class="timeline-head">
            <div>
              <h3>${role}</h3>
              <p class="meta">${organization} • ${dates}</p>
            </div>
            <button class="detail-toggle" type="button" aria-expanded="false">Additional Details</button>
          </div>
          <p>${summary}</p>
          <div class="detail-panel" hidden>
            <ul>${renderList(achievements)}</ul>
          </div>
        </div>
      </article>`
    )
    .join('');
}

const recommendationTrack = document.getElementById('recommendations-track');
if (recommendationTrack) {
  recommendationTrack.innerHTML = portfolioData.recommendations
    .map(({ quote, author, title, organization }, index) => {
      const theme = `theme-${(index % 3) + 1}`;
      return `
      <article class="recommendation-card ${theme}">
        <p class="quote">“${quote}”</p>
        <p class="author">${author} — ${title}${organization ? `, ${organization}` : ''}</p>
      </article>`;
    })
    .join('');
}

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
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('[data-carousel-track]');
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');

  const getScrollAmount = () => {
    const firstCard = track.querySelector('.recommendation-card');
    if (!firstCard) return track.clientWidth;
    const gap = Number.parseFloat(window.getComputedStyle(track).gap || '16');
    return firstCard.getBoundingClientRect().width + gap;
  };

  const updateButtons = () => {
    const maxScrollLeft = track.scrollWidth - track.clientWidth - 2;
    if (prevButton) prevButton.disabled = track.scrollLeft <= 1;
    if (nextButton) nextButton.disabled = track.scrollLeft >= maxScrollLeft;
  };

  prevButton?.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextButton?.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
}


const experienceContainer = document.getElementById('experience-timeline');
if (experienceContainer) {
  experienceContainer.addEventListener('click', (event) => {
    const button = event.target.closest('.detail-toggle');
    if (!button) return;

    const card = button.closest('.timeline-content');
    const panel = card?.querySelector('.detail-panel');
    if (!panel) return;

    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.textContent = expanded ? 'Additional Details' : 'Hide Details';
    panel.hidden = expanded;
  });
}
