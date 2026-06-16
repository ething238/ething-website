import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import IndustryDetailPage from './pages/IndustryDetailPage.jsx'
import StaffingServices from './pages/StaffingServices.jsx'
import EngineeringServices from './pages/EngineeringServices.jsx'
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
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home content={siteContent} />} />
        <Route path="/about_us" element={<About content={siteContent} />} />
        {siteContent.pages.industryPages.map((page) => (
          <Route
            key={page.path}
            path={page.path.replace(/^\//, '')}
            element={<IndustryDetailPage content={siteContent} />}
          />
        ))}
        <Route path="/staffing_services" element={<StaffingServices content={siteContent} />} />
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
        {siteContent.pages.engineeringPages.map((page) => (
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
