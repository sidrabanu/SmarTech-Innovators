import React from 'react';
import './HeroSection.css';

const skills = [
  { label: 'Python', color: '#002147' },
  { label: 'SQL', color: '#f97316' },
  { label: 'Machine Learning', color: '#002147' },
  { label: 'Leadership', color: '#f97316' },
  { label: 'React', color: '#002147' },
  { label: 'Data Analysis', color: '#f97316' },
  { label: 'Cloud (AWS)', color: '#002147' },
  { label: 'TensorFlow', color: '#f97316' },
  { label: 'Communication', color: '#002147' },
  { label: 'Agile', color: '#f97316' },
];

export default function HeroSection({ onUpload }) {
  return (
    <section className="hero" id="homepage">
      <div className="hero-inner">

        {/* ===== LEFT: TEXT CONTENT + SKILL ANIMATION ===== */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Powered Career Intelligence
          </div>

          <h1 className="hero-headline">
            Map your path to get hired
          </h1>

          <p className="hero-sub">
            Transform your career with AI-powered gap analysis—compare your resume to any role, spot missing skills instantly, and get a personalized roadmap with courses and projects to land your dream job.
          </p>

          <div className="hero-cta-row">
            <a href="#roles" className="btn-get-started" id="get-started-btn" style={{textDecoration: 'none'}}>
              Get Started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>

            <label className="btn-upload-hero" id="upload-resume-hero-btn" style={{cursor: 'pointer'}}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                style={{display: 'none'}}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0 && onUpload) {
                    onUpload();
                  }
                }}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Upload Resume
            </label>
          </div>

          {/* ===== SKILL CHIPS — in empty space below CTA ===== */}
          <div className="skills-cloud" aria-label="Skill tags">
            <p className="skills-label">Skills you'll master</p>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <span
                  key={skill.label}
                  className="skill-chip"
                  id={`skill-chip-${i}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <span
                    className="chip-dot"
                    style={{ background: skill.color }}
                  />
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ===== RIGHT: CLEAN IMAGE ONLY — no animation ===== */}
        <div className="hero-visual">
          <div className="visual-image" />
        </div>

      </div>
    </section>
  );
}
