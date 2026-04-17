import React, { useState } from 'react';
import './AuthModal.css';

const ROLES = [
  'Data Scientist', 'ML Engineer', 'Data Analyst', 'Full Stack Developer',
  'Android Developer', 'UI/UX Designer', 'Business Analyst', 'Project Manager',
  'Content Creator', 'Graphic Designer', 'Career Counsellor', 'Real Estate Agent',
  'Data Warehouse Developer',
];

export default function AuthModal({ onClose, onLogin }) {
  const [tab, setTab] = useState('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass]   = useState('');
  const [loginErr, setLoginErr]     = useState('');

  // Signup state
  const [signName, setSignName]   = useState('');
  const [signEmail, setSignEmail] = useState('');
  const [signPass, setSignPass]   = useState('');
  const [signRole, setSignRole]   = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills]         = useState([]);
  const [signErr, setSignErr]       = useState('');

  const handleAddSkill = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };
  const removeSkill = (s) => setSkills(skills.filter(x => x !== s));

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) { setLoginErr('Please fill in all fields.'); return; }
    // Mock: any email+password works
    const initials = loginEmail.split('@')[0].slice(0,2).toUpperCase();
    onLogin({ name: loginEmail.split('@')[0], email: loginEmail, initials, role: '', skills: [], projects: [] });
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signName || !signEmail || !signPass) { setSignErr('Please fill in all required fields.'); return; }
    const parts = signName.trim().split(' ');
    const initials = (parts[0][0] + (parts[1] ? parts[1][0] : parts[0][1] || '')).toUpperCase();
    onLogin({ name: signName.trim(), email: signEmail, initials, role: signRole, skills, projects: [] });
    onClose();
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="auth-close" onClick={onClose}>✕</button>

        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo-icon">⬡</span>
          <span className="auth-logo-text">SkillBridge</span>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={`auth-tab${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')}>Login</button>
          <button className={`auth-tab${tab === 'signup' ? ' active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
        </div>

        {/* ───── LOGIN ───── */}
        {tab === 'login' && (
          <form className="auth-form" onSubmit={handleLogin} noValidate>
            <h2 className="auth-heading">Welcome back 👋</h2>
            <p className="auth-sub">Login to access your career profile</p>

            {loginErr && <p className="auth-err">{loginErr}</p>}

            <label className="auth-label">Email Address</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              required
            />

            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="Enter your password"
              value={loginPass}
              onChange={e => setLoginPass(e.target.value)}
              required
            />

            <button type="submit" className="auth-btn-primary">Login to My Profile →</button>
            <p className="auth-switch">Don't have an account? <button type="button" className="auth-link" onClick={() => setTab('signup')}>Sign Up</button></p>
          </form>
        )}

        {/* ───── SIGNUP ───── */}
        {tab === 'signup' && (
          <form className="auth-form" onSubmit={handleSignup} noValidate>
            <h2 className="auth-heading">Create your profile ✨</h2>
            <p className="auth-sub">Join SkillBridge and bridge your career gap</p>

            {signErr && <p className="auth-err">{signErr}</p>}

            <label className="auth-label">Full Name <span className="req">*</span></label>
            <input
              className="auth-input"
              type="text"
              placeholder="e.g. Rohan Sharma"
              value={signName}
              onChange={e => setSignName(e.target.value)}
              required
            />

            <label className="auth-label">Email Address <span className="req">*</span></label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={signEmail}
              onChange={e => setSignEmail(e.target.value)}
              required
            />

            <label className="auth-label">Password <span className="req">*</span></label>
            <input
              className="auth-input"
              type="password"
              placeholder="Create a strong password"
              value={signPass}
              onChange={e => setSignPass(e.target.value)}
              required
            />

            <label className="auth-label">Target Role</label>
            <select className="auth-input auth-select" value={signRole} onChange={e => setSignRole(e.target.value)}>
              <option value="">Select your target role…</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <label className="auth-label">Your Skills <span className="auth-hint">(press Enter to add)</span></label>
            <div className="skills-input-wrap">
              {skills.map(s => (
                <span key={s} className="skill-tag">
                  {s} <button type="button" onClick={() => removeSkill(s)}>×</button>
                </span>
              ))}
              <input
                className="skills-inner-input"
                type="text"
                placeholder="e.g. Python, React…"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
              />
            </div>

            <button type="submit" className="auth-btn-primary">Create My Profile →</button>
            <p className="auth-switch">Already have an account? <button type="button" className="auth-link" onClick={() => setTab('login')}>Login</button></p>
          </form>
        )}

      </div>
    </div>
  );
}
