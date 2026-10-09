const healthcareDeliveryContent = {
  hero: {
    src: '/healthcare/healthcare-it-utopia.png',
    width: 1672,
    height: 941,
    alt: 'Concept illustration of a future hospital bringing together clinical teams, connected software and surgical technology',
    subtitle: 'Connecting clinical workflows, intelligent software and medical technology.',
  },
  audiences: {
    heading: 'How eThing helps healthcare teams',
    intro: 'Whether you run a hospital, build a health app or develop medical devices, we help you plan, build and test the software your team needs.',
    cards: [
      { title: 'Connect your hospital systems', body: 'For hospitals and clinics, we connect patient records, orders and test results with the applications staff use every day. eThing helps your team find the information it needs in the systems it already uses.' },
      { title: 'Build apps for patients and staff', body: 'For healthtech companies, we build apps for patients and healthcare professionals and improve existing products. We help with screen design, development and connections to the systems your users already rely on.' },
      { title: 'Improve your device software', body: 'For medical device teams, we build clear screens for diagnostic equipment and surgical appliances. We help display device status, connect equipment to applications and test how the software handles everyday tasks and errors.' },
    ],
  },
  sectionExtensions: {
    'integration-services': [
      'We build HL7 v2 interfaces for admissions, transfers, orders and results, alongside FHIR APIs for structured information exchange. Our interface design accounts for the receiving system’s version, profiles, terminology and implementation guide. We map fields explicitly and test acknowledgements, duplicate messages, missing values and recovery before deployment.',
    ],
    'surgical-ui': [
      'For surgical appliances with software components, we build instrument-status displays, service logs and interfaces for navigation or powered equipment. Clear alerts, readable controls and documented failure behaviour help teams evaluate how the software fits the intended workflow.',
    ],
  },
};

export default healthcareDeliveryContent;
