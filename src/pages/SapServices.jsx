// Approved SAP page, integrated without a second React or analytics bootstrap.
import * as react from 'react';
import * as jsx_runtime from 'react/jsx-runtime';
import { Helmet as ReviewHead } from 'react-helmet-async';
import '../styles/about-us.css';
import '../styles/footer-brand.css';
import '../styles/sap-services.css';
import CopyHeader from '../components/SiteHeader.jsx';
import { CopyFooter, CopyBackToTop } from '../components/website-development/Chrome.jsx';
import SapEnquiryForm from '../components/sap-services/SapEnquiryForm.jsx';
import { enhanceSapMotion } from '../components/sap-services/motion.js';
import { sapSituations, sapServices, sapExpertise, sapRoles, sapEngagements, sapProcess, sapFAQs, sapRequirementTypes } from '../data/sapContent.js';

const sapSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.ethingsolutions.com/sap-services#webpage",
      "url": "https://www.ethingsolutions.com/sap-services",
      "name": "SAP Staffing & Staff Augmentation Services | eThing",
      "description": "SAP staffing services and SAP staff augmentation from eThing. Hire SAP consultants and developers for functional, technical and contract staffing needs."
    },
    {
      "@type": "Service",
      "name": "SAP Staff Augmentation Services",
      "serviceType": "SAP staffing services",
      "url": "https://www.ethingsolutions.com/sap-services",
      "provider": {
        "@type": "Organization",
        "name": "eThing",
        "url": "https://www.ethingsolutions.com/"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.ethingsolutions.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "SAP Staffing Services",
          "item": "https://www.ethingsolutions.com/sap-services"
        }
      ]
    }
  ]
};
function Icon({ kind, size = 24 }) {
    const paths = {
        arrow: jsx_runtime.jsx("path", {
            d: "M5 19 19 5M5 5h14v14"
        }),
        check: jsx_runtime.jsxs(jsx_runtime.Fragment, {
            children: [
                jsx_runtime.jsx("path", {
                    d: "m5 12 4 4L19 6"
                }),
                jsx_runtime.jsx("path", {
                    d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10"
                })
            ]
        }),
        people: jsx_runtime.jsxs(jsx_runtime.Fragment, {
            children: [
                jsx_runtime.jsx("circle", {
                    cx: "9",
                    cy: "7",
                    r: "3"
                }),
                jsx_runtime.jsx("path", {
                    d: "M3 21v-4a6 6 0 0 1 12 0v4m2-17a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5v2"
                })
            ]
        }),
        layers: jsx_runtime.jsx(jsx_runtime.Fragment, {
            children: jsx_runtime.jsx("path", {
                d: "m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5"
            })
        }),
        code: jsx_runtime.jsx("path", {
            d: "m8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20"
        }),
        connect: jsx_runtime.jsxs(jsx_runtime.Fragment, {
            children: [
                jsx_runtime.jsx("rect", {
                    x: "8",
                    y: "8",
                    width: "8",
                    height: "8",
                    rx: "2"
                }),
                jsx_runtime.jsx("path", {
                    d: "M12 2v6m0 8v6M2 12h6m8 0h6M4 4l4 4m8 8 4 4M20 4l-4 4M8 16l-4 4"
                })
            ]
        }),
        shield: jsx_runtime.jsxs(jsx_runtime.Fragment, {
            children: [
                jsx_runtime.jsx("path", {
                    d: "m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"
                }),
                jsx_runtime.jsx("path", {
                    d: "m8 12 3 3 5-6"
                })
            ]
        }),
        plan: jsx_runtime.jsxs(jsx_runtime.Fragment, {
            children: [
                jsx_runtime.jsx("rect", {
                    x: "4",
                    y: "4",
                    width: "16",
                    height: "18",
                    rx: "2"
                }),
                jsx_runtime.jsx("path", {
                    d: "M8 2v4m8-4v4M8 11h8m-8 5h5"
                })
            ]
        }),
        pin: jsx_runtime.jsxs(jsx_runtime.Fragment, {
            children: [
                jsx_runtime.jsx("path", {
                    d: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"
                }),
                jsx_runtime.jsx("circle", {
                    cx: "12",
                    cy: "10",
                    r: "3"
                })
            ]
        })
    };
    return jsx_runtime.jsx("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.6",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: paths[kind] || paths.arrow
    });
}
function SectionHead({ title, children, light = false }) {
    return jsx_runtime.jsxs("div", {
        className: `sap-section-head${light ? ' sap-head-light' : ''}`,
        "data-sap-reveal": true,
        children: [
            jsx_runtime.jsx("h2", {
                children: title
            }),
            children && jsx_runtime.jsx("p", {
                className: "sap-section-intro",
                children: children
            })
        ]
    });
}
/* SAP_ROLE_EXPLORER_START */
const sapRoleCategories = [{"id": "functional", "title": "Functional Consulting"}, {"id": "development", "title": "Development & Integration"}, {"id": "platform", "title": "Platform & Data"}, {"id": "support", "title": "Testing & Project Support"}];
/* The role panel shares the page's React state and original role data. */
function SapRoleExplorer() {
    const h = react.createElement;
    const [selected, setSelected] = react.useState(0);
    const menu = react.useRef(null);
    const activeCategory = sapRoles[selected].category;
    const members = sapRoles.map((item,index) => ({item,index})).filter(({item}) => item.category === activeCategory);
    const visibleCount = Math.min(3, members.length);
    const first = Math.min(members.findIndex(({index}) => index === selected), members.length - visibleCount);
    const visible = new Set(members.slice(first, first + visibleCount).map(({index}) => index));
    const label = item => item.title.replace(/^Hire /, '');
    const handleKey = (event, index) => {
        const current = members.findIndex(member => member.index === index);
        let next = current;
        if (event.key === 'ArrowDown') next = Math.min(current + 1, members.length - 1);
        else if (event.key === 'ArrowUp') next = Math.max(current - 1, 0);
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = members.length - 1;
        else return;
        event.preventDefault();
        const roleIndex = members[next].index;
        setSelected(roleIndex);
        const button = menu.current.querySelector(`[data-role-index="${roleIndex}"]`);
        button.focus({preventScroll:true});
        button.scrollIntoView({block:'nearest',inline:'nearest'});
    };
    return h('div', {className:'sap-role-explorer' + (visibleCount < 3 ? ' sap-role-explorer-short' : '')},
        h('aside', {className:'sap-role-sidebar'},
            h('div', {className:'sap-role-sidebar-head'},
                h('span', null, 'SAP roles'),
                h('span', {className:'sap-role-count'}, `${sapRoles.length} roles`)),
            h('nav', {className:'sap-role-menu', 'aria-label':'SAP professional roles', ref:menu},
                sapRoleCategories.map(category => {
                    const categoryMembers = sapRoles.map((item,index) => ({item,index})).filter(({item}) => item.category === category.id);
                    const expanded = activeCategory === category.id;
                    return h('div', {className:'sap-role-group' + (expanded ? ' sap-role-group-open' : ''),key:category.id},
                        h('h3', {className:'sap-role-group-heading'}, h('button', {
                            type:'button',className:'sap-role-group-toggle',
                            'aria-expanded':expanded,'aria-controls':`sap-role-group-${category.id}`,
                            onClick:() => setSelected(categoryMembers[0].index)
                        },h('span',null,category.title),h('span',{className:'sap-role-group-count','aria-hidden':'true'},categoryMembers.length),h('span',{className:'sap-role-group-arrow','aria-hidden':'true'},'⌄'))),
                        h('div', {className:'sap-role-group-list',id:`sap-role-group-${category.id}`,hidden:!expanded},
                            categoryMembers.map(({item,index}) => h('button', {
                    key:item.title, type:'button', className:'sap-role-choice',
                    'data-role-index':index, 'aria-pressed':selected === index,
                    'aria-controls':`sap-role-detail-${index}`,
                    onClick:() => setSelected(index),
                    onKeyDown:event => handleKey(event,index)
                },
                    h('span', {className:'sap-role-choice-index', 'aria-hidden':'true'}, String(index + 1).padStart(2,'0')),
                    h('span', {className:'sap-role-choice-name'}, label(item)),
                    h('span', {className:'sap-role-choice-arrow', 'aria-hidden':'true'}, '›')))));
                })),
            h('p', {className:'sap-role-scroll-hint'}, 'Choose a category, then explore its roles')),
        h('div', {className:'sap-roles-grid sap-role-details',style:{'--sap-role-visible-count':visibleCount}, 'aria-label':'SAP role descriptions', 'aria-live':'polite', 'aria-relevant':'additions text'},
            sapRoles.map((item,index) => h('article', {
                key:item.title, id:`sap-role-detail-${index}`,
                className:'sap-role-card' + (selected === index ? ' sap-role-selected' : ''),
                hidden:!visible.has(index),
                'aria-labelledby':`sap-role-heading-${index}`
            },
                h('div', {className:'sap-card-heading'},
                    h('span', {className:'sap-icon'}, h(Icon, {kind:item.icon})),
                    h('h3', {id:`sap-role-heading-${index}`}, item.title)),
                h('p', null, item.text)))));
}

/* SAP_ROLE_EXPLORER_END */
export default function SapServices() {
    const root = react.useRef(null);
    react.useEffect(() => enhanceSapMotion(root.current), []);
    const [selectedNeed, setSelectedNeed] = react.useState(null);
    react.useEffect(()=>{
        if (!root.current || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
        const nodes = root.current.querySelectorAll('[data-sap-reveal]');
        const observer = new IntersectionObserver((entries)=>entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add('sap-is-visible');
                    observer.unobserve(entry.target);
                }
            }), {
            threshold: 0.08
        });
        nodes.forEach((node)=>{
            if (node.getBoundingClientRect().top > window.innerHeight) {
                node.classList.add('sap-will-reveal');
                observer.observe(node);
            }
        });
        return ()=>{
            observer.disconnect();
            nodes.forEach((node)=>node.classList.remove('sap-will-reveal'));
        };
    }, []);
    const selectNeed = (type)=>setSelectedNeed({
            type
        });
    return jsx_runtime.jsxs("div", {
        className: "about-us-copy sap-page sap-has-js",
        ref: root,
        children: [
            jsx_runtime.jsxs(ReviewHead, {
                children: [
                    jsx_runtime.jsx('link', {rel:'canonical',href:'https://www.ethingsolutions.com/sap-services'}),
                    jsx_runtime.jsx('meta', {property:'og:url',content:'https://www.ethingsolutions.com/sap-services'}),
                    jsx_runtime.jsx('link', {rel:'icon',type:'image/png',href:'/sap-services/ething-icon-48.png'}),
                    jsx_runtime.jsx('script', {type:'application/ld+json',children:JSON.stringify(sapSchema)}),
                    jsx_runtime.jsx("title", {
                        children: "SAP Staffing & Staff Augmentation Services | eThing"
                    }),
                    jsx_runtime.jsx("meta", {
                        name: "description",
                        content: "SAP staffing services and SAP staff augmentation from eThing. Hire SAP consultants and developers for functional, technical and contract staffing needs."
                    }),
                    jsx_runtime.jsx("meta", {
                        name: "robots",
                        content: "index, follow"
                    }, "robots"),
                    jsx_runtime.jsx("meta", {
                        property: "og:title",
                        content: "SAP Staffing & Staff Augmentation Services | eThing"
                    }),
                    jsx_runtime.jsx("meta", {
                        property: "og:description",
                        content: "SAP staffing services and SAP staff augmentation from eThing. Hire SAP consultants and developers for functional, technical and contract staffing needs."
                    }),
                    jsx_runtime.jsx("meta", {
                        property: "og:type",
                        content: "website"
                    })
                ]
            }),
            jsx_runtime.jsx("a", {
                className: "sap-skip",
                href: "#sap-main",
                children: "Skip to content"
            }),
            jsx_runtime.jsx(CopyHeader, {
                activePath: "/sap-services",
                contactHref: "#sap-enquiry",
                optimizeMedia: true
            }),
            jsx_runtime.jsxs("main", {
                id: "sap-main",
                children: [
                    jsx_runtime.jsx("section", {
                        className: "sap-hero",
                        "aria-labelledby": "sap-title",
                        children: jsx_runtime.jsxs("div", {
                            className: "sap-container sap-hero-grid",
                            children: [
                                jsx_runtime.jsxs("div", {
                                    className: "sap-hero-copy",
                                    children: [
                                        jsx_runtime.jsx("h1", {
                                            id: "sap-title",
                                            children: "SAP Staff Augmentation Services"
                                        }),
                                        jsx_runtime.jsx("p", {
                                            className: "sap-hero-description",
                                            children: "Build your team with SAP staffing services from eThing. Our SAP staff augmentation approach connects your requirements with functional and technical SAP consultants, developers and project specialists working under your direction."
                                        }),
                                        null,
                                        jsx_runtime.jsxs("ul", {
                                            className: "sap-hero-benefits",
                                            children: [
                                                jsx_runtime.jsxs("li", {
                                                    children: [
                                                        jsx_runtime.jsx(Icon, {
                                                            kind: "check",
                                                            size: 16
                                                        }),
                                                        "Role-specific requirements"
                                                    ]
                                                }),
                                                jsx_runtime.jsxs("li", {
                                                    children: [
                                                        jsx_runtime.jsx(Icon, {
                                                            kind: "check",
                                                            size: 16
                                                        }),
                                                        "Client-led interviews"
                                                    ]
                                                }),
                                                jsx_runtime.jsxs("li", {
                                                    children: [
                                                        jsx_runtime.jsx(Icon, {
                                                            kind: "check",
                                                            size: 16
                                                        }),
                                                        "Clear responsibilities"
                                                    ]
                                                })
                                            ]
                                        }),
null,
                                        null
                                    ]
                                }),
                                jsx_runtime.jsx("div", {
                                    id: "sap-enquiry",
                                    className: "sap-enquiry-anchor",
                                    children: jsx_runtime.jsx(SapEnquiryForm, {
                                        selectedNeed: selectedNeed
                                    })
                                })
                            ]
                        })
                    }),
                    null,
                    jsx_runtime.jsx("section", {
                        className: "sap-section",
                        id: "sap-situations",
                        children: jsx_runtime.jsxs("div", {
                            className: "sap-container",
                            children: [
                                jsx_runtime.jsx(SectionHead, {
                                    title: "Support For Your SAP Team",
                                    children: "Start with the work ahead. Shape the requirement around your business, your system landscape and the people already involved."
                                }),
                                jsx_runtime.jsx("div", {
                                    className: "sap-situations",
                                    children: sapSituations.map((item, i)=>jsx_runtime.jsxs("article", {
                                            "data-sap-reveal": true,
                                            style: {
                                                '--sap-delay': `${i * 55}ms`
                                            },
                                            children: [
                                                jsx_runtime.jsxs("div", {
                                                    className: "sap-card-heading",
                                                    children: [
                                                        jsx_runtime.jsx("span", {
                                                            className: "sap-icon",
                                                            children: jsx_runtime.jsx(Icon, {
                                                                kind: item.icon
                                                            })
                                                        }),
                                                        jsx_runtime.jsx("h3", {
                                                            children: item.title
                                                        })
                                                    ]
                                                }),
                                                jsx_runtime.jsx("p", {
                                                    children: item.text
                                                })
                                            ]
                                        }, item.title))
                                })
                            ]
                        })
                    }),
                    jsx_runtime.jsx("section", {
                        className: "sap-section sap-wash",
                        id: "sap-services",
                        children: jsx_runtime.jsxs("div", {
                            className: "sap-container",
                            children: [
                                jsx_runtime.jsx(SectionHead, {
                                    title: "SAP Staffing Services",
                                    children: "Our SAP staffing services help you add a contract professional, a dedicated team or specialist capacity for development, integration and testing, with scope agreed around your requirement."
                                }),
                                jsx_runtime.jsx("div", {
                                    className: "sap-services-grid",
                                    children: sapServices.map((item, i)=>jsx_runtime.jsxs("article", {
                                            className: "sap-service-card",
                                            "data-sap-reveal": true,
                                            children: [
                                                jsx_runtime.jsxs("div", {
                                                    className: "sap-card-heading",
                                                    children: [
                                                        jsx_runtime.jsx("span", {
                                                            className: "sap-icon",
                                                            children: jsx_runtime.jsx(Icon, {
                                                                kind: item.icon
                                                            })
                                                        }),
                                                        jsx_runtime.jsx("h3", {
                                                            children: item.title
                                                        })
                                                    ]
                                                }),
                                                jsx_runtime.jsx("p", {
                                                    children: item.text
                                                }),
                                                jsx_runtime.jsx("ul", {
                                                    children: item.items.map((text)=>jsx_runtime.jsxs("li", {
                                                            children: [
                                                                jsx_runtime.jsx("span", {
                                                                    "aria-hidden": "true",
                                                                    children: "✓"
                                                                }),
                                                                text
                                                            ]
                                                        }, text))
                                                }),
                                                null
                                            ]
                                        }, item.title))
                                })
                            ]
                        })
                    }),
                    jsx_runtime.jsx("section", {
                        className: "sap-section sap-expertise",
                        id: "sap-expertise",
                        children: jsx_runtime.jsxs("div", {
                            className: "sap-container sap-expertise-layout",
                            children: [
                                jsx_runtime.jsx("figure", {
                                    className: "sap-landscape",
                                    "data-sap-reveal": true,
                                    children: jsx_runtime.jsxs("picture", {
                                        children: [
                                            jsx_runtime.jsx("source", {
                                                media: "(max-width: 1023px)",
                                                srcSet: "/sap-services/sap-diagram-f3d916f7f7d2.svg"
                                            }),
                                            jsx_runtime.jsx("img", {
                                                src: "/sap-services/sap-diagram-827c7405cf4b.svg",
                                                width: "600",
                                                height: "620",
                                                alt: "Finance, supply chain, people and operations linked to a central enterprise platform, with integration and access layers.",
                                                loading: "lazy"
                                            })
                                        ]
                                    })
                                }),
                                jsx_runtime.jsxs("div", {
                                    className: "sap-expertise-copy",
                                    children: [
                                        jsx_runtime.jsx(SectionHead, {
                                            title: "SAP Expertise",
                                            children: "Use these areas to describe the skills you need. We’ll discuss the relevant modules, releases and project experience before confirming a match."
                                        }),
                                        jsx_runtime.jsx("div", {
                                            className: "sap-expertise-list",
                                            children: sapExpertise.map((item)=>jsx_runtime.jsxs("article", {
                                                    "data-sap-reveal": true,
                                                    children: [
                                                        jsx_runtime.jsx("span", {
                                                            "aria-hidden": "true",
                                                            children: item.code
                                                        }),
                                                        jsx_runtime.jsxs("div", {
                                                            children: [
                                                                jsx_runtime.jsx("h3", {
                                                                    children: item.title
                                                                }),
                                                                jsx_runtime.jsx("p", {
                                                                    children: item.text
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, item.code))
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    jsx_runtime.jsx("section", {
                        className: "sap-section sap-roles",
                        id: "sap-roles",
                        children: jsx_runtime.jsxs("div", {
                            className: "sap-container",
                            children: [
                                jsx_runtime.jsx(SectionHead, {
                                    title: "SAP Professionals You Can Hire",
                                    children: "Hire SAP consultants and technical specialists for clearly defined roles. Review relevant profiles, module experience and working arrangements before choosing the people who join your team."
                                }),
                                jsx_runtime.jsx(SapRoleExplorer, {}),
                                null
                            ]
                        })
                    }),
                    null,
                    jsx_runtime.jsx("section", {
                        className: "sap-section sap-process-section",
                        id: "sap-process",
                        children: jsx_runtime.jsxs("div", {
                            className: "sap-container",
                            children: [
                                jsx_runtime.jsx(SectionHead, {
                                    title: "How We Work",
                                    light: true,
                                    children: "A clear process for hiring, assessing and onboarding professionals. Define the role, review relevant profiles and agree the engagement details before work begins."
                                }),
                                jsx_runtime.jsx("ol", {
                                    className: "sap-process-grid",
                                    children: sapProcess.map((item, i)=>jsx_runtime.jsxs("li", {
                                            "data-sap-reveal": true,
                                            children: [
                                                jsx_runtime.jsxs("div", {
                                                    className: "sap-card-heading",
                                                    children: [
                                                        jsx_runtime.jsxs("span", {
                                                            className: "sap-number-icon",
                                                            "aria-hidden": "true",
                                                            children: [
                                                                "0",
                                                                i + 1
                                                            ]
                                                        }),
                                                        jsx_runtime.jsx("h3", {
                                                            children: item.title
                                                        })
                                                    ]
                                                }),
                                                jsx_runtime.jsx("p", {
                                                    children: item.text
                                                }),
                                                jsx_runtime.jsx("div", {
                                                    className: "sap-output",
                                                    children: item.output
                                                })
                                            ]
                                        }, item.title))
                                })
                            ]
                        })
                    }),
                    jsx_runtime.jsx("section", {
                        className: "sap-section",
                        id: "sap-approach",
                        children: jsx_runtime.jsxs("div", {
                            className: "sap-container sap-approach-grid",
                            children: [
                                jsx_runtime.jsx("figure", {
                                    className: "sap-team-figure",
                                    "data-sap-reveal": true,
                                    children: jsx_runtime.jsxs("picture", {
                                        children: [
                                            jsx_runtime.jsx("source", {
                                                media: "(max-width: 1023px)",
                                                srcSet: "/sap-services/sap-diagram-6491370e87e2.svg"
                                            }),
                                            jsx_runtime.jsx("img", {
                                                src: "/sap-services/sap-diagram-4ddd63f52363.svg",
                                                width: "560",
                                                height: "330",
                                                loading: "lazy",
                                                alt: "A specialist and the client team aligned through shared priorities, feedback and delivery responsibilities."
                                            })
                                        ]
                                    })
                                }),
                                jsx_runtime.jsxs("div", {
                                    className: "sap-approach-copy",
                                    children: [
                                        jsx_runtime.jsx(SectionHead, {
                                            title: "Why eThing",
                                            children: "When comparing SAP staffing companies, look for relevant skills, clear responsibilities and a practical onboarding plan. eThing begins with the work your team needs to do."
                                        }),
                                        jsx_runtime.jsx("div", {
                                            className: "sap-approach-list",
                                            children: [
                                                {
                                                    title: 'The requirement comes first',
                                                    text: 'Discuss the module, project phase, business process and expected contribution before reviewing profiles.'
                                                },
                                                {
                                                    title: 'Experience needs context',
                                                    text: 'Review what a professional actually contributed, including their responsibilities and the environment they worked in.'
                                                },
                                                {
                                                    title: 'Your team stays in control',
                                                    text: 'Keep interviews, technical decisions, priorities and acceptance with the people accountable for your programme.'
                                                },
                                                {
                                                    title: 'Coordination is part of the plan',
                                                    text: 'Agree reporting lines, communication, access and engagement reviews so expectations are visible from the start.'
                                                }
                                            ].map((item, i)=>jsx_runtime.jsxs("article", {
                                                    "data-sap-reveal": true,
                                                    children: [
                                                        jsx_runtime.jsxs("span", {
                                                            "aria-hidden": "true",
                                                            children: [
                                                                "0",
                                                                i + 1
                                                            ]
                                                        }),
                                                        jsx_runtime.jsxs("div", {
                                                            children: [
                                                                jsx_runtime.jsx("h3", {
                                                                    children: item.title
                                                                }),
                                                                jsx_runtime.jsx("p", {
                                                                    children: item.text
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, item.title))
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    null,
                    jsx_runtime.jsx("section", {
                        className: "sap-section sap-faq-section",
                        id: "sap-faq",
                        children: jsx_runtime.jsxs("div", {
                            className: "sap-container",
                            children: [
                                jsx_runtime.jsx(SectionHead, {
                                    title: "Frequently Asked Questions",
                                    children: "The practical details behind roles, responsibilities and getting started."
                                }),
                                jsx_runtime.jsx("div", {
                                    className: "sap-faq-columns",
                                    children: [
                                        sapFAQs.slice(0, 4),
                                        sapFAQs.slice(4)
                                    ].map((column, columnIndex)=>jsx_runtime.jsx("div", {
                                            children: column.map((item, i)=>jsx_runtime.jsxs("details", {
                                                    "data-sap-reveal": true,
                                                    children: [
                                                        jsx_runtime.jsxs("summary", {
                                                            children: [
                                                                jsx_runtime.jsxs("span", {
                                                                    className: "sap-faq-index",
                                                                    children: [
                                                                        "0",
                                                                        columnIndex * 4 + i + 1
                                                                    ]
                                                                }),
                                                                jsx_runtime.jsx("h3", {
                                                                    children: item.question
                                                                }),
                                                                jsx_runtime.jsx("span", {
                                                                    className: "sap-faq-toggle",
                                                                    "aria-hidden": "true",
                                                                    children: "+"
                                                                })
                                                            ]
                                                        }),
                                                        jsx_runtime.jsx("p", {
                                                            children: item.answer
                                                        })
                                                    ]
                                                }, item.question))
                                        }, columnIndex))
                                })
                            ]
                        })
                    }),
                    jsx_runtime.jsx("section", {
                        className: "sap-section sap-final",
                        id: "sap-next-step",
                        children: jsx_runtime.jsxs("div", {
                            className: "sap-container sap-final-grid",
                            children: [
                                jsx_runtime.jsxs("div", {className: "sap-final-copy", "data-sap-reveal": true, children: [jsx_runtime.jsx("h2", {children: "Discuss Your SAP Staffing Needs"}),jsx_runtime.jsx("p", {children: "Tell us the SAP role, modules and project phase, plus your expected duration, start date and preferred working arrangements. We’ll review your brief and discuss suitable staffing options."}),jsx_runtime.jsx("p", {children: "Whether you need one specialist or a team, we’ll coordinate relevant profiles and interviews. Agree the scope, commercial terms, reporting lines and access requirements before onboarding so everyone starts with clear responsibilities."})]}),
                                jsx_runtime.jsxs("div", {
                                    className: "sap-brief-card",
                                    "data-sap-reveal": true,
                                    children: [
                                        jsx_runtime.jsx("ul", {
                                            children: [
                                                'Your SAP environment and project phase',
                                                'The roles, modules and experience you need',
                                                'Expected duration and working-hour overlap',
                                                'Location and preferred working arrangements'
                                            ].map((text, i)=>jsx_runtime.jsxs("li", {
                                                    children: [
                                                        jsx_runtime.jsxs("span", {
                                                            children: [
                                                                "0",
                                                                i + 1
                                                            ]
                                                        }),
                                                        text
                                                    ]
                                                }, text))
                                        }),
                                        jsx_runtime.jsx("p", {
                                            children: "Have a role description? Summarise it in the enquiry form. The team can arrange any document exchange after contact."
                                        }),
jsx_runtime.jsxs("a", {className: "sap-button sap-final-form-link", href: "#sap-enquiry", children: ["Go to enquiry form", jsx_runtime.jsx("svg", {xmlns: "http://www.w3.org/2000/svg", width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false", children: jsx_runtime.jsx("path", {d: "M7 17 17 7M7 7h10v10"})})]})
                                    ]
                                })
                            ]
                        })
                    }),
jsx_runtime.jsx("section", {className: "sap-related", id: "sap-related", "data-ething-related-services": "true", "aria-labelledby": "sap-related-heading", children: jsx_runtime.jsxs("div", {className: "sap-container", children: [jsx_runtime.jsx("h2", {id: "sap-related-heading", children: "Explore Other Services"}),jsx_runtime.jsx("p", {children: "Find the engineering service or hiring option that fits your requirements."}),jsx_runtime.jsx("ul", {className: "sap-related-links", children: [jsx_runtime.jsx("li", {children: jsx_runtime.jsx("a", {href: "https://www.ethingsolutions.com/cloud_services", children: "Cloud engineering services"})}, "https://www.ethingsolutions.com/cloud_services"),jsx_runtime.jsx("li", {children: jsx_runtime.jsx("a", {href: "https://www.ethingsolutions.com/quality_testing", children: "Software testing & QA"})}, "https://www.ethingsolutions.com/quality_testing"),jsx_runtime.jsx("li", {children: jsx_runtime.jsx("a", {href: "https://www.ethingsolutions.com/product_security", children: "Product security"})}, "https://www.ethingsolutions.com/product_security")]})]})})
                ]
            }),
            jsx_runtime.jsx(CopyFooter, {
                activePath: "/sap-services",
                contactHref: "#sap-enquiry",
                preferLiveLinks: true,
                optimizeMedia: true
            }),
            jsx_runtime.jsx(CopyBackToTop, {})
        ]
    });
}
