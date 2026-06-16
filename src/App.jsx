import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Public site
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'

// Admin
import { AuthProvider } from './admin/contexts/AuthContext'
import ProtectedRoute from './admin/components/ProtectedRoute'
import AdminLayout from './admin/layouts/AdminLayout'
import LoginPage from './admin/pages/LoginPage'
import DashboardPage from './admin/pages/DashboardPage'
import AdminProjectsPage from './admin/pages/ProjectsPage'
import ProjectFormPage from './admin/pages/ProjectFormPage'
import AdminGalleryPage from './admin/pages/GalleryPage'
import EnquiriesPage from './admin/pages/EnquiriesPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="projects/new" element={<ProjectFormPage />} />
            <Route path="projects/:id/edit" element={<ProjectFormPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="enquiries" element={<EnquiriesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
