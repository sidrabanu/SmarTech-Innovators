import React, { useState } from 'react';
import './ExpertLoginSection.css';

const mockResumes = [
  { id: 1, name: 'Rohan Gupta', role: 'Data Scientist', date: '2 hours ago', status: 'Pending Review' },
  { id: 2, name: 'Neha Sharma', role: 'ML Engineer', date: '5 hours ago', status: 'Pending Review' },
  { id: 3, name: 'Aakash Verma', role: 'Product Manager', date: '1 day ago', status: 'Pending Review' },
];

const expertCredentials = [
  { name: 'Ayesha Khan', email: 'ayesha.khan@skillbridge.demo', password: 'Expert@123' },
  { name: 'Rahul Verma', email: 'rahul.verma@skillbridge.demo', password: 'Expert@123' },
  { name: 'Sneha Iyer', email: 'sneha.iyer@skillbridge.demo', password: 'Expert@123' },
  { name: 'Arjun Malhotra', email: 'arjun.malhotra@skillbridge.demo', password: 'Expert@123' },
  { name: 'Kavya Reddy', email: 'kavya.reddy@skillbridge.demo', password: 'Expert@123' }
];

export default function ExpertLoginSection() {
  const [loggedInExpert, setLoggedInExpert] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  
  // Rating states (0-5)
  const [ratings, setRatings] = useState({
    skills: 0,
    projects: 0,
    clarity: 0
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const expert = expertCredentials.find(c => c.email === email && c.password === password);
    if (expert) {
      setLoggedInExpert(expert.name);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setLoggedInExpert(null);
    setSelectedResume(null);
    setEmail('');
    setPassword('');
  };

  const handleRate = (criteria, value) => {
    setRatings(prev => ({ ...prev, [criteria]: value }));
  };

  const handleSubmitReview = () => {
    alert("Review submitted successfully!");
    setSelectedResume(null);
    setRatings({ skills: 0, projects: 0, clarity: 0 });
  };

  const renderStarSelector = (criteria) => {
    return (
      <div className="star-selector">
        {[1, 2, 3, 4, 5].map(star => (
          <span 
            key={star} 
            className={`rating-star ${ratings[criteria] >= star ? 'active' : ''}`}
            onClick={() => handleRate(criteria, star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="expert-login-sec" id="expert-login">
      <div className="expert-inner">

        {!loggedInExpert ? (
          /* LOGIN VIEW */
          <div className="login-view">
            <div className="login-header">
              <span className="login-label">Reviewers Portal</span>
              <h2 className="login-heading">Expert Login</h2>
              <p className="login-desc">Access the portal to review candidate resumes and provide actionable feedback.</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              {loginError && <p style={{color: '#dc2626', fontSize: '0.9rem', marginBottom: '-0.5rem'}}>{loginError}</p>}
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="expert@skillbridge.demo" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-login">Login to Dashboard</button>
            </form>
          </div>
        ) : (
          /* DASHBOARD VIEW */
          <div className="dashboard-view">
            <div className="dashboard-header">
              <div className="dashboard-header-text">
                <h2 className="login-heading">Expert Dashboard</h2>
                <p className="login-desc">Welcome back, <strong>{loggedInExpert}</strong>! Here are the latest resumes submitted for your review.</p>
              </div>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>

            <div className="dashboard-grid">
              
              {/* LEFT COLUMN: RESUME LIST */}
              <div className="dashboard-sidebar">
                <h3 className="section-title">Submitted Resumes</h3>
                <div className="resume-list">
                  {mockResumes.map(r => (
                    <div 
                      key={r.id} 
                      className={`dashboard-resume-card ${selectedResume?.id === r.id ? 'active' : ''}`}
                      onClick={() => setSelectedResume(r)}
                    >
                      <div className="card-top">
                        <h4>{r.name}</h4>
                        <span className="time-badge">{r.date}</span>
                      </div>
                      <p className="r-role">{r.role}</p>
                      <span className="status-badge">{r.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: RATING PANEL */}
              <div className="dashboard-main">
                {selectedResume ? (
                  <div className="rating-panel">
                    <div className="panel-header">
                      <h3>Reviewing: {selectedResume.name} ({selectedResume.role})</h3>
                      <button className="btn-view-pdf" onClick={() => setShowResumeModal(true)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        View Full Resume
                      </button>
                    </div>

                    <div className="rating-criteria-list">
                      
                      {/* Criteria 1 */}
                      <div className="criteria-block">
                        <div className="criteria-top">
                          <h4>1. Skills Relevance</h4>
                          {renderStarSelector('skills')}
                        </div>
                        <p className="criteria-desc">How well the candidate's skills match the target role requirements.</p>
                        <p className="criteria-question">👉 Are the right tools, technologies, and competencies clearly shown?</p>
                      </div>

                      {/* Criteria 2 */}
                      <div className="criteria-block">
                        <div className="criteria-top">
                          <h4>2. Project Quality &amp; Impact</h4>
                          {renderStarSelector('projects')}
                        </div>
                        <p className="criteria-desc">Evaluation of projects and experience.</p>
                        <p className="criteria-question">👉 Are projects practical, well-explained, and showing real impact (results, outcomes)?</p>
                      </div>

                      {/* Criteria 3 */}
                      <div className="criteria-block">
                        <div className="criteria-top">
                          <h4>3. Clarity &amp; Professionalism</h4>
                          {renderStarSelector('clarity')}
                        </div>
                        <p className="criteria-desc">Overall structure and presentation of the resume.</p>
                        <p className="criteria-question">👉 Is it clear, concise, well-organized, and easy to read for recruiters?</p>
                      </div>

                    </div>

                    <div className="rating-actions">
                      <button 
                        className="btn-submit-review" 
                        onClick={handleSubmitReview}
                        disabled={ratings.skills === 0 || ratings.projects === 0 || ratings.clarity === 0}
                      >
                        Submit Feedback
                      </button>
                      <p className="hint-text">* Please rate all criteria to submit</p>
                    </div>
                  </div>
                ) : (
                  <div className="no-selection">
                    <span className="no-sel-icon">📄</span>
                    <p>Select a resume from the list to begin rating.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* MODAL FOR 1-PAGE RESUME PREVIEW */}
      {showResumeModal && selectedResume && (
        <div className="resume-modal-overlay" onClick={() => setShowResumeModal(false)}>
          <div className="resume-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <span className="modal-icon">⭐</span>
                <div>
                  <p className="modal-role-label">Under Verification</p>
                  <h3 className="modal-role-title">{selectedResume.role}</h3>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowResumeModal(false)}>✕</button>
            </div>

            <div className="resume-body">
              <div className="resume-name-row">
                <h2 className="resume-name">{selectedResume.name}'s Resume</h2>
                <p className="resume-contact">Contact Info | Portfolio | LinkedIn</p>
              </div>
              <div className="resume-divider" />
              
              <div className="resume-section">
                <h4 className="resume-section-title">Professional Summary</h4>
                <p className="resume-summary">A candidate summary demonstrating quantifiable achievements and goal statements targeting the specific role requirements.</p>
              </div>

              <div className="resume-section">
                <h4 className="resume-section-title">Experience</h4>
                <div className="resume-exp">
                  <div className="resume-exp-header">
                    <span className="resume-exp-role">Recent Experience</span>
                    <span className="resume-exp-period">2021-Present</span>
                  </div>
                  <p className="resume-exp-company">Tech Company</p>
                  <ul className="resume-bullets">
                    <li>Built out essential infrastructure from scratch.</li>
                    <li>Mentored junior candidates and established best practices.</li>
                  </ul>
                </div>
              </div>

              <div className="resume-section">
                <h4 className="resume-section-title">Education</h4>
                <div className="resume-edu">
                  <span className="resume-edu-degree">Relevant Degree</span>
                  <span className="resume-edu-school"> — Top University, 2019</span>
                </div>
              </div>

              <div className="resume-section">
                <h4 className="resume-section-title">Keywords / Skills</h4>
                <div className="resume-skills">
                   {['Problem Solving', 'Communication', 'Industry Specific Tool', 'Specialized Knowledge'].map(s => <span key={s} className="resume-skill-badge">{s}</span>)}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
