import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Clock, CalendarHeart, History, Activity, AlertOctagon, Fingerprint } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid, XAxis, YAxis, BarChart, Bar } from 'recharts';
import { dummyUsers } from './AppUsersList';

const ACTION_COLORS = { '#a855f7': 'Clicks', 'var(--primary-color)': 'Views', 'var(--success-color)': 'Success', 'var(--warning-color)': 'Issues' };
const pieData = [
  { name: 'Button Clicks', value: 400, color: '#a855f7' },
  { name: 'Screen Views', value: 300, color: 'var(--primary-color)' },
  { name: 'Successful Logins', value: 300, color: 'var(--success-color)' },
  { name: 'Error Encountered', value: 200, color: 'var(--warning-color)' },
];

const activityTimeline = [
  { time: '10:42 AM', action: 'App Opened', desc: 'User launched app from Home Screen', icon: <Fingerprint size={16} /> },
  { time: '10:45 AM', action: 'Navigated to Profile', desc: 'Viewed profile settings', icon: <Activity size={16} /> },
  { time: '10:50 AM', action: 'Updated Avatar', desc: 'Successfully changed profile picture', icon: <User size={16} /> },
  { time: '11:02 AM', action: 'Checkout Process', desc: 'Initiated payment gateway', icon: <Clock size={16} /> },
  { time: '11:04 AM', action: 'Payment Failed', desc: 'Network timeout during transaction', icon: <AlertOctagon size={16} />, color: 'var(--danger-color)' },
];

const AppUserDetail = () => {
  const { appId, userId } = useParams();
  const navigate = useNavigate();
  const user = dummyUsers.find(u => u.id === userId) || { name: 'Unknown User', id: userId };

  return (
    <>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <button className="btn-icon" onClick={() => navigate(`/apps/${appId}/users`)} style={{ marginTop: 4 }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="page-title">{user.name} - Identity Profile</h1>
            <p className="page-subtitle">Granular event tracking and analytics for this specific user.</p>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1fr 2fr', alignItems: 'start' }}>
        
        {/* Left Column: ID Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700 }}>
              {user.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{user.name}</div>
              <div className="badge badge-success" style={{ marginTop: '0.25rem', display: 'inline-flex' }}>Active User</div>
            </div>
          </div>
          
          <div style={{ height: 1, background: 'var(--border-color)', margin: '0.5rem 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Mail size={16} color="var(--text-secondary)" /> <strong>{user.email || 'N/A'}</strong></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={16} color="var(--text-secondary)" /> <strong>{user.phone || 'N/A'}</strong></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MapPin size={16} color="var(--text-secondary)" /> <strong>Mumbai, India (IP: 103.44.2.1)</strong></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><CalendarHeart size={16} color="var(--text-secondary)" /> <strong>Joined {user.joined}</strong></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><History size={16} color="var(--text-secondary)" /> <strong>Last seen 5 mins ago</strong></div>
          </div>

          <div style={{ height: 1, background: 'var(--border-color)', margin: '0.5rem 0' }} />

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>DEVICE FINGERPRINT</div>
            <div style={{ padding: '0.75rem', background: 'var(--bg-color)', borderRadius: 8, fontSize: '0.75rem', fontFamily: 'monospace' }}>
              <div>Model: iPhone 14 Pro</div>
              <div>OS: iOS 17.1.1</div>
              <div>App Ver: 2.4.1 (Build 404)</div>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics & Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card chart-card" style={{ height: 300 }}>
              <h3 style={{ fontSize: '1rem' }}>Event Distribution</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ background: 'var(--surface-color)', border: 'none', borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card chart-card" style={{ height: 300 }}>
              <h3 style={{ fontSize: '1rem' }}>Session Durations (Mins)</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pieData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="name" hide />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <RechartsTooltip contentStyle={{ background: 'var(--surface-color)', border: 'none', borderRadius: 8 }} />
                    <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Timeline Activity */}
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Today's Activity Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {activityTimeline.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                  {/* Timeline vertical line */}
                  {idx !== activityTimeline.length - 1 && (
                    <div style={{ position: 'absolute', left: 15, top: 32, bottom: -24, width: 2, background: 'var(--border-color)' }} />
                  )}
                  {/* Icon dot */}
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: item.color || 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color ? '#fff' : 'var(--text-primary)', zIndex: 1, flexShrink: 0, border: `2px solid ${item.color || 'var(--border-color)'}` }}>
                    {item.icon}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, paddingBottom: idx === activityTimeline.length -1 ? 0 : '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: item.color || 'var(--text-primary)' }}>{item.action}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn" style={{ width: '100%', marginTop: '2rem', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}>Load Older Activities...</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AppUserDetail;
