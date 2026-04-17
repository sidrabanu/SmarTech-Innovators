import React, { useState } from 'react';
import './RoadmapSection.css';

const roadmaps = [
  {
    title: 'Data Scientist',
    skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Statistics', 'SQL'],
    projects: ['Predict house prices', 'Customer churn prediction', 'Recommendation system'],
    courses: [
      { name: 'IBM Data Science', url: 'https://www.coursera.org/professional-certificates/ibm-data-science' },
      { name: 'MIT Data Science', url: 'https://www.edx.org/professional-certificate/mitx-data-science' }
    ]
  },
  {
    title: 'ML Engineer',
    skills: ['Python', 'TensorFlow/PyTorch', 'MLOps', 'APIs', 'Deployment'],
    projects: ['Image classifier', 'Chatbot', 'Model deployment with Flask'],
    courses: [
      { name: 'Machine Learning Specialization', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
      { name: 'ML Engineer Nanodegree', url: 'https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009t' }
    ]
  },
  {
    title: 'Data Analyst',
    skills: ['Excel', 'SQL', 'Power BI/Tableau', 'Python basics'],
    projects: ['Sales dashboard', 'Data cleaning + visualization'],
    courses: [
      { name: 'Google Data Analytics', url: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
      { name: 'Microsoft Power BI Learning Path', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi/' }
    ]
  },
  {
    title: 'Content Creator',
    skills: ['Writing', 'SEO', 'Video editing', 'Social media strategy'],
    projects: ['YouTube channel / Blog', 'Instagram growth case study'],
    courses: [
      { name: 'HubSpot Content Marketing', url: 'https://academy.hubspot.com/courses/content-marketing' },
      { name: 'Google Digital Marketing', url: 'https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing' }
    ]
  },
  {
    title: 'Business Analyst',
    skills: ['Excel', 'SQL', 'Communication', 'Requirement analysis'],
    projects: ['Business case study', 'KPI dashboard'],
    courses: [
      { name: 'Business Analytics Specialization', url: 'https://www.coursera.org/specializations/business-analytics' },
      { name: 'Business Analysis Foundations', url: 'https://www.linkedin.com/learning/business-analysis-foundations' }
    ]
  },
  {
    title: 'Project Manager',
    skills: ['Agile', 'Scrum', 'Leadership', 'Risk management'],
    projects: ['Manage a mini project (team-based)', 'Agile sprint simulation'],
    courses: [
      { name: 'Google Project Management', url: 'https://www.coursera.org/professional-certificates/google-project-management' },
      { name: 'PMP Certification (PMI)', url: 'https://www.pmi.org/certifications/project-management-pmp' }
    ]
  },
  {
    title: 'Android Developer',
    skills: ['Kotlin/Java', 'Android Studio', 'APIs', 'Firebase'],
    projects: ['To-do app', 'Chat app'],
    courses: [
      { name: 'Android Courses (Google)', url: 'https://developer.android.com/courses' },
      { name: 'Android Kotlin Bootcamp', url: 'https://www.udemy.com/course/android-oreo-kotlin-app-masterclass/' }
    ]
  },
  {
    title: 'Full Stack Developer',
    skills: ['HTML', 'CSS', 'JS', 'React', 'Node.js', 'MongoDB'],
    projects: ['E-commerce site', 'Blog platform'],
    courses: [
      { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/' },
      { name: 'Meta Full Stack Developer', url: 'https://www.coursera.org/professional-certificates/meta-full-stack-developer' }
    ]
  },
  {
    title: 'Data Warehouse Developer',
    skills: ['SQL', 'ETL', 'Data modeling', 'Snowflake/BigQuery'],
    projects: ['Data pipeline', 'Warehouse schema design'],
    courses: [
      { name: 'Data Warehousing', url: 'https://www.coursera.org/learn/data-warehousing' },
      { name: 'Azure Data Fundamentals', url: 'https://learn.microsoft.com/en-us/training/azure/data-fundamentals/' }
    ]
  },
  {
    title: 'UI/UX Developer',
    skills: ['Figma', 'Wireframing', 'User research', 'HTML/CSS'],
    projects: ['App redesign', 'UX case study'],
    courses: [
      { name: 'Google UX Design', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
      { name: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/courses' }
    ]
  },
  {
    title: 'Career Counsellor',
    skills: ['Communication', 'Psychology basics', 'Guidance', 'Coaching'],
    projects: ['Career roadmap plans', 'Student counselling case studies'],
    courses: [
      { name: 'Career Development', url: 'https://www.coursera.org/learn/career-development' },
      { name: 'NCDA Certification', url: 'https://www.ncda.org/aws/NCDA/pt/sp/credentialing' }
    ]
  },
  {
    title: 'Real Estate Agent',
    skills: ['Sales', 'Negotiation', 'Market analysis', 'Networking'],
    projects: ['Property listing portfolio', 'Market research report'],
    courses: [
      { name: 'Real Estate Course', url: 'https://www.coursera.org/learn/real-estate' },
      { name: 'Real Estate Investing', url: 'https://www.udemy.com/course/real-estate-investing/' }
    ]
  },
  {
    title: 'Graphic Designer',
    skills: ['Photoshop', 'Illustrator', 'Typography', 'Branding'],
    projects: ['Brand identity kit', 'Social media creatives'],
    courses: [
      { name: 'Adobe Learning', url: 'https://www.adobe.com/creativecloud/learn.html' },
      { name: 'Graphic Design Specialization', url: 'https://www.coursera.org/specializations/graphic-design' }
    ]
  }
];

export default function RoadmapSection({ globalResumeUploaded, setGlobalResumeUploaded, targetRoleTitle, setTargetRoleTitle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [localResumeUploaded, setLocalResumeUploaded] = useState(false);

  React.useEffect(() => {
    if (targetRoleTitle) {
      const found = roadmaps.find(r => r.title === targetRoleTitle);
      if (found) {
        setSelectedRole(found);
      }
      if (setTargetRoleTitle) setTargetRoleTitle(null);
    }
  }, [targetRoleTitle, setTargetRoleTitle]);

  const isResumeUploaded = globalResumeUploaded || localResumeUploaded;

  const setResumeState = (val) => {
    if (setGlobalResumeUploaded) setGlobalResumeUploaded(val);
    setLocalResumeUploaded(val);
  };

  // Filter roles based on search
  const filteredRoles = searchTerm 
    ? roadmaps.filter(role => role.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : roadmaps;

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setSearchTerm('');
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeState(true);
    }
  };

  const handleRemoveResume = () => {
    setResumeState(false);
  };

  return (
    <section className="roadmap-sec" id="roadmap">
      <div className="roadmap-inner">
        
        {/* HEADER */}
        <div className="roadmap-header">
          <h2 className="roadmap-heading">Roadmap</h2>
          <p className="roadmap-subtitle">
            Enter your desired role to see the best skills, projects, and courses. 
            Upload your resume for a personalized gap analysis.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="roadmap-controls">
          <div className="roadmap-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a6080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search desired role... (e.g. Data Scientist)" 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedRole(null);
              }}
            />
            {/* SEARCH RESULTS DROPDOWN MOVED HERE */}
            {searchTerm && !selectedRole && (
              <div className="roles-dropdown">
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <div key={role.title} className="role-option" onClick={() => handleRoleClick(role)}>
                      <strong>{role.title}</strong>
                    </div>
                  ))
                ) : (
                  <div className="role-option disabled">No roles found</div>
                )}
              </div>
            )}
          </div>

          <div className="roadmap-upload">
            {!isResumeUploaded ? (
              <label className="btn-upload-resume">
                <span>Upload Resume</span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
            ) : (
              <div className="resume-uploaded-badge">
                <span className="badge-text">📄 Resume Uploaded</span>
                <button className="badge-remove" onClick={handleRemoveResume}>✕</button>
              </div>
            )}
          </div>
        </div>

        {/* ROADMAP / PLAN DISPLAY */}
        {selectedRole ? (
          <div className="roadmap-content">
            <div className="roadmap-title-card">
              <h3>{selectedRole.title}</h3>
              {isResumeUploaded && (
                <span className="personalized-badge">Personalized Analysis Active</span>
              )}
            </div>

            {!isResumeUploaded ? (
              /* STANDARD GENERAL ROADMAP */
              <div className="roadmap-grid">
                
                <div className="roadmap-card">
                  <div className="rcard-header">
                    <span className="rcard-icon">🔧</span>
                    <h4>Core Skills</h4>
                  </div>
                  <ul className="rcard-list skill-list">
                    {selectedRole.skills.map((skill, i) => (
                      <li key={i}><span className="tag">{skill}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="roadmap-card">
                  <div className="rcard-header">
                    <span className="rcard-icon">🚀</span>
                    <h4>Top Projects</h4>
                  </div>
                  <ul className="rcard-list">
                    {selectedRole.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>
                </div>

                <div className="roadmap-card">
                  <div className="rcard-header">
                    <span className="rcard-icon">🎓</span>
                    <h4>Reputed Courses</h4>
                  </div>
                  <ul className="rcard-list">
                    {selectedRole.courses.map((course, i) => (
                      <li key={i}><a href={course.url} target="_blank" rel="noopener noreferrer" style={{color: '#f97316', textDecoration: 'none', fontWeight: '600'}}>{course.name}</a></li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              /* PERSONALIZED PLAN (RESUME UPLOADED) */
              <div className="personalized-plan">
                <div className="analysis-summary">
                  <p>Based on your resume, we found some gaps for a <strong>{selectedRole.title}</strong> position. Here is your customized action plan.</p>
                </div>

                <div className="timeline">
                  
                  {/* STEP 1 */}
                  <div className="tl-step">
                    <div className="tl-icon">1</div>
                    <div className="tl-content">
                      <h4>Skills to Build</h4>
                      <p className="tl-desc">These are critical skills missing from your resume that employers look for.</p>
                      <div className="tl-tags">
                        {selectedRole.skills.slice(0, 3).map((skill, i) => <span key={i} className="missing-tag">{skill}</span>)}
                      </div>
                    </div>
                  </div>

                  {/* STEP 2 */}
                  <div className="tl-step">
                    <div className="tl-icon">2</div>
                    <div className="tl-content">
                      <h4>Courses to Learn</h4>
                      <p className="tl-desc">Take these courses to bridge your knowledge gaps quickly.</p>
                      <ul className="tl-bullets">
                        {selectedRole.courses.map((course, i) => (
                          <li key={i}><a href={course.url} target="_blank" rel="noopener noreferrer" style={{color: '#f97316', textDecoration: 'none', fontWeight: '600'}}>{course.name}</a></li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div className="tl-step">
                    <div className="tl-icon">3</div>
                    <div className="tl-content">
                      <h4>Projects to Create</h4>
                      <p className="tl-desc">Add these to your portfolio and resume to prove your hands-on ability.</p>
                      <ul className="tl-bullets">
                        {selectedRole.projects.map((project, i) => (
                          <li key={i}>{project}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* STEP 4 */}
                  <div className="tl-step">
                    <div className="tl-icon end">🏁</div>
                    <div className="tl-content">
                      <h4>Ready to Apply</h4>
                      <p className="tl-desc">Update your resume with your new skills and projects. You're set!</p>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="roadmap-empty">
            <div className="empty-icon">🗺️</div>
            <p>Select a role to view its roadmap.</p>
          </div>
        )}

      </div>
    </section>
  );
}
