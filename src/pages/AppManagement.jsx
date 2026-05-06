import { Plus, Settings2, ShieldCheck, ShieldAlert, TrendingUp, Folder, ChevronDown, ChevronRight, CalendarClock, Activity, CheckCircle, Rocket, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const clientsData = [
  {
    id: 'c1',
    clientName: 'Selvagam',
    projects: [
      { id: '1', name: 'Parent App', platform: 'Android / iOS', version: '2.4.1', status: 'Healthy', appLink: 'selvagam.com/parent', deliveryStatus: 'In Progress', deliveryTimeline: '15 April 2026', gist: 'Main hub for parents to track student progress.' },
      { id: '2', name: 'Driver App', platform: 'Android', version: '1.8.0', status: 'Warning', appLink: 'selvagam.com/driver', deliveryStatus: 'Pending', deliveryTimeline: '25 April 2026', gist: 'Bus tracking and route optimization for school drivers.' },
      { id: '3', name: 'Web Portal', platform: 'Web', version: 'v3.1.2', status: 'Healthy', appLink: 'selvagam.com/portal', deliveryStatus: 'Completed', deliveryTimeline: '10 May 2026', gist: 'Administrative dashboard for school management.' }
    ]
  },
  {
    id: 'c2',
    clientName: 'Chola Cabs',
    projects: [
      { id: '4', name: 'Driver App', platform: 'Android / iOS', version: '1.2.0', status: 'Healthy', appLink: 'cholacabs.com/driver', deliveryStatus: 'Blocked', deliveryTimeline: '30 June 2026', gist: 'Ride-hailing platform for cab drivers.' }
    ]
  },
  {
    id: 'c3',
    clientName: 'Hope 3 Services',
    projects: [
      { id: '5', name: 'Match App', platform: 'Android / iOS', version: '1.0.4', status: 'Warning', appLink: 'hope3.com/match', deliveryStatus: 'Completed', deliveryTimeline: '12 July 2026', gist: 'Matching algorithm tool for community networking.' },
      { id: '6', name: 'Services Website', platform: 'Web', version: 'v1.0.0', status: 'Healthy', appLink: 'hope3.com', deliveryStatus: 'In Progress', deliveryTimeline: '01 Aug 2026', gist: 'Client-facing website for B2B services.' }
    ]
  },
  {
    id: 'c4',
    clientName: 'CSMT',
    projects: [
      { id: '7', name: 'Temple App', platform: 'Android / iOS', version: 'v0.0.1', status: 'Healthy', appLink: 'csmt.com/temple', deliveryStatus: 'Pending', deliveryTimeline: 'TBD 2026', gist: 'Digital platform for temple darshan, pooja bookings, and donations.' }
    ]
  }
];

const AppManagement = () => {
  const navigate = useNavigate();
  const [expandedClients, setExpandedClients] = useState(['c1', 'c2', 'c3']);
  const [activeTab, setActiveTab] = useState('Progressing'); 
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [newVersion, setNewVersion] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleReleaseClick = (app) => {
    setSelectedApp(app);
    setNewVersion(app.version);
    setIsReleaseModalOpen(true);
  };

  const deployRelease = async () => {
    try {
      await axios.post(`http://localhost:5000/api/apps/${selectedApp.id}/release`, {
        newVersion,
        forceUpdate
      });
      setIsReleaseModalOpen(false);
    } catch (error) {
      console.error('Release failed', error);
    }
  };

  const toggleClient = (clientId) => {
    setExpandedClients(prev => 
      prev.includes(clientId) ? prev.filter(id => id !== clientId) : [...prev, clientId]
    );
  };

  const filterProjects = (projects) => {
    return projects.filter(app => {
      if (activeTab === 'Upcoming') return app.deliveryStatus === 'Pending';
      if (activeTab === 'Progressing') return app.deliveryStatus === 'In Progress' || app.deliveryStatus === 'Blocked';
      if (activeTab === 'Completed') return app.deliveryStatus === 'Completed';
      return true;
    });
  };

  return (
    <>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">Application Hub</h1>
          <p className="page-subtitle">Centralized management of the H3 Product Portfolio.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> New Application
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div 
          className="card stat-card"
          onClick={() => setActiveTab('Upcoming')}
          style={{ cursor: 'pointer', border: activeTab === 'Upcoming' ? '2px solid var(--primary-color)' : '2px solid transparent', transition: 'all 0.2s', padding: '1.25rem', transform: activeTab === 'Upcoming' ? 'translateY(-2px)' : 'none', boxShadow: activeTab === 'Upcoming' ? 'var(--shadow-md)' : 'var(--shadow-sm)' }}
        >
          <div className="stat-icon" style={{ background: activeTab === 'Upcoming' ? 'var(--primary-color)' : 'var(--bg-color)', color: activeTab === 'Upcoming' ? '#fff' : 'var(--text-secondary)' }}><CalendarClock size={24} /></div>
          <div className="stat-info">
            <h3 style={{ color: activeTab === 'Upcoming' ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', transition: 'color 0.2s' }}>UPCOMING APPS</h3>
            <div className="value" style={{ fontSize: '1.75rem' }}>
              {clientsData.reduce((acc, client) => acc + client.projects.filter(p => p.deliveryStatus === 'Pending').length, 0)}
            </div>
          </div>
        </div>

        <div 
          className="card stat-card"
          onClick={() => setActiveTab('Progressing')}
          style={{ cursor: 'pointer', border: activeTab === 'Progressing' ? '2px solid var(--primary-color)' : '2px solid transparent', transition: 'all 0.2s', padding: '1.25rem', transform: activeTab === 'Progressing' ? 'translateY(-2px)' : 'none', boxShadow: activeTab === 'Progressing' ? 'var(--shadow-md)' : 'var(--shadow-sm)' }}
        >
          <div className="stat-icon" style={{ background: activeTab === 'Progressing' ? 'var(--primary-color)' : 'var(--bg-color)', color: activeTab === 'Progressing' ? '#fff' : 'var(--text-secondary)' }}><Activity size={24} /></div>
          <div className="stat-info">
            <h3 style={{ color: activeTab === 'Progressing' ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', transition: 'color 0.2s' }}>IN PROGRESS</h3>
            <div className="value" style={{ fontSize: '1.75rem' }}>
              {clientsData.reduce((acc, client) => acc + client.projects.filter(p => p.deliveryStatus === 'In Progress' || p.deliveryStatus === 'Blocked').length, 0)}
            </div>
          </div>
        </div>

        <div 
          className="card stat-card"
          onClick={() => setActiveTab('Completed')}
          style={{ cursor: 'pointer', border: activeTab === 'Completed' ? '2px solid var(--primary-color)' : '2px solid transparent', transition: 'all 0.2s', padding: '1.25rem', transform: activeTab === 'Completed' ? 'translateY(-2px)' : 'none', boxShadow: activeTab === 'Completed' ? 'var(--shadow-md)' : 'var(--shadow-sm)' }}
        >
          <div className="stat-icon" style={{ background: activeTab === 'Completed' ? 'var(--primary-color)' : 'var(--bg-color)', color: activeTab === 'Completed' ? '#fff' : 'var(--text-secondary)' }}><CheckCircle size={24} /></div>
          <div className="stat-info">
            <h3 style={{ color: activeTab === 'Completed' ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', transition: 'color 0.2s' }}>DELIVERED</h3>
            <div className="value" style={{ fontSize: '1.75rem' }}>
              {clientsData.reduce((acc, client) => acc + client.projects.filter(p => p.deliveryStatus === 'Completed').length, 0)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {clientsData.map(client => {
          const filteredProjects = filterProjects(client.projects);
          
          if (filteredProjects.length === 0) return null; // Hide client if no projects in this category

          const isExpanded = expandedClients.includes(client.id);
          return (
            <div key={client.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Client Header */}
              <div 
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '1rem 1.5rem', background: 'var(--surface-color-hover)', 
                  cursor: 'pointer', borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none'
                }}
                onClick={() => toggleClient(client.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {isExpanded ? <ChevronDown size={20} color="var(--text-secondary)" /> : <ChevronRight size={20} color="var(--text-secondary)" />}
                  <Folder color="var(--primary-color)" size={22} />
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{client.clientName}</h3>
                  <div className="badge badge-success" style={{ marginLeft: '1rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    {filteredProjects.length} Applications
                  </div>
                </div>
                <button className="btn" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--border-color)', background: 'var(--surface-color)' }}>Edit Client</button>
              </div>

              {/* Projects Table */}
              {isExpanded && (
                <div className="table-container">
                  <table className="table" style={{ margin: 0 }}>
                    <thead style={{ background: 'var(--bg-color)' }}>
                      {activeTab === 'Upcoming' ? (
                        <tr>
                          <th style={{ paddingLeft: '3.5rem' }}>Project / App Name</th>
                          <th>Delivery Timeline</th>
                          <th>Project Gist</th>
                        </tr>
                      ) : (
                        <tr>
                          <th style={{ paddingLeft: '3.5rem' }}>Project / App Name</th>
                          <th>Platform</th>
                          <th>Version</th>
                          <th>Live Status</th>
                          <th>App Link</th>
                          <th>Delivery Status</th>
                          <th>Delivery Timeline</th>
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {filteredProjects.map(app => (
                        <tr key={app.id}>
                          <td style={{ paddingLeft: '3.5rem' }}>
                            <div 
                              onClick={() => navigate(`/apps/${app.id}/dashboard`)}
                              style={{ cursor: 'pointer', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                              {app.name} <TrendingUp size={14} />
                            </div>
                          </td>
                          {activeTab === 'Upcoming' ? (
                            <>
                              <td style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{app.deliveryTimeline}</td>
                              <td style={{ fontSize: '0.85rem', color: 'var(--text-primary)', maxWidth: '400px', lineHeight: 1.4 }}>{app.gist}</td>
                            </>
                          ) : (
                            <>
                              <td>{app.platform}</td>
                              <td><span className="badge badge-success" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary-color)' }}>{app.version}</span></td>
                              <td>
                                {app.status === 'Healthy' 
                                  ? <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success-color)'}}><ShieldCheck size={16}/> Healthy</div>
                                  : <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--warning-color)'}}><ShieldAlert size={16}/> Needs Update</div>
                                }
                              </td>
                              <td><a href={`https://${app.appLink}`} target="_blank" rel="noreferrer" style={{color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.85rem'}}>{app.appLink}</a></td>
                              <td>
                                <span className={`badge ${app.deliveryStatus === 'Completed' ? 'badge-success' : app.deliveryStatus === 'Blocked' ? 'badge-danger' : app.deliveryStatus === 'In Progress' ? '' : 'badge-warning'}`} style={app.deliveryStatus === 'In Progress' ? {background: 'rgba(99,102,241,0.1)', color: 'var(--primary-color)'} : {}}>
                                  {app.deliveryStatus}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className="btn" 
                                  onClick={() => handleReleaseClick(app)}
                                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}
                                >
                                  Deploy Release
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
        {clientsData.every(client => filterProjects(client.projects).length === 0) && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No applications found</h3>
            <p>There are no applications currently in the {activeTab} stage.</p>
          </div>
        )}
      </div>

      {isReleaseModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card glass-card" style={{ width: '400px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Rocket className="text-primary" /> Deploy Release</h2>
              <X style={{ cursor: 'pointer' }} onClick={() => setIsReleaseModalOpen(false)} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Deploying new version for <strong>{selectedApp?.name}</strong></p>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>New Version String</label>
              <input 
                className="search-bar" 
                style={{ width: '100%' }} 
                value={newVersion}
                onChange={(e) => setNewVersion(e.target.value)}
                placeholder="e.g. 2.5.0"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="checkbox" checked={forceUpdate} onChange={(e) => setForceUpdate(e.target.checked)} />
              <label style={{ fontSize: '0.875rem' }}>Force Update (Critical Release)</label>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={deployRelease}>Deploy Now</button>
              <button className="btn" style={{ flex: 1, border: '1px solid var(--border-color)' }} onClick={() => setIsReleaseModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppManagement;
