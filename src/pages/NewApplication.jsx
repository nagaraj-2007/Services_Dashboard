import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, Smartphone, Globe, CalendarClock, ArrowLeft, Rocket, AlignLeft } from 'lucide-react';
import { clientsData } from './AppManagement';

const NewApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    clientId: '',
    platform: 'Android / iOS',
    deliveryTimeline: '',
    gist: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate save and redirect back
    console.log('Creating application:', formData);
    navigate('/apps');
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className="btn" 
          onClick={() => navigate('/apps')}
          style={{ padding: '0.5rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="page-title" style={{ margin: 0 }}>Create Application</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>Register a new software project to your portfolio.</p>
        </div>
      </div>

      <div className="card glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Application Name */}
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Application Name *</label>
            <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
              <Rocket size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
              <input 
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Driver Tracking App"
                style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {/* Client Selection */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Select Client *</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <Folder size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                <select 
                  name="clientId"
                  required
                  value={formData.clientId}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="" disabled>Choose a client...</option>
                  {clientsData.map(client => (
                    <option key={client.id} value={client.id}>{client.clientName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Platform Selection */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Target Platform *</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                {formData.platform.includes('Web') ? (
                  <Globe size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                ) : (
                  <Smartphone size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                )}
                <select 
                  name="platform"
                  required
                  value={formData.platform}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="Android / iOS">Android & iOS</option>
                  <option value="Android">Android Only</option>
                  <option value="iOS">iOS Only</option>
                  <option value="Web">Web Portal</option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Expected Launch Date</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <CalendarClock size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                <input 
                  type="text"
                  name="deliveryTimeline"
                  value={formData.deliveryTimeline}
                  onChange={handleChange}
                  placeholder="e.g. 15 Aug 2026"
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
          </div>

          {/* Gist / Description */}
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Application Description (Gist) *</label>
            <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'flex-start', padding: '0', margin: 0, borderRadius: '12px', overflow: 'hidden' }}>
              <AlignLeft size={18} color="var(--text-secondary)" style={{ margin: '1rem' }} />
              <textarea 
                name="gist"
                required
                value={formData.gist}
                onChange={handleChange}
                placeholder="Provide a brief summary of what this application does..."
                style={{ width: '100%', minHeight: '120px', padding: '1rem 1rem 1rem 0', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', resize: 'vertical' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button 
              type="button" 
              className="btn" 
              onClick={() => navigate('/apps')}
              style={{ background: 'transparent', border: '1px solid var(--border-color)' }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Rocket size={18} /> Create Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewApplication;
