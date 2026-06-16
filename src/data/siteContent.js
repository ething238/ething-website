/**
 * Single source of truth for Ething website copy, links, media, and nav.
 * Edit this file to update content site-wide.
 */

import anujPortrait from '../assets/anuj.png'
import raghavPortrait from '../assets/raghav.png'

/**
 * Lives in `./pageTitles.js` so imports here (e.g. PNGs for leaders) are not pulled in when Node
 * bundles `vite.config.js`, which only needs route keys for the sitemap.
 */
export { pageTitles } from './pageTitles.js'

/** Meta descriptions by path. Keep in sync with routes in `App.jsx` / `pageTitles`. */
export const pageDescriptions = {
  '/':
    'Ething provides software engineering and AI staff augmentation-experienced engineers, ML specialists, and data professionals for enterprise and product teams.',
  '/about_us':
    'Meet Ething Solutions: software engineering, staffing, and technology consulting built for enterprises that need reliable delivery and industry-aligned teams.',
  '/healthcare_industry':
    'Healthcare software engineering and staffing from Ething: HIPAA-minded delivery, clinical and payer systems experience, and scalable teams for digital health.',
  '/aerospace_industry':
    'Aerospace and defence technology services: safety-critical software, compliance-aware engineering, and vetted talent for complex programmes.',
  '/automotive_industry':
    'Automotive software engineering and staffing: connected vehicles, embedded systems, validation, and product teams that match OEM and supplier pace.',
  '/railways_industries':
    'Rail and transportation technology: signalling, operations, and asset systems, with engineering and staffing aligned to regulated environments.',
  '/banking_finance_industry':
    'Banking and fintech engineering: core platforms, APIs, cloud migration, and staffing for regulated financial services delivery.',
  '/education_industry':
    'EdTech and education-sector software: learning platforms, integrations, and engineering talent for institutions and education providers.',
  '/staffing_services':
    'IT staffing and talent solutions: contract and full-time hiring, time-and-material and fixed-scope models, onboarding, and flexible onsite or remote delivery.',
  '/ai_staff_augmentation':
    'AI staff augmentation from Ething: AI engineers, ML engineers, data scientists, NLP and MLOps specialists, and Python AI developers embedded with your teams.',
  '/engineering-services':
    'Engineering services from Ething: custom software, mobile, firmware, cloud, QA, and product security, with end-to-end delivery and embedded experts.',
  '/software_development':
    'Custom software development: web and enterprise applications, modern stacks, architecture, and teams that ship maintainable products.',
  '/mobile_application':
    'Mobile application development for iOS and Android: product engineering, integrations, performance, and secure releases.',
  '/firmware_engg':
    'Firmware and embedded engineering: BSP, drivers, IoT devices, and low-level software with quality and traceability.',
  '/cloud_services':
    'Cloud services and platform engineering: AWS, Azure, GCP migrations, DevOps, scalability, and cloud-native architecture.',
  '/quality_testing':
    'Quality engineering and software testing: automation, performance, regression, and release confidence for critical products.',
  '/product_security':
    'Product security: secure SDLC, reviews, and hardening so your software meets customer and regulatory expectations.',
  '/careers':
    'Careers at Ething: join a software engineering and staffing team building solutions for global enterprises across industries.',
  '/privacy-policy':
    'Ething privacy policy: how we collect, use, and protect personal information when you use our website and services.',
  '/contact':
    'Contact Ething for staffing, engineering services, or partnership enquiries in Gurugram, India. Phone and email on this page.',
  '/blogs':
    'Articles and engineering insights from the Ething team on Medium: staffing, software delivery, cloud, and platform topics.',
  '/hire-developers-india':
    'Global companies (20-300 employees) hire pre-vetted remote engineers from India. Staff augmentation & dedicated teams for CEOs, CTOs, CFOs & VPs-profiles in 48 hours.',
}

export const siteContent = {
  meta: {
    siteName: 'Ething',
    titleTemplate: '%s · Ething · Engineering & Staff Augmentation',
    defaultDescription:
      'Ething provides software and AI engineering talent for staff augmentation-embedded specialists for enterprise and product teams, alongside consulting and engineering services.',
    /** Relative to site origin. Used for Open Graph when a page does not set its own image. */
    defaultOgImage: '/images/ething-logo.png',
  },

  brand: {
    name: 'ETHING',
    shortTagline: 'Software & AI engineering staff augmentation',
    /** Header / footer mark. Place file under `public/images/` */
    logoSrc: '/images/ething-logo.png',
    logoAlt: 'Ething',
  },

  /** Top navigation. `children` renders a dropdown. Omit `path` when the parent has no landing URL. */
  navigation: [
    { id: 'about', label: 'About Us', path: '/about_us' },
    {
      id: 'industries',
      label: 'Industries',
      children: [
        { label: 'Healthcare', path: '/healthcare_industry' },
        { label: 'Aerospace & Defence', path: '/aerospace_industry' },
        { label: 'Automotive', path: '/automotive_industry' },
        { label: 'Railways', path: '/railways_industries' },
        { label: 'Banking & Finance', path: '/banking_finance_industry' },
        { label: 'Education', path: '/education_industry' },
      ],
    },
    {
      id: 'staffing',
      label: 'Staffing Services',
      path: '/staffing_services',
    },
    {
      id: 'engineering',
      label: 'Engineering Services',
      path: '/engineering-services',
      children: [
        { label: 'Software Development', path: '/software_development' },
        { label: 'Mobile Application', path: '/mobile_application' },
        { label: 'Firmware Engineering', path: '/firmware_engg' },
        { label: 'Cloud Services', path: '/cloud_services' },
        { label: 'Testing', path: '/quality_testing' },
        { label: 'Product Security', path: '/product_security' },
      ],
    },
    { id: 'ai-staff', label: 'AI Staff Augmentation', path: '/ai_staff_augmentation' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
    { id: 'careers', label: 'Careers', path: '/careers' },
  ],

  cta: {
    label: 'Contact us',
    path: '/contact',
  },

  home: {
    hero: {
      badge: 'Software & AI engineering talent for your teams',
      title: 'Engineering & AI Staff Augmentation Solutions',
      titleHighlight: 'Staff Augmentation',
      description:
        'Helping enterprises scale faster with experienced software engineers, AI engineers, ML specialists, and data professionals.',
      primaryCta: { label: 'Hire Talent', path: '/contact' },
      secondaryCta: { label: 'Contact Us', path: '/contact#reach-out' },
      highlightsTitle: 'Where We Help',
      /** Shown in the lower hero band. Edit freely */
      highlights: [
        { id: 'hl1', label: 'Software & AI staff aug' },
        { id: 'hl2', label: 'Product & platform engineering' },
        { id: 'hl3', label: 'Healthcare & finance' },
        { id: 'hl4', label: 'Onsite · hybrid · remote' },
      ],
    },

    aiTalent: {
      id: 'ai-talent',
      kicker: 'Capabilities',
      title: 'AI talent we provide',
      intro:
        'We place experienced practitioners who integrate with your tools, processes, and delivery rhythm whether you need depth in models, data, or production systems.',
      roles: [
        'Generative AI Engineers',
        'Machine Learning Engineers',
        'Data Scientists',
        'NLP Engineers',
        'MLOps Engineers',
        'AI Solution Architects',
      ],
    },

    whyUsSnippet: {
      id: 'why-us',
      kicker: 'Why us',
      title: 'Why teams work with Ething',
      subtitle: 'Straightforward augmentation focused on execution not buzzwords.',
      points: [
        'Access to specialized AI engineering talent alongside proven software engineers',
        'Flexible scaling for AI and software teams as priorities and workloads change',
      ],
    },

    whatWeOffer: {
      id: 'what-we-offer',
      kicker: 'Capabilities',
      title: 'What We Offer',
      subtitle: 'Consulting, Staffing Solutions and Engineering Services',
      lead: 'Empowering Your Success Through Tailored Talent Solutions.',
      body:
        'We offer comprehensive staffing solutions designed to address all your human capital requirements seamlessly. Through a meticulous recruitment process, we handpick the finest talent, ensuring a perfect fit for your organization.',
    },

    /**
     * serviceCards: `icon` matches lucide map in `ServiceGrid.jsx`
     */
    serviceCards: [
      {
        id: 'contract',
        category: 'Staffing',
        title: 'Contract Staffing',
        description:
          'Scale teams up or down with vetted professionals who embed quickly and align to your delivery cadence.',
        icon: 'Users',
        to: '/staffing_services#offerings',
        featured: false,
      },
      {
        id: 'fulltime',
        category: 'Staffing',
        title: 'Full-time Staffing',
        description:
          'End-to-end hiring for permanent roles with a process tuned to culture fit, skills, and long term retention.',
        icon: 'UserPlus',
        to: '/staffing_services#offerings',
        featured: true,
      },
      {
        id: 'ai-staff-augmentation',
        category: 'Staffing',
        title: 'AI Staff Augmentation',
        icon: 'Brain',
        to: '/ai_staff_augmentation',
        featured: false,
        detailLead: 'Provide experienced:',
        bullets: [
          'AI Engineers',
          'ML Engineers',
          'Data Scientists',
          'NLP Engineers',
          'MLOps Engineers',
          'Python AI Developers',
        ],
        detailClosing: 'for enterprise and product engineering teams.',
      },
      {
        id: 'compliance',
        category: 'Compliance',
        title: 'Compliance & Onboarding',
        description:
          'Structured onboarding, documentation, and checks so every hire meets policy and regulatory expectations.',
        icon: 'ShieldCheck',
        to: '/contact',
        featured: false,
      },
      {
        id: 'location',
        category: 'Delivery',
        title: 'Location Flexibility',
        description:
          'Onsite, hybrid, or remote models so you can match talent to where work actually happens.',
        icon: 'MapPin',
        to: '/contact',
        featured: false,
      },
      {
        id: 'tm',
        category: 'Resourcing',
        title: 'Time & Material Resourcing',
        description:
          'Pay-as-you-go expertise for evolving scope transparent effort tracking and predictable governance.',
        icon: 'Clock',
        to: '/contact',
        featured: false,
      },
      {
        id: 'fixed',
        category: 'Resourcing',
        title: 'Fixed Bid Hiring',
        description:
          'Defined outcomes and fixed commercials for initiatives where scope and budget need to stay locked.',
        icon: 'Banknote',
        to: '/contact',
        featured: false,
      },
    ],
  },

  /**
   * Testimonials carousel. Add any number of objects to `items`.
   * Each slide: unique `id`, `quote`, `organization`, `role`, and optional `image` / `imageAlt` (defaults to first slide’s asset if omitted).
   */
  testimonials: {
    id: 'testimonials',
    kicker: 'Testimonials',
    title: 'What People Think About Us',
    titleUnderline: 'People',
    /** Auto-advance slides (ms). Set to 0 to disable. Not used when user prefers reduced motion. */
    autoPlayMs: 8000,
    items: [
      {
        id: 't1',
        quote:
          'The engagement that started with a few onsite centric support quickly grew into a strategic partnership where Ething collaborated within my supply chain team across multiple projects. Glad that both the teams are working closely to realize mutual successes.',
        organization: 'Leading Healthcare Provider',
        role: 'VP of Operations',
        image: '/images/testimonial-office.jpg',
        imageAlt: 'Business professionals meeting and collaborating in a modern office',
      },
      {
        id: 't2',
        quote:
          'Ething’s engineers integrated with our release train faster than we expected. They brought discipline around quality and comms, which helped us ship a large modernization program on time.',
        organization: 'Global Bank, Digital Channels',
        role: 'Head of Engineering',
        image: '/images/testimonial-office.jpg',
        imageAlt: 'Technology leaders collaborating in a modern workspace',
      },
      {
        id: 't3',
        quote:
          'We needed a flexible talent model across locations. Ething’s staffing program gave us vetted people who understood compliance from day one exactly what our programme demanded.',
        organization: 'Automotive OEM, Technology Office',
        role: 'Program Director',
        image: '/images/testimonial-office.jpg',
        imageAlt: 'Product and engineering team workshop',
      },
      {
        id: 't4',
        quote:
          'From discovery to go live, the team was outcome-focused. Clear ownership, no surprises, and a partner that scaled with us as priorities shifted.',
        organization: 'Education Technology Company',
        role: 'Chief Product Officer',
        image: '/images/testimonial-office.jpg',
        imageAlt: 'Strategic team discussion in a contemporary office',
      },
    ],
  },

  contactSection: {
    id: 'reach-out',
    homeTitle: 'Reach Out to Us',
    form: {
      name: { label: 'Your name', placeholder: 'Jane Doe' },
      email: { label: 'Your email', placeholder: 'you@company.com' },
      phone: { label: 'Your Phone', placeholder: '+1 555 000 0000' },
      subject: { label: 'Your Subject', placeholder: 'How can we help?' },
      message: { label: 'Your message', placeholder: 'Tell us about your goals…' },
      submit: 'Submit',
      sending: 'Sending…',
      success: "Thanks. We'll be in touch shortly.",
      error: 'Something went wrong. Please try again in a moment.',
      notConfigured:
        'This form needs a Web3Forms access key. Set VITE_WEB3FORMS_ACCESS_KEY in your environment.',
    },
    note: "We'll respond within two business days.",
  },

  pages: {
    about: {
      path: '/about_us',
      heroKicker: 'Company',
      heroTitle: 'About Us',
      heroParagraphs: [
        'As a software engineering company, Ething Solutions specializes in providing expert guidance and solutions for software development, IT strategy, and technology implementation.',
        'Our engineering services encompass software architecture design, custom development, system integration, quality assurance, and technology strategy planning. Backed by a team proficient in diverse programming languages and industry best practices, we optimize software projects and IT initiatives for businesses.',
        "We prioritize quality and client satisfaction, aiming to deliver projects on time and within budget while maximizing ROI. Committed to fostering enduring partnerships, we dedicate ourselves to our clients' success through strategic staffing solutions and steadfast support. Trust ETHING to propel your business towards its goals with proven expertise and unwavering dedication.",
      ],
      heroImage: {
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85&auto=format&fit=crop',
        alt: 'Team collaborating in a modern office',
      },
      visionImage: {
        src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&auto=format&fit=crop',
        alt: 'Colleagues working together at a table with laptops',
      },
      vision: {
        eyebrow: 'Vision',
        body: 'Crafting transformative software solutions to shape a brighter future.',
      },
      mission: {
        eyebrow: 'Mission',
        body:
          'Our mission is to become an indispensable technology partner for our clients, cultivating a culture of innovation and delivering cutting edge solutions that empower their success.',
      },
      valuesHeading: 'Our Values',
      values: [
        {
          title: 'Integrity',
          body: 'Integrity at the Heart of Everything We Do',
        },
        {
          title: 'People',
          body: 'Empowering People, Driving Success Together',
        },
        {
          title: 'Customer Commitment',
          body: 'Committed to Customers, Committed to Excellence',
        },
        {
          title: 'Quality Focus',
          body: 'Where Precision Meets Purpose: Quality Is Our Trademark',
        },
      ],
      leadersHeading: 'Our Leaders',
      leaders: [
        {
          name: 'Anuj Gupta',
          role: 'Founder and CEO',
          image: {
            src: anujPortrait,
            alt: 'Anuj Gupta',
          },
          linkedInUrl: 'https://www.linkedin.com/in/anuj-k-gupta/',
        },
        {
          name: 'Raghav Gupta',
          role: 'Strategy and Client Success',
          note: 'University of London',
          image: {
            src: raghavPortrait,
            alt: 'Raghav Gupta',
          },
          linkedInUrl: 'https://www.linkedin.com/in/raghav-gupta-7b4a85171/',
        },
      ],
    },

    industryPages: [
      {
        path: '/healthcare_industry',
        title: 'Healthcare',
        intro:
          'Interoperability, compliance aware delivery, and mission critical support for providers, payers, and health tech.',
        heroKicker: 'Industries',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=85&auto=format&fit=crop',
          alt: 'Modern healthcare and medical technology environment',
        },
        overviewEyebrow: 'Overview',
        overview:
          'Ething stands at the forefront of medical equipment and device engineering, pioneering innovative and budget friendly solutions meticulously crafted to cater to the unique requirements of our clientele. Our extensive expertise traverses a myriad of medical specialties including Orthopaedics, Radiology, and Pathology, among others, enabling us to offer tailored medical equipment solutions that tackle a diverse array of industry challenges head on. From the intricate realms of software development and testing to providing comprehensive support across the entire spectrum of medical equipment product development, we ensure that medical device companies receive personalized, high quality solutions that not only meet but exceed their expectations.',
        capabilitiesEyebrow: 'Healthcare',
        capabilitiesTitle: 'Service Capabilities',
        sections: [
          {
            id: 'consumer-health-applications',
            navLabel: 'Consumer Applications',
            index: '01',
            title: 'Creating Healthcare Applications for Consumers',
            paragraphs: [
              'Developing cutting edge healthcare applications, our team seamlessly integrates fitness trackers, sensors, and medical equipment to enable remote health monitoring. Our solutions are enhanced with advanced data analysis, processing, and visualization tools, empowering patients and healthcare providers to make informed decisions based on actionable insights.',
              'By leveraging the latest in IoT and AI technology, we create intelligent platforms that not only collect real time health data but also interpret it to detect anomalies, predict health trends, and provide early warnings for potential medical conditions.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=85&auto=format&fit=crop',
              alt: 'Healthcare technology and wearable health monitoring',
            },
          },
          {
            id: 'clinical-applications',
            navLabel: 'Clinical Software',
            index: '02',
            title: 'Development of Applications for Clinical Use',
            paragraphs: [
              'With a wealth of expertise, we specialize in crafting and refining software that serves as the cornerstone of daily healthcare endeavors. Our solutions, often integrated with medical equipment, not only uphold the integrity of clinical protocols but also play a pivotal role in enhancing personalized patient care.',
              'By aligning cutting edge technology with the practical needs of healthcare professionals, we ensure that our software empowers medical teams to deliver accurate, timely, and patient centric services. From streamlining hospital workflows to enabling seamless data exchange across departments, our products are designed to improve operational efficiency and clinical decision making.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=85&auto=format&fit=crop',
              alt: 'Healthcare professionals in a clinical setting, representing hospital workflows and patient-centered care',
            },
          },
          {
            id: 'navigation-systems',
            navLabel: 'Navigation Systems',
            index: '03',
            title: 'Advanced Software Development for Navigation Systems',
            paragraphs: [
              'Specializing in crafting cutting edge software solutions tailored for navigation systems in surgical robots and surgery navigation software systems, Ething ensures seamless operation with critical equipment for precision healthcare delivery. Our solutions are designed to integrate effortlessly with various medical imaging modalities, enabling real time tracking and enhanced surgical accuracy. We prioritize reliability, safety, and compliance with global healthcare standards to support surgeons in making data driven decisions during complex procedures.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=85&auto=format&fit=crop',
              alt: 'Surgical and medical precision technology',
            },
          },
          {
            id: 'surgical-ui',
            navLabel: 'Surgical UI Design',
            index: '04',
            title: 'Intuitive User Interface Design for Surgical Applications',
            paragraphs: [
              'Employing a user centric approach, we design intuitive and user friendly interfaces customized for healthcare professionals operating complex medical equipment, enhancing usability and efficiency during surgical procedures. These interfaces are developed with direct input from surgeons and clinical staff to align with real-world workflows and decision-making needs. Our design process emphasizes ergonomic layout, responsive controls, and clear data visualization, ensuring critical information is accessible at a glance and interactions remain seamless even under high pressure conditions.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=85&auto=format&fit=crop',
              alt: 'Clinical user interface and medical displays',
            },
          },
          {
            id: 'integration-services',
            navLabel: 'Integration Services',
            index: '05',
            title: 'Integration Services for Healthcare Software',
            paragraphs: [
              'Ething specializes in constructing interconnected technological ecosystems, seamlessly integrating custom and platform based applications with essential medical equipment and healthcare software solutions. These ecosystems are designed to ensure smooth communication between various devices and software layers involved in surgical and diagnostic procedures.',
              'By bridging the gap between hardware and software, Ething enables healthcare providers to streamline clinical workflows, reduce errors, and enhance patient outcomes. The company’s robust integration strategies ensure real-time data exchange, interoperability, and compliance with healthcare standards, empowering medical professionals with accurate, timely insights at every stage of care.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=85&auto=format&fit=crop',
              alt: 'Healthcare software integration and connected systems',
            },
          },
          {
            id: 'testing-validation',
            navLabel: 'Testing & Validation',
            index: '06',
            title: 'Rigorous Testing Protocols for Surgical Precision',
            paragraphs: [
              'Implementing comprehensive testing methodologies, including stringent validation testing, we guarantee the reliability, accuracy, and safety of software solutions linked with medical equipment, crucial for maintaining surgical precision. Our rigorous quality assurance processes simulate real-world clinical scenarios to detect and eliminate potential issues before deployment.',
              'In addition to traditional functional and integration testing, we employ advanced techniques such as automated regression testing, stress testing, and fault injection to ensure system robustness under various conditions.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=85&auto=format&fit=crop',
              alt: 'Software quality assurance and clinical validation',
            },
          },
        ],
      },
      {
        path: '/aerospace_industry',
        title: 'Aerospace & Defence',
        intro:
          'Safety-critical software, systems integration, and delivery aligned to rigorous aerospace and defence standards.',
        heroKicker: 'Industries',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=1920&q=85&auto=format&fit=crop',
          alt: 'Aircraft against sky, aerospace and defense context',
        },
        overviewEyebrow: 'Overview',
        overview:
          'We are a global leader in engineering services, prioritizing innovative and cost-effective solutions tailored to customer satisfaction. Specializing in Aerospace and Defense Technology, we offer expertise in embedded systems, software development, and testing, deploying niche technologies to address industry challenges. Our seasoned team delivers customized solutions to meet diverse client needs in the defense technology domain.',
        capabilitiesEyebrow: 'Aerospace & Defence',
        capabilitiesTitle: 'Service Capabilities',
        sections: [
          {
            id: 'aerospace-defense-software',
            navLabel: 'Aerospace & Defense Software',
            index: '01',
            title: 'Customized Software Solutions for Aerospace and Defense Technology',
            paragraphs: [
              'Customized software solutions tailored to aerospace and defense technology requirements. Rigorous testing procedures ensure reliability and compliance with industry standards. These solutions are built to withstand extreme environmental conditions, high-performance demands, and mission-critical scenarios. Our engineering approach emphasizes fault tolerance, real-time responsiveness, and secure data handling. We collaborate closely with defense contractors and aerospace engineers to ensure seamless integration with avionics systems, simulation platforms, and control infrastructures. All solutions undergo multi-layer validation processes to meet military-grade specifications and ensure zero-compromise performance. From embedded systems to AI-powered threat detection modules, our technology is built for precision and resilience. We also ensure cybersecurity compliance to protect sensitive mission data from unauthorized access and cyber threats. Through continuous R&D and field testing, we stay ahead of evolving defense technologies and operational challenges.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=85&auto=format&fit=crop',
              alt: 'Aviation and aerospace engineering environment',
            },
          },
          {
            id: 'embedded-systems-defense',
            navLabel: 'Embedded Systems',
            index: '02',
            title: 'Embedded Systems: Qt, C++, HMI, VxWorks, and RTOS',
            paragraphs: [
              'Expertise in Qt, C++, HMI, VxWorks, and RTOS for embedded systems. Development of robust and efficient software for mission-critical defense applications. Our team excels in building real-time, deterministic applications where low-latency performance and system reliability are non-negotiable. We create intuitive HMI interfaces that enable operators to make rapid, accurate decisions in high-stress environments. With a strong foundation in embedded system architecture, we specialize in end-to-end software solutions tailored to meet the stringent requirements of defense-grade technology. Our development lifecycle integrates rigorous coding standards, continuous integration and testing, and meticulous validation to ensure compliance with safety and security protocols.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85&auto=format&fit=crop',
              alt: 'Embedded systems and electronic hardware for defense applications',
            },
          },
          {
            id: 'ground-control-systems',
            navLabel: 'Ground Control Systems',
            index: '03',
            title: 'Ground Control Systems',
            paragraphs: [
              'We design and implement software for ground control systems, ensuring full integration with aerospace and defense hardware. These systems play a vital role in the defense technology ecosystem for real-time monitoring and control. Our solutions provide secure communication links and high-availability infrastructure to support continuous operation during mission-critical scenarios. Designed for harsh environments and high-demand workflows, our systems offer redundancy, fault-tolerant architecture, and rapid response capabilities. We implement advanced encryption protocols and access control mechanisms to safeguard sensitive data. Regular simulation testing ensures operational reliability under diverse field conditions and threat models.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1764195287345-2086f504cb0b?w=800&q=85&auto=format&fit=crop',
              alt: 'Operations control room with monitoring displays for real-time aerospace and defense systems',
            },
          },
          {
            id: 'fpga-drivers-bsp',
            navLabel: 'FPGA, Drivers & BSP',
            index: '04',
            title: 'FPGA, Device Driver, and Board Support Packages (BSP)',
            paragraphs: [
              'We develop FPGA solutions for signal processing and control in advanced defense technology systems. Our team also designs and implements device drivers and BSPs for seamless hardware-software integration. We optimize real-time data handling for high-speed communication systems. Our FPGA designs ensure low-latency response in critical mission environments. These solutions are tailored to meet the strict requirements of aerospace and defense-grade electronics. We also implement custom logic blocks to accelerate computationally intensive tasks. Our solutions support a range of interface protocols such as PCIe, Ethernet, and Aurora, enabling robust connectivity in distributed systems. We integrate advanced debugging features, including real-time signal tracing and in-system logic analyzers, to ensure reliable performance under field conditions.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1597862624292-45748390b00e?w=800&q=85&auto=format&fit=crop',
              alt: 'High-density circuit board and embedded electronics for FPGA, drivers, and aerospace hardware integration',
            },
          },
        ],
      },
      {
        path: '/automotive_industry',
        title: 'Automotive',
        intro:
          'Connected systems, quality engineering, and supplier-aligned teams from concept through production.',
        heroKicker: 'Industries',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85&auto=format&fit=crop',
          alt: 'Modern automotive and mobility technology',
        },
        overviewEyebrow: 'Overview',
        overview:
          'At Ething, we excel in providing comprehensive digital capabilities that drive success in today\'s interconnected world. From optimizing connectivity to facilitating cloud adoption and leveraging social networking, our solutions are designed to enhance communication, scalability, and brand engagement. With a steadfast focus on AI in automotive, we ensure innovation across every layer of vehicle connectivity, data processing, and security. As the automotive industry evolves, AI in automotive plays a critical role in transforming how vehicles operate, interact, and improve over time. Our multimedia solutions captivate audiences and drive engagement across channels, while our advanced analytics empower organizations to make informed decisions and achieve continuous improvement. At Ething, we are committed to delivering tailored digital solutions that propel businesses forward in a rapidly evolving digital landscape, powered by the possibilities of AI in automotive.',
        capabilitiesEyebrow: 'Automotive',
        capabilitiesTitle: 'Service Capabilities',
        sections: [
          {
            id: 'connectivity-solutions',
            navLabel: 'Connectivity Solutions',
            index: '01',
            title: 'Connectivity Solutions',
            paragraphs: [
              'Integration of in-vehicle networks and external systems. Enhanced communication between vehicles, infrastructure, and other devices. Improves traffic efficiency, safety, and real-time data sharing. Supports autonomous driving and smart city infrastructure. Enables seamless connectivity with cloud services and mobile applications. Facilitates predictive maintenance and vehicle diagnostics. Reduces environmental impact through optimized routing and driving behavior. Enables vehicle-to-everything (V2X) communication for enhanced coordination. Lays the foundation for next-generation mobility solutions and services.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&auto=format&fit=crop',
              alt: 'Connected vehicle and automotive networking',
            },
          },
          {
            id: 'cloud-adoption-services',
            navLabel: 'Cloud Adoption',
            index: '02',
            title: 'Cloud Adoption Services',
            paragraphs: [
              'Implementation of scalable cloud platforms for vehicle data storage and processing. Optimization of automotive operations through cloud-based solutions. Enables real-time analytics and decision-making for fleet management. Supports over-the-air (OTA) software updates and remote diagnostics. Improves data security, accessibility, and cross-platform integration.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=85&auto=format&fit=crop',
              alt: 'Cloud technology and data for automotive',
            },
          },
          {
            id: 'social-networking-strategies',
            navLabel: 'Social Networking',
            index: '03',
            title: 'Social Networking Strategies',
            paragraphs: [
              'Leveraging social media platforms for brand promotion and customer engagement. Building online communities for automotive enthusiasts and brand advocates. Enhancing customer support through real-time interaction and feedback. Launching targeted ad campaigns to boost product visibility and sales. Showcasing new models and innovations through engaging multimedia content.',
              'Enhancing customer support through real-time interaction and feedback mechanisms, such as chatbots, live Q&A sessions, and comment responses, ensures that customer concerns are addressed promptly, reinforcing satisfaction and retention. Launching targeted ad campaigns to boost product visibility and sales allows brands to reach specific audiences based on demographics, interests, and behavior, maximizing return on investment while minimizing waste. These ads, when backed by analytics and insights, drive informed decision-making and ongoing optimization.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=85&auto=format&fit=crop',
              alt: 'Digital engagement and automotive brand presence',
            },
          },
          {
            id: 'cybersecurity-measures',
            navLabel: 'Cybersecurity',
            index: '04',
            title: 'Cybersecurity Measures',
            paragraphs: [
              'Protection of connected vehicles against cyber threats and hacking attempts is more crucial than ever. By integrating AI in automotive cybersecurity frameworks, we enable intelligent threat detection and real-time defense to safeguard vehicle systems and sensitive data. As modern vehicles become increasingly reliant on software and connectivity, they also become more vulnerable to malicious attacks that can compromise not just data privacy, but passenger safety as well. Artificial Intelligence brings the ability to continuously monitor vehicle networks, identify unusual behavior, and respond to potential threats faster than traditional systems.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=85&auto=format&fit=crop',
              alt: 'Automotive cybersecurity and connected vehicle safety',
            },
          },
          {
            id: 'multimedia-solutions',
            navLabel: 'Multimedia Solutions',
            index: '05',
            title: 'Multimedia Solutions',
            paragraphs: [
              'Development of interactive infotainment systems and in-car entertainment is evolving through AI in automotive. From voice recognition to personalized content delivery, AI enhances the in-vehicle experience like never before. AI-powered assistants provide hands-free navigation, communication, and media control. Real-time language translation and contextual suggestions improve user interaction. Adaptive interfaces respond to driver preferences and behavior patterns. Seamless integration with mobile devices and streaming services enhances connectivity. AI enables proactive suggestions for nearby services like fuel stations.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=85&auto=format&fit=crop',
              alt: 'In-vehicle infotainment and multimedia experience',
            },
          },
          {
            id: 'advanced-analytics',
            navLabel: 'Advanced Analytics',
            index: '06',
            title: 'Advanced Analytics Capabilities',
            paragraphs: [
              'Analysis of vehicle telemetry data to optimize performance and fuel efficiency. Utilization of predictive analytics for proactive maintenance and vehicle diagnostics. Enables early detection of mechanical issues, reducing repair costs and downtime. Improves driver behavior through real-time monitoring and feedback. Supports fleet management with comprehensive performance insights and reporting.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85&auto=format&fit=crop',
              alt: 'Vehicle data analytics and fleet insights',
            },
          },
        ],
      },
      {
        path: '/railways_industries',
        title: 'Railways',
        intro:
          'Operational resilience, safety culture, and long-running programs for signaling, operations, and passenger systems.',
        heroKicker: 'Industries',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=85&auto=format&fit=crop',
          alt: 'Modern railway and rail infrastructure',
        },
        overviewEyebrow: 'Overview',
        overview:
          'Ething boasts a strong foothold in the railway technology industry, particularly in rail control, services, and infrastructure. Recognizing the pivotal role of passenger experience, we prioritize digitalization, safety, and efficiency. By leveraging technology and innovation, we accelerate digitalization efforts, enhance safety and security, and streamline operations. Our services enable global companies to gain a competitive edge through cost reduction and faster time-to-market, aligning with our vision to creatively enhance rail transportation.',
        capabilitiesEyebrow: 'Railways',
        capabilitiesTitle: 'Service Capabilities',
        sections: [
          {
            id: 'railways-firmware',
            navLabel: 'Firmware Development',
            index: '01',
            title: 'Firmware Development',
            paragraphs: [
              'Customized firmware solutions tailored to railway technology industry requirements. Development of firmware for embedded systems and onboard devices. Ensures real-time communication between train control systems and monitoring units. Supports integration with safety-critical components like signaling and braking systems. Enables remote diagnostics and over-the-air updates for onboard equipment. Optimizes energy usage and system performance through intelligent control logic. Our firmware is designed with robustness, reliability, and scalability at its core, meeting stringent regulatory and operational standards required by the rail sector. It seamlessly interfaces with various communication protocols such as CAN, MVB, and Ethernet to ensure uninterrupted data flow across critical subsystems. The architecture supports modular upgrades, allowing railway operators to future-proof their infrastructure with minimal disruption.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=85&auto=format&fit=crop',
              alt: 'Embedded systems, circuit boards, and firmware development for rail control',
            },
          },
          {
            id: 'railways-ui-design',
            navLabel: 'UI Design',
            index: '02',
            title: 'User Interface (UI) Design',
            paragraphs: [
              'Creation of intuitive and user friendly interfaces for railway technology applications. Customized UI designs to enhance user experience and efficiency. Responsive layouts compatible with various onboard and control room displays. Integration of real-time data visualization for improved decision-making. Support for multi-language and accessibility features to ensure broader usability. Our UI/UX solutions are crafted to meet the unique challenges of the railway industry, ensuring seamless interaction between operators, passengers, and the underlying systems. We prioritize ease of use and clarity, enabling quick adoption and reducing training time for end-users. Our interfaces are built with adaptive design principles, offering consistent performance across diverse hardware platforms, from rugged control room monitors to mobile tablets used by field technicians.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=85&auto=format&fit=crop',
              alt: 'Control room and operational user interfaces',
            },
          },
          {
            id: 'railways-application-software',
            navLabel: 'Application Software',
            index: '03',
            title: 'Application Software - Development / Porting / Integration',
            paragraphs: [
              'Design and development of application software for various railway technology systems. Porting and integration services for seamless operation across platforms. Ensures compatibility with legacy systems and modern infrastructure. Enhances operational efficiency through automation and intelligent workflows. Supports real-time monitoring, control, and reporting functionalities.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=85&auto=format&fit=crop',
              alt: 'Software development and railway systems integration',
            },
          },
          {
            id: 'railways-bsp',
            navLabel: 'BSP Development',
            index: '04',
            title: 'Board Support Package (BSP) Development',
            paragraphs: [
              'Development of BSP for ARM processors and OS compatibility with Linux, VxWorks, Android, and FreeRTOS. Optimization of hardware-software interactions for enhanced performance. Facilitates efficient device driver development and system boot processes. Ensures low-latency communication between hardware components and OS layers. Supports debugging, testing, and validation for robust embedded solutions. Enables scalable and maintainable firmware architectures for diverse applications, including industrial automation, automotive systems, consumer electronics, and IoT devices. The BSP framework supports modular code structures and abstraction layers, simplifying future upgrades, platform portability, and long-term maintenance.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85&auto=format&fit=crop',
              alt: 'Board support and embedded hardware integration',
            },
          },
          {
            id: 'railways-technical-translations',
            navLabel: 'Technical Translations',
            index: '05',
            title: 'Technical Documents Language Translations',
            paragraphs: [
              'Translation of technical documents into multiple languages for global railway projects. Ensuring accurate and effective communication across linguistic barriers. Adapting content to meet regional regulatory and cultural requirements. Maintaining consistency in technical terminology and standards. Supporting multilingual collaboration among international project teams.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=85&auto=format&fit=crop',
              alt: 'Technical documentation and multilingual project collaboration',
            },
          },
          {
            id: 'railways-lifecycle-testing',
            navLabel: 'Lifecycle & Testing',
            index: '06',
            title: 'Software Development and Testing Across the Lifecycle',
            paragraphs: [
              'Comprehensive software development and testing services for railway subsystems such as TCMS, HMI, displays, ATE/ATB, and simulators. Ensuring software integrity and adherence to specifications throughout the product lifecycle. Implementing rigorous validation and verification processes to meet safety standards. Facilitating continuous integration and automated testing for faster delivery. Providing maintenance and support to address evolving system requirements. Collaborating closely with stakeholders to align software solutions with operational needs.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85&auto=format&fit=crop',
              alt: 'Software lifecycle testing and validation for rail systems',
            },
          },
        ],
      },
      {
        path: '/banking_finance_industry',
        title: 'Banking & Finance',
        intro:
          'Risk-aware delivery, controls, and scalable platforms for banks, fintech, and capital markets.',
        heroKicker: 'Industries',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=85&auto=format&fit=crop',
          alt: 'Financial analysis and banking technology context',
        },
        overviewEyebrow: 'Overview',
        overview:
          'Ething delivers top tier banking and financial application development solutions, elevating organizational capacities to foster growth and generate value within the financial sector. Employing a sophisticated banking software development approach, we leverage data driven insights and analytical tools to empower companies to embrace modernized architectures and deliver seamless omnichannel experiences across various Fintech offerings- including cutting edge crm for banking industry.',
        capabilitiesEyebrow: 'Banking & Finance',
        capabilitiesTitle: 'Service Capabilities',
        sections: [
          {
            id: 'tailored-banking-software',
            navLabel: 'Tailored Banking Software',
            index: '01',
            title: 'Tailored Banking Software Solutions',
            paragraphs: [
              'We specialize in crafting customized Banking Software Development solutions designed to streamline operations and usher institutions into the digital age. Our crm for banking industry implementations are meticulously developed to enhance customer relationships alongside core banking functions, ensuring seamless financial processes for banks, trading organizations, accounting firms, and other financial institution.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=85&auto=format&fit=crop',
              alt: 'Custom banking software development and digital workspace',
            },
          },
          {
            id: 'online-payment-services',
            navLabel: 'Online Payment Services',
            index: '02',
            title: 'Online Payment Services',
            paragraphs: [
              'Leverage the power of our dynamic and customizable Digital Payment Services, empowering financial institutions to facilitate instant and secure digital transactions while simultaneously reducing management expenses. Designed to integrate seamlessly with existing banking infrastructure for smooth adoption. Offers multi-layered security protocols to protect against fraud and cyber threats. Supports a variety of payment methods, including mobile wallets, cards, and cryptocurrencies. Provides real-time transaction monitoring and detailed analytics for enhanced decision-making.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85&auto=format&fit=crop',
              alt: 'Digital payments analytics and transaction monitoring',
            },
          },
          {
            id: 'mobile-banking-services',
            navLabel: 'Mobile Banking',
            index: '03',
            title: 'Mobile Banking Services',
            paragraphs: [
              'Experience unparalleled efficiency and user friendly design with our mobile banking solution for iOS and Android. Seamlessly integrating cross-platform functionality, it offers swift navigation and a seamlessly designed interface, all while providing top-notch digital payment services. Built with advanced security features to protect user data and transactions. Offers real-time account monitoring and instant notifications. Includes personalized financial insights and budgeting tools. Supports multiple payment methods and international currency transactions.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=85&auto=format&fit=crop',
              alt: 'Mobile banking on smartphone',
            },
          },
          {
            id: 'financial-market-software',
            navLabel: 'Financial Market Software',
            index: '04',
            title: 'Financial Market Software Services',
            paragraphs: [
              'We excel in deploying trade execution services that improve straight-through processing across various asset classes. These high-volume, low-latency features, such as auto-hedging and auto-quoting, are created using advanced Banking Software Development frameworks to ensure performance and reliability in real-time financial environments. Our solutions prioritize scalability to handle growing transaction volumes without compromising speed. Robust risk management tools are integrated to safeguard assets and maintain compliance. Continuous monitoring and optimization guarantee minimal downtime and maximum efficiency.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=85&auto=format&fit=crop',
              alt: 'Financial markets analysis and trading operations',
            },
          },
        ],
      },
      {
        path: '/education_industry',
        title: 'Education',
        intro:
          'Accessible digital experiences and secure data practices for institutions and edtech.',
        heroKicker: 'Industries',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=85&auto=format&fit=crop',
          alt: 'Learning and education technology context',
        },
        overviewEyebrow: 'Overview',
        overview:
          'Ething aids clients within the Education services by furnishing customized solutions designed to address the dynamic requirements of the industry. Our application services are tailored for students, staff, and faculty, nurturing a collaborative and inclusive atmosphere. Drawing upon our proficiency in Educational and E-Learning app development, we facilitate the streamlined management of key performance indicators. Additionally, our solutions offer insightful visualizations of vital educational metrics, enhancing the monitoring of student growth and progress with greater effectiveness.',
        capabilitiesEyebrow: 'Education',
        capabilitiesTitle: 'Service Capabilities',
        sections: [
          {
            id: 'education-administration-platform',
            navLabel: 'Education Administration Platforms',
            index: '01',
            title: 'Education Administration Platform Development',
            paragraphs: [
              'Our proficient team provides expert education services in developing, integrating, and deploying online learning management systems tailored for academic institutions, spanning from public schools to universities.',
              'We focus on creating intuitive platforms that enhance student engagement and streamline administrative tasks.',
              'Customizable modules allow institutions to adapt content and assessments to their unique curricula.',
              'Integration with multimedia tools supports diverse learning styles and interactive experiences.',
              'Robust analytics offer educators insights into student performance and course effectiveness.',
              'Continuous technical support ensures smooth operation and timely updates.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=85&auto=format&fit=crop',
              alt: 'Students and collaborative learning in an academic setting',
            },
          },
          {
            id: 'business-learning-solutions',
            navLabel: 'Business Learning',
            index: '02',
            title: 'Business Learning Solutions',
            paragraphs: [
              'Crafted to address the needs of today\'s dynamic workforce, our education services are tailored to evolve with organizational demands. We provide forward-thinking, outcome-oriented personalized learning solutions, enhancing corporate training effectiveness while driving cost savings and operational efficiency. Our programs are designed not just to train, but to transform by bridging skill gaps, fostering leadership development, and cultivating a culture of continuous learning. Leveraging the latest in digital learning technologies, data driven insights, and industry-relevant content, we empower employees at every level to stay agile, innovative, and future-ready. Whether it\'s onboarding, upskilling, or leadership coaching, our scalable solutions align seamlessly with your business goals, ensuring measurable impact and sustainable growth.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85&auto=format&fit=crop',
              alt: 'Corporate team learning and collaboration',
            },
          },
          {
            id: 'mobile-learning-solutions',
            navLabel: 'Mobile Learning',
            index: '03',
            title: 'Mobile Learning Solutions',
            paragraphs: [
              'With our team of mobile application development specialists, clients are empowered to select from a range of options, including a feature-packed responsive web application boasting a stunning custom design, powerful plug-ins, and a mobile-optimized user interface.',
              'We ensure seamless performance across all devices and platforms for maximum reach.',
              'Our solutions prioritize user experience and scalability to support future growth.',
              'Ongoing maintenance and updates keep applications secure and upto date with the latest technologies. In addition to robust functionality, we integrate intuitive navigation and modern design trends to enhance user engagement and retention. Our development process follows industry best practices and agile methodologies, ensuring faster delivery without compromising on quality. From initial planning and UI/UX prototyping to backend development and deployment, every phase is executed with precision and transparency. We also offer advanced analytics integration, enabling businesses to track performance and make data-driven improvements. Whether you are launching a startup app or scaling an enterprise solution, our team is equipped to deliver a product that not only meets your current needs but also adapts as your business evolves.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=85&auto=format&fit=crop',
              alt: 'Mobile learning application on a smartphone',
            },
          },
          {
            id: 'educational-institution-management',
            navLabel: 'Institution Management',
            index: '04',
            title: 'Educational Institution Management',
            paragraphs: [
              'Our proficient team provides expert education services in developing, integrating, and deploying online learning management systems tailored for academic institutions, spanning from public schools to universities.',
              'We focus on creating intuitive platforms that enhance student engagement and streamline administrative tasks.',
              'Customizable modules allow institutions to adapt content and assessments to their unique curricula.',
              'Integration with multimedia tools supports diverse learning styles and interactive experiences.',
              'Robust analytics offer educators insights into student performance and course effectiveness.',
              'Continuous technical support ensures smooth operation and timely updates.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=85&auto=format&fit=crop',
              alt: 'Learning management and academic administration on laptop',
            },
          },
        ],
      },
    ],

    staffingServices: {
      path: '/staffing_services',
      title: 'Staffing Services',
      offeringsId: 'offerings',
      heroKicker: 'Staffing services',
      heroTitle:
        'Empower Your Projects with Expertise: Ething\'s Agile Staff Augmentation Solutions',
      heroIntro:
        'Staff augmentation services provided by Ething involve the strategic deployment of skilled professionals to augment existing teams and bolster project capacities. With a meticulous selection process, we handpick experts in various fields to seamlessly integrate into our clients\' workflows, ensuring a smooth transition and alignment with project objectives. Whether short-term or long-term engagements, our staff augmentation services offer flexible solutions to address fluctuating resource needs and project demands. By leveraging our extensive network of talent, clients gain access to specialized expertise, accelerating project timelines and achieving operational excellence. With a commitment to quality and efficiency, Ething\'s staff augmentation services empower organizations to achieve their goals with confidence.',
      heroImage: {
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=960&q=85&auto=format&fit=crop',
        alt: 'Team of professionals collaborating on a project',
      },
      solutionsKicker: 'Our staff augmentation solutions',
      onsiteStaffing: {
        title: 'Onsite Staffing',
        body: 'Ething\'s staffing solution gives you the flexibility to quickly scale your team with top tier developers who are already aligned with your needs. We take care of so you can focus on growing your business.',
      },
      remoteStaffing: {
        title: 'Remote Staffing',
        body: 'Our Offsite Outsourcing Service grants you access to a proficient team of developers who can contribute to your crucial projects from a distance. From single assignments to comprehensive project management, we\'re here to cater to your unique needs and objectives.',
      },
      advantagesKicker: 'Team augmentation advantages',
      advantages: [
        {
          title: 'Full Development Control',
          body: 'Maintain complete control over the development process',
          icon: 'SlidersHorizontal',
        },
        {
          title: 'Diverse Expertise',
          body: 'Access a wide range of expertise and cutting edge technologies',
          icon: 'Layers',
        },
        {
          title: 'Cost Savings',
          body: 'Achieve significant cost savings compared to permanent hiring',
          icon: 'Wallet',
        },
        {
          title: 'Swift Hiring',
          body: 'Streamlined and rapid hiring process for immediate results',
          icon: 'Zap',
        },
        {
          title: 'Vast Specialist Pool',
          body: 'Gain access to a large pool of skilled IT specialist',
          icon: 'Users',
        },
        {
          title: 'Minimal Administration',
          body: 'Eliminate Administrative burdens associated with permanent hiring',
          icon: 'ClipboardList',
        },
      ],
      partnerTitle: 'Why should you partner with us ?',
      partnerHighlights: [
        'Rich Talent Pool',
        'Decades of Expertise',
        'Swift Market Entry',
        'Premium Selection',
        'Exceptional Success',
      ],
      processKicker: 'Our staff augmentation process ?',
      processSteps: [
        {
          title: 'Getting to Know You',
          body: 'We start with a meeting to understand what you need',
        },
        {
          title: 'Finding the Right Fit',
          body: 'We check if the skills and the way we work fit your company',
        },
        {
          title: 'Suggesting Candidates',
          body: 'We suggest a few people who could be a good match for you',
        },
        {
          title: 'Checking Quality',
          body: 'We make sure that people we suggest are really good',
        },
        {
          title: 'Joining Your Team',
          body: 'After you talk to them, they can easily join your team and start working',
        },
      ],
      uniqueKicker: 'What makes us unique',
      uniqueItems: [
        {
          title: 'Abundant Resources',
          body: 'Access a vast pool of candidates and leverage 22 years of Digital resources experience.',
        },
        {
          title: 'Industry Specialization',
          body: 'Dominate healthcare with specialized knowledge, propelling your success.',
        },
        {
          title: 'Swift Start',
          body: 'Initiate projects promptly with our remarkable turnaround',
        },
        {
          title: 'Cost-Effective Solution',
          body: 'Balancing progress and cost, our flexible model saves you from traditional hiring expenses.',
        },
        {
          title: 'Tailored Staffing',
          body: 'Scale effortlessly with on-site or remote experts. Skip recruitment hassles - we adjust to your needs seamlessly.',
        },
        {
          title: 'Seamless Collaboration',
          body: 'Our cohesive team integrates smoothly with yours, fostering efficiently and teamwork.',
        },
      ],
      engagementKicker: 'Our engagement model',
      engagementModels: [
        {
          type: 'simple',
          title: 'Time and Materials (T&M)',
          paragraphs: [
            'Pay for actual time spent by augmented staff and resources utilized.',
            'Provides flexibility to adapt to changing project requirements.',
          ],
        },
        {
          type: 'simple',
          title: 'Fixed Price',
          paragraphs: [
            'Agree on a predetermined price for the project or specific tasks.',
            'Offers cost predictability for budget planning purposes.',
          ],
        },
        {
          type: 'managed',
          title: 'Managed Team',
          modes: [
            {
              label: 'Customer Managed',
              bullets: [
                'You have an existing development team and want to add resources to it',
                'You have someone with technical expertise with you already who can manage day to day',
                'You want a more hands on approach with the team',
              ],
            },
            {
              label: 'Ething Managed',
              bullets: [
                'You may not have anyone to manage the tasks day to day',
                'You want updates on progress at fixed interval as per agreement',
              ],
            },
          ],
        },
        {
          type: 'bullets',
          title: 'Build Operate Transfer (BOT)',
          bullets: [
            'When you have to scale up teams slowly or have a longer timeline to deploy',
            'You do not have an idea how many resources you require to complete the task',
            'Once the actual understanding is available and team is set up you want to own the entire process',
          ],
        },
      ],
      offeringsHeading: 'Related capabilities',
      primaryCta: { label: 'Contact us', path: '/contact' },
      secondaryCta: { label: 'View engagement models', hash: '#engagement-models' },
    },

    aiStaffAugmentation: {
      path: '/ai_staff_augmentation',
      heroKicker: 'Staff augmentation',
      heroTitle: 'AI & data engineering talent, embedded with your teams',
      heroIntro:
        'Ething provides AI staff augmentation: experienced practitioners who join your roadmap, tools, and delivery cadence. You get depth in modelling, data, and production workflows without overstating transformation or strategy the focus is credible execution alongside your engineers and leads.',
      primaryCta: { label: 'Hire Talent', path: '/contact' },
      secondaryCta: { label: 'All staffing options', path: '/staffing_services' },
      rolesKicker: 'Roles',
      rolesTitle: 'Specialists we place',
      rolesIntro:
        'These roles map to typical needs on modern product and platform teams; we tailor profiles to your stack, domain, and security expectations.',
      roles: [
        'Generative AI Engineers',
        'Machine Learning Engineers',
        'Data Scientists',
        'NLP Engineers',
        'MLOps Engineers',
        'Python AI Developers',
        'Data Engineers',
        'AI Solution Architects',
      ],
      fitKicker: 'Fit',
      fitTitle: 'Built for augmentation, not rebranding',
      fitBody:
        'We augment your bench with people who ship: code reviews, design discussions, experimentation, pipelines, and handovers that match how you already work. This page is deliberately practical no sweeping “AI transformation” narrative, just skilled people when you need them.',
      processKicker: 'How it works',
      processTitle: 'A simple engagement path',
      processSteps: [
        {
          title: 'Scope & profiles',
          body: 'You share stacks, timelines, collaboration model (onsite, hybrid, or remote), and the seniority mix you need.',
        },
        {
          title: 'Shortlist',
          body: 'We propose candidates screened for relevant delivery experience and teamwork not generic résumés.',
        },
        {
          title: 'Embed & iterate',
          body: 'Selected engineers join your rituals and tools; we stay available for onboarding support and throughput adjustments.',
        },
      ],
      closing: {
        title: 'Need software engineers too?',
        body:
          'Our broader staffing covers full-stack, cloud, QA, firmware, and more often alongside AI and data hires on the same programme.',
        cta: { label: 'Talk to us', path: '/contact' },
      },
    },

    engineeringServices: {
      path: '/engineering-services',
      title: 'Engineering Services',
      intro:
        'We help you design, build, and run modern software, from discovery and architecture to quality engineering and platform operations.',
      capabilitiesId: 'capabilities',
    },

    engineeringPages: [
      {
        path: '/software_development',
        title: 'Software Development',
        intro:
          'End-to-end product and platform engineering: architecture, implementation, and iteration paced to your roadmap.',
        heroKicker: 'Engineering services',
        heroHeading: 'Software Development Services',
        heroLead:
          'Unlock the full potential of your business with our custom software development services. Our team specializes in crafting bespoke software solutions tailored to your unique needs and objectives. From initial concept to final deployment, we work closely with you to understand your business processes and objectives, ensuring that the resulting software aligns perfectly with your vision. With our custom solutions, you can streamline workflows, automate tasks, and stay ahead of the competition. Experience the power of tailored technology solutions designed to propel your business forward. Partner with us today and transform your ideas into reality.',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=960&q=85&auto=format&fit=crop',
          alt: 'Software development and code on a laptop screen',
        },
        serviceSections: [
          {
            id: 'requirement-analysis',
            title: 'Thorough Requirement Analysis',
            body: 'In-depth discussions with stakeholders to understand business objectives, user requirements, and technical constraints. Conducting workshops, interviews, and surveys to gather comprehensive insights into the project scope and expectations. Documenting detailed requirements specifications, including functional and non-functional requirements, to serve as a blueprint for development.',
            icon: 'ClipboardList',
          },
          {
            id: 'agile-methodology',
            title: 'Agile Development Methodology',
            body: 'Embracing Agile principles and practices to facilitate iterative and incremental development. Breaking down the project into small, manageable units of work (user stories) and prioritizing them based on business value. Conducting regular sprint planning, review, and retrospective meetings to ensure transparency, collaboration, and continuous improvement.',
            icon: 'Kanban',
          },
          {
            id: 'full-stack',
            title: 'Full-Stack Development Expertise',
            body: 'Proficiency across the entire software stack, encompassing front-end, back-end, and database development. Utilization of modern programming languages and frameworks such as JavaScript (React, Angular, Vue.js), Python (Django, Flask), and Java (Spring Boot). Integration of third-party APIs and libraries to leverage existing functionalities and accelerate development timelines.',
            icon: 'Layers',
          },
          {
            id: 'user-centric-design',
            title: 'User-Centric Design Approach',
            body: 'Engaging in user experience (UX) research and design thinking to create intuitive and user friendly interfaces. Conducting usability testing and user feedback sessions to validate design assumptions and iterate on interface improvements. Implementing responsive design principles to ensure compatibility across various devices and screen sizes.',
            icon: 'Palette',
          },
          {
            id: 'quality-assurance',
            title: 'Quality Assurance and Testing',
            body: 'Developing comprehensive test plans covering unit testing, integration testing, system testing, and acceptance testing. Leveraging test automation tools and frameworks such as Selenium, Cypress, or JUnit to automate repetitive test cases and ensure software reliability. Conducting performance testing, security testing, and accessibility testing to verify the robustness and compliance of the software.',
            icon: 'TestTube',
          },
          {
            id: 'continuous-deployment',
            title: 'Continuous Deployment and Delivery',
            body: 'Implementing continuous integration and continuous deployment (CI/CD) pipelines to automate the build, test, and deployment process. Leveraging containerization technologies such as Docker and orchestration tools like Kubernetes for scalable and reliable deployment. Monitoring and logging infrastructure to track application performance, detect issues, and facilitate timely resolution.',
            icon: 'Rocket',
          },
          {
            id: 'post-deployment',
            title: 'Post-Deployment Support and Maintenance',
            body: 'Providing ongoing support and maintenance services to address software bugs, performance issues, and feature enhancements. Offering service-level agreements (SLAs) for response times, resolution times, and availability guarantees to ensure customer satisfaction. Conducting regular software audits and health checks to identify opportunities for optimization and improvement.',
            icon: 'Headphones',
          },
        ],
        frameworksTitle: 'Framework / Technologies',
        frameworkGroups: [
          {
            title: 'Web Application Framework',
            items: ['Django (Python)', 'Express (Node.js /JavaScript)', 'ASP.NET (C#)', 'CodeIgniter'],
          },
          {
            title: 'JavaScript Frameworks/Libraries',
            items: [
              'AngularJS 2+ (Typescript)',
              'Node.js',
              'jQuery',
              'Ionic 3',
              'Knockout',
              'Breeze.js',
            ],
          },
          {
            title: 'Technologies',
            items: ['.NET (C#)', 'Java', 'Android', 'iOS', 'C++', 'JavaScript', 'Python', 'PHP', 'Power BI'],
          },
          {
            title: 'DevOps',
            items: ['Jenkins', 'Docker', 'Ansible', 'Kubernetes', 'Git'],
          },
          {
            title: 'Web Services',
            items: ['SOAP', 'REST'],
          },
          {
            title: 'Database',
            items: ['MySQL', 'PostgreSQL', 'MongoDB'],
          },
        ],
        engineeringCta: { label: 'Contact us', path: '/contact' },
        engineeringSecondaryCta: { label: 'Technology Stack', hash: '#frameworks-technologies' },
        engineeringCtaLead:
          'Partner with us today and transform your ideas into reality.',
      },
      {
        path: '/mobile_application',
        title: 'Mobile Application',
        intro:
          'Native and cross-platform mobile apps with focus on performance, accessibility, and secure data handling.',
        heroKicker: 'Engineering services',
        heroHeading: 'Mobile Application',
        heroLead:
          'Experience the future of mobile technology with our cutting-edge mobile application development services. Whether you\'re looking to launch a groundbreaking new app or enhance your existing mobile presence, our team is here to make it happen. We specialize in creating innovative, user friendly mobile apps that engage your audience and drive results. From concept to launch, we work tirelessly to bring your vision to life, leveraging the latest technologies and design trends to deliver a seamless user experience. With our mobile apps, you can connect with your customers anytime, anywhere, and stand out in today\'s competitive market. Elevate your mobile strategy and unlock new possibilities for your business. Partner with us to turn your mobile app dreams into reality.',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=960&q=85&auto=format&fit=crop',
          alt: 'Mobile phones showing application interfaces',
        },
        serviceSections: [
          {
            id: 'requirement-gathering',
            title: 'Requirement Gathering',
            paragraphs: [
              'Understanding the client\'s objectives, target audience, and desired features for the mobile app.',
              'Conducting market research and competitor analysis to identify opportunities and trends.',
            ],
            icon: 'ClipboardList',
          },
          {
            id: 'ui-ux-design',
            title: 'UI/UX Design',
            paragraphs: [
              'Creating wireframes and prototypes to visualize the app\'s user interface and user experience.',
              'Designing intuitive navigation, engaging visuals, and interactive elements to enhance usability.',
            ],
            icon: 'Palette',
          },
          {
            id: 'development',
            title: 'Development',
            body: 'Choosing the appropriate development approach (native, hybrid, or cross-platform) based on project requirements. Writing code using programming languages and frameworks such as Swift or Objective-C for iOS, Java or Kotlin for Android, and JavaScript frameworks like React Native or Flutter for cross-platform development. Integrating with backend services, APIs, and databases to enable data exchange and functionality.',
            icon: 'Smartphone',
          },
          {
            id: 'testing',
            title: 'Testing',
            paragraphs: [
              'Conducting thorough testing to ensure the app functions as intended across different devices, screen sizes, and operating systems.',
              'Performing functional testing, usability testing, performance testing, and security testing to identify and fix any issues or bugs.',
            ],
            icon: 'TestTube',
          },
          {
            id: 'deployment',
            title: 'Deployment',
            paragraphs: [
              'Preparing the app for deployment to the respective app stores (Apple App Store for iOS, Google Play Store for Android).',
              'Following the submission guidelines and requirements of each platform and obtaining necessary approvals.',
            ],
            icon: 'CloudUpload',
          },
          {
            id: 'maintenance-updates',
            title: 'Maintenance and Updates',
            paragraphs: [
              'Providing ongoing maintenance and support to address any issues, bugs, or performance issues that arise post-launch.',
              'Releasing regular updates with new features, enhancements, and bug fixes to keep the app relevant and competitive in the market.',
            ],
            icon: 'RefreshCw',
          },
        ],
        frameworksTitle: 'Framework / Technologies',
        frameworkGroups: [
          {
            title: 'iOS',
            items: ['Swift', 'Objective-C', 'Xcode'],
          },
          {
            title: 'Android',
            items: ['Java', 'Kotlin', 'Android Studio'],
          },
          {
            title: 'Cross-Platform Development',
            items: [
              {
                name: 'React Native',
                description:
                  'JavaScript framework for building native-like apps for iOS and Android.',
              },
              {
                name: 'Flutter',
                description:
                  'UI toolkit for building natively compiled apps from a single codebase using Dart.',
              },
              {
                name: 'Xamarin',
                description: 'Framework for building cross-platform apps using C# and .NET',
              },
            ],
          },
          {
            title: 'Hybrid Development',
            items: [
              {
                name: 'Ionic',
                description:
                  'Framework for building cross-platform apps using web technologies.',
              },
              {
                name: 'PhoneGap / Cordova',
                description:
                  'Framework for building cross-platform apps using web technologies, wrapped in a native container.',
              },
              {
                name: 'Apache Flutte',
                description:
                  'Distribution of Apache Cordova with additional plugins for hybrid app development.',
              },
            ],
          },
          {
            title: 'Progressive Web Apps (PWAs)',
            items: [
              {
                name: 'Service Workers',
                description:
                  'JavaScript files enabling offline support and push notifications.',
              },
              {
                name: 'Web App Manifest',
                description: 'JSON file providing metadata about the web app.',
              },
              {
                name: 'Responsive Design',
                description: 'Design approach ensuring adaptability to various screen sizes.',
              },
            ],
          },
        ],
        engineeringCta: { label: 'Contact us', path: '/contact' },
        engineeringSecondaryCta: { label: 'Technology Stack', hash: '#frameworks-technologies' },
        engineeringCtaLead:
          'Partner with us to turn your mobile app dreams into reality.',
      },
      {
        path: '/firmware_engg',
        title: 'Firmware Engineering',
        intro:
          'Embedded software close to the metal: RTOS, drivers, connectivity, and bring-up for hardware programs.',
        heroKicker: 'Engineering services',
        heroHeading: 'Firmware Engineering',
        heroLead:
          'Discover the essence of seamless hardware functionality with our firmware engineering expertise. At Ething, we specialize in crafting the intricate software that powers your embedded systems. From writing efficient code in C and assembly to developing robust bootloaders and drivers, our team ensures your devices operate with precision and reliability. With a focus on security and real-time responsiveness, we deliver firmware solutions that exceed industry standards. Whether you\'re in healthcare, automotive, aerospace, or IoT, trust us to bring your hardware to life. Explore the possibilities with Ething and unlock the full potential of your embedded devices.',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=960&q=85&auto=format&fit=crop',
          alt: 'Embedded hardware and electronics development environment',
        },
        serviceSections: [
          {
            id: 'embedded-systems-development',
            title: 'Embedded Systems Development',
            paragraphs: [
              'Writing firmware code for microcontrollers, microprocessors, and other embedded systems.',
              'Programming in low-level languages such as C, C++, and assembly language to interact directly with hardware components.',
            ],
            icon: 'Cpu',
          },
          {
            id: 'rtos',
            title: 'Real-Time Operating Systems (RTOS)',
            body: 'Developing firmware for real-time operating systems like FreeRTOS and VxWorks, which are optimized for embedded systems and require deterministic behavior.',
            icon: 'Timer',
          },
          {
            id: 'hardware-abstraction-layers',
            title: 'Hardware Abstraction Layers (HALs)',
            body: 'Creating HALs to abstract hardware-specific functionalities, allowing firmware code to remain portable across different hardware platforms.',
            icon: 'Layers',
          },
          {
            id: 'device-drivers',
            title: 'Device Drivers and Peripheral Interfaces',
            paragraphs: [
              'Developing device drivers to interface with peripheral devices such as sensors, actuators, displays, and communication interfaces (UART, SPI, I2C).',
              'Implementing communication protocols for data exchange between embedded systems and external devices.',
            ],
            icon: 'Cable',
          },
          {
            id: 'bootloaders',
            title: 'Bootloaders and Firmware Update Mechanisms',
            paragraphs: [
              'Designing bootloaders to initialize the hardware and load the firmware into memory during the boot-up process.',
              'Implementing firmware update mechanisms to allow for over-the-air (OTA) updates and remote maintenance of embedded devices.',
            ],
            icon: 'RefreshCw',
          },
          {
            id: 'testing-debugging',
            title: 'Testing and Debugging',
            paragraphs: [
              'Conducting thorough testing of firmware code to ensure its functionality, reliability, and performance.',
              'Using hardware debugging tools like JTAG debuggers and software emulators to debug firmware code in real-time.',
            ],
            icon: 'TestTube',
          },
          {
            id: 'security-reliability',
            title: 'Security and Reliability',
            paragraphs: [
              'Implementing security measures such as encryption, authentication, and secure boot to protect firmware from unauthorized access and tampering.',
              'Ensuring the reliability and robustness of firmware code through rigorous testing and adherence to industry standards and best practices.',
            ],
            icon: 'Shield',
          },
        ],
        frameworksTitle: 'Framework / Technologies',
        frameworkGroups: [
          {
            title: 'Embedded Systems Development',
            items: [
              {
                name: 'C/C++',
                description:
                  'Programming languages commonly used for firmware development due to their efficiency and low-level control capabilities.',
              },
              {
                name: 'Assembly Language',
                description:
                  'Low-level programming language used for writing firmware code directly targeting hardware.',
              },
            ],
          },
          {
            title: 'Real-Time Operating Systems (RTOS)',
            items: [
              {
                name: 'FreeRTOS',
                description:
                  'Open-source real-time operating system kernel designed for embedded systems.',
              },
              {
                name: 'VxWorks',
                description:
                  'Proprietary real-time operating system widely used in embedded and real-time systems.',
              },
            ],
          },
          {
            title: 'Hardware Abstraction Layers (HALs)',
            items: [
              {
                name: 'Arduino',
                description:
                  'Open-source electronics platform based on easy-to-use hardware and software for building digital devices and interactive objects.',
              },
              {
                name: 'Raspberry Pi',
                description:
                  'Single-board computer platform used for various embedded projects and IoT applications.',
              },
            ],
          },
          {
            title: 'Development Tools',
            items: [
              {
                name: 'IDEs (Integrated Development Environments)',
                description:
                  'Software tools like Eclipse, Visual Studio Code, and Keil µVision for writing, compiling, and debugging firmware code.',
              },
              {
                name: 'Emulators and Simulators',
                description:
                  'Tools for testing firmware code in a virtual environment before deployment on actual hardware.',
              },
            ],
          },
          {
            title: 'Communication Protocols',
            items: [
              {
                name: 'UART, SPI, I2C',
                description:
                  'Serial communication protocols commonly used for interfacing with peripheral devices in embedded systems.',
              },
              {
                name: 'Ethernet, Wi-Fi, Bluetooth',
                description:
                  'Wireless communication protocols used for connecting embedded devices to networks and other devices.',
              },
            ],
          },
          {
            title: 'Testing and Debugging',
            items: [
              {
                name: 'JTAG Debuggers',
                description:
                  'Hardware debugging tools used for testing and debugging firmware code on embedded systems.',
              },
              {
                name: 'Unit Testing Frameworks',
                description:
                  'Software tools like CppUTest and Unity for testing individual units of firmware code.',
              },
            ],
          },
        ],
        engineeringCta: { label: 'Contact us', path: '/contact' },
        engineeringSecondaryCta: { label: 'Technology Stack', hash: '#frameworks-technologies' },
        engineeringCtaLead:
          'Explore the possibilities with Ething and unlock the full potential of your embedded devices.',
      },
      {
        path: '/cloud_services',
        title: 'Cloud Services',
        intro:
          'Cloud-native design, migrations, and platform operations with automation, observability, and cost-aware growth.',
        heroKicker: 'Engineering services',
        heroHeading: 'Cloud Development',
        heroLead:
          'Unlock the boundless potential of cloud technology with Ething. Our cloud development services empower businesses to leverage the scalability, flexibility, and innovation of the cloud. From crafting and deploying cloud-native applications to seamlessly migrating existing systems, our team harnesses cutting-edge technologies and best practices to fulfill your unique requirements. Whether you seek to optimize performance, enhance efficiency, or foster collaboration, Ething has the expertise to transform your cloud aspirations into reality. Partner with us and embark on a cloud journey that propels your business to new heights.',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=960&q=85&auto=format&fit=crop',
          alt: 'Cloud technology and global digital network visualization',
        },
        serviceSections: [
          {
            id: 'review-strategy-environment',
            groupLabel: 'Cloud Consulting',
            title: 'Review Strategy and Environment of Cloud Computing',
            body: 'We provide thorough assessments of the Cloud environment, beginning with the establishment of goals, prioritization of new projects, and crafting a detailed, executable strategy.',
            icon: 'FileSearch',
          },
          {
            id: 'architecture-review',
            groupLabel: 'Cloud Consulting',
            title: 'Architecture Review',
            body: 'We evaluate your current Cloud setup to pinpoint areas for improvement and potential advantages, encompassing infrastructure, applications, data, security, governance, and compliance.',
            icon: 'Layers',
          },
          {
            id: 'cloud-migration-strategy',
            groupLabel: 'Cloud Consulting',
            title: 'Cloud Migration Strategy',
            body: 'We assist our clients in formulating a Cloud strategy tailored to their goals and addressing the identified areas for improvement and opportunities. This includes outlining the desired architecture, choosing the appropriate Cloud platform, devising a migration strategy, and establishing the governance and operational framework.',
            icon: 'Route',
          },
          {
            id: 'cloud-architecture-design',
            groupLabel: 'Cloud Migration Consulting Services',
            title: 'Cloud Architecture Design',
            body: 'We craft the framework for your cloud-based infrastructure, aiding in the selection of the optimal service model and cloud provider to suit your requirements.',
            icon: 'Cloud',
          },
          {
            id: 'data-migration',
            groupLabel: 'Cloud Migration Consulting Services',
            title: 'Data Migration',
            body: 'Our specialists are available to assist in transitioning your data from on-premises to cloud storage, guaranteeing the security, integrity, and availability of your data throughout the process.',
            icon: 'Import',
          },
          {
            id: 'application-migration',
            groupLabel: 'Cloud Migration Consulting Services',
            title: 'Application Migration',
            body: 'We ensure the secure migration of your applications to the cloud by handling the migration of custom applications, upgrading current applications, and managing dependencies between applications.',
            icon: 'AppWindow',
          },
          {
            id: 'cloud-security-migration',
            groupLabel: 'Cloud Migration Consulting Services',
            title: 'Cloud Security',
            body: 'We provide guidance on maximizing the utilization of security tools offered by your cloud service provider, such as firewalls, intrusion detection systems, and monitoring tools.',
            icon: 'Shield',
          },
          {
            id: 'database-migration',
            groupLabel: 'Cloud Migration Consulting Services',
            title: 'Database Migration',
            body: 'As reputable providers of cloud migration services, we recognize the paramount importance of data in your business processes. We assess your current database architecture, classify data according to its significance, and smoothly transition it to the most fitting cloud-based database solution for your requirements. Whether it involves migrating databases, files, or applications, our methodical approach ensures minimal disruption and utmost data security.',
            icon: 'Database',
          },
          {
            id: 'infrastructure-migration',
            groupLabel: 'Cloud Migration Consulting Services',
            title: 'Infrastructure Migration',
            body: 'As a reputable company in cloud migration services, our experienced professionals thoroughly examine your current IT infrastructure to develop a customized strategy ensuring a smooth migration process. By leveraging top industry standards, we facilitate a seamless transition of your infrastructure to the cloud, minimizing disruptions and enhancing performance.',
            icon: 'Server',
          },
        ],
        frameworksTitle: 'Framework / Technologies',
        frameworkGroups: [
          {
            title: 'Infrastructure as a Service (IaaS)',
            items: ['AWS', 'Azure', 'CGP'],
          },
          {
            title: 'Platform as a Service (PaaS)',
            items: ['Heroku', 'Firebase', 'OpenShift'],
          },
          {
            title: 'Containerization and Orchestration',
            items: ['Docker', 'Kubernetes'],
          },
          {
            title: 'Serverless Computing',
            items: ['AWS Lambda', 'Azure Functions'],
          },
          {
            title: 'DevOps and CI/CD',
            items: ['Jenkins', 'Gitlab CI/CD'],
          },
          {
            title: 'Monitoring and Logging',
            items: ['Prometheus', 'ELK Stack'],
          },
        ],
        engineeringCta: { label: 'Contact us', path: '/contact' },
        engineeringSecondaryCta: { label: 'Technology Stack', hash: '#frameworks-technologies' },
        engineeringCtaLead:
          'Partner with us and embark on a cloud journey that propels your business to new heights.',
      },
      {
        path: '/quality_testing',
        title: 'Testing',
        intro:
          'Test strategy, automation, and quality gates so releases stay predictable in complex and regulated environments.',
        heroKicker: 'Engineering services',
        heroHeading: 'Testing',
        heroLead:
          'At Ething, we ensure the quality and reliability of your software products through our comprehensive manual and automation testing services. Our skilled testing team meticulously evaluates your software applications, identifying and resolving any defects or inconsistencies to deliver flawless user experiences. With manual testing, we conduct rigorous functional testing, regression testing, and user acceptance testing to validate the software\'s performance against defined requirements. Additionally, our expertise in automation testing allows us to expedite testing processes and enhance test coverage using cutting-edge tools and frameworks. By combining manual and automation testing strategies, we guarantee the robustness and efficiency of your software solutions, empowering your business to thrive in today\'s competitive market. Partner with Ething and elevate the quality of your software products with our meticulous testing services.',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=960&q=85&auto=format&fit=crop',
          alt: 'Quality assurance dashboards and software testing analytics',
        },
        serviceSections: [
          {
            id: 'test-planning-strategy',
            title: 'Test Planning and Strategy',
            paragraphs: [
              'Developing comprehensive test plans and strategies to ensure thorough coverage of functional and non-functional requirements.',
              'Identifying test scenarios, test cases, and test data necessary to validate the software\'s behavior and performance.',
            ],
            icon: 'ListChecks',
          },
          {
            id: 'manual-testing',
            title: 'Manual Testing',
            paragraphs: [
              'Performing manual testing activities such as exploratory testing, regression testing, and ad-hoc testing to uncover defects and inconsistencies in the software.',
              'Executing test cases manually to verify the functionality, usability, and compatibility of the application across different platforms and environments.',
            ],
            icon: 'MousePointer2',
          },
          {
            id: 'automation-testing',
            title: 'Automation Testing',
            paragraphs: [
              'Designing and implementing automated test scripts using industry-standard automation frameworks such as Selenium, Appium, and TestComplete.',
              'Leveraging scripting languages like Python, Java, and JavaScript to develop robust and maintainable test automation solutions.',
            ],
            icon: 'Workflow',
          },
          {
            id: 'ci-ct',
            title: 'Continuous Integration and Continuous Testing (CI/CT)',
            paragraphs: [
              'Integrating automated tests into continuous integration pipelines to enable early detection of defects and ensure code quality throughout the development lifecycle.',
              'Automating the execution of test suites as part of CI/CD workflows to validate software changes and prevent regressions.',
            ],
            icon: 'GitBranch',
          },
          {
            id: 'performance-testing',
            title: 'Performance Testing',
            paragraphs: [
              'Conducting performance testing to evaluate the scalability, responsiveness, and stability of the software under various load conditions.',
              'Using tools like JMeter, LoadRunner, and Gatling to simulate realistic user traffic and measure key performance indicators such as response time, throughput, and resource utilization.',
            ],
            icon: 'Gauge',
          },
          {
            id: 'security-testing',
            title: 'Security Testing',
            paragraphs: [
              'Performing security testing activities such as vulnerability scanning, penetration testing, and security code reviews to identify potential security risks and vulnerabilities in the software.',
              'Utilizing specialized security testing tools and techniques to assess the resilience of the application against common security threats and attacks.',
            ],
            icon: 'Shield',
          },
          {
            id: 'accessibility-testing',
            title: 'Accessibility Testing',
            paragraphs: [
              'Ensuring that the software is accessible to users with disabilities by conducting accessibility testing according to WCAG (Web Content Accessibility Guidelines) standards.',
              'Using assistive technologies and automated accessibility testing tools to evaluate the application\'s compliance with accessibility requirements and guidelines.',
            ],
            icon: 'Accessibility',
          },
          {
            id: 'cross-browser-device',
            title: 'Cross-Browser and Cross-Device Testing',
            paragraphs: [
              'Validating the compatibility and responsiveness of the software across different web browsers, mobile devices, and operating systems.',
              'Executing test cases on a variety of platforms and devices using cloud-based testing platforms and emulators to ensure consistent user experiences.',
            ],
            icon: 'MonitorSmartphone',
          },
          {
            id: 'test-reporting',
            title: 'Test Reporting and Documentation',
            paragraphs: [
              'Generating comprehensive test reports and documentation to communicate test results, defects, and quality metrics to stakeholders.',
              'Tracking and managing defects through dedicated defect tracking systems to facilitate timely resolution and closure.',
            ],
            icon: 'FileText',
          },
          {
            id: 'test-environment-management',
            title: 'Test Environment Management',
            paragraphs: [
              'Setting up and maintaining test environments that closely mirror production environments to ensure accurate and reliable testing results.',
              'Managing test data and test infrastructure to support efficient and effective testing activities throughout the software development lifecycle.',
            ],
            icon: 'Server',
          },
        ],
        frameworksTitle: 'Framework / Technologies',
        frameworkGroups: [
          {
            title: 'Manual Testing',
            intro:
              'Ensures software functions correctly based on requirements, including functional, regression, user acceptance, and exploratory testing.',
          },
          {
            title: 'Automation Testing',
            intro:
              'Utilizes tools like Selenium, Appium, JUnit/TestNG, and Pytest to automate testing processes, improving efficiency and reliability.',
          },
          {
            title: 'Test Management',
            intro:
              'Tools like JIRA, TestRail, and Zephyr help organize and track testing efforts, ensuring comprehensive coverage.',
          },
          {
            title: 'CI/CD Integration',
            intro:
              'Platforms such as Jenkins and GitLab CI/CD enable seamless integration of testing into development pipelines, facilitating rapid and reliable software delivery.',
          },
        ],
        engineeringCta: { label: 'Contact us', path: '/contact' },
        engineeringSecondaryCta: { label: 'Technology Stack', hash: '#frameworks-technologies' },
        engineeringCtaLead:
          'Partner with Ething and elevate the quality of your software products with our meticulous testing services.',
      },
      {
        path: '/product_security',
        title: 'Product Security',
        intro:
          'Threat modeling, secure design reviews, and hardening so your product meets stakeholder and compliance expectations.',
        heroKicker: 'Engineering services',
        heroHeading: 'Product Security',
        heroLead:
          'At Ething, we understand the paramount importance of product security in today\'s digital landscape. Our dedicated team specializes in fortifying your products against potential threats, ensuring they meet the highest standards of security and compliance. From conducting thorough risk assessments to implementing robust security protocols, we prioritize the protection of your assets and data. Whether you\'re developing software applications, IoT devices, or hardware solutions, our comprehensive approach to product security safeguards your reputation and instills trust among your customers. Partner with Ething and safeguard your products against evolving cybersecurity challenges.',
        heroImage: {
          src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=960&q=85&auto=format&fit=crop',
          alt: 'Cybersecurity and secure technology concepts',
        },
        serviceSections: [
          {
            id: 'threat-analysis-risk',
            title: 'Threat Analysis and Risk Assessment',
            paragraphs: [
              'Conducting comprehensive threat analysis to identify potential security vulnerabilities and risks associated with the product.',
              'Performing risk assessments to prioritize security measures based on the likelihood and impact of potential threats.',
            ],
            icon: 'Target',
          },
          {
            id: 'security-architecture-design',
            title: 'Security Architecture Design',
            paragraphs: [
              'Designing robust security architectures that encompass various layers of protection, including network security, application security, and data security.',
              'Implementing security controls such as encryption, authentication, authorization, and audit logging to safeguard sensitive information and prevent unauthorized access.',
            ],
            icon: 'Layers',
          },
          {
            id: 'secure-coding-practices',
            title: 'Secure Coding Practices',
            paragraphs: [
              'Adhering to secure coding practices and guidelines to mitigate common security vulnerabilities such as injection attacks, cross-site scripting (XSS), and insecure direct object references (IDOR).',
              'Utilizing security-focused programming languages and frameworks that offer built-in security features and protections.',
            ],
            icon: 'Code2',
          },
          {
            id: 'vapt',
            title: 'Vulnerability Assessment and Penetration Testing (VAPT)',
            paragraphs: [
              'Conducting regular vulnerability assessments and penetration tests to identify and remediate security weaknesses before they can be exploited by attackers.',
              'Employing automated scanning tools and manual testing techniques to simulate real-world attack scenarios and validate the effectiveness of security controls.',
            ],
            icon: 'Bug',
          },
          {
            id: 'security-incident-response',
            title: 'Security Incident Response and Management',
            paragraphs: [
              'Establishing incident response procedures and protocols to effectively detect, respond to, and mitigate security incidents in a timely manner.',
              'Providing incident response training and readiness exercises to ensure organizational preparedness for security incidents and breaches.',
            ],
            icon: 'BellRing',
          },
          {
            id: 'compliance-regulatory',
            title: 'Compliance and Regulatory Compliance',
            paragraphs: [
              'Ensuring compliance with relevant industry standards, regulations, and data protection laws such as GDPR, HIPAA, PCI DSS, and ISO/IEC 27001.',
              'Conducting regular compliance audits and assessments to verify adherence to security requirements and address any non-compliance issues proactively.',
            ],
            icon: 'Scale',
          },
          {
            id: 'security-awareness-training',
            title: 'Security Awareness Training',
            paragraphs: [
              'Providing security awareness training programs for employees, contractors, and stakeholders to educate them about common security threats, best practices, and their roles and responsibilities in maintaining product security.',
              'Offering phishing simulations and other interactive training modules to raise awareness and reinforce security-conscious behaviors across the organization.',
            ],
            icon: 'GraduationCap',
          },
          {
            id: 'security-governance',
            title: 'Security Governance and Risk Management',
            paragraphs: [
              'Establishing security governance frameworks and risk management processes to ensure effective oversight and decision-making regarding security investments, priorities, and initiatives.',
              'Conducting periodic security reviews and assessments to monitor the effectiveness of security controls and adjust security strategies as needed in response to evolving threats and business requirements.',
            ],
            icon: 'Building2',
          },
        ],
        frameworksTitle: 'Framework / Technologies',
        frameworkGroups: [
          {
            title: 'Authentication and Authorization',
            items: ['Swift', 'JWT'],
          },
          {
            title: 'Encryption and Hashing',
            items: ['AES', 'RSA', 'SHA-256'],
          },
          {
            title: 'Secure Development Practices',
            items: ['OWASP Top 10', 'Secure SDLC'],
          },
          {
            title: 'Security Testing Tools',
            items: ['OWASP ZAP', 'Burp Suite', 'Nessus'],
          },
          {
            title: 'Identity and Access Management (IAM)',
            items: ['SOAP', 'REST'],
          },
          {
            title: 'Security Compliance Frameworks',
            items: ['ISO/IEC 27001', 'GDPR', 'HIPAA'],
          },
        ],
        engineeringCta: { label: 'Contact us', path: '/contact' },
        engineeringSecondaryCta: { label: 'Technology Stack', hash: '#frameworks-technologies' },
        engineeringCtaLead:
          'Partner with Ething and safeguard your products against evolving cybersecurity challenges.',
      },
    ],

    blogs: {
      path: '/blogs',
      kicker: 'Insights',
      title: 'Blogs',
      intro:
        '',
      feedMissingTitle: 'Connect your Medium RSS feed',
      feedMissingHint:
        'This page loads Ething’s posts from https://medium.com/@EthingSolutions by default. To use a different publication or author, set VITE_MEDIUM_FEED_URL to the RSS URL (see .env.example).',
      errorTitle: 'Could not load posts',
    },

    careers: {
      path: '/careers',
      heroKicker: 'Careers',
      heroTitle: 'Be a Part of Our Team',
      heroIntro:
        'At Ething, we strive to create a positive and happy work culture for all our employees. For over two decades, we have been committed to providing endless opportunities to our people for growing and exploring their potential along with working with latest techniques.',
      primaryCta: { label: 'Contact us', path: '/contact' },
      secondaryCta: { label: 'Why Us', hash: '#why-us' },
      gallery: [
        {
          src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=85&auto=format&fit=crop',
          alt: 'Team members working on laptops in a modern office',
        },
        {
          src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=85&auto=format&fit=crop',
          alt: 'Collaborative meeting with laptops on a wooden table',
        },
        {
          src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=85&auto=format&fit=crop',
          alt: 'Team brainstorming with notes on a wall',
        },
      ],
      whyUsKicker: 'Why Us',
      whyUsTitleBefore: 'Why Work With ',
      whyUsTitleAccent: 'Us?',
      whyUsPillars: [
        {
          index: '01',
          title: 'Growth',
          paragraphs: [
            'Working at Ething, is a learning and engaging experience that enables our employees to grow.',
            'Our work culture is found on values like Passionate, Respect, Openness, Integrity and Customer Commitment.',
          ],
        },
        {
          index: '02',
          title: 'Facilities',
          paragraphs: [
            'Our global offices are equipped with state of the art facilities to make our people feel encouraged and enthusiastic.',
            'We Strive for creating a workspace where we work, excel, and celebrate as a team in everything.',
          ],
        },
        {
          index: '03',
          title: 'Awesome Culture',
          paragraphs: [
            'We at Ething, believe in balanced work life approach. Our flexible policies stimulate employee well being, improve employee engagement and maximize work productivity.',
          ],
        },
      ],
      hiringNote:
        "We're always interested in strong contributors. Send your profile through our contact form and mention 'Careers' in the subject line.",
    },

    privacy: {
      path: '/privacy-policy',
      title: 'Privacy Policy',
      heroEyebrow: 'Legal',
      description:
        "How we collect, use, and protect information when you use Ething's website and services. For questions, use the contact details at the end of this page.",
      lastUpdated: '2025',
      footerNote: '© 2025 ethingsolutions.com. All rights reserved. | Terms of Service',
      sections: [
        {
          id: 'information-we-collect',
          navLabel: 'Information We Collect',
          index: '1',
          title: 'Information We Collect',
          intro:
            'We collect the following types of information to provide and improve our services:',
          listItems: [
            {
              emphasis: 'Personal Information:',
              body: 'This includes your name, email address, and phone number, which you provide when submitting a form or contacting us directly.',
            },
            {
              emphasis: 'Log Data:',
              body: 'Our servers automatically record information created by your use of our services. This may include your browser type, IP address, referring URL, date and time of access, and other usage data.',
            },
          ],
        },
        {
          id: 'how-we-use-your-information',
          navLabel: 'How We Use Your Information',
          index: '2',
          title: 'How We Use Your Information',
          intro: 'The information we collect is used for the following purposes:',
          listItems: [
            {
              body: 'To provide, maintain, and improve our services and website functionality.',
            },
            {
              body: 'To respond to your inquiries and provide customer support.',
            },
          ],
        },
        {
          id: 'sharing-your-information',
          navLabel: 'Sharing Your Information',
          index: '3',
          title: 'Sharing Your Information',
          intro:
            'We are committed to protecting your personal information. We do not share your personal information with third parties except under the following limited circumstances:',
          listItems: [
            {
              body: 'With trusted service providers who assist us in operating our website, conducting our business, or providing services to you, so long as those parties agree to keep this information confidential.',
            },
          ],
        },
        {
          id: 'your-rights',
          navLabel: 'Your Rights',
          index: '4',
          title: 'Your Rights',
          intro: 'You have specific rights regarding your personal information:',
          listItems: [
            {
              emphasis: 'Access:',
              body: 'You have the right to request access to the personal information we hold about you.',
            },
            {
              emphasis: 'Correction:',
              body: 'You can request that we correct any inaccuracies in your personal information.',
            },
          ],
        },
        {
          id: 'cookies',
          navLabel: 'Cookies',
          index: '5',
          title: 'Cookies',
          intro: 'We use cookies for the following purposes:',
          listItems: [
            {
              body: 'To analyze our web traffic using Google Analytics and other analytics tools.',
            },
          ],
        },
        {
          id: 'security',
          navLabel: 'Security',
          index: '6',
          title: 'Security',
          paragraphs: [
            'We implement a variety of security measures to protect your personal information. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure.',
          ],
        },
        {
          id: 'changes-to-this-privacy-policy',
          navLabel: 'Changes to This Privacy Policy',
          index: '7',
          title: 'Changes to This Privacy Policy',
          paragraphs: [
            'We may update this Privacy Policy periodically to reflect changes in our practices and services. We will notify you of any material changes by posting the new Privacy Policy on this page, along with an updated revision date.',
          ],
        },
        {
          id: 'contact-us',
          navLabel: 'Contact Us',
          index: '8',
          title: 'Contact Us',
          intro:
            'If you have any questions or concerns about this Privacy Policy, please contact us at:',
          contactEmail: 'info@ethingsolutions.com',
        },
      ],
    },

    contact: {
      path: '/contact',
      pageTitle: 'Reach Out to Us',
    },
  },

  footer: {
    aboutTitle: 'Ething',
    aboutBody:
      'Ething Solutions provides software and AI engineering talent for staff augmentation plus consulting and delivery support so enterprises can scale teams with credible, experienced practitioners.',
    quickLinksTitle: 'Quick Links',
    quickLinks: [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about_us' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'Blogs', path: '/blogs' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'AI Staff Augmentation', path: '/ai_staff_augmentation' },
    ],
    industriesTitle: 'Industries',
    industries: [
      { label: 'Healthcare', path: '/healthcare_industry' },
      { label: 'Aerospace & Defence', path: '/aerospace_industry' },
      { label: 'Automotive', path: '/automotive_industry' },
      { label: 'Railways', path: '/railways_industries' },
      { label: 'Banking & Finance', path: '/banking_finance_industry' },
      { label: 'Education', path: '/education_industry' },
    ],
    contactTitle: 'Contact Us',
    address: {
      line1: 'Building Number 145, Sector 44 Rd,',
      line2: 'Gurugram, Haryana, 122003',
    },
    phones: [
      { label: 'India', value: '+91-7011956780' },
      { label: 'USA', value: '+1-929-557-4560' },
    ],
    email: 'support@ething.in',
    copyright: '© 2023 Ething',
  },
}
