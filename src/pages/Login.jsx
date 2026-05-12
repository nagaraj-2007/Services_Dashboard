import { useState } from 'react';
import { Server, Lock, User } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password) {
      onLogin(true);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'var(--bg-color)' }}>
      {/* Branding Section */}
      <div className="login-branding" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--primary-color), #a855f7)', color: 'white', padding: '2rem' }}>
        <Server size={80} style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', color: 'white' }}>Control Hub</h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9, textAlign: 'center', maxWidth: '400px' }}>
          Enterprise dashboard for managing applications, employees, and infrastructure.
        </p>
      </div>

      {/* Login Form Section */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>Please enter your credentials to access your account.</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email Address</label>
              <div className="search-bar" style={{ width: '100%' }}>
                <User size={18} color="var(--text-secondary)" />
                <input type="email" placeholder="admin@hope3.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
                <a href="#" style={{ fontSize: '0.75rem' }}>Forgot Password?</a>
              </div>
              <div className="search-bar" style={{ width: '100%' }}>
                <Lock size={18} color="var(--text-secondary)" />
                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', marginTop: '1rem' }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
