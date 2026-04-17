import React, { useState } from 'react';
import './BestResumesSection.css';

const topResumes = [
  { id: 1, role: 'Data Scientist', name: 'Sophia L.', rating: 5, highlight: 'Landed at TechCorp', packageBefore: '₹8.5 LPA', packageAfter: '₹22 LPA' },
  { id: 2, role: 'ML Engineer', name: 'David C.', rating: 4.5, highlight: 'Landed at AI Solutions', packageBefore: '₹10 LPA', packageAfter: '₹28 LPA' },
  { id: 3, role: 'Data Analyst', name: 'Priya P.', rating: 4, highlight: 'Landed at FinTech Hub', packageBefore: '₹6.5 LPA', packageAfter: '₹14 LPA' },
  { id: 4, role: 'Content Creator', name: 'Liam W.', rating: 4.5, highlight: '10x Engagement Rate', packageBefore: '₹4.5 LPA', packageAfter: '₹12 LPA' },
  { id: 5, role: 'Business Analyst', name: 'Arjun K.', rating: 5, highlight: 'Landed at ConsultingCo', packageBefore: '₹7 LPA', packageAfter: '₹16 LPA' },
  { id: 6, role: 'Project Manager', name: 'Emma Y.', rating: 4, highlight: 'Landed at GlobalTech', packageBefore: '₹9.5 LPA', packageAfter: '₹20 LPA' },
  { id: 7, role: 'Android Developer', name: 'Karan R.', rating: 4.5, highlight: 'Landed at AppNation', packageBefore: '₹6 LPA', packageAfter: '₹18 LPA' },
  { id: 8, role: 'Full Stack Developer', name: 'Neha S.', rating: 5, highlight: 'Landed at WebCraft', packageBefore: '₹8 LPA', packageAfter: '₹24 LPA' },
  { id: 9, role: 'UI/UX Developer', name: 'Rachel Z.', rating: 4.5, highlight: 'Landed at DesignFirst', packageBefore: '₹5.5 LPA', packageAfter: '₹15 LPA' },
];

const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  const empty = 5 - Math.ceil(rating);
  return (
    <>
      <span className="star-filled">{'★'.repeat(full)}</span>
      {half && <span className="star-half">½</span>}
      <span className="star-empty">{'☆'.repeat(empty)}</span>
    </>
  );
};

export default function BestResumesSection() {
  const [selectedResume, setSelectedResume] = useState(null);

  // Reusing a similar mock resume data structure from the Roles section to simulate the 1-page resume
  const mockResumeDetails = {
    contact: 'Contact Info | Portfolio | LinkedIn',
    summary: 'A highly optimized, ATS-friendly summary demonstrating quantifiable achievements.',
    experience: [
      { role: 'Senior Role Name', company: 'Top Tier Company', period: '2021–Present', bullets: ['Optimized core processes resulting in 30% increased efficiency', 'Led a cross-functional team to deliver projects 2 weeks ahead of schedule'] },
      { role: 'Previous Role Name', company: 'Industry Leader', period: '2019–2021', bullets: ['Built out essential infrastructure from scratch', 'Mentored junior candidates and established best practices'] },
    ],
    education: [{ degree: 'Relevant Degree', school: 'Top University', year: '2019' }],
    skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6']
  };

  return (
    <section className="best-resumes" id="best-resumes">
      <div className="resumes-inner">
        
        {/* HEADER */}
        <div className="resumes-header">
          <span className="resumes-label">Success Stories</span>
          <h2 className="resumes-heading">Best Resumes</h2>
          <p className="resumes-desc">
            See how top candidates bridged their skill gaps and landed dream roles with our AI-optimized resume success stories.
          </p>
        </div>

        {/* RESUMES GRID */}
        <div className="resumes-grid">
          {topResumes.map((resume) => (
            <div className="resume-story-card" key={resume.id} onClick={() => setSelectedResume(resume)}>
              
              <div className="card-top-row">
                <div className="stars" aria-label={`Rating: ${resume.rating} out of 5`}>
                  {renderStars(resume.rating)}
                </div>
                <span className="badge-highlight">{resume.highlight}</span>
              </div>
              
              <h3 className="story-role">{resume.role}</h3>
              <p className="story-name">Candidate: <strong>{resume.name}</strong></p>
              
              <div className="story-package-stats">
                <p>Package before SkillBridge: <span className="pkg-low">{resume.packageBefore}</span></p>
                <p>Package after SkillBridge: <span className="pkg-high">{resume.packageAfter}</span></p>
              </div>
              
              <div className="card-bottom-row">
                <button className="btn-preview-resume">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  View 1-Page Resume
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* MODAL FOR 1-PAGE RESUME PREVIEW */}
      {selectedResume && (
        <div className="resume-modal-overlay" onClick={() => setSelectedResume(null)}>
          <div className="resume-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <span className="modal-icon">⭐</span>
                <div>
                  <p className="modal-role-label">Top 1% Rated Resume</p>
                  <h3 className="modal-role-title">{selectedResume.role}</h3>
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelectedResume(null)}>✕</button>
            </div>

            <div className="resume-body">
              <div className="resume-name-row">
                <h2 className="resume-name">{selectedResume.name}'s Resume</h2>
                <p className="resume-contact">{mockResumeDetails.contact}</p>
              </div>
              <div className="resume-divider" />
              
              <div className="resume-section">
                <h4 className="resume-section-title">Professional Summary</h4>
                <p className="resume-summary">{mockResumeDetails.summary}</p>
              </div>

              <div className="resume-section">
                <h4 className="resume-section-title">Experience</h4>
                {mockResumeDetails.experience.map((exp, i) => (
                  <div key={i} className="resume-exp">
                    <div className="resume-exp-header">
                      <span className="resume-exp-role">{exp.role}</span>
                      <span className="resume-exp-period">{exp.period}</span>
                    </div>
                    <p className="resume-exp-company">{exp.company}</p>
                    <ul className="resume-bullets">
                      {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="resume-section">
                <h4 className="resume-section-title">Education</h4>
                {mockResumeDetails.education.map((edu, i) => (
                  <div key={i} className="resume-edu">
                    <span className="resume-edu-degree">{edu.degree}</span>
                    <span className="resume-edu-school"> — {edu.school}, {edu.year}</span>
                  </div>
                ))}
              </div>

              <div className="resume-section">
                <h4 className="resume-section-title">Core Skills</h4>
                <div className="resume-skills">
                  {selectedResume.role === 'Data Scientist' ? ['Python', 'SQL', 'ML', 'Pandas'].map(s => (
                    <span key={s} className="resume-skill-badge">{s}</span>
                  )) : mockResumeDetails.skills.map(s => (
                    <span key={s} className="resume-skill-badge">{s}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
