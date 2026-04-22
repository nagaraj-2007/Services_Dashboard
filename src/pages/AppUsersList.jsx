import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Mail, Phone, Calendar } from 'lucide-react';

export const dummyUsers = [
  { id: 'U-9821', name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', joined: '2025-10-12', status: 'Active' },
  { id: 'U-7734', name: 'Riya Sharma', email: 'riya.s@example.com', phone: '+91 87654 32109', joined: '2026-01-05', status: 'Active' },
  { id: 'U-5512', name: 'Sanjay Kumar', email: 'sanjay.k@example.com', phone: '+91 76543 21098', joined: '2026-02-18', status: 'Inactive' },
  { id: 'U-1198', name: 'Anita Patel', email: 'anita.p@example.com', phone: '+91 65432 10987', joined: '2026-03-01', status: 'Active' },
];

const AppUsersList = () => {
  const { appId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <button className="btn-icon" onClick={() => navigate(`/apps/${appId}/dashboard`)} style={{ marginTop: 4 }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="page-title">User Directory</h1>
            <p className="page-subtitle">List of registered users for this application domain.</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="search-bar" style={{ width: '300px' }}>
            <Search size={16} color="var(--text-secondary)" />
            <input type="text" placeholder="Search by name, email, or phone..." style={{ fontSize: '0.875rem' }} />
          </div>
          <button className="btn" style={{ border: '1px solid var(--border-color)', gap: 6 }}>
            <Filter size={14} /> Filter 
          </button>
        </div>
        <div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Showing <strong>{dummyUsers.length}</strong> Results</span>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>User Identity (Click to View)</th>
                <th>Contact</th>
                <th>Joined Date</th>
                <th>Account Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map(user => (
                <tr 
                  key={user.id} 
                  onClick={() => navigate(`/apps/${appId}/users/${user.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="avatar" style={{width: 36, height: 36, background: 'var(--primary-color)' }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{user.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} /> {user.email}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}><Phone size={12} /> {user.phone}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}><Calendar size={14} color="var(--text-secondary)" /> {user.joined}</span>
                  </td>
                  <td>
                    <span className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AppUsersList;
