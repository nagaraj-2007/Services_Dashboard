import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { AppWindow, Users, CheckCircle, Clock, CalendarClock, Download } from 'lucide-react';

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

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--primary-color)'}}><AppWindow /></div>
          <div className="stat-info">
            <h3>Total Projects</h3>
            <div className="value">17</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--success-color)'}}><CheckCircle /></div>
          <div className="stat-info">
            <h3>Delivered Apps</h3>
            <div className="value">8</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: '#a855f7'}}><Clock /></div>
          <div className="stat-info">
            <h3>In Progress</h3>
            <div className="value">5</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: 'var(--warning-color)'}}><Users /></div>
          <div className="stat-info">
            <h3>Total Employees</h3>
            <div className="value">50</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{color: '#06b6d4'}}><CalendarClock /></div>
          <div className="stat-info">
            <h3>Present Today</h3>
            <div className="value">48</div>
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
          <h3>Project Status Distribution</h3>
          <div className="chart-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
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
                  position={{ y: 0 }}
                  contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', zIndex: 1000 }}
                  itemStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            
            <div style={{ position: 'absolute', textAlign: 'center', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>17</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, marginTop: '0.25rem' }}>TOTAL<br/>PROJECTS</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
