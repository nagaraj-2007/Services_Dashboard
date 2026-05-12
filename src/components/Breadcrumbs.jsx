import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Don't show breadcrumbs on the dashboard to keep it clean
  if (pathnames.length === 0 || pathnames[0] === 'dashboard') {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
      <Link to="/dashboard" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}><Home size={16}/></Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const title = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

        return (
          <div key={to} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChevronRight size={14} />
            {last ? (
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{title}</span>
            ) : (
              <Link to={to} style={{ color: 'var(--text-secondary)' }}>{title}</Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
