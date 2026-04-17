import React from 'react';
import './AboutSection.css';

const descriptionParagraphs = [
  `As students ourselves, we faced the same confusion—applying for jobs without clearly understanding what was missing in our resumes or how to fill those gaps. That experience inspired us to build this platform.`,
  `Most students apply for jobs without knowing if their skills truly match what employers expect. Our platform solves this by analyzing your resume against your target role, clearly showing what you already have, what you're missing, and what needs improvement.`,
  `Based on this analysis, we generate a personalized learning roadmap with the right courses, project ideas, and actionable resume feedback—so you can confidently build the right skills and present yourself effectively.`,
  `We help students turn uncertainty into clarity.`,
];

const highlights = [
  { icon: '🎯', label: 'Gap Analysis' },
  { icon: '🗺️', label: 'Career Roadmaps' },
  { icon: '📄', label: 'Resume Feedback' },
  { icon: '🚀', label: 'Skill Building' },
];

export default function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about-inner">

        {/* ===== LEFT: IMAGE ===== */}
        <div className="about-image-wrapper">
          <div className="about-image" />
          {/* Floating accent card */}
          <div className="about-accent-card">
            <span className="accent-icon">💡</span>
            <div>
              <p className="accent-title">Built by students</p>
              <p className="accent-sub">for students</p>
            </div>
          </div>
        </div>

        {/* ===== RIGHT: TEXT ===== */}
        <div className="about-content">
          {/* Section label */}
          <span className="about-label">Our Story</span>

          <h2 className="about-heading">About</h2>

          <div className="about-description">
            {descriptionParagraphs.map((para, i) => (
              <p key={i} className="about-para">{para}</p>
            ))}
          </div>

          {/* Highlight pills */}
          <div className="about-highlights">
            {highlights.map((h) => (
              <div key={h.label} className="highlight-pill">
                <span className="highlight-icon">{h.icon}</span>
                <span className="highlight-label">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
