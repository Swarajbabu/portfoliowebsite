import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Portfolio
import Portfolio from './pages/Portfolio';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageHero from './pages/admin/ManageHero';
import ManageSkills from './pages/admin/ManageSkills';
import ManageProjects from './pages/admin/ManageProjects';
import ManageTraining from './pages/admin/ManageTraining';
import ManageCertificates from './pages/admin/ManageCertificates';
import ManageEducation from './pages/admin/ManageEducation';
import ManageContact from './pages/admin/ManageContact';
import ManageResume from './pages/admin/ManageResume';
import ManageAbout from './pages/admin/ManageAbout';
import ManageFooter from './pages/admin/ManageFooter';
import Settings from './pages/admin/Settings';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

function App() {
  const aboutData = useQuery(api.about.get);
  const brandName = aboutData?.brandName || 'Swaraj Vecha';

  useEffect(() => {
    document.title = `${brandName} - Portfolio`;
  }, [brandName]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio - single page with sections */}
          <Route path="/" element={<Portfolio />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Dashboard (protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="hero" element={<ManageHero />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="training" element={<ManageTraining />} />
            <Route path="certificates" element={<ManageCertificates />} />
            <Route path="education" element={<ManageEducation />} />
            <Route path="about" element={<ManageAbout />} />
            <Route path="contact" element={<ManageContact />} />
            <Route path="resume" element={<ManageResume />} />
            <Route path="footer" element={<ManageFooter />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
