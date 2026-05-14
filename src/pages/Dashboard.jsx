import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { 
  AppWindow, Users, CheckCircle, Clock, CalendarClock, 
  Download, AlertTriangle, ShieldCheck, TrendingUp, 
  Plus, MessageSquare, Activity, ChevronRight, Filter
} from 'lucide-react';

const projectStatusData = [
  { name: 'Completed', value: 8, color: 'var(--success-color)' },
  { name: 'In Progress', value: 5, color: 'var(--primary-color)' },
  { name: 'Pending', value: 3, color: 'var(--text-secondary)' },
  { name: 'Blocked', value: 1, color: 'var(--danger-color)' },
];

const revenueData = [
  { month: 'Jan', revenue: 4500, maintenance: 1200 },
  { month: 'Feb', revenue: 5200, maintenance: 1300 },
  { month: 'Mar', revenue: 4800, maintenance: 1500 },
  { month: 'Apr', revenue: 6100, maintenance: 1400 },
  { month: 'May', revenue: 5900, maintenance: 1600 },
  { month: 'Jun', revenue: 7200, maintenance: 1800 },
];

const recentActivity = [
  { id: 1, type: 'release', title: 'New Release: Selvagam Driver v1.2.0', time: '2 hours ago', icon: <Activity size={16} />, color: 'var(--primary-color)' },
  { id: 2, type: 'hire', title: 'New Employee: Arjun K. joined Development team', time: '5 hours ago', icon: <Plus size={16} />, color: 'var(--success-color)' },
  { id: 3, type: 'alert', title: 'High Crash Rate: App ID #1024 (iOS)', time: '8 hours ago', icon: <AlertTriangle size={16} />, color: 'var(--danger-color)' },
  { id: 4, type: 'broadcast', title: 'Admin: System maintenance scheduled for Sunday', time: '1 day ago', icon: <MessageSquare size={16} />, color: 'var(--warning-color)' },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterPlatform, setFilterPlatform] = useState('All');

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
          <h1 className="page-title">Command Center</h1>
          <p className="page-subtitle">Real-time monitoring and operational overview.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div className="search-bar" style={{ width: 'auto', padding: '0.25rem 0.75rem' }}>
            <Filter size={16} style={{ color: 'var(--text-secondary)' }} />
            <select 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.875rem', marginLeft: '0.25rem', cursor: 'pointer' }}
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
            >
              <option value="All">All Platforms</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
              <option value="Web">Web</option>
            </select>
          </div>
          <button className="btn btn-primary">
            <Download size={18} /> Export Report
          </button>
        </div>
      </div>

      {stats?.anomalyDetected && (
        <div className="card anomaly-card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)' }}>
            <AlertTriangle className="text-danger" size={28} />
          </div>
          <div>
            <h3 style={{ margin: 0, color: 'var(--danger-color)', fontSize: '1.1rem' }}>System Critical Alert</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.8 }}>{stats.anomalyMessage}</p>
          </div>
          <button className="btn btn-primary" style={{ marginLeft: 'auto', background: 'var(--danger-color)' }}>Respond Now</button>
        </div>
      )}

      <div className="stat-grid">
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--primary-color)', background: 'rgba(79, 70, 229, 0.1)'}}><AppWindow /></div>
          <div className="stat-info">
            <h3>Total Applications</h3>
            <div className="value">{stats?.totalApps || 17}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
              <TrendingUp size={12} /> +2 this month
            </div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--success-color)', background: 'rgba(16, 185, 129, 0.1)'}}><ShieldCheck /></div>
          <div className="stat-info">
            <h3>Active Users</h3>
            <div className="value">{(stats?.totalActiveUsers / 1000000 || 1.2).toFixed(1)}M</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Across all platforms
            </div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)'}}><Clock /></div>
          <div className="stat-info">
            <h3>Daily Active</h3>
            <div className="value">{(stats?.dailyActiveUsers / 1000 || 284).toFixed(0)}K</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
              <TrendingUp size={12} /> +12% vs last week
            </div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--warning-color)', background: 'rgba(245, 158, 11, 0.1)'}}><Users /></div>
          <div className="stat-info">
            <h3>Total Employees</h3>
            <div className="value">{stats?.totalEmployees || 142}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              94% Online Now
            </div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--danger-color)', background: 'rgba(239, 68, 68, 0.1)'}}><CalendarClock /></div>
          <div className="stat-info">
            <h3>App Crashes</h3>
            <div className="value" style={{ color: stats?.anomalyDetected ? 'var(--danger-color)' : 'inherit' }}>
              {stats?.appCrashes24h || 34}
            </div>
            <div style={{ fontSize: '0.75rem', color: stats?.anomalyDetected ? 'var(--danger-color)' : 'var(--text-secondary)', marginTop: '2px' }}>
              Last 24 hours
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card chart-card" style={{ height: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Revenue & Maintenance</h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>LAST 6 MONTHS</div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMaint" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--danger-color)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--danger-color)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="maintenance" stroke="var(--danger-color)" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorMaint)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Application Distribution</h3>
          <div className="chart-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '0.85rem', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
            
            <div style={{ position: 'absolute', textAlign: 'center', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{stats?.totalApps || 17}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '0.05em' }}>TOTAL APPS</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '1.5rem', gridTemplateColumns: '2fr 1fr' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Recent System Activity</h3>
            <button className="btn" style={{ fontSize: '0.75rem', color: 'var(--primary-color)', padding: 0 }}>View All Log</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentActivity.map((activity) => (
              <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '8px', 
                  backgroundColor: `${activity.color}15`, color: activity.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {activity.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{activity.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{activity.time}</div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card glass-card" style={{ background: 'linear-gradient(135deg, var(--primary-color), #a855f7)', color: 'white', border: 'none' }}>
            <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '1rem' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              <button style={{ 
                background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.75rem', 
                color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                border: '1px solid rgba(255,255,255,0.2)', transition: 'var(--transition)'
              }} className="action-btn">
                <Plus size={20} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>ADD EMP</span>
              </button>
              <button style={{ 
                background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.75rem', 
                color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                border: '1px solid rgba(255,255,255,0.2)', transition: 'var(--transition)'
              }} className="action-btn">
                <MessageSquare size={20} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>ANNOUNCE</span>
              </button>
              <button style={{ 
                background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.75rem', 
                color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                border: '1px solid rgba(255,255,255,0.2)', transition: 'var(--transition)'
              }} className="action-btn">
                <AppWindow size={20} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>NEW APP</span>
              </button>
              <button style={{ 
                background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.75rem', 
                color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                border: '1px solid rgba(255,255,255,0.2)', transition: 'var(--transition)'
              }} className="action-btn">
                <ShieldCheck size={20} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>AUDIT</span>
              </button>
            </div>
          </div>

          <div className="card">
            <h3>Workforce Status</h3>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                <span>Present</span>
                <span style={{ fontWeight: 600 }}>132 / 142</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '93%', height: '100%', background: 'var(--success-color)' }}></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--warning-color)' }}>6</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ON LEAVE</div>
                </div>
                <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--danger-color)' }}>4</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ABSENT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
