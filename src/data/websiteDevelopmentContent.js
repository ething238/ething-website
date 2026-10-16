export const websiteServices = [
  {
    id: 'business', cta: 'Discuss your website', label: 'Business websites', icon: 'window', title: 'Business websites',
    description: 'Our website development services help customers understand your business and contact you. We build company websites, service pages and landing pages with clear content, easy navigation and layouts that work on phones, tablets and computers. We organise pages around what visitors need, highlight your main services and make the next step clear. Your team reviews the content and contact forms before launch.',
    deliverables: ['Page planning and custom design', 'Mobile-friendly pages and navigation', 'Contact forms and enquiry routing', 'Page titles, search setup and analytics'],
    examples: ['Company websites', 'Service pages', 'Landing pages'],
  },
  {
    id: 'commerce', cta: 'Plan your online store', label: 'Ecommerce websites', icon: 'bag', title: 'Ecommerce websites',
    description: 'Make it easy for customers to find products, place orders and pay online. Our website development services cover your store, checkout and the tools you use to manage products, payments and orders. We plan clear product details and simple shopping steps. Your web developer tests the buying process on different devices. Your team gets guidance on updating products and managing the store.',
    deliverables: ['Product pages, search and filters', 'Shopping cart and checkout', 'Payment and order-system connections', 'Mobile shopping and payment testing'],
    examples: ['Online stores', 'Product catalogues', 'B2B ordering'],
  },
  {
    id: 'integrations', cta: 'Discuss website development services', label: 'Website integrations', icon: 'link', title: 'Website integrations',
    description: 'Our website development services connect your website to the tools your business uses. Your website developer links forms, bookings, payments and customer records so enquiries and orders reach the right place. We agree which systems to connect, what information each form collects and who receives it. Before launch, we also test successful submissions, failed requests and payment confirmations with your team.',
    deliverables: ['Contact forms and lead routing', 'CRM, email and marketing connections', 'Payment gateways and online bookings', 'Integration testing and error handling'],
    examples: ['CRM connections', 'Online bookings', 'Payment gateways'],
  },
  {
    id: 'content', cta: 'Discuss your content website', label: 'CMS & content', icon: 'edit', title: 'Content management websites',
    description: 'Update your pages without needing a developer for every change. Your website developer sets up a content management system for your website and shows your team how to publish pages, articles and images. Reusable layouts keep the design consistent as your content grows. We agree who can edit and publish, move the content you want to keep and check it before the website goes live.',
    deliverables: ['Reusable page templates', 'Content editing and publishing tools', 'Moving existing content and images', 'Editor training and handover'],
    examples: ['Blogs', 'Resource libraries', 'Content websites'],
  },
  {
    id: 'seo', cta: 'Discuss SEO and analytics', label: 'SEO & analytics', icon: 'search', title: 'SEO and analytics setup',
    description: 'Our website development services include the search and measurement tools your website needs. We improve your pages for SEO, set up Google Search Console and configure Google Analytics so you can review search visibility, visitor activity and enquiries. We agree which actions to measure, check that tracking works and explain the reports, so your team can choose what to improve next.',
    deliverables: ['Keyword research, page titles and technical SEO', 'Google Search Console verification and sitemaps', 'Google Analytics 4 setup and enquiry tracking', 'Reporting guidance and ongoing SEO support'],
    examples: ['SEO', 'Search Console', 'Google Analytics'],
  },
  {
    id: 'redesign', cta: 'Discuss website redesign services', label: 'Redesign & migration', icon: 'refresh', title: 'Website redesign services',
    description: 'Improve an existing website or move it to a new platform. Our website redesign services start with a review of your pages, content and features. Your website developer plans the new design, moves the content and checks links before launch. We keep useful pages, map old addresses to their replacements and test forms and key features to help visitors find their way around.',
    deliverables: ['Review of the current website', 'Updated design and mobile layouts', 'Content migration and page redirects', 'Speed improvements and launch checks'],
    examples: ['Website refreshes', 'Platform changes', 'Faster pages'],
  },
  {
    id: 'web3', cta: 'Discuss your Web3 website', label: 'Web3 websites', icon: 'link', title: 'Web3 websites',
    description: 'As a Web3 development company, eThing builds websites that connect to blockchain networks. We add wallet connections, smart contract features and pages that let visitors view data and complete transactions. We plan clear signing steps, transaction status messages and error handling, then test the agreed features with your team. Launch and ongoing support are planned around your project.',
    deliverables: ['Blockchain connections for websites', 'Smart contract features and testing', 'Website wallet connections and transactions', 'Deployment, monitoring and maintenance'],
    examples: ['Web3 websites', 'Smart contract features', 'Wallet connections'],
  },
  {
    id: 'support', cta: 'Talk to a website developer', label: 'Maintenance & support', icon: 'shield', title: 'Maintenance and support',
    description: 'Keep your website up to date after launch. Your website developer can fix issues, update content, add features and review performance. We agree what your support plan covers and how requests will be handled. Together, we set priorities for updates, plan backups and check important pages after changes. Your team knows how to report an issue and follow its progress.',
    deliverables: ['Bug fixes and website updates', 'Software updates and security checks', 'Monitoring and backup planning', 'New features and speed reviews'],
    examples: ['Website maintenance', 'Feature updates', 'Ongoing support'],
  },
];

export const websiteSearchServices = [
  {
    id: 'seo', icon: 'search', title: 'Search engine optimisation',
    description: 'Our website development services help people find your website through search. We improve page content and technical SEO, then review progress.',
    items: ['Keyword research and page planning', 'Page titles, descriptions and internal links', 'Technical SEO, structured data and ongoing improvements'],
  },
  {
    id: 'gsc', icon: 'window', title: 'Google Search Console',
    description: 'See how your website appears on Google. Your website developer sets up Search Console and helps you understand search queries, clicks and indexing issues.',
    items: ['Ownership verification and sitemap submission', 'Indexing checks and URL inspection', 'Search performance reviews and issue fixes'],
  },
  {
    id: 'ga', icon: 'chart', title: 'Google Analytics 4 (GA4)',
    description: 'See where visitors come from and what they do on your website. Your web developer configures GA4 to measure the actions that matter to your business.',
    items: ['Web data stream and tracking setup', 'Enquiry, button-click and purchase events', 'Key events, reports and tracking checks'],
  },
];

export const developmentSteps = [
  { title: 'Plan', description: 'We learn about your business, audience and goals. Together, we agree the pages, features, budget, timeline and who will provide content and approvals.', output: 'A clear project plan' },
  { title: 'Design', description: 'We plan the pages and show you how they will look on different screens. You review the design before we start building.', output: 'Page layouts and designs' },
  { title: 'Build', description: 'Your web developer builds the pages, features and system connections. You see progress, try the working website and give feedback along the way.', output: 'A working website' },
  { title: 'Test and launch', description: 'We check the agreed pages, forms and features on different devices and browsers. We review the launch checklist with you before going live.', output: 'A tested website ready to launch' },
  { title: 'Support', description: 'We hand over the code, access and guides. We can also arrange maintenance and future updates so you know who to contact when you need help.', output: 'Handover and a support plan' },
];

export const websiteFAQs = [
  { question: 'What website development services do you offer?', answer: 'Our website development services cover planning, design, coding, testing, launch and support. We build business websites, online stores, content websites and Web3 websites. SEO, Google Search Console and Google Analytics setup are available too. Choose a complete project, individual developers or a dedicated team.' },
  { question: 'How much does a website cost?', answer: 'The cost of website development services depends on your pages, design, features and system connections. Share your goals and budget. Our quote lists the work, payment stages, third-party costs and support options.' },
  { question: 'How long does it take to build a website?', answer: 'Timing depends on the features, content and review stages. We agree a schedule after discussing your project, including design, building, testing and launch. We also tell you what we need from your team.' },
  { question: 'Can you redesign our existing website?', answer: 'Yes. Our website redesign services improve the design, content, mobile experience and speed. We can also move your site to a new platform. The plan covers content migration, redirects from old URLs, testing and launch.' },
  { question: 'Will our website work on mobile and support SEO?', answer: 'Yes. We build and test layouts for phones, tablets and computers. We can set up clear HTML, titles, descriptions, sitemaps and redirects, and check loading speed. Ongoing SEO can be added to the plan.' },
  { question: 'Do you provide SEO services?', answer: 'Yes. Our website development services can include keyword research, page titles, content improvements, internal links, structured data and technical fixes. We can also review performance and improve pages after launch. We agree the SEO work, priorities and reporting with you.' },
  { question: 'Can you set up Google Search Console?', answer: 'Yes. We verify your website in Google Search Console (GSC), submit its sitemap and review indexing issues. We also help you read search queries, impressions and clicks, so you can see how people find your pages through Google.' },
  { question: 'Can you set up Google Analytics and enquiry tracking?', answer: 'Yes. Our website development services include Google Analytics 4 (GA4) setup and agreed events for enquiries, button clicks and purchases where relevant. We check that successful actions are recorded correctly and show your team how to use the reports.' },
  { question: 'Which technologies do you use?', answer: 'For website development services, we choose tools that suit your pages, features and existing systems. Options include React, Next.js, Node.js, Python, databases and cloud platforms. We explain the choices and ongoing costs before building.' },
  { question: 'Can I hire a website developer for my team?', answer: 'Yes. Hire a web developer for frontend, backend or full-stack work. You review the profile and manage the priorities. We help with selection and onboarding, and agree working hours and responsibilities before starting.' },
  { question: 'Do you provide support after launch?', answer: 'Yes. Our website development services can include fixes, software updates, content changes and new features. We agree code ownership, access, hosting and backups. Your website developer provides a support plan explaining what is covered and any separate costs.' },
  { question: 'What should a web designing company include in a quote?', answer: 'A web designing company should list the pages, design work, mobile layouts and review stages. Ask who provides content, which features are included, how changes are priced, and what testing, handover and support cover.' },
  { question: 'Should I hire a website developer or choose project delivery?', answer: 'Choose project delivery when you want us to plan and build your website. Hire a web developer when your team manages the daily work. A dedicated team suits ongoing website work that needs several skills.' },
  { question: 'How do I compare web development companies near me?', answer: 'Compare relevant experience, clear pricing, communication, code ownership and support as well as location. eThing is based in Gurugram and works remotely too. We agree working hours before starting.' },
  { question: 'What does a web dev company need for an estimate?', answer: 'Your website dev team needs a brief describing your goals, audience, pages and features. Include your current website, system connections, budget and preferred launch date. We help clarify missing details before preparing a written quote.' },
  { question: 'Do you build Web3 websites?', answer: 'Yes. As a Web3 development company, we build websites with blockchain connections, smart contract features and wallet sign-in. We agree the website platform, features, testing, launch and support with you before starting.' },
];
