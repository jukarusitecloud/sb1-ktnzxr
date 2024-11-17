import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ActivePatients from './components/ActivePatients';
import NewPatientRegistration from './components/NewPatientRegistration';
import PatientChart from './components/PatientChart';
import ChartExport from './components/ChartExport';
import ChartManagement from './components/ChartManagement';
import PatientChartList from './components/ChartManagement/PatientChartList';
import ModificationHistory from './components/ChartManagement/ModificationHistory';
import NavigationBreadcrumb from './components/NavigationBreadcrumb';
import Auth from './components/Auth';
import TherapySettings from './components/Settings/TherapySettings';
import TreatmentTemplates from './components/Settings/TreatmentTemplates';
import ReminderSettings from './components/Settings/ReminderSettings';
import AdminDashboard from './components/Admin/Dashboard';
import AdminSidebar from './components/Admin/Sidebar';
import UserManagement from './components/Auth/UserManagement';
import SecuritySettings from './components/Auth/SecuritySettings';
import PermissionsSettings from './components/Auth/PermissionsSettings';
import StaffManagement from './components/Admin/StaffManagement';
import StaffRegistration from './components/Admin/StaffRegistration';
import StaffEdit from './components/Admin/StaffEdit';
import Contact from './components/Contact';
import CoreAdmin from './components/CoreAdmin';
import CoreAdminLogin from './components/CoreAdmin/Login';
import CoreAdminGuard from './components/CoreAdmin/Guard';
import { useAuth } from './contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AuthenticatedGuard from './components/Auth/AuthenticatedGuard';
import AdminGuard from './components/Auth/AdminGuard';

export default function App() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isCoreAdminRoute = location.pathname.startsWith('/coreadmin');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mono-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mono-900"></div>
      </div>
    );
  }

  // CoreAdmin routes
  if (isCoreAdminRoute) {
    if (location.pathname === '/coreadmin/login') {
      return <CoreAdminLogin />;
    }
    return (
      <CoreAdminGuard>
        <CoreAdmin />
      </CoreAdminGuard>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="flex min-h-screen bg-mono-50">
      {isAdminRoute ? <AdminSidebar /> : <Sidebar />}
      <main className="ml-64 flex-1 flex flex-col">
        <NavigationBreadcrumb />
        <div className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* 通常のルート */}
              <Route path="/" element={<AuthenticatedGuard><Dashboard /></AuthenticatedGuard>} />
              <Route path="/active-patients" element={<AuthenticatedGuard><ActivePatients /></AuthenticatedGuard>} />
              <Route path="/new-registration" element={<AuthenticatedGuard><NewPatientRegistration /></AuthenticatedGuard>} />
              <Route path="/patient/:patientId/chart" element={<AuthenticatedGuard><PatientChart /></AuthenticatedGuard>} />
              <Route path="/chart-export" element={<AuthenticatedGuard><ChartExport /></AuthenticatedGuard>} />
              <Route path="/chart-management" element={<AuthenticatedGuard><ChartManagement /></AuthenticatedGuard>} />
              <Route path="/chart-management/:patientId" element={<AuthenticatedGuard><PatientChartList /></AuthenticatedGuard>} />
              <Route path="/chart-management/history" element={<AuthenticatedGuard><ModificationHistory /></AuthenticatedGuard>} />
              <Route path="/settings/therapy" element={<AuthenticatedGuard><TherapySettings /></AuthenticatedGuard>} />
              <Route path="/settings/templates" element={<AuthenticatedGuard><TreatmentTemplates /></AuthenticatedGuard>} />
              <Route path="/settings/reminders" element={<AuthenticatedGuard><ReminderSettings /></AuthenticatedGuard>} />
              <Route path="/contact" element={<AuthenticatedGuard><Contact /></AuthenticatedGuard>} />
              
              {/* 管理者ルート */}
              <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/users" element={<AdminGuard><UserManagement /></AdminGuard>} />
              <Route path="/admin/staff" element={<AdminGuard><StaffManagement /></AdminGuard>} />
              <Route path="/admin/staff/new" element={<AdminGuard><StaffRegistration /></AdminGuard>} />
              <Route path="/admin/staff/edit/:staffId" element={<AdminGuard><StaffEdit /></AdminGuard>} />
              <Route path="/admin/security" element={<AdminGuard><SecuritySettings /></AdminGuard>} />
              <Route path="/admin/permissions" element={<AdminGuard><PermissionsSettings /></AdminGuard>} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}