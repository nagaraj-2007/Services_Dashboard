import { Save, Shield, Bell, Key, Database, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Global Settings</h1>
          <p className="page-subtitle">Configure application defaults, security, and notifications.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <Globe size={20} color="var(--primary-color)" />
            <h3 style={{ margin: 0 }}>General Platform Settings</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Platform Name</label>
              <input type="text" defaultValue="Company Control Hub" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Support Email Routing</label>
              <input type="email" defaultValue="support@controlhub.io" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Default Timezone</label>
              <select style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
                <option value="IST">India Standard Time (IST)</option>
                <option value="UTC">Coordinated Universal Time (UTC)</option>
                <option value="EST">Eastern Standard Time (EST)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <Shield size={20} color="var(--success-color)" />
            <h3 style={{ margin: 0 }}>Security & Authentication</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Two-Factor Authentication (2FA)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Force all admins to use 2FA.</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: 18, height: 18, cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Session Timeout limit</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Log users out after inactivity.</div>
              </div>
              <select style={{ padding: '0.25rem 0.5rem', borderRadius: 4, background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                <option>15 Minutes</option>
                <option>30 Minutes</option>
                <option>1 Hour</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Master API Token</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="password" value="sk_live_99d146af8e9d48f9" readOnly style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontFamily: 'monospace' }} />
                <button className="btn" style={{ background: 'var(--surface-color-hover)', border: '1px solid var(--border-color)' }}><Key size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <Bell size={20} color="var(--warning-color)" />
            <h3 style={{ margin: 0 }}>Notification Alerts</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Critical System Errors', 'High API Latency Warning', 'Employee Late/Absent Threshold Met', 'New App Version Registration'].map((alert, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input type="checkbox" defaultChecked={i < 2} style={{ width: 16, height: 16 }} />
                <span>Notify me about <strong style={{ fontWeight: 600 }}>{alert}</strong></span>
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <Database size={20} color="#06b6d4" />
            <h3 style={{ margin: 0 }}>Data & Backups</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: 8, border: '1px dashed var(--border-color)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Last Automated Backup</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Today at 09:00 AM — Status: <span style={{ color: 'var(--success-color)', fontWeight: 600 }}>Successful</span></div>
              <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', marginTop: '0.75rem' }}>Force Manual Backup</button>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Analytics Data Retention</label>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>How long should raw event logs be kept?</div>
              <select style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
                <option value="365">1 Year</option>
                <option value="forever">Forever</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <Key size={20} color="var(--primary-color)" />
            <h3 style={{ margin: 0 }}>Developer API Keys</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Use these keys to integrate the H3 Analytics & Crash Reporting SDK into your mobile applications.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Selvagam Parent App (Android)', key: 'h3_app_77x29z81', lastUsed: '2 mins ago' },
              { name: 'Selvagam Driver App (iOS)', key: 'h3_app_12a99v04', lastUsed: '1 hour ago' },
              { name: 'Chola Cabs Driver (Android)', key: 'h3_app_k99m21p0', lastUsed: 'Never' },
            ].map((app, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-color)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{app.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Last seen: {app.lastUsed}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <code style={{ background: 'var(--surface-color)', padding: '0.4rem 0.75rem', borderRadius: 6, fontSize: '0.85rem', border: '1px solid var(--border-color)' }}>{app.key}</code>
                  <button className="btn" title="Copy Key" style={{ padding: '0.4rem' }}><Save size={14} /></button>
                  <button className="btn" title="Regenerate" style={{ padding: '0.4rem', color: 'var(--danger-color)' }}><Database size={14} /></button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--surface-color-hover)', borderRadius: 8, borderLeft: '4px solid var(--primary-color)' }}>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>SDK Quick Start (Javascript)</div>
            <pre style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', overflowX: 'auto' }}>
{`import H3SDK from '@h3-services/sdk';

H3SDK.init({
  apiKey: 'YOUR_APP_KEY',
  environment: 'production'
});`}
            </pre>
          </div>
        </div>
      </div>

    </>
  );
};

export default Settings;
