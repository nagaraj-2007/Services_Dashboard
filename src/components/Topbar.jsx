import { Search, Bell, Sun, Moon, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ theme, toggleTheme, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={24} color="var(--text-primary)" />
        </button>
        <div className="search-bar">
          <Search size={20} color="var(--text-secondary)" />
          <input type="text" placeholder="Search across all modules..." />
        </div>
      </div>
      
      <div className="topbar-actions">
        <button className="btn-icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="btn-icon" onClick={() => navigate('/notifications')} style={{ position: 'relative' }}>
          <Bell size={20} />
          <span style={{ 
            position: 'absolute', 
            top: '2px', 
            right: '2px', 
            width: '8px', 
            height: '8px', 
            background: 'var(--danger-color)', 
            borderRadius: '50%',
            border: '2px solid var(--surface-color)'
          }}></span>
        </button>
        <div className="avatar" onClick={() => navigate('/profile')} title="View Profile">AD</div>
      </div>
    </header>
  );
};

export default Topbar;
