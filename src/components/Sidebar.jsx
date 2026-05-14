import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, AppWindow, Users, Settings, Activity, Server, IndianRupee, X, Mail } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Application Hub', path: '/apps', icon: AppWindow },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Communications', path: '/announcements', icon: Mail },
    { name: 'Command Center', path: '/command-center', icon: Activity },
    { name: 'Accounts', path: '/accounts', icon: IndianRupee },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="logo-icon">
            <Server size={28} />
          </div>
          <div className="sidebar-title">Control Hub</div>
        </div>
        <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
          <X size={20} color="var(--text-secondary)" />
        </button>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
