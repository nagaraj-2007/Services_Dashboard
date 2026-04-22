import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ChevronRight, Download } from 'lucide-react';

const employees = [
  {
    id: 'E101',
    name: 'Alice Smith',
    role: 'Super Admin',
    dept: 'Engineering',
    avatar: 'AS',
    color: '#6366f1',
    status: 'Present',
    assignedProject: 'Parent App',
    daysPresent: 22,
    daysAbsent: 1,
    daysLeave: 0,
    salary: 120000,
  },
  {
    id: 'E102',
    name: 'Bob Johnson',
    role: 'Manager',
    dept: 'Operations',
    avatar: 'BJ',
    color: '#f59e0b',
    status: 'Present',
    assignedProject: 'Driver App',
    daysPresent: 20,
    daysAbsent: 2,
    daysLeave: 1,
    salary: 95000,
  },
  {
    id: 'E103',
    name: 'Charlie Lee',
    role: 'Employee',
    dept: 'Support',
    avatar: 'CL',
    color: '#10b981',
    status: 'Absent',
    assignedProject: 'Match App',
    daysPresent: 18,
    daysAbsent: 4,
    daysLeave: 1,
    salary: 65000,
  },
  {
    id: 'E104',
    name: 'Diana King',
    role: 'Employee',
    dept: 'Design',
    avatar: 'DK',
    color: '#a855f7',
    status: 'Late',
    assignedProject: 'Web Portal',
    daysPresent: 21,
    daysAbsent: 1,
    daysLeave: 1,
    salary: 72000,
  },
  {
    id: 'E105',
    name: 'Ethan Patel',
    role: 'Employee',
    dept: 'Backend',
    avatar: 'EP',
    color: '#ef4444',
    status: 'Present',
    assignedProject: 'Temple App',
    daysPresent: 23,
    daysAbsent: 0,
    daysLeave: 0,
    salary: 88000,
  },
  {
    id: 'E106',
    name: 'Fatima Noor',
    role: 'Manager',
    dept: 'HR',
    avatar: 'FN',
    color: '#06b6d4',
    status: 'On Leave',
    assignedProject: 'Services Website',
    daysPresent: 19,
    daysAbsent: 1,
    daysLeave: 3,
    salary: 98000,
  },
];

const STATUS_CONFIG = {
  Present: { icon: <CheckCircle size={14} />, cls: 'badge-success' },
  Absent: { icon: <XCircle size={14} />, cls: 'badge-danger' },
  Late: { icon: <Clock size={14} />, cls: 'badge-warning' },
  'On Leave': { icon: <Clock size={14} />, cls: 'badge-warning' },
};

const today = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const Attendance = () => {
  const navigate = useNavigate();

  const presentCount = employees.filter(e => e.status === 'Present').length;
  const absentCount = employees.filter(e => e.status === 'Absent').length;
  const lateCount = employees.filter(e => e.status === 'Late').length;
  const leaveCount = employees.filter(e => e.status === 'On Leave').length;

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="page-subtitle">{today} — Click any employee to view their full dashboard</p>
        </div>
        <button className="btn btn-primary">
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Summary cards */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '2rem' }}>
        <div className="card" style={{ borderTop: '3px solid var(--success-color)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Present</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success-color)', marginTop: '0.3rem' }}>{presentCount}</div>
        </div>
        <div className="card" style={{ borderTop: '3px solid var(--danger-color)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Absent</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--danger-color)', marginTop: '0.3rem' }}>{absentCount}</div>
        </div>
        <div className="card" style={{ borderTop: '3px solid var(--warning-color)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Late</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--warning-color)', marginTop: '0.3rem' }}>{lateCount}</div>
        </div>
        <div className="card" style={{ borderTop: '3px solid var(--primary-color)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>On Leave</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-color)', marginTop: '0.3rem' }}>{leaveCount}</div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: 0 }}>Today's Attendance — {employees.length} Employees</h3>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Status</th>
                <th>Current Project</th>
                <th>This Month</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => {
                const statusCfg = STATUS_CONFIG[emp.status];
                return (
                  <tr
                    key={emp.id}
                    onClick={() => navigate(`/employees/${emp.id}`, { state: { employee: emp } })}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: emp.color, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 600, fontSize: 13, flexShrink: 0
                          }}
                        >
                          {emp.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{emp.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{emp.dept}</td>
                    <td>
                      <span className={`badge ${statusCfg.cls}`} style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
                        {statusCfg.icon} {emp.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{emp.assignedProject}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--success-color)', fontWeight: 600 }}>✓ {emp.daysPresent}</span>
                        <span style={{ color: 'var(--danger-color)', fontWeight: 600 }}>✗ {emp.daysAbsent}</span>
                        <span style={{ color: 'var(--warning-color)', fontWeight: 600 }}>⊘ {emp.daysLeave}</span>
                      </div>
                    </td>
                    <td>
                      <ChevronRight size={18} color="var(--text-secondary)" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Attendance;
export { employees };
