import { Plus, Settings2, ShieldCheck, ShieldAlert, Folder, CalendarClock, Activity, CheckCircle, Rocket, X, Smartphone, Monitor, Globe, ChevronRight } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('Progressing'); 
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [newVersion, setNewVersion] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

  // Flatten the data so we can display it nicely in a grid
  const allProjects = clientsData.flatMap(client => 
    client.projects.map(p => ({ ...p, clientName: client.clientName, clientId: client.id }))
  );

  const filterProjects = (projects) => {
    return projects.filter(app => {
      if (activeTab === 'Upcoming') return app.deliveryStatus === 'Pending';
      if (activeTab === 'Progressing') return app.deliveryStatus === 'In Progress' || app.deliveryStatus === 'Blocked';
      if (activeTab === 'Completed') return app.deliveryStatus === 'Completed';
      return true;
    });
  };

  const displayedProjects = filterProjects(allProjects);

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

  const getPlatformIcon = (platform) => {
    if (platform.includes('Web')) return <Globe size={18} />;
    return <Smartphone size={18} />;
  };

  return (
    <>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title">Application Hub</h1>
          <p className="page-subtitle">Centralized management of the H3 Product Portfolio.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" onClick={() => navigate('/apps/new-client')} style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>
            <Folder size={18} /> New Client
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/apps/new-app')}>
            <Plus size={18} /> New Application
          </button>
        </div>
      </div>

      {/* Enterprise Underline Tab Navigation */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', width: '100%', overflowX: 'auto' }}>
        {[
          { id: 'Upcoming', icon: CalendarClock, label: 'Upcoming', count: allProjects.filter(p => p.deliveryStatus === 'Pending').length },
          { id: 'Progressing', icon: Activity, label: 'In Progress', count: allProjects.filter(p => p.deliveryStatus === 'In Progress' || p.deliveryStatus === 'Blocked').length },
          { id: 'Completed', icon: CheckCircle, label: 'Delivered', count: allProjects.filter(p => p.deliveryStatus === 'Completed').length }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.25rem 1rem 0.25rem', 
                cursor: 'pointer', transition: 'all 0.2s',
                borderBottom: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
                color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                marginBottom: '-1px',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={18} />
              {tab.label}
              <span style={{ 
                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'var(--surface-color)', 
                padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', 
                marginLeft: '0.5rem', color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: isActive ? 'rgba(99, 102, 241, 0.2)' : 'var(--border-color)'
              }}>
                {tab.count}
              </span>
            </div>
          )
        })}
      </div>

      {/* Beautiful App List */}
      {displayedProjects.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2rem' }}>
          {displayedProjects.map(app => (
            <div 
              key={app.id} 
              className="card"
              onClick={() => navigate(`/apps/${app.id}/dashboard`)}
              style={{ 
                padding: '1.25rem 1.5rem', 
                display: 'flex', 
                alignItems: 'center',
                gap: '2rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Left Accent Line based on status */}
              <div style={{ 
                position: 'absolute', top: 0, bottom: 0, left: 0, width: '4px',
                background: app.status === 'Healthy' ? 'var(--success-color)' : (app.status === 'Warning' ? 'var(--warning-color)' : 'var(--text-secondary)')
              }}></div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 250px', minWidth: '200px' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', 
                  color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  {getPlatformIcon(app.platform)}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{app.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <Folder size={12} /> {app.clientName}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, flex: '2 1 400px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {app.gist}
              </p>

              {/* Status and version pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: '1 1 200px', justifyContent: 'flex-start' }}>
                <span className="badge badge-success" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)' }}>
                  v{app.version}
                </span>
                {app.deliveryStatus !== 'Completed' && (
                  <span className={`badge ${app.deliveryStatus === 'Blocked' ? 'badge-danger' : 'badge-warning'}`}>
                    {app.deliveryStatus}
                  </span>
                )}
                {app.status === 'Healthy' 
                  ? <span className="badge badge-success" style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}><ShieldCheck size={12}/> Healthy</span>
                  : <span className="badge badge-warning" style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}><ShieldAlert size={12}/> Needs Update</span>
                }
              </div>

              {/* Footer Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flex: '0 0 120px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {activeTab === 'Upcoming' ? `Launch: ${app.deliveryTimeline}` : app.platform}
                </div>
                
                {activeTab !== 'Upcoming' ? (
                  <button 
                    className="btn" 
                    onClick={(e) => { e.stopPropagation(); handleReleaseClick(app); }}
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', background: 'transparent' }}
                  >
                    Deploy
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 600 }}>
                    Setup <ChevronRight size={14} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'var(--surface-color-hover)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Folder size={40} color="var(--text-secondary)" opacity={0.5} />
          </div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>No {activeTab} Applications</h3>
          <p style={{ maxWidth: '400px', margin: 0 }}>There are currently no applications in the {activeTab} stage. When new projects are assigned, they will appear here.</p>
          {activeTab === 'Upcoming' && (
            <button className="btn btn-primary" onClick={() => navigate('/apps/new-app')} style={{ marginTop: '1rem' }}>
              <Plus size={18} /> Create New Application
            </button>
          )}
        </div>
      )}

      {/* Release Modal */}
      {isReleaseModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card glass-card" style={{ width: '400px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}><Rocket className="text-primary" /> Deploy Release</h2>
              <X style={{ cursor: 'pointer' }} onClick={() => setIsReleaseModalOpen(false)} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Deploying new version for <strong>{selectedApp?.name}</strong></p>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem', fontWeight: 600 }}>New Version String</label>
              <div className="search-bar" style={{ width: '100%', padding: '0.5rem' }}>
                <input 
                  style={{ width: '100%', marginLeft: 0 }} 
                  value={newVersion}
                  onChange={(e) => setNewVersion(e.target.value)}
                  placeholder="e.g. 2.5.0"
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="checkbox" checked={forceUpdate} onChange={(e) => setForceUpdate(e.target.checked)} id="forceUpdate" />
              <label htmlFor="forceUpdate" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>Force Update (Critical Release)</label>
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
