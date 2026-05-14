import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Phone, FileText, ArrowLeft, Save } from 'lucide-react';

const NewClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    industry: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate save and redirect back
    console.log('Saving client:', formData);
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
          <h1 className="page-title" style={{ margin: 0 }}>Add New Client</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>Create a new client profile to associate with applications.</p>
        </div>
      </div>

      <div className="card glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Client Name */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Client / Company Name *</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <Building2 size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                <input 
                  type="text"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="e.g. Hope 3 Services"
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Industry */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Industry</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <input 
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Technology, Education"
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Primary Email</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <Mail size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@company.com"
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone Number</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <Phone size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Notes / Description</label>
            <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'flex-start', padding: '0', margin: 0, borderRadius: '12px', overflow: 'hidden' }}>
              <FileText size={18} color="var(--text-secondary)" style={{ margin: '1rem' }} />
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any additional details about this client..."
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
              <Save size={18} /> Save Client
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewClient;
