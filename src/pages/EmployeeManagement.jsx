import { UserPlus, MoreVertical, Search, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const employees = [
  { id: 'E101', name: 'Alice Smith', role: 'Super Admin', dept: 'Engineering', date: '2023-01-15', project: 'Parent App' },
  { id: 'E102', name: 'Bob Johnson', role: 'Manager', dept: 'Operations', date: '2023-03-22', project: 'Driver App' },
  { id: 'E103', name: 'Charlie Lee', role: 'Employee', dept: 'Support', date: '2023-06-10', project: 'Match App' },
  { id: 'E104', name: 'Diana King', role: 'Employee', dept: 'Design', date: '2023-08-05', project: 'Temple App' }
];

const EmployeeManagement = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Employees Directory</h1>
          <p className="page-subtitle">Manage access controls and track productivity across the team.</p>
        </div>
        <button className="btn btn-primary">
          <UserPlus size={18} /> Invite Colleague
        </button>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="search-bar" style={{ width: '250px' }}>
            <Search size={16} color="var(--text-secondary)" />
            <input type="text" placeholder="Search employee..." style={{ fontSize: '0.875rem' }} />
          </div>
          <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Operations</option>
          </select>
        </div>
        <div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Employees: <strong>142</strong></span>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Role</th>
                <th>Department</th>
                <th>Join Date</th>
                <th>Working Project</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr 
                  key={emp.id} 
                  onClick={() => navigate(`/employees/${emp.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="avatar" style={{width: '32px', height: '32px', fontSize: '12px'}}>{emp.name.charAt(0)}</div>
                      <strong style={{ color: 'var(--primary-color)' }}>{emp.name}</strong>
                    </div>
                  </td>
                  <td>{emp.id}</td>
                  <td>
                    <span className={`badge ${emp.role === 'Super Admin' ? 'badge-danger' : emp.role === 'Manager' ? 'badge-warning' : 'badge-success'}`}>
                      {emp.role}
                    </span>
                  </td>
                  <td>{emp.dept}</td>
                  <td>{emp.date}</td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--primary-color)', background: 'var(--surface-color)', padding: '0.2rem 0.5rem', borderRadius: 4 }}>
                      {emp.project}
                    </span>
                  </td>
                  <td>
                    <button className="btn-icon"><TrendingUp size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeManagement;
