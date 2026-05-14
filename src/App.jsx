import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { NotificationProvider } from './components/NotificationProvider';
import Login from './pages/Login';
import Breadcrumbs from './components/Breadcrumbs';
import Dashboard from './pages/Dashboard';
import AppManagement from './pages/AppManagement';
import NewClient from './pages/NewClient';
import NewApplication from './pages/NewApplication';
import EmployeeManagement from './pages/EmployeeManagement';
import EmployeeDetail from './pages/EmployeeDetail';
import CommandCenter from './pages/SystemMonitor';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AppDashboard from './pages/AppDashboard';
import Accounts from './pages/Accounts';
import AppUsersList from './pages/AppUsersList';
import AppUserDetail from './pages/AppUserDetail';
import ProjectAnalytics from './pages/ProjectAnalytics';
import NewEmployee from './pages/NewEmployee';
import Notifications from './pages/Notifications';
import Announcements from './pages/Announcements';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {!isAuthenticated ? (
        <Login onLogin={setIsAuthenticated} />
      ) : (
        <div className="app-container">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <div className="main-content">
            <Topbar theme={theme} toggleTheme={toggleTheme} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="page-wrapper">
              <Breadcrumbs />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/apps" element={<AppManagement />} />
                <Route path="/apps/new-client" element={<NewClient />} />
                <Route path="/apps/new-app" element={<NewApplication />} />
                <Route path="/apps/:appId/dashboard" element={<AppDashboard />} />
                <Route path="/apps/:appId/analytics" element={<ProjectAnalytics />} />
                <Route path="/apps/:appId/users" element={<AppUsersList />} />
                <Route path="/apps/:appId/users/:userId" element={<AppUserDetail />} />
                <Route path="/employees" element={<EmployeeManagement />} />
                <Route path="/employees/new" element={<NewEmployee />} />
                <Route path="/employees/:id" element={<EmployeeDetail />} />
                <Route path="/command-center" element={<CommandCenter />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div 
              className="sidebar-overlay" 
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
        </div>
      )}
    </NotificationProvider>
  );
}

export default App;
