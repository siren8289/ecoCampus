import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { RoomDetail } from './pages/room-detail/RoomDetail';
import { SystemMonitor } from './pages/system-monitor/SystemMonitor';
import { AdminSettings } from './pages/admin-settings/AdminSettings';
import { Admin } from './pages/admin/Admin';
import { NotFound } from './pages/not-found/NotFound';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/room/:id" element={<RoomDetail />} />
          <Route path="/system" element={<SystemMonitor />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}