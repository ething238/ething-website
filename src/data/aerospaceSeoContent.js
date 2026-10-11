const aerospaceSeoContent = {
  title: 'Aerospace Software Engineers | eThing',
  description: 'eThing provides engineers for aerospace teams. Find talent for embedded software, hardware integration, ground control and testing.',
  heading: 'Aerospace Software Engineers',
  intro: 'Build a stronger aerospace team with eThing. We connect aerospace and defence companies with engineers for embedded software, hardware integration, ground control applications and testing.',
  overview: {
    heading: 'The right people for your engineering team',
    paragraphs: [
      'eThing brings focus to technical hiring. We match engineers to your platform, equipment and project needs, then support profile selection, technical interviews and onboarding. You get a clear route from defining a role to welcoming a new team member.',
      'Add specialist expertise at the stage your project needs it. Your technical leads direct the work, while we support the engagement and adapt to changing staffing requirements. From one specialist to a wider team, the focus stays on your priorities.',
    ],
  },
  footerAbout: 'Strengthen your team with software engineers from eThing, supported by role matching, onboarding and ongoing engagement support.',
  services: {
    heading: 'Expertise for Aerospace and Defence teams',
    intro: 'Find engineers for the work ahead, with expertise matched to your systems, tools and project priorities.',
    cards: [
      {
        id: 'aerospace-defense-software',
        title: 'Aerospace Software Development',
        icon: 'software',
        paragraphs: [
          'Strengthen your application team with developers for operator interfaces, monitoring tools and software supporting aerospace control systems. We focus on the languages, architecture and equipment knowledge your project needs, so technical discussions stay relevant to the role.',
          'From a new interface to an existing codebase, the developer writes code, takes part in reviews and helps with debugging within your workflow. Share your priorities and expected responsibilities; eThing supports selection and onboarding around those requirements.',
        ],
        image: {
          src: '/aerospace/aviation-wing.jpg',
          alt: 'Aircraft wing representing aerospace software engineering',
        },
      },
      {
        id: 'embedded-systems-defense',
        title: 'Embedded Software Development',
        icon: 'embedded',
        paragraphs: [
          'Bring embedded developers into your team for aerospace equipment and defence electronics. Match C++ and real-time operating system experience, including VxWorks where relevant, to your platform’s timing, memory and communication requirements.',
          'Technical discussions cover start-up behaviour, fault handling and debugging on target hardware. The developer joins your build and review workflow, with access to the equipment and documentation needed to contribute. Your team retains technical direction and acceptance decisions.',
        ],
        image: {
          src: '/aerospace/embedded-systems.jpg',
          alt: 'Electronic components used in embedded aerospace equipment',
        },
      },
      {
        id: 'fpga-drivers-bsp',
        title: 'Hardware and Software Integration',
        icon: 'integration',
        paragraphs: [
          'Connect software and electronic equipment with engineers experienced in device drivers, board support packages and FPGA-related integration. We use your boards, sensors, interfaces and development tools to guide profile matching and technical discussions.',
          'An integration engineer contributes to interface checks, equipment debugging and issue investigations alongside your hardware and software teams. Define the target platform, laboratory access and responsibilities before onboarding, giving the specialist a clear place in your project.',
        ],
        image: {
          src: '/aerospace/fpga-circuit-board.jpg',
          alt: 'Circuit board representing hardware and software integration',
        },
      },
      {
        id: 'ground-control-systems',
        title: 'Ground Control Software',
        icon: 'control',
        paragraphs: [
          'Add developers for ground control interfaces, equipment monitoring and operator tools. Qt and C++ experience supports roles involving status displays, alerts and controls, with profile selection shaped by your application, data sources and platform requirements.',
          'The developer contributes to your backlog, interface reviews and debugging, helping the team move assigned work forward. Your product leads define operator needs, command permissions and acceptance checks, keeping changes aligned with the wider programme.',
        ],
        image: {
          src: '/aerospace/ground-control-room.jpg',
          alt: 'Monitoring displays in a ground control room',
        },
      },
      {
        id: 'aerospace-software-testing',
        title: 'Software Testing',
        icon: 'testing',
        paragraphs: [
          'Strengthen software quality with test engineers for aerospace applications, embedded code and equipment interfaces. Match functional, integration, regression and automation experience to your test environment, with technical discussions focused on the systems your team uses.',
          'The engineer prepares checks, reproduces issues and records clear results for your team’s review. Consistent defect reports help your team prioritise fixes and assess progress. Your project leads retain ownership of test strategy and release decisions.',
        ],
        image: {
          src: '/aerospace/software-testing-lab.png',
          alt: 'Illustrative aerospace software testing workstation with avionics equipment and telemetry displays',
          width: 1448,
          height: 1086,
        },
      },
    ],
  },
  technologies: {
    heading: 'Technical skills to match your requirements',
    intro: 'Your technology stack guides our search for engineers with relevant experience.\nWe match application, embedded and hardware expertise to the work your team needs.',
    cards: [
      { title: 'C++', body: 'Embedded code, application components, memory management and debugging experience, matched to the depth your role requires.' },
      { title: 'Qt and operator interfaces', body: 'Screens, controls and equipment status displays, with experience suited to your application and operator requirements.' },
      { title: 'VxWorks and RTOS', body: 'Real-time scheduling, communication and platform debugging skills for software with defined timing requirements.' },
      { title: 'FPGA', body: 'Programmable logic and integration experience, assessed against your tools, interfaces and the specialist role you need.' },
      { title: 'Device drivers and BSP', body: 'Platform bring-up, device communication and debugging across hardware and software, aligned with your board and operating system.' },
    ],
  },
  // Add project accounts only after the customer need, work and result are confirmed.
  // Customer names also require permission before publication.
  successStories: [],
  projectExamples: {
    heading: 'Where our engineers support your team',
    intro: 'Illustrative roles showing how an engineer adds capacity to your team, shaped by your project requirements.',
    cards: [
      {
        title: 'Ground control application teams',
        need: 'More development capacity for equipment monitoring, operator controls or an interface backlog.',
        work: 'Qt and C++ developers with interface, data handling and debugging experience suited to your application.',
        outputs: 'Assigned interface tasks, code reviews and issue investigations, delivered through your team’s workflow.',
      },
      {
        title: 'Embedded equipment teams',
        need: 'Specialist support for board integration, device communication or checks on target equipment.',
        work: 'Embedded engineers with driver, BSP and platform experience matched to your hardware and integration needs.',
        outputs: 'Equipment checks, integration tasks and documented findings for your technical leads to review.',
      },
    ],
    successStoryIntro: 'Explore our experience supporting client teams.',
    ctaLabel: 'Our success stories — Learn more',
    ctaHref: '/about_us#case-heading',
  },
  contact: {
    heading: 'Discuss Your Aerospace Project',
    intro: 'Tell us which engineers you need. We’ll help define the role, review relevant profiles and plan the next steps.',
    ctaLabel: 'Discuss Your Aerospace Project',
    engineersLabel: 'Hire Aerospace Engineers',
    teamHeading: 'Build your team with eThing',
    teamParagraphs: [
      'Looking for an aerospace engineer for hire, or planning to hire defence engineers? Our IT staff augmentation offering connects your team with expertise matched to the work ahead.',
      'Share the skills, equipment, working location and start date. eThing supports selection and onboarding, then stays involved throughout the engagement to help your team manage changing requirements.',
    ],
  },
};

export default aerospaceSeoContent;
