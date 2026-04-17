import React, { useState, useMemo } from 'react';
import './UserDashboardSection.css';

// ── Reusable SVG Donut Chart ──────────────────────────────────────────────────
function DonutChart({ segments, size = 180 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.34; // ring radius
  const strokeW = size * 0.12;
  const circ = 2 * Math.PI * r;

  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;

  let offset = 0;
  const slices = segments.map((seg) => {
    const fraction = seg.value / total;
    const dash = fraction * circ;
    const gap = circ - dash;
    // start from top: dashoffset = circ/4 - accumulated
    const dashOffset = circ / 4 - offset * circ;
    offset += fraction;
    return { ...seg, dash, gap, dashOffset };
  });

  const overallPct = Math.round(segments.reduce((s, seg) => s + seg.pct * seg.weight, 0));

  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f4f8" strokeWidth={strokeW} />
        {slices.map((seg, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW}
            strokeDasharray={`${seg.dash} ${seg.gap}`}
            strokeDashoffset={seg.dashOffset}
            strokeLinecap="butt"
            style={{ transition: 'stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease' }}
          />
        ))}
        {/* Center label */}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={size * 0.18} fontWeight="800" fill="#002147" fontFamily="Lora, Georgia, serif">
          {overallPct}%
        </text>
        <text x={cx} y={cy + size * 0.1} textAnchor="middle" fontSize={size * 0.075} fill="#8a9cae" fontFamily="Inter, sans-serif">
          Progress
        </text>
      </svg>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function UserDashboardSection({ currentUser, setCurrentUser }) {
  const [activeResumeDetail, setActiveResumeDetail] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', desc: '', tech: '' });
  const [addingProject, setAddingProject] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [coursesCompleted, setCoursesCompleted] = useState([]); // track course IDs marked done

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [showExpertSelect, setShowExpertSelect] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const EXPERTS = [
    { id: 1, name: 'Ayesha Khan', role: 'Senior Data Scientist & ML Engineer', exp: '6+ years', desc: 'Specializes in data science, machine learning, and analytics. Guides roles like Data Scientist, ML Engineer, and Data Analyst with a focus on real-world projects.' },
    { id: 2, name: 'Rahul Verma', role: 'Full Stack & Android Developer', exp: '5+ years', desc: 'Expert in building scalable web and mobile applications. Reviews resumes for Full Stack, Android, and Data Warehouse Developer roles.' },
    { id: 3, name: 'Sneha Iyer', role: 'Product Manager & Business Analyst', exp: '7+ years', desc: 'Focuses on product strategy, business analysis, and data-driven decision making for BA and Project Manager roles.' },
    { id: 4, name: 'Arjun Malhotra', role: 'UI/UX & Graphic Designer', exp: '4+ years', desc: 'Specialist in user experience, visual design, and branding. Evaluates UI/UX and Graphic Design portfolios and resumes.' },
    { id: 5, name: 'Kavya Reddy', role: 'Career Coach & Content Strategist', exp: '6+ years', desc: 'Experienced in personal branding and communication. Helps Content Creators, Career Counsellors, and Real Estate professionals build strong profiles.' }
  ];

  const handleEditProfileClick = () => {
    setEditForm(user);
    setShowEditProfile(true);
  };

  const handleSaveProfile = () => {
    setCurrentUser && setCurrentUser(editForm);
    setShowEditProfile(false);
  };

  // Use data from logged-in user or fallback to mock
  const user = currentUser || {
    name: 'ROHAN',
    initials: 'RS',
    email: 'rohan.sharma@example.com',
    role: 'Aspiring Data Scientist',
    skills: ['Python', 'SQL', 'Pandas'],
    projects: [],
  };

  const handleAddProject = () => {
    if (!newProject.title.trim()) return;
    const updated = {
      ...user,
      projects: [...(user.projects || []), { ...newProject, id: Date.now() }],
    };
    setCurrentUser && setCurrentUser(updated);
    setNewProject({ title: '', desc: '', tech: '' });
    setAddingProject(false);
  };

  const handleAddSkill = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && newSkill.trim()) {
      e.preventDefault();
      const skill = newSkill.trim();
      if (!(user.skills || []).includes(skill)) {
        const updated = { ...user, skills: [...(user.skills || []), skill] };
        setCurrentUser && setCurrentUser(updated);
      }
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (s) => {
    const updated = { ...user, skills: (user.skills || []).filter(x => x !== s) };
    setCurrentUser && setCurrentUser(updated);
  };

  const handleRemoveProject = (id) => {
    const updated = { ...user, projects: (user.projects || []).filter(p => p.id !== id) };
    setCurrentUser && setCurrentUser(updated);
  };

  // Mock Data (unchanged)
  const submissionHistory = [
    { id: 1, date: 'Oct 12, 2023', status: 'Completed', score: 78 },
    { id: 2, date: 'Sep 05, 2023', status: 'Completed', score: 65 },
    { id: 3, date: 'Aug 21, 2023', status: 'In Review', score: '-' },
  ];

  const notifications = [
    { type: 'success', text: 'Review completed by Kavya Reddy.', time: '2 hours ago' },
    { type: 'warning', text: 'Resume under review. ETA: 24hrs.', time: '1 day ago' },
    { type: 'info', text: 'Resume submitted for Data Scientist role.', time: '2 days ago' },
  ];

  const recommendedCourses = [
    { id: 1, name: 'Machine Learning Specialization', provider: 'Coursera', topic: 'Machine Learning', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
    { id: 2, name: 'Docker Mastery: with Kubernetes', provider: 'Udemy', topic: 'Docker', url: 'https://www.udemy.com/course/docker-mastery/' },
    { id: 3, name: 'PySpark for Big Data', provider: 'DataCamp', topic: 'PySpark', url: 'https://www.datacamp.com/courses/introduction-to-pyspark' }
  ];

  const missingSkills = ['Machine Learning', 'Docker', 'PySpark'];

  // ── Dynamic chart data ────────────────────────────────────────────────────
  const SKILL_TARGET   = 10;  // target skills count
  const PROJECT_TARGET = 5;   // target projects count
  const COURSE_TARGET  = recommendedCourses.length;

  const skillPct   = Math.min(Math.round(((user.skills || []).length / SKILL_TARGET) * 100), 100);
  const projectPct = Math.min(Math.round(((user.projects || []).length / PROJECT_TARGET) * 100), 100);
  const coursePct  = Math.min(Math.round((coursesCompleted.length / COURSE_TARGET) * 100), 100);
  // skill gap covered = how many missing skills are now in user.skills
  const gapCovered = missingSkills.filter(s => (user.skills || []).includes(s)).length;
  const gapPct     = Math.min(Math.round((gapCovered / missingSkills.length) * 100), 100);

  const chartSegments = [
    { label: 'Skills Learned',   value: Math.max(skillPct, 1),   pct: skillPct,   weight: 0.25, color: '#f97316' },
    { label: 'Projects Built',   value: Math.max(projectPct, 1), pct: projectPct, weight: 0.25, color: '#002147' },
    { label: 'Courses Completed',value: Math.max(coursePct, 1),  pct: coursePct,  weight: 0.25, color: '#10b981' },
    { label: 'Skill Gap Covered',value: Math.max(gapPct, 1),     pct: gapPct,     weight: 0.25, color: '#3b82f6' },
  ];

  const toggleCourse = (id) => {
    setCoursesCompleted(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };
  // ──────────────────────────────────────────────────────────────────────────

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginEmail === 'rohan.sharma@example.com' && loginPassword === 'Rohan@123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  if (!isAuthenticated && !currentUser) {
    return (
      <section className="user-dashboard-sec" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#ffffff' }}>
        <div style={{ background: '#002147', padding: '3rem', borderRadius: '16px', color: '#fff', width: '100%', maxWidth: '420px', boxShadow: '0 8px 32px rgba(0,33,71,0.2)' }}>
          <h2 style={{ fontFamily: 'Lora, serif', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.8rem', color: '#fff' }}>Profile Login</h2>
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              value={loginEmail} 
              onChange={e => setLoginEmail(e.target.value)}
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #dde6f0', fontSize: '1rem', color: '#002147' }}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={loginPassword} 
              onChange={e => setLoginPassword(e.target.value)}
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #dde6f0', fontSize: '1rem', color: '#002147' }}
              required 
            />
            {loginError && <div style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>{loginError}</div>}
            <button type="submit" style={{ padding: '0.9rem', background: '#f97316', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>Login</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="user-dashboard-sec" id="user-dashboard">
      <div className="dashboard-container">

        {/* PROFILE HEADER */}
        <div className="profile-hero">
          <div className="profile-banner"></div>
          <div className="profile-main-info">
            <div className="profile-avatar">
              <span className="avatar-initials">{user.initials}</span>
            </div>
            <div className="profile-text-info" style={{ background: '#002147', color: '#fff', padding: '1rem 1.5rem', borderRadius: '12px', flex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h2 className="profile-name" style={{ color: '#ffffff', fontFamily: 'Lora, Georgia, serif', fontWeight: '800', margin: '0 0 0.5rem', fontSize: '2rem', display: 'block' }}>
                {(user.name || 'ROHAN').toUpperCase()}
              </h2>
              <p className="profile-title" style={{ color: '#8a9cae', margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
                {user.role ? user.role : 'Aspiring Data Scientist'}
              </p>
              {user.email && <p className="profile-email" style={{ color: '#f97316', fontSize: '0.9rem', marginBottom: 0 }}>Login Info: {user.email}</p>}
            </div>
          </div>
        </div>

        <div className="dashboard-body">

          {/* ============================================================
              TOP ROW: Profile Progress + Skill Gap Insights side by side
              ============================================================ */}
          <div className="top-insight-row">

            {/* Profile Progress Chart */}
            <div className="dash-card profile-progress-card">
              <h3 className="card-title">Profile Progress</h3>

              <DonutChart segments={chartSegments} size={180} />

              {/* Legend */}
              <ul className="progress-legend">
                {chartSegments.map(seg => (
                  <li key={seg.label} className="legend-item">
                    <span className="legend-dot" style={{ background: seg.color }} />
                    <span className="legend-label">{seg.label}</span>
                    <span className="legend-pct">{seg.pct}%</span>
                  </li>
                ))}
              </ul>

              {/* Course completion checkboxes */}
              <div className="course-checks">
                <p className="course-checks-title">Mark courses as done:</p>
                {recommendedCourses.map(c => (
                  <label key={c.id} className="course-check-item">
                    <input
                      type="checkbox"
                      checked={coursesCompleted.includes(c.id)}
                      onChange={() => toggleCourse(c.id)}
                    />
                    <span>{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skill Gap Insights — expanded with courses to learn */}
            <div className="dash-card skills-gap-card gap-expanded">
              <h3 className="card-title">Skill Gap Insights</h3>

              {/* 1. Skills You Have */}
              <div className="sg-section">
                <h4>Skills You Have</h4>
                <div className="sg-tags owned">
                  {(user.skills || ['Python', 'SQL', 'Pandas']).map(s => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>

              {/* 2. Missing / To Improve */}
              <div className="sg-section mt-1">
                <h4>Missing / To Improve <span className="urgent-dot"></span></h4>
                <div className="sg-tags missing">
                  {missingSkills.map(s => <span key={s}>{s}</span>)}
                </div>
              </div>

              {/* 3. Courses to Learn */}
              <div className="sg-section mt-1">
                <h4>Courses to Learn 📚</h4>
                <div className="sg-courses-list">
                  {recommendedCourses.map(c => (
                    <a
                      key={c.id}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sg-course-link"
                    >
                      <span className="sg-course-icon">🎓</span>
                      <span className="sg-course-info">
                        <strong>{c.name}</strong>
                        <em>{c.provider} · {c.topic}</em>
                      </span>
                      <span className="sg-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>

              <p className="sg-note">
                * Complete the recommended courses below to acquire these missing skills and improve your ATS score.
              </p>
            </div>

          </div>

          {/* ============================================================
              BOTTOM GRID: Left sidebar + Right content
              ============================================================ */}
          <div className="main-dash-grid">

            {/* LEFT SIDEBAR */}
            <div className="dash-left">

              {/* Quick Actions */}
              <div className="dash-card quick-actions-card">
                <h3 className="card-title">Quick Actions</h3>
                <div className="qa-buttons">
                  <button className="btn-qa-primary" onClick={() => setShowExpertSelect(true)}>Submit for Verification</button>
                  <button className="btn-qa-secondary" onClick={handleEditProfileClick}>Edit Resume Details</button>
                  <button className="btn-qa-outline" onClick={() => window.print()}>Download PDF</button>
                </div>
              </div>

              {/* Notifications */}
              <div className="dash-card notifications-card">
                <h3 className="card-title">Recent Notifications</h3>
                <ul className="notif-list">
                  {notifications.map((n, i) => (
                    <li key={i} className={`notif-item ${n.type}`}>
                      <span className="notif-dot"></span>
                      <div className="notif-text">
                        <p>{n.text}</p>
                        <small>{n.time}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* RIGHT MAIN AREA */}
            <div className="dash-right">

              {/* Resume Status Tracker */}
              <div className="top-stats-row">
                <div className="dash-card status-tracker-card" style={{flex:1}}>
                  <div className="card-header-flex">
                    <h3 className="card-title">Resume Status Tracker</h3>
                    <span className="badge-badge active-badge">Completed</span>
                  </div>
                  <div className="progress-stepper">
                    <div className="step completed">
                      <div className="step-circle">✓</div>
                      <span>Submitted</span>
                    </div>
                    <div className="step-line active"></div>
                    <div className="step completed">
                      <div className="step-circle">✓</div>
                      <span>In Review</span>
                    </div>
                    <div className="step-line active"></div>
                    <div className="step current">
                      <div className="step-circle">3</div>
                      <span>Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Skills */}
              <div className="dash-card skills-profile-card">
                <div className="card-header-flex" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                  <h3 className="card-title" style={{ margin: 0 }}>My Skills</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                    <input
                      className="skill-add-input"
                      type="text"
                      placeholder="Add skill…"
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      onKeyDown={handleAddSkill}
                      style={{ flex: 1, padding: '0.5rem 0.8rem', borderRadius: '8px', border: '1px solid #dde6f0' }}
                    />
                    <button 
                      onClick={() => handleAddSkill({ key: 'Enter', preventDefault: () => {} })}
                      style={{ padding: '0.5rem 1rem', background: '#002147', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="skills-tag-list" style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {(user.skills || []).map(s => (
                    <span key={s} className="profile-skill-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f4f7fb', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #dde6f0', color: '#002147', fontWeight: 'bold' }}>
                      {s}
                      <button onClick={() => handleRemoveSkill(s)} title="Remove" style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>✕</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Latest Projects */}
              <div className="dash-card projects-card">
                <div className="card-header-flex">
                  <h3 className="card-title">Latest Projects</h3>
                  <button className="btn-add-project" onClick={() => setAddingProject(v => !v)}>
                    {addingProject ? '✕ Cancel' : '+ Add Project'}
                  </button>
                </div>

                {addingProject && (
                  <div className="add-project-form">
                    <input className="proj-input" placeholder="Project title *" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} />
                    <input className="proj-input" placeholder="Short description" value={newProject.desc} onChange={e => setNewProject({ ...newProject, desc: e.target.value })} />
                    <input className="proj-input" placeholder="Tech stack (e.g. Python, React)" value={newProject.tech} onChange={e => setNewProject({ ...newProject, tech: e.target.value })} />
                    <button className="btn-save-project" onClick={handleAddProject}>Save Project</button>
                  </div>
                )}

                {(user.projects || []).length === 0 && !addingProject && (
                  <p className="empty-projects">No projects added yet. Click "+ Add Project" to get started!</p>
                )}

                <div className="projects-list">
                  {(user.projects || []).map(p => (
                    <div key={p.id} className="project-item">
                      <div className="proj-icon">🚀</div>
                      <div className="proj-info">
                        <h4>{p.title}</h4>
                        {p.desc && <p>{p.desc}</p>}
                        {p.tech && <span className="proj-tech">{p.tech}</span>}
                      </div>
                      <button className="proj-remove" onClick={() => handleRemoveProject(p.id)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Past Submissions History */}
              <div className="dash-card history-card">
                <h3 className="card-title">Past Submissions History</h3>
                <div className="history-table-wrapper">
                  <table className="history-table">
                    <thead>
                      <tr><th>Date</th><th>Status</th><th>Score</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {submissionHistory.map(item => (
                        <tr key={item.id}>
                          <td>{item.date}</td>
                          <td><span className={`h-status ${item.status === 'Completed' ? 'done' : 'pending'}`}>{item.status}</span></td>
                          <td><strong>{item.score}</strong></td>
                          <td><button className="btn-view-details">View Details</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* MODALS */}
        {showExpertSelect && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,33,71,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="modal-content" style={{ background: '#fff', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
              <h3 style={{ marginTop: 0, color: '#002147' }}>Select Expert for Verification</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {EXPERTS.map(exp => (
                  <button key={exp.id} onClick={() => { alert(`Submitted to ${exp.name} for verification.`); setShowExpertSelect(false); }} style={{ padding: '1rem', textAlign: 'left', background: '#f8fafc', border: '1px solid #dde6f0', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem', color: '#002147', fontFamily: 'Lora, serif' }}>{exp.name}</strong>
                      <span style={{ fontSize: '0.8rem', background: '#002147', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>{exp.exp}</span>
                    </div>
                    <div style={{ color: '#f97316', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{exp.role}</div>
                    <div style={{ fontSize: '0.85rem', color: '#4a6080', lineHeight: 1.4 }}>{exp.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setShowExpertSelect(false)} style={{ marginTop: '1.5rem', width: '100%', padding: '0.8rem', background: '#f97316', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
            </div>
          </div>
        )}

        {showEditProfile && editForm && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,33,71,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="modal-content" style={{ background: '#fff', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '400px' }}>
              <h3 style={{ marginTop: 0, color: '#002147' }}>Edit Resume Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder="Name" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #dde6f0' }} />
                <input value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} placeholder="Role" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #dde6f0' }} />
                <input value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} placeholder="Email (Login ID)" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #dde6f0' }} />
                <button onClick={handleSaveProfile} style={{ padding: '0.8rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Save Changes</button>
                <button onClick={() => setShowEditProfile(false)} style={{ padding: '0.8rem', background: '#f4f7fb', color: '#002147', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
