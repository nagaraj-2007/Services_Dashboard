import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { NotificationProvider } from './components/NotificationProvider';
import Dashboard from './pages/Dashboard';
import AppManagement from './pages/AppManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import Attendance from './pages/Attendance';
import EmployeeDetail from './pages/EmployeeDetail';
import CommandCenter from './pages/SystemMonitor';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AppDashboard from './pages/AppDashboard';
import Accounts from './pages/Accounts';
import AppUsersList from './pages/AppUsersList';
import AppUserDetail from './pages/AppUserDetail';
import ProjectAnalytics from './pages/ProjectAnalytics';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [location.pathname, navigate]);

  return (
    <NotificationProvider>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Topbar theme={theme} toggleTheme={toggleTheme} />
          <div className="page-wrapper">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/apps" element={<AppManagement />} />
              <Route path="/apps/:appId/dashboard" element={<AppDashboard />} />
              <Route path="/apps/:appId/analytics" element={<ProjectAnalytics />} />
              <Route path="/apps/:appId/users" element={<AppUsersList />} />
              <Route path="/apps/:appId/users/:userId" element={<AppUserDetail />} />
              <Route path="/employees" element={<EmployeeManagement />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/employees/:id" element={<EmployeeDetail />} />
              <Route path="/command-center" element={<CommandCenter />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
}

export default App;
