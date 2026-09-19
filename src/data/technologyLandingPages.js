import { landingPageContent, landingPageMeta } from './landingPageContent.js'

const sharedGeo = landingPageMeta.geo
const sharedTrustBar = ['Pre-vetted talent', 'Profiles in 48 hours', 'NDA protected', 'Flexible engagement']

function createLandingPage({
  path,
  category,
  title,
  description,
  breadcrumbLabel,
  keywords,
  badge,
  headline,
  subheadline,
  primaryCta,
  talentTitle,
  talentSubtitle,
  talentCategories,
  faqQuestion,
  faqAnswer,
}) {
  return {
    meta: {
      ...landingPageMeta,
      path,
      category,
      title,
      description,
      breadcrumbLabel,
      keywords,
      geo: sharedGeo,
      ogImageAlt: `${breadcrumbLabel} from Ething Solutions`,
    },
    content: {
      ...landingPageContent,
      hero: {
        ...landingPageContent.hero,
        badge,
        headline,
        subheadline,
        primaryCta,
        trustBar: sharedTrustBar,
      },
      services: {
        ...landingPageContent.services,
        title: `Flexible Ways to ${breadcrumbLabel}`,
        subtitle:
          'Choose individual specialists, a dedicated team, or a flexible staff-augmentation model that fits your delivery plan.',
      },
      talent: {
        ...landingPageContent.talent,
        title: talentTitle,
        subtitle: talentSubtitle,
        categories: talentCategories,
      },
      faqs: [
        {
          id: `${category}-specialists`,
          question: faqQuestion,
          answer: faqAnswer,
        },
        ...landingPageContent.faqs,
      ],
      leadMagnet: {
        ...landingPageContent.leadMagnet,
        title: primaryCta,
        modalTitle: primaryCta,
        cta: primaryCta,
      },
      finalCta: {
        ...landingPageContent.finalCta,
        title: `Ready to ${breadcrumbLabel}?`,
        cta: primaryCta,
      },
    },
  }
}

export const technologyLandingPages = {
  topTalent: createLandingPage({
    path: '/hire-top-talent',
    category: 'top-talent',
    title: 'Hire Top Technology Talent in India | Ething Solutions',
    description:
      'Hire pre-vetted technology talent from India. Build your team with software, AI, cloud, data, QA and product engineering specialists in as little as 48 hours.',
    breadcrumbLabel: 'Hire Top Technology Talent',
    keywords: [
      'hire technology talent India',
      'hire tech talent India',
      'technology staffing company India',
      'hire software engineers India',
      'IT talent augmentation India',
      'remote technology talent India',
      'pre-vetted tech talent',
      'build offshore engineering team India',
    ],
    badge: 'Technology talent across your product stack',
    headline: 'Build Your Tech Team in 48 Hours',
    subheadline:
      'Tell us who you need. We will share suitable, pre-vetted technology profiles matched to your product, team and timeline.',
    primaryCta: 'Get Technology Talent Profiles',
    talentTitle: 'Technology Talent Across Your Product Stack',
    talentSubtitle: 'Build a balanced team across software, AI, cloud, data, QA and mobile engineering.',
    talentCategories: [
      { name: 'AI & ML Engineers', tech: ['Generative AI', 'LLMs', 'MLOps'] },
      { name: 'Full Stack Engineers', tech: ['React', 'Node.js', 'TypeScript'] },
      { name: 'Python Developers', tech: ['Python', 'Django', 'FastAPI'] },
      { name: 'DevOps Engineers', tech: ['AWS', 'Docker', 'Kubernetes'] },
      { name: 'Data Engineers', tech: ['Spark', 'Airflow', 'dbt'] },
      { name: 'QA Engineers', tech: ['Playwright', 'Cypress', 'Automation'] },
      { name: 'Mobile Developers', tech: ['React Native', 'iOS', 'Android'] },
      { name: 'Cloud Engineers', tech: ['AWS', 'Azure', 'GCP'] },
    ],
    faqQuestion: 'Which technology roles can Ething help us hire?',
    faqAnswer:
      'Ething supports software, AI and machine learning, cloud, DevOps, data, QA, mobile and product engineering requirements across individual and team-based engagements.',
  }),

  developers: createLandingPage({
    path: '/hire-developers',
    category: 'developers',
    title: 'Hire Software Developers in India | Ething Solutions',
    description:
      'Hire pre-vetted software developers from India. Receive matched profiles for web, backend, mobile, cloud and product engineering roles within 48 hours.',
    breadcrumbLabel: 'Hire Software Developers',
    keywords: [
      'hire software developers India',
      'hire developers India',
      'software developers for hire India',
      'remote software developers India',
      'dedicated developers India',
      'contract software developers India',
      'offshore software developers India',
      'hire engineering team India',
    ],
    badge: 'Software engineering talent',
    headline: 'Find the Right Software Developer, Fast',
    subheadline:
      'Tell us who you need. We will share suitable developer profiles matched to your technology, experience and delivery goals within 48 hours.',
    primaryCta: 'Get Developer Profiles',
    talentTitle: 'Developers Across Your Technology Stack',
    talentSubtitle: 'Pre-vetted engineers for modern web, backend, cloud, data and mobile products.',
    talentCategories: [
      { name: 'Frontend Developers', tech: ['React', 'Next.js', 'TypeScript'] },
      { name: 'Backend Developers', tech: ['Node.js', 'Python', 'Java'] },
      { name: 'Full Stack Developers', tech: ['React', 'Node.js', 'PostgreSQL'] },
      { name: 'Mobile Developers', tech: ['React Native', 'iOS', 'Android'] },
      { name: 'Cloud Developers', tech: ['AWS', 'Azure', 'GCP'] },
      { name: 'Data Developers', tech: ['Python', 'SQL', 'Spark'] },
    ],
    faqQuestion: 'How quickly can I receive software developer profiles?',
    faqAnswer:
      'After your requirements are understood, Ething can typically share a shortlist of relevant, pre-vetted developer profiles within 48 hours.',
  }),

  staffAugmentation: createLandingPage({
    path: '/staff-augmentation',
    category: 'staff-augmentation',
    title: 'IT Staff Augmentation Services in India | Ething Solutions',
    description:
      'Scale your engineering team with flexible IT staff augmentation from India. Add pre-vetted software, AI, cloud, data and DevOps specialists as your needs change.',
    breadcrumbLabel: 'Scale With IT Staff Augmentation',
    keywords: [
      'IT staff augmentation India',
      'staff augmentation services India',
      'technology staff augmentation company',
      'software staff augmentation India',
      'IT resource augmentation India',
      'engineering team augmentation',
      'remote staff augmentation India',
      'offshore staff augmentation',
    ],
    badge: 'Flexible IT staff augmentation',
    headline: 'Build Your Tech Team in 48 Hours',
    subheadline:
      'Add the engineering skills and delivery capacity you need without waiting months for traditional recruitment.',
    primaryCta: 'Get Vetted Engineering Profiles',
    talentTitle: 'Engineering Roles and Capabilities',
    talentSubtitle: 'Add one specialist or assemble a cross-functional team around your roadmap.',
    talentCategories: [
      { name: 'Software Engineers', tech: ['Frontend', 'Backend', 'Full Stack'] },
      { name: 'AI & ML Engineers', tech: ['Generative AI', 'Machine Learning', 'MLOps'] },
      { name: 'Cloud & DevOps', tech: ['AWS', 'Azure', 'Kubernetes'] },
      { name: 'Data Engineers', tech: ['Python', 'SQL', 'Data Platforms'] },
      { name: 'QA Engineers', tech: ['Manual', 'Automation', 'Performance'] },
      { name: 'Mobile Engineers', tech: ['iOS', 'Android', 'React Native'] },
    ],
    faqQuestion: 'How is staff augmentation different from outsourcing?',
    faqAnswer:
      'With staff augmentation, Ething professionals work as an extension of your existing team while you retain ownership of priorities, delivery and day-to-day collaboration.',
  }),

  ai: createLandingPage({
    path: '/hire-ai-developers',
    category: 'ai',
    title: 'Hire AI Developers & Engineers in India | Ething Solutions',
    description:
      'Hire pre-vetted AI and machine-learning engineers from India for generative AI, LLM, RAG, computer vision, NLP and MLOps initiatives.',
    breadcrumbLabel: 'Hire AI Developers',
    keywords: [
      'hire AI developers India',
      'hire AI engineers India',
      'generative AI developers India',
      'hire machine learning engineers',
      'LLM developers India',
      'RAG developers India',
      'MLOps engineers India',
      'AI staff augmentation India',
    ],
    badge: 'AI engineering talent',
    headline: 'Hire Pre-Vetted AI Developers in 48 Hours',
    subheadline:
      'Build AI products faster with engineers matched to your models, data platforms, product requirements and deployment environment.',
    primaryCta: 'Get AI Developer Profiles',
    talentTitle: 'AI Talent for Production-Ready Products',
    talentSubtitle: 'Specialists across applied AI, model development, data pipelines and production operations.',
    talentCategories: [
      { name: 'Generative AI Engineers', tech: ['LLMs', 'RAG', 'LangChain'] },
      { name: 'Machine Learning Engineers', tech: ['Python', 'PyTorch', 'TensorFlow'] },
      { name: 'NLP Engineers', tech: ['Transformers', 'Embeddings', 'Evaluation'] },
      { name: 'Computer Vision Engineers', tech: ['OpenCV', 'PyTorch', 'Vision Models'] },
      { name: 'MLOps Engineers', tech: ['Model Serving', 'CI/CD', 'Cloud AI'] },
      { name: 'AI Application Developers', tech: ['Python', 'APIs', 'Vector Databases'] },
    ],
    faqQuestion: 'Can Ething provide engineers for generative AI and LLM projects?',
    faqAnswer:
      'Yes. Ething can match engineers for generative AI applications, LLM integration, retrieval-augmented generation, model evaluation, data pipelines and MLOps.',
  }),

  python: createLandingPage({
    path: '/hire-python-developers',
    category: 'python',
    title: 'Hire Python Developers in India | Ething Solutions',
    description:
      'Hire pre-vetted Python developers from India for backend APIs, web applications, automation, data engineering and AI development.',
    breadcrumbLabel: 'Hire Python Developers',
    keywords: [
      'hire Python developers India',
      'Python developers for hire India',
      'remote Python developers India',
      'Django developers India',
      'FastAPI developers India',
      'Python backend developers',
      'contract Python developers',
      'Python staff augmentation',
    ],
    badge: 'Python engineering talent',
    headline: 'Hire Pre-Vetted Python Developers in 48 Hours',
    subheadline:
      'Get experienced Python engineers matched to your backend, application, automation, data or AI development requirements.',
    primaryCta: 'Get Python Developer Profiles',
    talentTitle: 'Python Talent Matched to Your Stack',
    talentSubtitle: 'Backend, data, automation and AI engineers ready to work with your architecture.',
    talentCategories: [
      { name: 'Python Backend Developers', tech: ['Django', 'FastAPI', 'Flask'] },
      { name: 'API Engineers', tech: ['REST', 'GraphQL', 'Microservices'] },
      { name: 'Data Engineers', tech: ['Python', 'SQL', 'Airflow'] },
      { name: 'AI & ML Engineers', tech: ['PyTorch', 'TensorFlow', 'LLMs'] },
      { name: 'Automation Engineers', tech: ['Python', 'Scripting', 'Testing'] },
      { name: 'Cloud Python Engineers', tech: ['AWS', 'Azure', 'Docker'] },
    ],
    faqQuestion: 'Which Python frameworks do your developers work with?',
    faqAnswer:
      'Ething can match Python developers across Django, FastAPI, Flask, data engineering, automation, AI and cloud-native application environments.',
  }),

  fullStack: createLandingPage({
    path: '/hire-full-stack-developers',
    category: 'full-stack',
    title: 'Hire Full Stack Developers in India | Ething Solutions',
    description:
      'Hire pre-vetted full-stack developers from India across React, Node.js, Python, Java, .NET, databases, APIs and cloud platforms.',
    breadcrumbLabel: 'Hire Full Stack Developers',
    keywords: [
      'hire full stack developers India',
      'full stack developers for hire',
      'remote full stack developers India',
      'React Node developers India',
      'MERN stack developers India',
      'contract full stack developers',
      'dedicated full stack developers',
      'full stack staff augmentation',
    ],
    badge: 'Full-stack engineering talent',
    headline: 'Hire Pre-Vetted Full Stack Developers in 48 Hours',
    subheadline:
      'Add engineers who can work across frontend, backend, APIs, databases and cloud infrastructure.',
    primaryCta: 'Get Full Stack Developer Profiles',
    talentTitle: 'Full-Stack Talent Across Modern Architectures',
    talentSubtitle: 'Engineers who can contribute across the product lifecycle and technology stack.',
    talentCategories: [
      { name: 'React & Node.js', tech: ['React', 'Node.js', 'TypeScript'] },
      { name: 'Next.js Engineers', tech: ['Next.js', 'React', 'PostgreSQL'] },
      { name: 'Python Full Stack', tech: ['React', 'Django', 'FastAPI'] },
      { name: 'Java Full Stack', tech: ['React', 'Spring Boot', 'Java'] },
      { name: '.NET Full Stack', tech: ['React', '.NET', 'Azure'] },
      { name: 'Cloud Full Stack', tech: ['APIs', 'AWS', 'Containers'] },
    ],
    faqQuestion: 'Can full-stack developers work across our existing frontend and backend?',
    faqAnswer:
      'Yes. Matching is based on your architecture, including frontend framework, backend language, APIs, databases, cloud environment and delivery practices.',
  }),

  react: createLandingPage({
    path: '/hire-react-developers',
    category: 'react',
    title: 'Hire React Developers in India | Ething Solutions',
    description:
      'Hire pre-vetted React developers from India for product interfaces, Next.js applications, component systems, integrations and frontend performance.',
    breadcrumbLabel: 'Hire React Developers',
    keywords: [
      'hire React developers India',
      'React developers for hire India',
      'remote React developers India',
      'hire Next.js developers India',
      'contract React developers',
      'dedicated React developers',
      'React frontend developers India',
      'React staff augmentation',
    ],
    badge: 'React engineering talent',
    headline: 'Hire Pre-Vetted React Developers in 48 Hours',
    subheadline:
      'Get React engineers matched to your frontend architecture, product requirements, integrations and experience level.',
    primaryCta: 'Get React Developer Profiles',
    talentTitle: 'React Talent for Modern Product Teams',
    talentSubtitle: 'Frontend engineers experienced in scalable interfaces, performance and product delivery.',
    talentCategories: [
      { name: 'Senior React Developers', tech: ['React', 'TypeScript', 'Redux'] },
      { name: 'Next.js Developers', tech: ['Next.js', 'SSR', 'React'] },
      { name: 'Frontend Engineers', tech: ['JavaScript', 'HTML', 'CSS'] },
      { name: 'React UI Engineers', tech: ['Design Systems', 'Accessibility', 'Testing'] },
      { name: 'React Integration Engineers', tech: ['REST', 'GraphQL', 'APIs'] },
      { name: 'React Performance Engineers', tech: ['Core Web Vitals', 'Testing', 'Optimization'] },
    ],
    faqQuestion: 'Can you match React developers to our frontend architecture?',
    faqAnswer:
      'Yes. Ething matches React engineers based on your framework, TypeScript requirements, state management, API layer, testing approach and performance goals.',
  }),

  devops: createLandingPage({
    path: '/hire-devops-engineers',
    category: 'devops',
    title: 'Hire DevOps Engineers in India | Ething Solutions',
    description:
      'Hire pre-vetted DevOps engineers from India for AWS, Azure, GCP, Kubernetes, Terraform, CI/CD, observability and platform engineering.',
    breadcrumbLabel: 'Hire DevOps Engineers',
    keywords: [
      'hire DevOps engineers India',
      'DevOps engineers for hire',
      'remote DevOps engineers India',
      'hire cloud engineers India',
      'Kubernetes engineers India',
      'Terraform developers India',
      'contract DevOps engineers',
      'DevOps staff augmentation',
    ],
    badge: 'DevOps and cloud engineering talent',
    headline: 'Hire Pre-Vetted DevOps Engineers in 48 Hours',
    subheadline:
      'Scale your cloud, infrastructure and deployment capability with engineers matched to your platform and operating model.',
    primaryCta: 'Get DevOps Engineer Profiles',
    talentTitle: 'DevOps Talent for Reliable Platforms',
    talentSubtitle: 'Engineers across cloud, infrastructure automation, delivery pipelines and reliability.',
    talentCategories: [
      { name: 'Cloud Engineers', tech: ['AWS', 'Azure', 'GCP'] },
      { name: 'Kubernetes Engineers', tech: ['Kubernetes', 'Docker', 'Helm'] },
      { name: 'Infrastructure Engineers', tech: ['Terraform', 'Ansible', 'Linux'] },
      { name: 'CI/CD Engineers', tech: ['GitHub Actions', 'Jenkins', 'GitLab'] },
      { name: 'Site Reliability Engineers', tech: ['Observability', 'SLOs', 'Incident Response'] },
      { name: 'Platform Engineers', tech: ['Developer Platforms', 'Automation', 'Cloud'] },
    ],
    faqQuestion: 'Which cloud and DevOps platforms do your engineers support?',
    faqAnswer:
      'Ething can match DevOps engineers across AWS, Azure, GCP, Kubernetes, Docker, Terraform, CI/CD, infrastructure as code, monitoring and Linux environments.',
  }),
}

export const technologyLandingPagePaths = Object.values(technologyLandingPages).map(
  ({ meta }) => meta.path,
)
