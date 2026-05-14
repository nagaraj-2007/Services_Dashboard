import React, { useState } from 'react';
import { Mail, Send, Users, User, Building2, Calendar, Search, Trash2, CheckCircle2, Briefcase } from 'lucide-react';
import { employees } from '../data/employeeData';

const Announcements = () => {
  const [formData, setFormData] = useState({
    recipientType: 'all_employees',
    specificRecipient: '',
    specificProject: '',
    subject: '',
    message: ''
  });

  const projects = [
    { id: '1', name: 'Parent App' },
    { id: '2', name: 'Driver App' },
    { id: '3', name: 'Web Portal' },
    { id: '4', name: 'Match App' },
    { id: '5', name: 'Temple App' }
  ];

  const [sentHistory, setSentHistory] = useState([
    {
      id: 1,
      subject: 'Holiday Schedule 2026',
      recipients: 'All Employees',
      date: '2026-05-10',
      status: 'Delivered'
    },
    {
      id: 2,
      subject: 'New Security Protocol',
      recipients: 'Engineering Team',
      date: '2026-05-12',
      status: 'Delivered'
    }
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: Date.now(),
      subject: formData.subject,
      recipients: formData.recipientType === 'all_employees' ? 'All Employees' :                   formData.recipientType === 'all_clients' ? 'All Clients' : 
                  formData.recipientType === 'project_team' ? `${formData.specificProject} Team` :
                  formData.specificRecipient || 'Specific Personnel',
      date: new Date().toISOString().split('T')[0],
      status: 'Sending...'
    };

    setSentHistory([newAnnouncement, ...sentHistory]);
    
    // Simulate API call
    console.log('Sending announcement:', formData);
    
    setTimeout(() => {
      setSentHistory(prev => prev.map(item => 
        item.id === newAnnouncement.id ? { ...item, status: 'Delivered' } : item
      ));
      setFormData({
        recipientType: 'all_employees',
        specificRecipient: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Communications Center</h1>
          <p className="page-subtitle">Send email announcements and broadcast messages to your workforce.</p>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1.5fr 1fr', alignItems: 'start', gap: '1.5rem' }}>
        
        {/* Compose Section */}
        <div className="card glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Mail size={20} color="var(--primary-color)" /> Compose Announcement
          </h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Recipient Type */}
              <div className="form-group">
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Send To *</label>
                <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                  <Users size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                  <select 
                    name="recipientType"
                    required
                    value={formData.recipientType}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', cursor: 'pointer', appearance: 'none' }}
                  >
                    <option value="all_employees">All Employees</option>
                    <option value="all_clients">All Clients</option>
                    <option value="project_team">Specific Project Team</option>
                    <option value="specific">Specific Person</option>
                  </select>
                </div>
              </div>

              {/* Specific Recipient (Conditional) */}
              {formData.recipientType === 'specific' && (
                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Select Personnel *</label>
                  <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                    <User size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                    <select 
                      name="specificRecipient"
                      required
                      value={formData.specificRecipient}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', cursor: 'pointer', appearance: 'none' }}
                    >
                      <option value="" disabled>Choose someone...</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.name}>{emp.name} ({emp.dept})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Project Team (Conditional) */}
              {formData.recipientType === 'project_team' && (
                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Select Project Team *</label>
                  <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                    <Briefcase size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                    <select 
                      name="specificProject"
                      required
                      value={formData.specificProject}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', cursor: 'pointer', appearance: 'none' }}
                    >
                      <option value="" disabled>Choose a project...</option>
                      {projects.map(proj => (
                        <option key={proj.id} value={proj.name}>{proj.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Subject */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Subject Line *</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <input 
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Important: Monthly Town Hall Meeting"
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Message */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Message Content *</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'flex-start', padding: '0', margin: 0, borderRadius: '12px', overflow: 'hidden' }}>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your announcement here..."
                  style={{ width: '100%', minHeight: '180px', padding: '1rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}>
                <Send size={18} /> Send Announcement
              </button>
            </div>
          </form>
        </div>

        {/* History Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>Sent Announcements</h3>
              <button className="btn-icon"><Search size={16} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {sentHistory.map((item, idx) => (
                <div 
                  key={item.id} 
                  style={{ 
                    padding: '1rem 1.25rem', 
                    borderBottom: idx === sentHistory.length - 1 ? 'none' : '1px solid var(--border-color)',
                    transition: 'background 0.2s ease',
                    cursor: 'pointer'
                  }}
                  className="history-item"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.subject}</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={12} /> {item.date}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>To: {item.recipients}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', fontWeight: 700, color: item.status === 'Delivered' ? 'var(--success-color)' : 'var(--warning-color)' }}>
                      {item.status === 'Delivered' && <CheckCircle2 size={12} />}
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: 'var(--primary-color-soft)', border: '1px solid var(--primary-color)' }}>
            <h4 style={{ margin: 0, color: 'var(--primary-color)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Email Service Status</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', fontWeight: 600 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success-color)' }}></div>
              SMTP Gateway: Connected
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Announcements;
