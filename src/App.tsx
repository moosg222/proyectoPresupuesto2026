import { Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { useAuth } from './hooks/useAuth';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const { session, loading } = useAuth();

  if (loading) return <div className="p-6">Cargando...</div>;
  if (!session) return <AuthPage />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transacciones" element={<TransactionsPage userId={session.user.id} />} />
          <Route path="/categorias" element={<CategoriesPage userId={session.user.id} />} />
          <Route path="/reportes" element={<ReportsPage />} />
          <Route path="/configuracion" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
