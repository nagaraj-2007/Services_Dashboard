import { Mail, Phone, MapPin, Building, Calendar, ShieldCheck, Key, LogOut } from 'lucide-react';

const Profile = () => {
  return (
    <>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 className="page-title">Super Admin Profile</h1>
          <p className="page-subtitle">Manage your personal credentials, sessions, and permissions.</p>
        </div>
        <button className="btn badge-danger" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <LogOut size={16} /> Secure Logout
        </button>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: 'minmax(300px, 350px) 1fr' }}>
        {/* Left Column - ID Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(135deg, var(--primary-color), #a855f7)' }} />
          <div style={{
            width: 120, height: 120, borderRadius: '50%', background: 'var(--surface-color)', position: 'relative', marginTop: 30, marginBottom: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 700, color: 'var(--primary-color)',
            boxShadow: 'var(--shadow-md)', border: '4px solid var(--surface-color)'
          }}>
            AD
          </div>
          <h2 style={{ marginBottom: '0.25rem', fontSize: '1.5rem' }}>Admin Director</h2>
          <div className="badge badge-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: '1.5rem' }}>
            <ShieldCheck size={14} /> Super Admin
          </div>

          <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <Building size={16} color="var(--text-secondary)" />
              <span style={{ fontWeight: 500 }}>Company Executive Board</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <Mail size={16} color="var(--text-secondary)" />
              <span style={{ fontWeight: 500 }}>admin@controlhub.io</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <Phone size={16} color="var(--text-secondary)" />
              <span style={{ fontWeight: 500 }}>+91 98765 43210</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <MapPin size={16} color="var(--text-secondary)" />
              <span style={{ fontWeight: 500 }}>Bangalore, India HQ</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <Calendar size={16} color="var(--text-secondary)" />
              <span style={{ fontWeight: 500 }}>Joined: Jan 15, 2023</span>
            </div>
          </div>
        </div>

        {/* Right Column - Audit & Auth */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card">
            <h3 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key size={18} color="var(--primary-color)" /> Credential Management
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Current Password</label>
                <input type="password" placeholder="••••••••" style={{ width: '100%', maxWidth: 300, padding: '0.5rem', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: 300 }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>New Password</label>
                  <input type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: 300 }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Confirm Password</label>
                  <input type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: 'fit-content', marginTop: '0.5rem' }}>Update Password</button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>Recent Active Sessions</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Device</th>
                    <th>Location & IP</th>
                    <th>Sign In Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>MacBook Pro</strong> (Chrome)</td>
                    <td>Bangalore, India — 192.168.1.100</td>
                    <td>Today, 09:02 AM</td>
                    <td><span className="badge badge-success">Current Session</span></td>
                  </tr>
                  <tr>
                    <td><strong>iPhone 14 Pro</strong> (Safari)</td>
                    <td>Mumbai, India — 192.168.1.95</td>
                    <td>Yesterday, 07:45 PM</td>
                    <td><span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Inactive</span></td>
                  </tr>
                  <tr>
                    <td><strong>Windows PC</strong> (Edge)</td>
                    <td>Bangalore, India — 192.168.1.102</td>
                    <td>Monday, 10:15 AM</td>
                    <td><span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Inactive</span></td>
                  </tr>
                </tbody>
              </table>
              <button className="btn" style={{ fontSize: '0.75rem', color: 'var(--danger-color)', border: '1px solid var(--danger-color)', width: '100%', marginTop: '1rem', textAlign: 'center', justifyContent: 'center' }}>Revoke All Other Sessions</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
