import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Server, Cpu, Database, Network, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

const cpuData = [
  { time: '10:00', usage: 22 }, { time: '10:05', usage: 35 },
  { time: '10:10', usage: 45 }, { time: '10:15', usage: 28 },
  { time: '10:20', usage: 65 }, { time: '10:25', usage: 82 },
  { time: '10:30', usage: 41 }, { time: '10:35', usage: 31 },
];

const apiLatency = [
  { time: '10:00', ms: 120 }, { time: '10:05', ms: 145 },
  { time: '10:10', ms: 210 }, { time: '10:15', ms: 160 },
  { time: '10:20', ms: 380 }, { time: '10:25', ms: 450 },
  { time: '10:30', ms: 180 }, { time: '10:35', ms: 135 },
];

const CommandCenter = () => {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Command Center</h1>
          <p className="page-subtitle">Real-time infrastructure health and fleet operations.</p>
        </div>
        <button className="btn btn-primary" style={{ background: '#0f172a' }}>
          <RefreshCw size={16} /> Refresh Now
        </button>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>SERVER STATUS</span>
            <Server size={18} color="var(--success-color)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Healthy</span>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Uptime 99.9%</span>
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>CPU USAGE</span>
            <Cpu size={18} color="var(--warning-color)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>41%</span>
            <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Spike at 10:25</span>
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>DATABASE LOAD</span>
            <Database size={18} color="#06b6d4" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>28%</span>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Optimal</span>
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>AVG LATENCY</span>
            <Network size={18} color="#a855f7" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>135ms</span>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Normal</span>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card chart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>CPU Utilization</h3>
            <span className="badge badge-warning">Live</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuData}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--warning-color)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--warning-color)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} />
                <YAxis stroke="var(--text-secondary)" domain={[0, 100]} fontSize={12} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ background: 'var(--surface-color)', border: 'none', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}/>
                <Area type="monotone" dataKey="usage" stroke="var(--warning-color)" fillOpacity={1} fill="url(#colorCpu)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>API Latency (ms)</h3>
            <span className="badge badge-success">Stable</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={apiLatency}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--surface-color)', border: 'none', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}/>
                <Line type="monotone" dataKey="ms" stroke="#a855f7" strokeWidth={3} dot={{r: 4, fill: '#a855f7'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>Live Fleet Map</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Geographical distribution of active mobile app users and service personnel.</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary-color)' }}></div> Active Users
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success-color)' }}></div> Staff
              </div>
            </div>
          </div>
          
          <div style={{ 
            height: '400px', 
            background: 'var(--bg-color)', 
            borderRadius: '12px', 
            border: '1px solid var(--border-color)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Mock Map Background */}
            <div style={{ 
              position: 'absolute', 
              width: '100%', 
              height: '100%', 
              opacity: 0.1,
              background: 'radial-gradient(circle, var(--text-secondary) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
            
            {/* Mock Map Markers */}
            {[
              { t: '20%', l: '30%', c: 'var(--primary-color)' },
              { t: '45%', l: '55%', c: 'var(--primary-color)' },
              { t: '60%', l: '40%', c: 'var(--success-color)' },
              { t: '30%', l: '70%', c: 'var(--primary-color)' },
              { t: '15%', l: '60%', c: 'var(--success-color)' },
              { t: '75%', l: '25%', c: 'var(--primary-color)' },
              { t: '50%', l: '80%', c: 'var(--primary-color)' },
            ].map((m, i) => (
              <div key={i} style={{ 
                position: 'absolute', 
                top: m.t, 
                left: m.l, 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                background: m.c,
                boxShadow: `0 0 10px ${m.c}`,
                animation: 'pulse-marker 2s infinite'
              }}></div>
            ))}
            
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes pulse-marker {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.5); opacity: 0.5; }
                100% { transform: scale(1); opacity: 1; }
              }
            ` }} />
            
            <div className="glass-card" style={{ padding: '1rem', position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '0.75rem' }}>
              <strong>Fleet Stats:</strong><br/>
              Chennai: 42 Active<br/>
              Bangalore: 28 Active<br/>
              Mumbai: 15 Active
            </div>
          </div>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>

          <h3 style={{ marginBottom: '1rem' }}>Recent System Alerts</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Component</th>
                  <th>Severity</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Today, 10:25 AM</td>
                  <td><strong>API Gateway</strong></td>
                  <td><span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}><AlertTriangle size={12}/> Warning</span></td>
                  <td>Elevated latency spike detected (450ms). Resourcing autoscale triggered.</td>
                </tr>
                <tr>
                  <td>Today, 10:20 AM</td>
                  <td><strong>Auth Service</strong></td>
                  <td><span className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}><AlertTriangle size={12}/> Critical</span></td>
                  <td>Multiple failed login attempts from IP 192.168.1.44 blocked.</td>
                </tr>
                <tr>
                  <td>Today, 09:00 AM</td>
                  <td><strong>Database</strong></td>
                  <td><span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}><CheckCircle size={12}/> Info</span></td>
                  <td>Automated daily backup completed successfully.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommandCenter;
