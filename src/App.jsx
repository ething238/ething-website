import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Healthcare from './pages/Healthcare.jsx'
import Aerospace from './pages/Aerospace.jsx'
import IndustryDetailPage from './pages/IndustryDetailPage.jsx'
import StaffingServices from './pages/StaffingServices.jsx'
import SapServices from './pages/SapServices.jsx'
import SalesforceStaffAugmentation from './pages/SalesforceStaffAugmentation.jsx'
import EngineeringServices from './pages/EngineeringServices.jsx'
import WebsiteDevelopment from './pages/WebsiteDevelopment.jsx'
import MobileApplication from './pages/MobileApplication.jsx'
import EngineeringDetailPage from './pages/EngineeringDetailPage.jsx'
import Careers from './pages/Careers.jsx'
import Privacy from './pages/Privacy.jsx'
import Blogs from './pages/Blogs.jsx'
import Contact from './pages/Contact.jsx'
import AiStaffAugmentation from './pages/AiStaffAugmentation.jsx'
import HireDevelopersLanding from './pages/HireDevelopersLanding.jsx'
import VisitorDashboard from './pages/VisitorDashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import VisitTracker from './components/VisitTracker.jsx'
import { siteContent } from './data/siteContent.js'
import { technologyLandingPages } from './data/technologyLandingPages.js'

function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 0)
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function AppRoutes() {
  const { pathname } = useLocation()
  // These shorter content pages already sit inside Layout's full-height shell.
  const compactPage = ['/blogs', '/engineering-services', '/contact'].includes(pathname.replace(/\/$/, ''))
  return (
    <div className={compactPage ? 'min-w-0' : 'min-h-screen'}>
      <Routes>
        <Route path="/" element={<Home content={siteContent} />} />
        <Route path="/about_us" element={<About content={siteContent} />} />
        <Route path="/healthcare_industry" element={<Healthcare />} />
        <Route path="/aerospace_industry" element={<Aerospace />} />
        {siteContent.pages.industryPages.filter((page) => !['/healthcare_industry', '/aerospace_industry'].includes(page.path)).map((page) => (
          <Route
            key={page.path}
            path={page.path.replace(/^\//, '')}
            element={<IndustryDetailPage content={siteContent} />}
          />
        ))}
        <Route path="/staffing_services" element={<StaffingServices content={siteContent} />} />
        <Route path="/sap-services" element={<SapServices />} />
        <Route path="/salesforce-staff-augmentation" element={<SalesforceStaffAugmentation />} />
        <Route path="/ai_staff_augmentation" element={<AiStaffAugmentation content={siteContent} />} />
        {/* Legacy hyphen URL (bookmarks); canonical path matches underscore style like /staffing_services */}
        <Route
          path="/ai-staff-augmentation"
          element={<Navigate to="/ai_staff_augmentation" replace />}
        />
        <Route
          path="/engineering-services"
          element={<EngineeringServices content={siteContent} />}
        />
        <Route path="/website-development" element={<WebsiteDevelopment />} />
        <Route path="/mobile_application" element={<MobileApplication />} />
        {siteContent.pages.engineeringPages.filter((page) => page.path !== '/mobile_application').map((page) => (
          <Route
            key={page.path}
            path={page.path.replace(/^\//, '')}
            element={<EngineeringDetailPage content={siteContent} />}
          />
        ))}
        <Route path="/blogs" element={<Blogs content={siteContent} />} />
        <Route path="/careers" element={<Careers content={siteContent} />} />
        <Route path="/privacy-policy" element={<Privacy content={siteContent} />} />
        <Route path="/contact" element={<Contact content={siteContent} />} />
        <Route path="/hire-developers-india" element={<HireDevelopersLanding />} />
        {Object.values(technologyLandingPages).map(({ meta, content }) => (
          <Route
            key={meta.path}
            path={meta.path}
            element={<HireDevelopersLanding meta={meta} content={content} />}
          />
        ))}
        <Route path="/visitor-dashboard" element={<VisitorDashboard />} />

        <Route path="/about" element={<Navigate to="/about_us" replace />} />
        <Route path="/staffing-services" element={<Navigate to="/staffing_services" replace />} />

        <Route path="*" element={<NotFound content={siteContent} />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <Layout content={siteContent}>
      <VisitTracker />
      <ScrollToTopOnRoute />
      <AppRoutes />
    </Layout>
  )
}
