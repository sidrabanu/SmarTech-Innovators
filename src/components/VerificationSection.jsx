import React from 'react';
import './VerificationSection.css';

const reviewers = [
  {
    name: 'Ayesha Khan',
    role: 'Senior Data Scientist & ML Engineer',
    experience: '6+ years experience',
    description: 'Specializes in data science, machine learning, and analytics. Guides roles like Data Scientist, ML Engineer, and Data Analyst with a focus on real-world projects.',
    icon: '📊'
  },
  {
    name: 'Rahul Verma',
    role: 'Full Stack & Android Developer',
    experience: '5+ years experience',
    description: 'Expert in building scalable web and mobile applications. Reviews resumes for Full Stack, Android, and Data Warehouse Developer roles.',
    icon: '💻'
  },
  {
    name: 'Sneha Iyer',
    role: 'Product Manager & Business Analyst',
    experience: '7+ years experience',
    description: 'Focuses on product strategy, business analysis, and data-driven decision making for BA and Project Manager roles.',
    icon: '📈'
  },
  {
    name: 'Arjun Malhotra',
    role: 'UI/UX & Graphic Designer',
    experience: '4+ years experience',
    description: 'Specialist in user experience, visual design, and branding. Evaluates UI/UX and Graphic Design portfolios and resumes.',
    icon: '🎨'
  },
  {
    name: 'Kavya Reddy',
    role: 'Career Coach & Content Strategist',
    experience: '6+ years experience',
    description: 'Experienced in personal branding and communication. Helps Content Creators, Career Counsellors, and Real Estate professionals build strong profiles.',
    icon: '🎯'
  }
];

export default function VerificationSection() {
  return (
    <section className="verification-sec" id="resume-verification">
      <div className="verification-inner">

        {/* HEADER */}
        <div className="verification-header">
          <span className="verify-label">Expert Review</span>
          <h2 className="verify-heading">Resume Verification</h2>
          <p className="verify-desc">
            Once you build your resume, it is assigned to top industry professionals who review it using a 5-star rating system, providing clear feedback to help you meet real-world hiring standards.
          </p>
        </div>

        {/* EXPERT CARDS */}
        <div className="experts-grid">
          {reviewers.map((expert, i) => (
            <div className="expert-card" key={i}>
              <div className="expert-avatar">
                <span className="avatar-icon">{expert.icon}</span>
              </div>
              <h3 className="expert-name">{expert.name}</h3>
              <p className="expert-role">{expert.role}</p>
              <span className="expert-exp">{expert.experience}</span>
              <p className="expert-desc">{expert.description}</p>
              
              {/* Decorative rating indicator showing what they do */}
              <div className="expert-rating-banner">
                <div className="v-stars">
                   <span className="v-star-filled">★★★★★</span>
                </div>
                <span>Certified Reviewer</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
