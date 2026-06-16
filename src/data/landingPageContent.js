/** Google Ads landing page - hire global talent from India */

export const landingPageMeta = {
  title: 'Hire Remote Developers from India | Global Engineering Teams | Ething',
  description:
    'Global companies (20-300 employees) hire pre-vetted remote engineers from India. Staff augmentation & dedicated teams for CEOs, CTOs, CFOs & VPs-profiles in 48 hours.',
  path: '/hire-developers-india',
  keywords: [
    'hire remote developers from India',
    'global engineering team India',
    'hire developers in India',
    'offshore development team',
    'remote engineering team',
    'dedicated development team',
    'IT staff augmentation',
    'hire remote staff from India',
    'mid size company hire developers India',
    'startup hire engineers India',
    'global talent India',
    'engineering team augmentation',
  ],
  ogImage: '/images/ething-logo.png',
  siteName: 'Ething Solutions',
  locale: 'en',
  breadcrumbLabel: 'Hire Remote Developers from India',
  geo: {
    targetCountries: ['US', 'GB', 'CA', 'AU', 'DE', 'SG'],
    targetCountryNames: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Singapore'],
    audience:
      'CEOs, CTOs, CFOs, and VPs at small and mid-size companies (20-300 employees) hiring global engineering talent from India',
  },
}

export const landingPageContent = {
  hero: {
    badge: 'Trusted Partner for Global Engineering Teams',
    headline: 'Hire Top Talent from India in Days, Not Months',
    subheadline:
      'We help small and mid-size companies worldwide hire pre-vetted software engineers, QA specialists, DevOps experts, and AI talent from India - integrated into your team, workflows, and timezone overlap, often within 48 hours.',
    primaryCta: 'Find Engineers',
    secondaryCta: 'Schedule a 15-Minute Call',
    trustBar: ['Global Clients', '20-300 Employee Companies', 'NDA Protected', 'Profiles in 48 Hrs'],
  },

  clients: [
    { id: 'posthog', name: 'PostHog', industry: 'Product Analytics', logo: '/clients/posthog.svg' },
    {
      id: 'plausible',
      name: 'Plausible Analytics',
      industry: 'Web Analytics',
      logo: '/clients/plausibleanalytics.svg',
    },
    { id: 'buffer', name: 'Buffer', industry: 'Social Media SaaS', logo: '/clients/buffer.svg' },
    { id: 'convertkit', name: 'ConvertKit', industry: 'Email Marketing', logo: '/clients/convertkit.svg' },
    { id: 'toggl', name: 'Toggl', industry: 'Time Tracking', logo: '/clients/toggl.svg' },
    { id: 'hotjar', name: 'Hotjar', industry: 'UX Analytics', logo: '/clients/hotjar.svg' },
    { id: 'typeform', name: 'Typeform', industry: 'Forms & Surveys', logo: '/clients/typeform.svg' },
    { id: 'ghost', name: 'Ghost', industry: 'Publishing Platform', logo: '/clients/ghost.svg' },
  ],

  icp: {
    title: 'Built for Small & Mid-Size Companies Going Global',
    subtitle:
      'If you are a 20-300 person company scaling product and engineering, Ething is your hiring partner - not a generic staffing agency.',
    roles: [
      {
        title: 'CEOs & Founders',
        icon: 'TrendingUp',
        description:
          'Scale engineering capacity without burning runway. Get vetted profiles in 48 hours and predictable costs your board will approve.',
      },
      {
        title: 'CTOs & VPs Engineering',
        icon: 'Building2',
        description:
          'Add senior engineers who pass your technical bar and integrate into sprint cadence, code review culture, and architecture decisions.',
      },
      {
        title: 'CFOs',
        icon: 'Briefcase',
        description:
          'Flexible contracts, transparent pricing, and 40-60% cost efficiency vs. local hires - with no long-term lock-in or hidden recruiting fees.',
      },
      {
        title: 'VPs & Heads of Product',
        icon: 'Users',
        description:
          'Align engineering capacity to roadmap milestones. Scale pods up or down as product priorities shift quarter to quarter.',
      },
    ],
    benefits: [
      {
        title: 'Right-sized for your stage',
        description:
          'We specialize in companies with 20-300 employees - not enterprise RFPs or one-off freelancer gigs.',
      },
      {
        title: 'Global timezone coverage',
        description:
          'Engineers overlap with US, UK, EU, APAC, and Middle East business hours - aligned during onboarding.',
      },
      {
        title: 'Scale without re-org',
        description:
          'Add 1 engineer or a pod of 10. Same vetting quality, same integration support, flexible month-to-month terms.',
      },
    ],
  },

  whyIndia: {
    title: 'Why Global Companies Hire Remote Talent from India',
    subtitle:
      'Leaders at growing product companies worldwide choose India for proven talent, faster hiring, and teams that integrate with global workflows.',
    stats: [
      {
        id: 'talent',
        value: 5,
        suffix: 'M+',
        label: 'Engineers in the talent pool',
        description: 'Access one of the world\'s largest engineering talent pools',
      },
      {
        id: 'speed',
        value: 2,
        suffix: '-4 wks',
        label: 'Average time to hire',
        description: 'Faster hiring timelines vs. 3-6 month local cycles',
      },
      {
        id: 'cost',
        value: 50,
        suffix: '%',
        prefix: 'Up to ',
        label: 'Cost efficiency',
        description: 'Significant savings without compromising quality',
      },
      {
        id: 'scale',
        value: 10,
        suffix: 'x',
        label: 'Team scalability',
        description: 'Scale teams rapidly as product demands grow',
      },
    ],
  },

  whoWeHelp: {
    title: 'Industries We Serve',
    subtitle: 'Purpose-built hiring for high-growth product companies across key verticals.',
    industries: [
      {
        id: 'saas',
        name: 'SaaS Startups',
        challenge: 'Need to ship features fast but can\'t afford 6-month hiring cycles or mis-hires.',
        solution: 'Embed vetted full-stack and backend engineers who ramp in days and integrate with your sprint cadence.',
        icon: 'Layers',
      },
      {
        id: 'fintech',
        name: 'FinTech',
        challenge: 'Regulated environments demand senior talent with security and compliance awareness.',
        solution: 'Pre-screened engineers experienced in APIs, payment systems, and secure SDLC practices.',
        icon: 'Landmark',
      },
      {
        id: 'healthtech',
        name: 'HealthTech',
        challenge: 'Compliance-minded delivery requires reliable, communicative engineers who understand healthcare workflows.',
        solution: 'Dedicated teams with experience in clinical integrations, data privacy, and scalable health platforms.',
        icon: 'HeartPulse',
      },
      {
        id: 'ai',
        name: 'AI Companies',
        challenge: 'AI/ML talent is scarce and expensive in most global markets.',
        solution: 'Access AI engineers, ML specialists, and data engineers vetted for production-grade AI delivery.',
        icon: 'Brain',
      },
      {
        id: 'product',
        name: 'Product Companies',
        challenge: 'Product roadmaps outpace internal hiring capacity.',
        solution: 'Flexible staff augmentation and dedicated pods that scale with your roadmap - not your overhead.',
        icon: 'Box',
      },
      {
        id: 'ecommerce',
        name: 'E-commerce Technology',
        challenge: 'Peak seasons and platform migrations require rapid team expansion.',
        solution: 'On-demand engineering capacity for storefronts, integrations, and platform modernization.',
        icon: 'ShoppingCart',
      },
    ],
  },

  services: {
    title: 'How Global Companies Hire Remote Engineers from India',
    subtitle:
      'Flexible engagement models for companies worldwide scaling engineering teams with vetted Indian talent.',
    items: [
      {
        id: 'staff-aug',
        title: 'Staff Augmentation',
        description: 'Embed individual engineers into your existing team. Full control, zero recruiting overhead.',
        keywords: 'IT staff augmentation',
      },
      {
        id: 'dedicated',
        title: 'Dedicated Development Teams',
        description: 'A fully managed pod of engineers working exclusively on your product - your culture, our talent.',
        keywords: 'dedicated development team',
      },
      {
        id: 'contract',
        title: 'Contract Developers',
        description: 'Short or long-term contract engineers for project sprints, migrations, or specialized skills.',
        keywords: 'hire remote developers',
      },
      {
        id: 'offshore',
        title: 'Offshore Development Centers',
        description: 'Build a scalable offshore engineering hub in India with Ething as your managed partner.',
        keywords: 'offshore development team',
      },
      {
        id: 'engineering',
        title: 'Engineering Services',
        description: 'End-to-end delivery for greenfield builds, modernizations, and platform engineering initiatives.',
        keywords: 'engineering services',
      },
      {
        id: 'managed',
        title: 'Managed Teams',
        description: 'We handle hiring, HR, performance, and replacements - you focus on product outcomes.',
        keywords: 'managed engineering teams',
      },
    ],
  },

  talent: {
    title: 'Available Global Talent',
    subtitle: 'Pre-vetted engineers across modern stacks - ready to interview within 48 hours.',
    categories: [
      { name: 'React Developers', tech: ['React', 'Next.js', 'TypeScript'] },
      { name: 'Node.js Developers', tech: ['Node.js', 'Express', 'NestJS'] },
      { name: 'Python Developers', tech: ['Python', 'Django', 'FastAPI'] },
      { name: 'Full Stack Developers', tech: ['React', 'Node', 'PostgreSQL'] },
      { name: 'DevOps Engineers', tech: ['AWS', 'Docker', 'Kubernetes'] },
      { name: 'QA Engineers', tech: ['Selenium', 'Cypress', 'Jest'] },
      { name: 'AI Engineers', tech: ['Python', 'TensorFlow', 'LLMs'] },
      { name: 'Data Engineers', tech: ['Spark', 'Airflow', 'dbt'] },
      { name: 'Mobile Developers', tech: ['React Native', 'iOS', 'Android'] },
    ],
  },

  howItWorks: {
    title: 'Hire in 4 Easy Steps',
    subtitle: 'From brief to onboarded engineer - streamlined for busy executives and engineering leaders.',
    highlight: 'Most clients receive profiles within 48 hours.',
    steps: [
      {
        step: 1,
        title: 'Tell us what you need',
        description: 'Share your tech stack, team structure, seniority requirements, and timeline in a 15-minute call or form.',
      },
      {
        step: 2,
        title: 'Receive vetted profiles',
        description: 'We send 3+ pre-screened candidate profiles matched to your requirements - skills, experience, and communication.',
      },
      {
        step: 3,
        title: 'Interview candidates',
        description: 'Conduct your own technical interviews. We coordinate scheduling across global time zones.',
      },
      {
        step: 4,
        title: 'Start onboarding',
        description: 'Selected engineers join your Slack, standups, and repos within days. We handle contracts and compliance.',
      },
    ],
  },

  whyEthing: {
    title: 'Why Ething vs. Traditional Recruiting',
    subtitle: 'Built for speed, quality, and flexibility - not agency markups or endless job boards.',
    rows: [
      { metric: 'Hiring Speed', traditional: '3-6 months', ething: 'Profiles in 48 hours' },
      { metric: 'Technical Vetting', traditional: 'Resume screening only', ething: 'Multi-stage technical + communication vetting' },
      { metric: 'Team Scalability', traditional: 'One hire at a time', ething: 'Scale 1 to 20+ engineers rapidly' },
      { metric: 'Flexibility', traditional: 'Full-time only, long contracts', ething: 'Contract, dedicated, or augmentation - your terms' },
      { metric: 'Replacement Support', traditional: 'Start search from scratch', ething: 'Free replacement within guarantee period' },
      { metric: 'Time to Productivity', traditional: 'Weeks of ramp-up', ething: 'Engineers productive from week one' },
    ],
  },

  caseStudy: {
    title: 'Client Success Story',
    company: 'Global SaaS Company · 120 Employees',
    industry: 'B2B SaaS · Series B',
    challenge:
      'A 120-person SaaS company needed to double their engineering team within 8 weeks to meet a major product launch deadline. Local hiring was too slow and expensive for their stage.',
    solution:
      'Ething deployed a dedicated team of 6 full-stack and DevOps engineers from India, integrated into their existing sprint process with global timezone overlap.',
    outcomes: [
      { value: '6', label: 'Engineers onboarded' },
      { value: '3 wks', label: 'Time to full team' },
      { value: '40%', label: 'Cost savings vs. local hires' },
      { value: 'On time', label: 'Product launch delivered' },
    ],
  },

  testimonials: [
    {
      id: 1,
      companyDescriptor: 'Global FinTech · 85 employees',
      company: 'NovaFin Payments',
      quote:
        'Ething delivered three senior React profiles within 48 hours. We hired two - both are still with us 14 months later. The vetting quality is genuinely enterprise-grade for a company our size.',
      name: 'James Mitchell',
      title: 'VP Engineering',
      focus: 'Quality & Speed',
    },
    {
      id: 2,
      companyDescriptor: 'HealthTech Scale-up · 65 employees',
      company: 'MedSync Health',
      quote:
        'Communication was my biggest concern with offshore teams. Ething\'s engineers speak fluent English, show up to standups, and proactively flag blockers. They feel like a natural part of our organization.',
      name: 'Sarah Chen',
      title: 'CTO',
      focus: 'Communication',
    },
    {
      id: 3,
      companyDescriptor: 'E-commerce Platform · 220 employees',
      company: 'RetailIQ Commerce',
      quote:
        'We scaled from 4 to 12 engineers in six weeks without a single bad hire. When one engineer wasn\'t the right fit, Ething replaced them within 10 days - no drama, no downtime.',
      name: 'David Okonkwo',
      title: 'Head of Product',
      focus: 'Reliability',
    },
  ],

  faqs: [
    {
      id: 'company-size',
      question: 'Do you work with small and mid-size companies (20-300 employees)?',
      answer:
        'Yes - this is our core focus. We specialize in companies with 20-300 employees that need to scale engineering quickly without enterprise recruiting overhead. Whether you need 1 engineer or a team of 15, we match vetting and engagement models to your stage and budget.',
    },
    {
      id: 'global-hire',
      question: 'Can global companies hire remote developers from India?',
      answer:
        'Yes. Companies across the US, UK, Europe, APAC, and Middle East hire remote software engineers from India through staff augmentation, dedicated teams, and contract models. Ething handles vetting, contracts, NDAs, IP assignment, and onboarding so your team can integrate Indian engineers with timezone overlap aligned to your region.',
    },
    {
      id: 'why-india',
      question: 'Why do global companies hire developers from India?',
      answer:
        'Global companies hire from India to access one of the world\'s largest pools of English-speaking software engineers at scale. Indian developers bring deep experience in modern stacks, strong communication skills, and significant cost efficiency - with flexible overlap across global time zones.',
    },
    {
      id: 'vetting',
      question: 'How do you vet engineers?',
      answer:
        'Every candidate passes a multi-stage process: resume and portfolio review, live technical assessment, coding challenge relevant to your stack, English communication evaluation, and reference checks. Only the top 3-5% of applicants are presented to clients.',
    },
    {
      id: 'timezone',
      question: 'What time zone overlap is available?',
      answer:
        'Our engineers typically work with 4-6 hours of overlap with US, UK, EU, and APAC business hours. We align schedules during onboarding to match your standups, sprint ceremonies, and critical collaboration windows.',
    },
    {
      id: 'replacement',
      question: 'What if a hire doesn\'t work out?',
      answer:
        'We offer a replacement guarantee. If an engineer isn\'t the right fit within the agreed trial period, we provide a qualified replacement at no additional recruiting cost - usually within 10 business days.',
    },
    {
      id: 'speed',
      question: 'How fast can we start?',
      answer:
        'Most clients receive 3 vetted profiles within 48 hours of sharing requirements. From first interview to onboarded engineer typically takes 1-2 weeks, depending on your interview process.',
    },
  ],

  leadMagnet: {
    title: 'Find Vetted Engineers',
    modalTitle: 'Get 3 Vetted Developer Profiles Free',
    subtitle: 'No commitment. No recruiting fees.',
    cta: 'Send Me Profiles',
  },

  finalCta: {
    title: 'Ready to Scale Your Global Engineering Team?',
    subtitle: 'Book a free 15-minute call. We\'ll map your hiring needs and show how Ething helps companies like yours hire from India.',
    cta: 'Book a Free Strategy Call',
  },
}
