import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MousePointer, Activity, Smartphone, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyApps = {
  "1": { name: 'Parent App', client: 'Selvagam', usersCount: 12450 },
  "2": { name: 'Driver App', client: 'Selvagam', usersCount: 840 },
  "3": { name: 'Web Portal', client: 'Selvagam', usersCount: 310 },
  "4": { name: 'Driver App', client: 'Chola Cabs', usersCount: 4200 },
  "5": { name: 'Match App', client: 'Hope 3 Services', usersCount: 125 },
  "6": { name: 'Services Website', client: 'Hope 3 Services', usersCount: 9400 },
};

const activityData = [
  { day: 'Mon', logins: 4000, actions: 12400 },
  { day: 'Tue', logins: 3000, actions: 9800 },
  { day: 'Wed', logins: 2000, actions: 7600 },
  { day: 'Thu', logins: 2780, actions: 10908 },
  { day: 'Fri', logins: 1890, actions: 6800 },
  { day: 'Sat', logins: 2390, actions: 8800 },
  { day: 'Sun', logins: 3490, actions: 11300 },
];

const ProjectAnalytics = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const project = dummyApps[appId] || { name: 'Unknown App', client: '', usersCount: 0 };

  return (
    <>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <button className="btn-icon" onClick={() => navigate(`/apps/${appId}/dashboard`)} style={{ marginTop: 4 }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="page-title">{project.name} Analytics</h1>
            <p className="page-subtitle">Granular usage and event metrics for  <strong>{project.client}</strong></p>
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <div 
          className="card stat-card" 
          onClick={() => navigate(`/apps/${appId}/users`)}
          style={{ cursor: 'pointer', border: '2px solid transparent', transition: 'border 0.2s', borderColor: 'var(--primary-color)' }}
          title="Click to view User List"
        >
          <div className="stat-icon" style={{ background: 'var(--primary-color)', color: '#fff' }}><Users /></div>
          <div className="stat-info">
            <h3 style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Total Active Users →</h3>
            <div className="value">{project.usersCount.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--success-color)'}}><Activity /></div>
          <div className="stat-info">
            <h3>Avg Session</h3>
            <div className="value">4m 12s</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--warning-color)'}}><MousePointer /></div>
          <div className="stat-info">
            <h3>Events Logged</h3>
            <div className="value">8.4M</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: '#06b6d4'}}><Smartphone /></div>
          <div className="stat-info">
            <h3>Crash Rate</h3>
            <div className="value" style={{ color: 'var(--success-color)' }}>0.01%</div>
          </div>
        </div>
      </div>

      <div className="card chart-card" style={{ height: 400 }}>
        <h3>Weekly Engagement (Logins vs Actions)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="day" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Bar dataKey="actions" fill="#a855f7" name="Total Actions" radius={[4, 4, 0, 0]} />
              <Bar dataKey="logins" fill="var(--primary-color)" name="Unique Logins" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default ProjectAnalytics;
