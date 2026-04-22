import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line
} from 'recharts';
import {
  ArrowLeft, Phone, Mail, MapPin, Briefcase,
  Calendar, Clock, IndianRupee, Star, CheckCircle2,
  AlertCircle, Trophy
} from 'lucide-react';
import { employees } from './Attendance';

// ─── Mock data per employee ────────────────────────────────────────────────
const PROJECTS = {
  E101: [
    { name: 'Control Hub Dashboard', role: 'Lead Dev', progress: 78, dueDate: '2026-04-10', status: 'On Track' },
    { name: 'API Gateway v2', role: 'Architect', progress: 45, dueDate: '2026-05-01', status: 'On Track' },
  ],
  E102: [
    { name: 'Operations Overhaul', role: 'Project Manager', progress: 92, dueDate: '2026-03-30', status: 'On Track' },
  ],
  E103: [
    { name: 'Help Desk Bot', role: 'Support Eng', progress: 55, dueDate: '2026-04-20', status: 'Delayed' },
  ],
  E104: [
    { name: 'Brand Refresh UI', role: 'Lead Designer', progress: 85, dueDate: '2026-03-25', status: 'At Risk' },
    { name: 'Control Hub Dashboard', role: 'UI Designer', progress: 78, dueDate: '2026-04-10', status: 'On Track' },
  ],
  E105: [
    { name: 'API Gateway v2', role: 'Backend Dev', progress: 45, dueDate: '2026-05-01', status: 'On Track' },
  ],
  E106: [
    { name: 'HR System Upgrade', role: 'Manager', progress: 30, dueDate: '2026-06-01', status: 'On Track' },
  ],
};

const TASKS = {
  E101: { assigned: 28, completed: 24, inProgress: 3, bugs: 5 },
  E102: { assigned: 20, completed: 18, inProgress: 2, bugs: 2 },
  E103: { assigned: 15, completed: 10, inProgress: 3, bugs: 8 },
  E104: { assigned: 22, completed: 20, inProgress: 2, bugs: 1 },
  E105: { assigned: 30, completed: 27, inProgress: 2, bugs: 4 },
  E106: { assigned: 10, completed: 9, inProgress: 1, bugs: 0 },
};

const weeklyHours = [
  { day: 'Mon', hours: 9.2 },
  { day: 'Tue', hours: 8.5 },
  { day: 'Wed', hours: 7.8 },
  { day: 'Thu', hours: 9.5 },
  { day: 'Fri', hours: 8.0 },
];

const monthlyAttendance = [
  { week: 'Wk 1', present: 5, absent: 0, late: 0 },
  { week: 'Wk 2', present: 4, absent: 1, late: 0 },
  { week: 'Wk 3', present: 4, absent: 0, late: 1 },
  { week: 'Wk 4', present: 5, absent: 0, late: 0 },
];

// ─── Helper Components ─────────────────────────────────────────────────────

const StatMini = ({ label, value, color, icon }) => (
  <div className="card" style={{ flex: 1, textAlign: 'center', minWidth: 120 }}>
    <div style={{ color: color || 'var(--primary-color)', marginBottom: '0.4rem', display: 'flex', justifyContent: 'center' }}>{icon}</div>
    <div style={{ fontSize: typeof value === 'string' && value.length > 5 ? '1.1rem' : '1.6rem', fontWeight: 700, color: color || 'var(--text-primary)' }}>{value}</div>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</div>
  </div>
);

const PROJECT_STATUS_COLOR = {
  'On Track': 'var(--success-color)',
  'At Risk': 'var(--warning-color)',
  'Delayed': 'var(--danger-color)',
};

// Generate a simple calendar for current month
const AttendanceCalendar = ({ daysPresent }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fake a spread of daysPresent over first N business days
  const presentDays = new Set();
  let count = 0;
  for (let d = 1; d <= daysInMonth && count < daysPresent; d++) {
    const dow = new Date(year, month, d).getDay();
    if (dow !== 0 && dow !== 6) { presentDays.add(d); count++; }
  }

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, minWidth: 280 }}>
        {dayNames.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-secondary)', padding: '4px 0' }}>{d}</div>
        ))}
        {cells.map((day, i) => {
          const isToday = day === today.getDate();
          const isPresent = day && presentDays.has(day);
          const isWeekend = day && [0, 6].includes(new Date(year, month, day).getDay());
          return (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: '6px 4px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: isToday ? 700 : 400,
                background: isToday ? 'var(--primary-color)' : isPresent ? 'rgba(16,185,129,0.15)' : 'transparent',
                color: isToday ? '#fff' : isWeekend ? 'var(--text-secondary)' : isPresent ? 'var(--success-color)' : day ? 'var(--text-primary)' : 'transparent',
                border: isToday ? 'none' : '1px solid transparent',
              }}
            >
              {day || ''}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--primary-color)', display: 'inline-block' }}></span> Today
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(16,185,129,0.25)', display: 'inline-block' }}></span> Present
        </span>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────
const EmployeeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const emp = location.state?.employee || employees.find(e => e.id === id);
  if (!emp) return <div className="card">Employee not found.</div>;

  const projects = PROJECTS[emp.id] || [];
  const tasks = TASKS[emp.id] || {};
  const taskCompletion = tasks.assigned ? Math.round((tasks.completed / tasks.assigned) * 100) : 0;

  const salaryData = [
    { name: 'Basic', value: Math.round(emp.salary * 0.5) },
    { name: 'HRA', value: Math.round(emp.salary * 0.2) },
    { name: 'Allowances', value: Math.round(emp.salary * 0.2) },
    { name: 'Bonus', value: Math.round(emp.salary * 0.1) },
  ];

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => navigate('/attendance')}
          className="btn"
          style={{ gap: '0.5rem', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={18} /> Back to Attendance
        </button>
      </div>

      {/* Profile Card */}
      <div className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: emp.color, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff', fontWeight: 700,
          fontSize: '1.5rem', flexShrink: 0, boxShadow: `0 0 0 4px ${emp.color}30`
        }}>
          {emp.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{emp.name}</h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Briefcase size={14} /> {emp.role} — {emp.dept}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={14} /> {emp.name.toLowerCase().replace(' ', '.')}@company.com</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> Bangalore, India</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          <span className={`badge ${emp.status === 'Present' ? 'badge-success' : emp.status === 'Absent' ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
            {emp.status} Today
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ID: {emp.id}</span>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <StatMini label="Days Present" value={emp.daysPresent} icon={<CheckCircle2 size={22} />} color="var(--success-color)" />
        <StatMini label="Days Absent" value={emp.daysAbsent} icon={<AlertCircle size={22} />} color="var(--danger-color)" />
        <StatMini label="On Leave" value={emp.daysLeave} icon={<Calendar size={22} />} color="var(--warning-color)" />
        <StatMini label="Current Project" value={emp.assignedProject || 'Bench'} icon={<Briefcase size={22} />} color="var(--primary-color)" />
        <StatMini label="Tasks Done" value={tasks.completed || 0} icon={<CheckCircle2 size={22} />} color="#06b6d4" />
      </div>

      {/* Main 2-col grid */}
      <div className="grid-2">
        {/* Attendance Calendar */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>📅 Attendance Calendar - March 2026</h3>
          <AttendanceCalendar daysPresent={emp.daysPresent} />
        </div>



        {/* Projects */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>💼 Active Projects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.map((proj, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${PROJECT_STATUS_COLOR[proj.status]}`, paddingLeft: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.1rem' }}>{proj.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Role: {proj.role} · Due: {proj.dueDate}</div>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: PROJECT_STATUS_COLOR[proj.status] }}>{proj.status}</span>
                </div>
                <div style={{ background: 'var(--border-color)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${proj.progress}%`, height: '100%', background: PROJECT_STATUS_COLOR[proj.status], transition: 'width 0.5s ease' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{proj.progress}% completed</div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Analytics */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>✅ Task Analytics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Assigned', value: tasks.assigned, color: 'var(--primary-color)' },
              { label: 'Completed', value: tasks.completed, color: 'var(--success-color)' },
              { label: 'In Progress', value: tasks.inProgress, color: 'var(--warning-color)' },
              { label: 'Bugs Fixed', value: tasks.bugs, color: 'var(--danger-color)' },
            ].map(t => (
              <div key={t.label} style={{ background: 'var(--bg-color)', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: t.color }}>{t.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{t.label}</div>
              </div>
            ))}
          </div>
          {/* Completion bar */}
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Task Completion Rate</span>
              <span style={{ fontWeight: 700 }}>{taskCompletion}%</span>
            </div>
            <div style={{ background: 'var(--border-color)', borderRadius: 99, height: 10, overflow: 'hidden' }}>
              <div style={{ width: `${taskCompletion}%`, height: '100%', background: `linear-gradient(90deg, var(--primary-color), ${emp.color})`, transition: 'width 0.5s ease' }} />
            </div>
          </div>
        </div>

        {/* Attendance trend */}
        <div className="card chart-card">
          <h3>📊 Monthly Attendance Breakdown</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="week" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip
                  contentStyle={{ background: 'var(--surface-color)', border: 'none', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)' }}
                />
                <Bar dataKey="present" fill="var(--success-color)" name="Present" radius={[3, 3, 0, 0]} />
                <Bar dataKey="absent" fill="var(--danger-color)" name="Absent" radius={[3, 3, 0, 0]} />
                <Bar dataKey="late" fill="var(--warning-color)" name="Late" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>💰 Salary Breakdown</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Annual CTC</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <IndianRupee size={20} />
                {emp.salary.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Monthly: ₹{Math.round(emp.salary / 12).toLocaleString('en-IN')}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              {salaryData.map((s, i) => {
                const pct = Math.round((s.value / emp.salary) * 100);
                const colors = ['var(--primary-color)', '#a855f7', 'var(--warning-color)', 'var(--success-color)'];
                return (
                  <div key={s.name} style={{ marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{s.name}</span>
                      <span style={{ fontWeight: 600 }}>₹{s.value.toLocaleString('en-IN')} ({pct}%)</span>
                    </div>
                    <div style={{ background: 'var(--border-color)', borderRadius: 99, height: 5, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: colors[i] }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetail;
