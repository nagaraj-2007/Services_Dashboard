import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="search-bar">
        <Search size={20} color="var(--text-secondary)" />
        <input type="text" placeholder="Search across all modules..." />
      </div>
      
      <div className="topbar-actions">
        <button className="btn-icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="btn-icon">
          <Bell size={20} />
        </button>
        <div className="avatar" onClick={() => navigate('/profile')} title="View Profile">AD</div>
      </div>
    </header>
  );
};

export default Topbar;
