import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, User, Briefcase, Building, Calendar, Rocket, ShieldCheck } from 'lucide-react';

const NewEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: 'Employee',
    dept: 'Engineering',
    project: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate save and redirect back
    console.log('Inviting colleague:', formData);
    navigate('/employees');
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className="btn" 
          onClick={() => navigate('/employees')}
          style={{ padding: '0.5rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="page-title" style={{ margin: 0 }}>Invite Colleague</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>Add a new member to your workforce and assign permissions.</p>
        </div>
      </div>

      <div className="card glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Employee Name */}
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name *</label>
            <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
              <User size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
              <input 
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {/* Role Selection */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Access Level *</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <ShieldCheck size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                <select 
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>

            {/* Department Selection */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Department *</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <Building size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                <select 
                  name="dept"
                  required
                  value={formData.dept}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Operations">Operations</option>
                  <option value="Support">Support</option>
                  <option value="Design">Design</option>
                  <option value="Backend">Backend</option>
                  <option value="HR">HR</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {/* Assigned Project */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Initial Assignment</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <Briefcase size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                <input 
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="e.g. Parent App"
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Joining Date */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Joining Date *</label>
              <div className="search-bar" style={{ width: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                <Calendar size={18} color="var(--text-secondary)" style={{ marginLeft: '1rem' }} />
                <input 
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button 
              type="button" 
              className="btn" 
              onClick={() => navigate('/employees')}
              style={{ background: 'transparent', border: '1px solid var(--border-color)' }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserPlus size={18} /> Invite Colleague
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewEmployee;
