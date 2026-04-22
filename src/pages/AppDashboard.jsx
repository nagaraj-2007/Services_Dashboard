import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CalendarHeart, CheckCircle2, ShieldAlert, MoreHorizontal, User, Play, LayoutGrid, Calendar } from 'lucide-react';

const dummyProjects = {
  "1": { name: 'Parent App', client: 'Selvagam', deliveryDate: '15 April 2026', status: 'Healthy', team: ['E101', 'E103'] },
  "2": { name: 'Driver App', client: 'Selvagam', deliveryDate: '25 April 2026', status: 'Warning', team: ['E104'] },
  "3": { name: 'Web Portal', client: 'Selvagam', deliveryDate: '10 May 2026', status: 'Healthy', team: ['E101'] },
  "4": { name: 'Driver App', client: 'Chola Cabs', deliveryDate: '30 June 2026', status: 'Healthy', team: ['E102', 'E105'] },
  "5": { name: 'Match App', client: 'Hope 3 Services', deliveryDate: '12 July 2026', status: 'Warning', team: ['E104', 'E103'] },
  "6": { name: 'Services Website', client: 'Hope 3 Services', deliveryDate: '01 August 2026', status: 'Healthy', team: ['E101', 'E106'] },
};

const dummyTeamMembers = {
  'E101': { name: 'Alice Smith', role: 'Lead Dev' },
  'E102': { name: 'Bob Johnson', role: 'Project Manager' },
  'E103': { name: 'Charlie Lee', role: 'Support Eng' },
  'E104': { name: 'Diana King', role: 'UI Designer' },
  'E105': { name: 'Ethan Patel', role: 'Backend Dev' },
  'E106': { name: 'Fatima Noor', role: 'DevOps' }
};

const projectTasks = [
  { id: 1, title: 'Build new authentication flow', assignees: ['E101'], status: 'In Progress', type: 'Backend', priority: 'High' },
  { id: 2, title: 'Design home screen UI', assignees: ['E104'], status: 'Completed', type: 'Design', priority: 'Medium' },
  { id: 3, title: 'Fix notification rendering bug', assignees: ['E101', 'E103'], status: 'Pending', type: 'Frontend', priority: 'High' },
  { id: 4, title: 'Setup CI/CD deployment pipeline', assignees: ['E106'], status: 'Blocked', type: 'DevOps', priority: 'Critical' },
  { id: 5, title: 'Write API Documentation', assignees: ['E102'], status: 'Pending', type: 'Management', priority: 'Low' },
];

const TASK_STATUS_COLORS = {
  'Pending': { bg: 'var(--bg-color)', text: 'var(--text-secondary)' },
  'In Progress': { bg: 'rgba(99,102,241,0.1)', text: 'var(--primary-color)' },
  'Completed': { bg: 'rgba(16,185,129,0.1)', text: 'var(--success-color)' },
  'Blocked': { bg: 'rgba(239,68,68,0.1)', text: 'var(--danger-color)' },
};

const AppDashboard = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const project = dummyProjects[appId] || { name: 'Unknown Project', client: 'Unknown', deliveryDate: 'TBD', status: 'Unknown', team: [] };

  const taskStats = projectTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, { 'Pending': 0, 'In Progress': 0, 'Blocked': 0, 'Completed': 0 });

  return (
    <>
      <div className="page-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <button className="btn-icon" onClick={() => navigate('/apps')} style={{ marginTop: 4 }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <h1 className="page-title">{project.name} Workspace</h1>
              <span className={`badge ${project.status === 'Healthy' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>
                {project.status === 'Healthy' ? <CheckCircle2 size={12} style={{marginRight: 4}}/> : <ShieldAlert size={12} style={{marginRight: 4}}/>}
                {project.status} Status
              </span>
            </div>
            <p className="page-subtitle">Project management space for <strong>{project.client}</strong></p>
          </div>
        </div>
        
        {/* VIEW ANALYTICS BUTTON */}
        <button 
          className="btn btn-primary" 
          style={{ gap: 8, padding: '0.6rem 1.25rem', fontSize: '0.9rem', background: 'var(--primary-color)' }}
          onClick={() => navigate(`/apps/${appId}/analytics`)}
        >
          <LayoutGrid size={16} /> View Deep Analytics
        </button>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1fr 3fr', alignItems: 'start', marginBottom: '1.5rem' }}>
        
        {/* Left Column: Project Details & Team */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Calendar size={16} /> DELIVERY TIMELINE
            </h3>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{project.deliveryDate}</div>
            <div style={{ background: 'var(--border-color)', height: 6, borderRadius: 3, marginTop: '1rem', overflow: 'hidden' }}>
               <div style={{ background: 'var(--success-color)', width: '65%', height: '100%' }}></div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'right' }}>65% Time Elapsed</div>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-color-hover)' }}>
              <h3 style={{ margin: 0, fontSize: '0.9rem' }}>Project Team ({project.team.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {project.team.map((empId, idx) => {
                const emp = dummyTeamMembers[empId];
                return (
                  <div key={empId} 
                    style={{ 
                      padding: '0.75rem 1rem', 
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      borderBottom: idx === project.team.length - 1 ? 'none' : '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/employees/${empId}`)}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#a855f7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600 }}>
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{emp.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{emp.role}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-color-hover)' }}>
              <h3 style={{ margin: 0, fontSize: '0.9rem' }}>Version History & Releases</h3>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               {(project.versions || [
                 { v: 'v2.4.1', date: 'Oct 12, 2025', msg: 'Fixed push notification payload crashing on background state.' },
                 { v: 'v2.4.0', date: 'Sep 28, 2025', msg: 'Major overhaul of Profile UI and implementation of 2FA login flow.' },
                 { v: 'v2.3.9', date: 'Sep 05, 2025', msg: 'Resolved memory leak in Chat module and optimized image caching.' }
               ]).map((ver, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                    {/* Timeline line */}
                    {i !== 2 && <div style={{ position: 'absolute', left: '0.35rem', top: '1.5rem', bottom: '-1rem', width: 2, background: 'var(--border-color)', zIndex: 0 }}></div>}
                    
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: i === 0 ? 'var(--success-color)' : 'var(--border-color)', border: '2px solid var(--bg-color)', zIndex: 1, marginTop: '0.25rem', flexShrink: 0 }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: i === 0 ? 'var(--primary-color)' : 'var(--text-primary)' }}>{ver.v} {i === 0 && '(Latest)'}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{ver.date}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: '0.1rem' }}>
                        {ver.msg}
                      </div>
                    </div>
                  </div>
               ))}
               <button className="btn" style={{ fontSize: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', padding: '0.25rem' }}>View Older Releases</button>
            </div>
          </div>

        </div>

        {/* Right Column: Kanban/Task Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Task Summary Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{taskStats['Pending']}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>PENDING TASKS</div>
            </div>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-color)' }}>{taskStats['In Progress']}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>IN PROGRESS</div>
            </div>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--danger-color)' }}>{taskStats['Blocked']}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>BLOCKED</div>
            </div>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success-color)' }}>{taskStats['Completed']}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>COMPLETED</div>
            </div>
          </div>

          <div className="card" style={{ flex: 1 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Active Task Board</h3>
                <button className="btn" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>Filter Tasks</button>
             </div>

             <div className="table-container">
               <table className="table">
                 <thead>
                   <tr>
                     <th>Task Description</th>
                     <th>Status</th>
                     <th>Priority</th>
                     <th>Assigned Employees</th>
                   </tr>
                 </thead>
                 <tbody>
                    {projectTasks.map(task => {
                      const stColor = TASK_STATUS_COLORS[task.status];
                      return (
                        <tr key={task.id} style={{ transition: 'none' }}>
                          <td>
                            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{task.title}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Ticket #{task.id} · {task.type}</div>
                          </td>
                          <td>
                            <span style={{ background: stColor.bg, color: stColor.text, padding: '0.25rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                              {task.status === 'In Progress' && <Play size={10} fill="currentColor"/>}
                              {task.status === 'Completed' && <CheckCircle2 size={10} />}
                              {task.status === 'Blocked' && <ShieldAlert size={10} />}
                              {task.status === 'Pending' && <Clock size={10} />}
                              {task.status}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: task.priority === 'Critical' ? 'var(--danger-color)' : task.priority === 'High' ? 'var(--warning-color)' : 'var(--text-secondary)' }}>
                              {task.priority}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '-0.5rem' }}>
                              {task.assignees.map(empId => {
                                const emp = dummyTeamMembers[empId] || { name: 'Unknown' };
                                return (
                                  <div key={empId} title={emp.name} style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 600, border: '2px solid var(--surface-color)', marginLeft: task.assignees.length > 1 ? -8 : 0, cursor: 'pointer' }} onClick={() => navigate(`/employees/${empId}`)}>
                                    {emp.name.charAt(0)}
                                  </div>
                                )
                              })}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                 </tbody>
               </table>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AppDashboard;
