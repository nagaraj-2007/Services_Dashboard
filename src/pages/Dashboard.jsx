import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { AppWindow, Users, CheckCircle, Clock, CalendarClock, Download, AlertTriangle, ShieldCheck } from 'lucide-react';

const attendanceData = [
  { day: 'Mon', present: 42, absent: 8 },
  { day: 'Tue', present: 45, absent: 5 },
  { day: 'Wed', present: 46, absent: 4 },
  { day: 'Thu', present: 44, absent: 6 },
  { day: 'Fri', present: 48, absent: 2 },
];

const projectStatusData = [
  { name: 'Completed', value: 8, color: 'var(--success-color)' },
  { name: 'In Progress', value: 5, color: 'var(--primary-color)' },
  { name: 'Pending', value: 3, color: 'var(--text-secondary)' },
  { name: 'Blocked', value: 1, color: 'var(--danger-color)' },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Company Overview</h1>
          <p className="page-subtitle">High-level view of your workforce and project pipelines.</p>
        </div>
        <button className="btn btn-primary">
          <Download size={18} /> Export Report
        </button>
      </div>

      {stats?.anomalyDetected && (
        <div className="card anomaly-card" style={{ marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <AlertTriangle className="text-danger" size={28} />
          <div>
            <h3 style={{ margin: 0, color: 'var(--danger-color)', fontSize: '1rem' }}>AI Anomaly Detected</h3>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>{stats.anomalyMessage}</p>
          </div>
          <button className="btn btn-primary" style={{ marginLeft: 'auto', background: 'var(--danger-color)' }}>View Details</button>
        </div>
      )}

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--primary-color)'}}><AppWindow /></div>
          <div className="stat-info">
            <h3>Total Applications</h3>
            <div className="value">{stats?.totalApps || 17}</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--success-color)'}}><ShieldCheck /></div>
          <div className="stat-info">
            <h3>Active Users</h3>
            <div className="value">{(stats?.totalActiveUsers / 1000000).toFixed(1)}M</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: '#a855f7'}}><Clock /></div>
          <div className="stat-info">
            <h3>Daily Active</h3>
            <div className="value">{(stats?.dailyActiveUsers / 1000).toFixed(0)}K</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--warning-color)'}}><Users /></div>
          <div className="stat-info">
            <h3>Total Employees</h3>
            <div className="value">{stats?.totalEmployees || 142}</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: '#06b6d4'}}><CalendarClock /></div>
          <div className="stat-info">
            <h3>App Crashes</h3>
            <div className="value" style={{ color: stats?.anomalyDetected ? 'var(--danger-color)' : 'inherit' }}>
              {stats?.appCrashes24h || 34}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card chart-card">
          <h3>Employee Attendance (This Week)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                  cursor={{ fill: 'var(--surface-color-hover)' }}
                />
                <Bar dataKey="present" name="Present" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" name="Absent" fill="var(--danger-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card">
          <h3>Application Status Distribution</h3>
          <div className="chart-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  position={{ y: 0 }}
                  contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', zIndex: 1000 }}
                  itemStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '0.85rem', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
            
            <div style={{ position: 'absolute', textAlign: 'center', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{stats?.totalApps || 17}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, marginTop: '0.25rem' }}>TOTAL<br/>APPS</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

