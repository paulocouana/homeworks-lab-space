import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ClientDashboard from '@/components/ClientDashboard';
import OwnerDashboard from '@/components/OwnerDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">{t('dashboard.loading')}</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>{t('dashboard.loadingProfile')}</div>
      </div>
    );
  }

  switch (profile.user_type) {
    case 'owner':
      return <OwnerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'client':
    default:
      return <ClientDashboard />;
  }
};

export default Dashboard;