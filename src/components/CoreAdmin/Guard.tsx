import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCoreAdmin } from '../../contexts/CoreAdminContext';
import NotFound from '../NotFound';

interface CoreAdminGuardProps {
  children: React.ReactNode;
}

export default function CoreAdminGuard({ children }: CoreAdminGuardProps) {
  const { isAuthenticated, isLoading } = useCoreAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mono-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mono-900"></div>
      </div>
    );
  }

  // 認証されていない場合は404を表示
  if (!isAuthenticated) {
    return <NotFound />;
  }

  return <>{children}</>;
}