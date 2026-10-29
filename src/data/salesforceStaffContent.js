export const salesforceRoles = [
  { id: 'developer', label: 'Developer', icon: 'code', description: 'Build and maintain business logic, interfaces and integrations within your existing organisation.', skills: ['Apex & SOQL', 'Lightning Web Components', 'APIs & testing'], work: 'Custom features, bulk processing, integration fixes and existing-code maintenance.' },
  { id: 'administrator', label: 'Administrator', icon: 'settings', description: 'Hire a Salesforce administrator to support users, configuration and day-to-day platform improvements.', skills: ['Flow automation', 'Access & permissions', 'Reports & dashboards'], work: 'User access, reporting, data quality, automation and operational support.' },
  { id: 'architect', label: 'Solution architect', icon: 'layers', description: 'Guide decisions across data models, integrations, security and maintainability.', skills: ['Solution design', 'Integration patterns', 'Technical governance'], work: 'Architecture options, design reviews, data models and implementation guidance.' },
  { id: 'consultant', label: 'Functional consultant', icon: 'workflow', description: 'Translate stakeholder needs into clear requirements and practical platform changes.', skills: ['Process mapping', 'User stories', 'UAT & adoption'], work: 'Requirements, acceptance criteria, configuration and business-user coordination.' },
  { id: 'qa', label: 'QA specialist', icon: 'shield', description: 'Test the workflows, integrations and releases that your people depend on.', skills: ['Regression testing', 'Integration testing', 'Release validation'], work: 'Test scenarios, defect reporting, regression checks and user acceptance support.' },
  { id: 'integration', label: 'Cloud or integration specialist', icon: 'nodes', description: 'Discuss a specific product or connected-system requirement beyond a general role.', skills: ['Product experience', 'Data mapping', 'Connected workflows'], work: 'Cloud-specific configuration, interfaces and migration support. Sourcing fit is confirmed against your brief.' },
];

export const salesforceSituations = [
  ['workflow', 'A growing backlog', 'Add development or admin capacity while your internal team keeps setting priorities.'],
  ['nodes', 'A specialist skill gap', 'Match the role to a particular cloud, integration or technical challenge.'],
  ['chart', 'A release or migration ahead', 'Discuss extra capacity for a defined milestone and working period.'],
  ['people', 'A vacancy or planned absence', 'Support continuity while you address the longer-term team requirement.'],
];

export const salesforceClouds = [
  { name: 'Sales Cloud', icon: 'chart', description: 'Lead, account and opportunity workflows.', intro: 'Hire a Salesforce Sales Cloud developer for custom sales workflows, components and connected systems.', roles: 'Administrator, developer or functional consultant', tasks: ['Lead and opportunity configuration', 'Pipeline reports and automation', 'Connected sales workflows'] },
  { name: 'Service Cloud', icon: 'message', description: 'Case management and service journeys.', intro: 'Hire a Salesforce Service Cloud developer to support case workflows, service interfaces and integrations.', roles: 'Consultant, developer or QA specialist', tasks: ['Case routing and service processes', 'Knowledge and support experiences', 'Workflow and integration testing'] },
  { name: 'Experience Cloud', icon: 'globe', description: 'Customer and partner digital experiences.', roles: 'Developer, architect or QA specialist', tasks: ['Portal components and user journeys', 'Access and sharing design', 'Connected customer workflows'] },
  { name: 'Commerce Cloud / Demandware', icon: 'globe', description: 'Storefronts and connected commerce journeys.', intro: 'Hire Salesforce Commerce Cloud developers for storefront and integration work. If you need to hire Demandware developers, specify your B2C Commerce environment and storefront architecture.', roles: 'Commerce developer or integration specialist', tasks: ['Storefront features and customer journeys', 'Connections to catalog, order and business systems', 'Scope B2B and B2C product experience separately'] },
  { name: 'Marketing Cloud', icon: 'message', description: 'Marketing journeys and connected customer data.', intro: 'Hire a Salesforce Marketing Cloud developer for the product and edition your team uses. Define the journey, data and integration responsibilities before matching.', roles: 'Product specialist; availability confirmed during sourcing', tasks: ['Confirm the exact marketing product and edition', 'Describe journeys, content and data connections', 'Agree the required platform-specific experience'] },
  { name: 'Account Engagement / Pardot', icon: 'workflow', description: 'B2B marketing automation and CRM connections.', intro: 'Hire Pardot developers for Account Engagement requirements such as forms, landing pages and CRM-connected automation. Include the existing setup and integration scope in your brief.', roles: 'Account Engagement specialist', tasks: ['Forms, landing pages and connected data', 'Automation and lead handoff requirements', 'Account Engagement is the product formerly known as Pardot'] },
  { name: 'Salesforce CPQ', icon: 'layers', description: 'Support for an existing CPQ managed package.', intro: 'Hire a Salesforce CPQ developer to work on an existing quoting environment. Specify the package and scope; CPQ managed-package experience and Revenue Cloud experience are assessed separately.', roles: 'CPQ developer or functional specialist', tasks: ['Existing product, pricing and quote configuration', 'Customisation, integration and regression checks', 'Confirm the installed product before defining the role'] },
  { name: 'AppExchange / AgentExchange', icon: 'document', description: 'Application, packaging and marketplace work.', intro: 'Hire AppExchange developers for app and managed-package work, including applications distributed through AgentExchange. Agree the development, packaging and review-support responsibilities.', roles: 'Application developer or technical architect', tasks: ['Application features and package maintenance', 'Integration and release requirements', 'Marketplace review preparation within the agreed scope'] },
  { name: 'Platform & integrations', icon: 'nodes', description: 'Custom applications and connected systems.', roles: 'Developer, architect or integration specialist', tasks: ['Apex, LWC and API integration', 'Data mapping and migration support', 'Testing and deployment practices'] },
];

export const salesforceTechnicalSkills = [
  { title: 'Apex development', icon: 'code', description: 'Hire a Salesforce Apex developer for business logic, bulk processing and testable platform changes.' },
  { title: 'Lightning development', icon: 'layers', description: 'Hire Salesforce Lightning developers to build and maintain Lightning Web Components around your users’ workflows.' },
  { title: 'APIs and integrations', icon: 'nodes', description: 'Hire Salesforce API developers to connect business systems, map data and handle integration failures.' },
  { title: 'Legacy development', icon: 'document', description: 'Hire Visualforce developers to maintain existing pages and controllers. For legacy platform work, hire a Force.com developer familiar with your application and modernisation needs.' },
  { title: 'Flow and configuration', icon: 'workflow', description: 'Discuss automation, permissions and reporting changes with professionals matched to your organisation and review standards.' },
  { title: 'Testing and release practices', icon: 'shield', description: 'Define the unit tests, regression checks, deployment tools and documentation needed for your delivery process.' },
];

export const salesforceAssessment = [
  ['Experience and credentials', 'Review comparable responsibilities and project history. Agree which certifications need verification for the role.'],
  ['Practical role fit', 'Define a relevant discussion, scenario or task with your team before the search begins.'],
  ['Technical judgement', 'Discuss comparable work, the decisions made and the tradeoffs behind the approach.'],
  ['Communication and collaboration', 'Assess how candidates explain their work, handle feedback and operate in a shared delivery process.'],
  ['Your interview and approval', 'Review the shortlist, conduct your own interviews and choose who joins your team.'],
];

export const salesforceAssessmentFocus = [
  ['Developer', 'Bulk-safe Apex, component design, API failures and test coverage.'],
  ['Administrator', 'Access rules, a Flow scenario, reporting and troubleshooting.'],
  ['Architect', 'Design tradeoffs, integration patterns, security and maintainability.'],
  ['QA specialist', 'Risk-based scenarios, regression coverage and release evidence.'],
];

export const salesforceModels = [
  { number: '01', title: 'Dedicated professional', fit: 'Sustained delivery or administration work.', points: ['One role with an agreed allocation', 'Defined working hours and reporting', 'Billing and minimum term confirmed in the quote'] },
  { number: '02', title: 'Part-time specialist', fit: 'Recurring work below a full-time allocation.', points: ['Discuss the hours and specialist availability', 'Agree scheduling and response expectations', 'Confirm the allocation before work begins'] },
  { number: '03', title: 'Multiple professionals', fit: 'Several skills within a client-led team.', points: ['A role mix matched to your backlog', 'Clear responsibilities for each person', 'Agreed coordination and capacity-change terms'] },
];

export const salesforceSteps = [
  { title: 'Define', client: 'Share the role, skills, hours, duration and budget.', ething: 'Clarify the brief and confirm sourcing feasibility.' },
  { title: 'Review', client: 'Review relevant experience and assessment information.', ething: 'Coordinate profiles against the agreed requirement.' },
  { title: 'Select', client: 'Interview candidates and approve your selection.', ething: 'Arrange discussions and confirm availability.' },
  { title: 'Onboard', client: 'Set up access, priorities and team introductions.', ething: 'Coordinate the agreement and working arrangements.' },
  { title: 'Support', client: 'Give feedback and accept completed work.', ething: 'Coordinate agreed check-ins, changes and handovers.' },
];

export const salesforcePractices = [
  ['Confidentiality and IP', 'Agree confidentiality and ownership requirements in the engagement documentation before access or work begins.'],
  ['System access and approvals', 'Your team approves access and applies its security policies. Grant the permissions needed for the role and review them as work changes.'],
  ['Code and documentation', 'Agree the repositories, documentation tools, review standards and handover materials your team will use.'],
  ['Working-hour overlap', 'Specify your time zone and required overlap. Confirm each professional’s working arrangement before selection.'],
  ['Support and escalation', 'Set out the support contact, communication channel, responsibilities and review cadence in the engagement plan.'],
  ['Absence, replacement and handover', 'Agree notification, replacement eligibility, any charges and knowledge-transfer steps in advance. The engagement terms govern how support applies.'],
];

export const salesforceFaqGroups = [
  { title: 'Hiring', items: [
    ['Which roles can we hire?', 'Discuss developers, administrators, architects, functional consultants, QA specialists or a particular cloud or integration role. We confirm the precise skills and sourcing feasibility against your requirement.'],
    ['Can I start with one administrator?', 'Yes. Start with the administration work, required allocation and working hours. A broader role mix can be discussed if your team also needs development or testing support.'],
    ['How does eThing assess professionals?', 'We align screening with the agreed role, relevant experience and communication needs. Role-specific checks and interview stages are agreed before the search; your team can add its own technical assessment.'],
    ['Can our team conduct technical interviews?', 'Yes. You can review the proposed experience, conduct technical interviews and approve the person before the engagement starts.'],
    ['How quickly can I hire Salesforce developers?', 'We discuss a realistic shortlist timeline after understanding the role and specialist requirements. Profile sharing, your interviews and the actual start date are separate stages; availability and onboarding determine when work can begin.'],
    ['What determines the actual start date?', 'Candidate availability, interviews, agreement completion, working hours and your access or onboarding checks determine the start date. Confirm it before work begins.'],
  ] },
  { title: 'Working together', items: [
    ['Can I hire a remote developer?', 'Yes. Share your time zone, required working-hour overlap and collaboration tools. We use those requirements in matching and confirm the remote arrangement with the proposed professional before selection.'],
    ['Who manages their daily work?', 'Your team owns backlog priorities, daily technical direction, system approvals and acceptance. eThing coordinates the staffing and engagement support agreed with you.'],
    ['How are confidentiality, IP and handover handled?', 'Agree these requirements before work starts, including confidentiality, ownership, access, repositories and handover documentation. The engagement plan defines responsibilities and support.'],
  ] },
  { title: 'Commercial terms', items: [
    ['How much do Salesforce staff augmentation services cost?', 'Seniority, specialist skills, allocation, working location, overlap and duration affect the quote. Minimum commitment, billing, notice and any conversion fees are confirmed in the proposed terms before you decide.'],
    ['What happens if the professional is not the right fit?', 'Raise the concern through the agreed support contact. Replacement eligibility, applicable period, fees and handover arrangements are explained in the engagement terms before work starts.'],
    ['Can I hire developers on contract?', 'Yes. Discuss the role, allocation and intended duration with us. The proposed terms set out billing, minimum commitment, notice, capacity changes and any handover or replacement conditions before work starts.'],
  ] },
];

const salesforcePracticeQuestions = [
  'How are confidentiality and intellectual property handled?',
  'How is system access approved?',
  'How are code and documentation managed?',
  'What working-hour overlap should we agree on?',
  'How do support and escalation work?',
  'What happens during absence, replacement or handover?',
];

export const salesforceFaqs = [
  ...salesforceFaqGroups.flatMap(group => group.items)
    .filter(([question]) => question !== 'How are confidentiality, IP and handover handled?'),
  ...salesforcePractices.map(([, answer], index) => [salesforcePracticeQuestions[index], answer]),
];
