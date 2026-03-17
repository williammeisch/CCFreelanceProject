const portfolioData = {
  expertise: [
    {
      title: 'Strategic Partnerships',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 12l3 3 5-5"/><path d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z"/></svg>',
      description: 'Industry alliances and partnership ecosystems that scale visibility and opportunity.',
    },
    {
      title: 'Corporate Outreach',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/></svg>',
      description: 'Integrated outreach strategy that aligns institutions, communities, and stakeholders.',
    },
    {
      title: 'Sponsorship',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22"/><path d="M17 5H9a3 3 0 000 6h6a3 3 0 010 6H7"/></svg>',
      description: 'Sponsorship and activation strategy built for impact, ROI, and brand safety.',
    },
    {
      title: 'Workforce',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>',
      description: 'Workforce pipeline strategy connecting outreach, education, and employer demand.',
    },
    {
      title: 'Digital Audience',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 010 20"/><path d="M12 2a15 15 0 000 20"/></svg>',
      description: 'Digital audience strategy that improves engagement, reach, and conversion performance.',
    },
    {
      title: 'Revenue & Growth',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/></svg>',
      description: 'Revenue-oriented growth planning that ties marketing execution to measurable outcomes.',
    },
  ],
  experience: [
    {
      role: 'Regional Partnership Director – Corporate Partnerships and Outreach Strategy',
      organization: 'BlueForge Alliance',
      dates: '05/2023 – 12/2025',
      summary:
        'Led a 90M portfolio to advance outreach, education, and workforce initiatives tied to Navy/DoD awareness and long-term talent development.',
      achievements: [
        'Built large-scale partnerships with MLB, WNBA, NCAA, NASCAR, universities, and technical schools for sponsorships, events, internships, and training programs.',
        'Managed 25+ strategic partnerships and helped drive a 30% increase in workforce initiative awareness and engagement.',
        'Executed multi-million-dollar philanthropic programs with tight controls across budgets, timelines, staffing, and risk.',
      ],
    },
    {
      role: 'Global Manager, Recruitment Marketing and Strategic Partnerships',
      organization: 'Jacobs',
      dates: '01/2022 – 03/2023',
      summary:
        'Improved global attraction and sourcing performance through partnership-driven recruitment marketing and stronger employer brand strategy.',
      achievements: [
        'Boosted applications by 20% and reduced cost-per-hire by 15%.',
        'Supported talent campaigns reaching 1.2M+ LinkedIn followers across business lines.',
        'Built end-to-end qualified talent pipelines aligned to business demand and social impact goals.',
      ],
    },
    {
      role: 'Sr. Strategist for Global Outreach Attraction and Branding',
      organization: 'Halliburton',
      dates: '08/2018 – 06/2021',
      summary:
        'Led global outreach attraction strategy across reputation platforms, social channels, sourcing, and inclusion initiatives.',
      achievements: [
        'Improved Glassdoor/Indeed rating by 1.1% and added 100K+ followers via recruitment media strategy.',
        'Drove diversity initiatives with sustained global representation goals and broad digital engagement.',
        'Coordinated outreach events and passive pipeline programs with global HR and talent teams.',
      ],
    },
  ],
  education: [
    'Arizona State University — Master’s Degree, Digital Audience Strategy and Consumer Behavior',
    'Texas State University — Bachelor’s Degree, Advertising and Consumer Science',
  ],
  certifications: [
    'Business Partnerships and Alliances',
    'Alliances in Sports Marketing',
    'Sports Marketing Essentials',
    'Athlete Marketing Essentials: NIL Certification',
  ],
  recommendations: [
    {
      quote: 'Cornelia leads complex partnership portfolios with executive precision and converts strategy into measurable outcomes.',
      author: 'Executive Stakeholder',
      title: 'Defense Manufacturing Program Partner',
    },
    {
      quote: 'She built high-credibility collaborations across sports, education, and community systems that accelerated talent pipelines.',
      author: 'Program Collaborator',
      title: 'Sponsorship & Outreach Leader',
    },
    {
      quote: 'Her recruitment marketing strategy improved applications, candidate quality, and long-term brand relevance.',
      author: 'Global Talent Leader',
      title: 'HR & Talent Partnerships, Jacobs',
    },
    {
      quote: 'Cornelia combines audience insight with disciplined execution—every campaign is accountable to clear KPIs.',
      author: 'Cross-Functional Partner',
      title: 'Global Outreach & Branding, Halliburton',
    },
    {
      quote: 'She aligns stakeholders quickly and turns ambiguity into an actionable roadmap teams can execute against.',
      author: 'Corporate Partner',
      title: 'Community & Partnership Programs',
    },
    {
      quote: 'From sponsorship design to activation, Cornelia protects brand integrity while delivering growth and trust.',
      author: 'Senior Marketing Partner',
      title: 'Brand & Sponsorship Strategy',
    },
    {
      quote: 'Strategic, collaborative, and outcomes-first—exactly the leadership style needed in high-stakes initiatives.',
      author: 'Executive Advisor',
      title: 'Strategic Partnerships Council',
    },
  ],
};

const renderList = (items) => items.map((item) => `<li>${item}</li>`).join('');

const renderExpertise = () => {
  const expertiseGrid = document.getElementById('expertise-grid');
  if (!expertiseGrid) return;

  expertiseGrid.innerHTML = portfolioData.expertise
    .map(
      ({ title, icon, description }) =>
        `<article class="capability-card"><div class="capability-icon" aria-hidden="true">${icon}</div><h3>${title}</h3><p>${description}</p></article>`
    )
    .join('');
};

const renderExperience = () => {
  const experienceTimeline = document.getElementById('experience-timeline');
  if (!experienceTimeline) return;

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
};

const renderEducation = () => {
  const educationList = document.getElementById('education-list');
  if (educationList) {
    educationList.innerHTML = renderList(portfolioData.education);
  }

  const certificationList = document.getElementById('certification-list');
  if (certificationList) {
    certificationList.innerHTML = portfolioData.certifications
      .map((item) => `<span class="cert-chip">${item}</span>`)
      .join('');
  }
};

const renderRecommendations = () => {
  const recommendationTrack = document.getElementById('recommendations-track');
  if (!recommendationTrack) return;

  recommendationTrack.innerHTML = portfolioData.recommendations
    .map(({ quote, author, title }, index) => {
      const theme = `theme-${(index % 3) + 1}`;
      return `
      <article class="recommendation-card ${theme}">
        <p class="quote">“${quote}”</p>
        <p class="author">${author} — ${title}</p>
      </article>`;
    })
    .join('');
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

const setupCarousel = () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const cards = track ? Array.from(track.querySelectorAll('.recommendation-card')) : [];
  if (!track || cards.length === 0) return;

  const getScrollAmount = () => {
    const gap = Number.parseFloat(window.getComputedStyle(track).gap || '16');
    return cards[0].getBoundingClientRect().width + gap;
  };

  const getCurrentIndex = () => {
    const amount = getScrollAmount();
    if (!amount) return 0;
    return Math.round(track.scrollLeft / amount) % cards.length;
  };

  const goToIndex = (index) => {
    const amount = getScrollAmount();
    track.scrollTo({ left: index * amount, behavior: 'smooth' });
  };

  prevButton?.addEventListener('click', () => {
    const currentIndex = getCurrentIndex();
    const target = (currentIndex - 1 + cards.length) % cards.length;
    goToIndex(target);
  });

  nextButton?.addEventListener('click', () => {
    const currentIndex = getCurrentIndex();
    const target = (currentIndex + 1) % cards.length;
    goToIndex(target);
  });
};

const setupExperienceDetails = () => {
  const experienceContainer = document.getElementById('experience-timeline');
  if (!experienceContainer) return;

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
};

const setCurrentYear = () => {
  const yearElement = document.getElementById('year');
  if (!yearElement) return;
  yearElement.textContent = new Date().getFullYear();
};

renderExpertise();
renderExperience();
renderEducation();
renderRecommendations();
setCurrentYear();
setupRevealAnimation();
setupCarousel();
setupExperienceDetails();
