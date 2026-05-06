import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AlertCircle, Bell, Info } from 'lucide-react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('new_crash', (data) => {
      addNotification({
        id: Date.now(),
        type: 'CRASH',
        title: 'New App Crash Reported',
        message: data.error,
        icon: <AlertCircle className="text-red-500" />,
        severity: 'danger'
      });
    });

    newSocket.on('system_update', (data) => {
      addNotification({
        id: Date.now(),
        type: 'UPDATE',
        title: 'System Update',
        message: `Version ${data.version} deployed.`,
        icon: <Info className="text-blue-500" />,
        severity: 'info'
      });
    });

    return () => newSocket.close();
  }, []);

  const addNotification = (notif) => {
    setNotifications(prev => [notif, ...prev]);
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notif.id));
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
      <div className="notification-toast-container" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {notifications.map(n => (
          <div key={n.id} className={`glass-card notification-toast p-4 flex items-center gap-3 shadow-lg border-l-4 ${n.severity === 'danger' ? 'border-l-red-500' : 'border-l-blue-500'}`} style={{ minWidth: '300px', display: 'flex', alignItems: 'center', padding: '16px', borderRadius: '12px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderLeftWidth: '4px' }}>
            <div className="mr-3">{n.icon}</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>{n.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{n.message}</div>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
