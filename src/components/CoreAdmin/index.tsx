import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CoreAdminDashboard from './Dashboard';
import AuditLogs from './AuditLogs';
import CoreAdminSidebar from './Sidebar';

export default function CoreAdmin() {
  return (
    <div className="flex min-h-screen bg-mono-50">
      <CoreAdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <Routes>
          <Route path="/" element={<CoreAdminDashboard />} />
          <Route path="/logs" element={<AuditLogs />} />
          <Route path="*" element={<Navigate to="/coreadmin" replace />} />
        </Routes>
      </main>
    </div>
  );
}