import React, { useState } from 'react';
import { Bell, AlertCircle, Info, CheckCircle, Clock, Trash2, Send, ShieldAlert } from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'CRASH',
      title: 'App Crash: Selvagam Driver',
      message: 'Unexpected null pointer exception in DriverLocationService. Line 142.',
      time: '10 mins ago',
      severity: 'danger',
      read: false
    },
    {
      id: 2,
      type: 'UPDATE',
      title: 'System Maintenance',
      message: 'Database backup scheduled for tonight at 02:00 AM IST.',
      time: '2 hours ago',
      severity: 'info',
      read: false
    },
    {
      id: 3,
      type: 'USER',
      title: 'New Client Registered',
      message: 'Chola Logistics has been successfully added to the system.',
      time: '5 hours ago',
      severity: 'success',
      read: true
    },
    {
      id: 4,
      type: 'ALERT',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected from IP 192.168.1.45.',
      time: '1 day ago',
      severity: 'warning',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.severity === activeTab);

  const getIcon = (severity) => {
    switch (severity) {
      case 'danger': return <AlertCircle size={20} color="var(--danger-color)" />;
      case 'warning': return <ShieldAlert size={20} color="var(--warning-color)" />;
      case 'success': return <CheckCircle size={20} color="var(--success-color)" />;
      default: return <Info size={20} color="var(--primary-color)" />;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notification Center</h1>
          <p className="page-subtitle">Stay informed about system health, app reports, and team updates.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" onClick={markAllRead} style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>
            Mark all as read
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Send size={16} /> Broadcast Message
          </button>
        </div>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', padding: '0 1.5rem' }}>
            {['all', 'danger', 'warning', 'info'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1.25rem 1rem',
                  background: 'none',
                  border: 'none',
                  color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  borderBottom: activeTab === tab ? '2px solid var(--primary-color)' : '2px solid transparent',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ padding: '1rem' }}>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(n => (
                <div 
                  key={n.id} 
                  className="notification-item"
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    marginBottom: '0.5rem',
                    background: n.read ? 'transparent' : 'var(--surface-color-hover)',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '10px', 
                    background: `var(--${n.severity}-color-soft)`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getIcon(n.severity)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{n.title}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {n.time}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {n.message}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginLeft: '1rem' }}>
                    <button 
                      className="btn-icon" 
                      onClick={() => deleteNotification(n.id)}
                      style={{ color: 'var(--text-secondary)' }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    {!n.read && <div style={{ width: '8px', height: '8px', background: 'var(--primary-color)', borderRadius: '50%' }}></div>}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Bell size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <p>No notifications found in this category.</p>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Notifications Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>UNREAD ALERTS</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger-color)' }}>2</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TOTAL THIS WEEK</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>124</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>AVG. RESPONSE TIME</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success-color)' }}>14m</div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>Recent Broadcasts</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '0.75rem', borderLeft: '2px solid var(--primary-color)', background: 'var(--surface-color)' }}>
              "System update successfully deployed to all Driver apps."
              <div style={{ fontSize: '0.7rem', marginTop: '0.4rem' }}>Yesterday, 4:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
