import * as react from 'react';
import * as jsx_runtime from 'react/jsx-runtime';
import { sapRequirementTypes } from '../../data/sapContent.js';
import { trackEvent } from '../../lib/tracking.js';
import { leadDeliveryError, submitLeadRequest } from '../website-development/leadDelivery.js';
import { web3formsAccessKey } from '../website-development/web3formsConfig.js';
function track(event) { trackEvent(event, { landing_page: '/sap-services', form_name: 'sap_requirement_enquiry' }); }
function Arrow() {
    return jsx_runtime.jsx("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.6",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: jsx_runtime.jsx("path", {
            d: "M5 19 19 5M5 5h14v14"
        })
    });
}
export default function SapEnquiryForm({ selectedNeed }) {
    const [status, setStatus] = react.useState('idle');
    const [error, setError] = react.useState('');
    const [need, setNeed] = react.useState('');
    const sending = react.useRef(false);
    const started = react.useRef(false);
    const card = react.useRef(null);
    const success = react.useRef(null);
    react.useEffect(()=>{
        if (selectedNeed === null || selectedNeed === void 0 ? void 0 : selectedNeed.type) setNeed(selectedNeed.type);
    }, [
        selectedNeed
    ]);
    react.useEffect(()=>{
        if (!card.current || !('IntersectionObserver' in window)) return undefined;
        const observer = new IntersectionObserver((entries)=>{
            if (entries.some((entry)=>entry.isIntersecting)) {
                track('lead_form_view');
                observer.disconnect();
            }
        }, {
            threshold: 0.15
        });
        observer.observe(card.current);
        return ()=>observer.disconnect();
    }, []);
    react.useEffect(()=>{
        var _success_current;
        if (status === 'success') (_success_current = success.current) === null || _success_current === void 0 ? void 0 : _success_current.focus();
    }, [
        status
    ]);
    async function submit(event) {
        event.preventDefault();
        if (sending.current || status === 'success') return;
        const values = Object.fromEntries([
            ...new FormData(event.currentTarget)
        ].map(([key, value])=>[
                key,
                typeof value === 'string' ? value.trim() : value
            ]));
        if (values.botcheck) return;
        if (!values.name || !values.email || !values.company || !values.phone || !values.requirementType || !values.projectDetails) {
            setStatus('error');
            setError('Please complete all fields: name, work email, company, phone, requirement type and a short brief.');
            return;
        }
        sending.current = true;
        setStatus('loading');
        setError('');
        track('lead_form_submit');
        try {
            const query = new URLSearchParams(window.location.search);
            const attribution = Object.fromEntries([
                'utm_source',
                'utm_medium',
                'utm_campaign',
                'utm_term',
                'utm_content',
                'gclid'
            ].map((key)=>[
                    key,
                    query.get(key) || ''
                ]));
            await submitLeadRequest({
                ...values,
                ...attribution,
                hiringNeed: `SAP staff augmentation — ${values.requirementType}`,
                landingPage: '/sap-services',
                message: `New eThing SAP enquiry\n\nName: ${values.name}\nWork email: ${values.email}\nCompany: ${values.company || 'Not provided'}\nPhone: ${values.phone || 'Not provided'}\nRequirement: ${values.requirementType}\nBrief: ${values.projectDetails}\nSource page: /sap-services`
            });
            setStatus('success');
            track('lead_form_success');
            track('generate_lead');
        } catch (failure) {
            setStatus('error');
            setError(failure.message || leadDeliveryError);
            track('lead_form_error');
        } finally{
            sending.current = false;
        }
    }
    return jsx_runtime.jsx("div", {
        className: "sap-form-card",
        ref: card,
        children: status === 'success' ? jsx_runtime.jsxs("div", {
            className: "sap-form-success",
            role: "status",
            tabIndex: -1,
            ref: success,
            children: [
                jsx_runtime.jsx("span", {
                    "aria-hidden": "true",
                    children: "✓"
                }),
                jsx_runtime.jsx("p", {
                    className: "sap-success-title",
                    children: "Your enquiry has been sent."
                }),
                jsx_runtime.jsx("p", {
                    children: "Thank you. The eThing team will contact you to discuss your SAP requirement and next steps."
                }),
                jsx_runtime.jsx("a", {
                    href: "https://www.ethingsolutions.com/",
                    children: "Explore eThing →"
                })
            ]
        }) : jsx_runtime.jsxs("form", {
            action: "https://api.web3forms.com/submit",
            method: "POST",
            "aria-label": "SAP requirement enquiry",
            onSubmit: submit,
            onInput: ()=>{
                if (!started.current) {
                    started.current = true;
                    track('lead_form_start');
                }
            },
            children: [
                jsx_runtime.jsx("input", {
                    type: "hidden",
                    name: "access_key",
                    value: web3formsAccessKey
                }),
                jsx_runtime.jsx("input", {
                    type: "hidden",
                    name: "subject",
                    value: "New engineering enquiry: SAP staff augmentation"
                }),
                jsx_runtime.jsx("input", {
                    type: "hidden",
                    name: "hiringNeed",
                    value: "SAP staff augmentation"
                }),
                jsx_runtime.jsx("input", {
                    type: "hidden",
                    name: "landingPage",
                    value: "/sap-services"
                }),
                jsx_runtime.jsxs("fieldset", {
                    disabled: status === 'loading',
                    children: [
                        jsx_runtime.jsx("legend", {
                            className: "sap-sr-only",
                            children: "Your contact details and SAP requirement"
                        }),
                        jsx_runtime.jsxs("div", {
                            className: "sap-form-grid",
                            children: [
                                jsx_runtime.jsxs("label", {
                                    htmlFor: "sap-name",
                                    children: [
                                        "Your name ",
                                        jsx_runtime.jsx("span", {
                                            "aria-hidden": "true",
                                            children: "*"
                                        }),
                                        jsx_runtime.jsx("input", {
                                            id: "sap-name",
                                            name: "name",
                                            autoComplete: "name",
                                            required: true,
                                            pattern: ".*\\S.*",
                                            maxLength: 100,
                                            placeholder: "Full name"
                                        })
                                    ]
                                }),
                                jsx_runtime.jsxs("label", {
                                    htmlFor: "sap-email",
                                    children: [
                                        "Work email ",
                                        jsx_runtime.jsx("span", {
                                            "aria-hidden": "true",
                                            children: "*"
                                        }),
                                        jsx_runtime.jsx("input", {
                                            id: "sap-email",
                                            name: "email",
                                            type: "email",
                                            autoComplete: "email",
                                            required: true,
                                            maxLength: 254,
                                            placeholder: "you@company.com"
                                        })
                                    ]
                                }),
                                jsx_runtime.jsxs("label", {
                                    htmlFor: "sap-company",
                                    children: [
                                        "Company ",
                                        jsx_runtime.jsx("span", {
                                            "aria-hidden": "true",
                                            children: "*"
                                        }),
                                        jsx_runtime.jsx("input", {
                                            id: "sap-company",
                                            required: true,
                                            pattern: ".*\\S.*",
                                            name: "company",
                                            autoComplete: "organization",
                                            maxLength: 150,
                                            placeholder: "Company name"
                                        })
                                    ]
                                }),
                                jsx_runtime.jsxs("label", {
                                    htmlFor: "sap-phone",
                                    children: [
                                        "Phone ",
                                        jsx_runtime.jsx("span", {
                                            "aria-hidden": "true",
                                            children: "*"
                                        }),
                                        jsx_runtime.jsx("input", {
                                            id: "sap-phone",
                                            required: true,
                                            pattern: ".*\\S.*",
                                            name: "phone",
                                            type: "tel",
                                            autoComplete: "tel",
                                            maxLength: 40,
                                            placeholder: "With country code"
                                        })
                                    ]
                                }),
                                jsx_runtime.jsxs("label", {
                                    className: "sap-form-wide",
                                    htmlFor: "sap-type",
                                    children: [
                                        "I’m looking for ",
                                        jsx_runtime.jsx("span", {
                                            "aria-hidden": "true",
                                            children: "*"
                                        }),
                                        jsx_runtime.jsxs("select", {
                                            id: "sap-type",
                                            name: "requirementType",
                                            required: true,
                                            value: need,
                                            onChange: (event)=>setNeed(event.target.value),
                                            children: [
                                                jsx_runtime.jsx("option", {
                                                    value: "",
                                                    disabled: true,
                                                    children: "Select your requirement"
                                                }),
                                                sapRequirementTypes.map((type)=>jsx_runtime.jsx("option", {
                                                        children: type
                                                    }, type))
                                            ]
                                        })
                                    ]
                                }),
                                jsx_runtime.jsxs("label", {
                                    className: "sap-form-wide",
                                    htmlFor: "sap-brief",
                                    children: [
                                        "A little about your requirement ",
                                        jsx_runtime.jsx("span", {
                                            "aria-hidden": "true",
                                            children: "*"
                                        }),
                                        jsx_runtime.jsx("textarea", {
                                            id: "sap-brief",
                                            name: "projectDetails",
                                            required: true,
                                            rows: 3,
                                            maxLength: 2048,
                                            placeholder: "Role, SAP environment, modules, duration and preferred working hours…"
                                        })
                                    ]
                                })
                            ]
                        }),
                        jsx_runtime.jsx("div", {
                            className: "sap-honeypot",
                            "aria-hidden": "true",
                            children: jsx_runtime.jsxs("label", {
                                htmlFor: "sap-botcheck",
                                children: [
                                    "Leave empty",
                                    jsx_runtime.jsx("input", {
                                        id: "sap-botcheck",
                                        name: "botcheck",
                                        tabIndex: -1,
                                        autoComplete: "off"
                                    })
                                ]
                            })
                        }),
                        error && jsx_runtime.jsx("p", {
                            className: "sap-form-error",
                            role: "alert",
                            children: error
                        }),
                        jsx_runtime.jsxs("button", {
                            className: "sap-button",
                            type: "submit",
                            children: [
                                status === 'loading' ? 'Sending enquiry…' : "Discuss SAP staffing needs",
                                jsx_runtime.jsx(Arrow, {})
                            ]
                        })
                    ]
                }),
                jsx_runtime.jsxs("p", {
                    className: "sap-privacy",
                    children: [
                        "We’ll use your details to respond to your enquiry. ",
                        jsx_runtime.jsx("a", {
                            href: "https://www.ethingsolutions.com/privacy-policy",
                            children: "Privacy Policy"
                        })
                    ]
                })
            ]
        })
    });
}
