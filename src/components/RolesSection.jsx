import React, { useState, useMemo } from 'react';
import './RolesSection.css';

const roles = [
  {
    id: 1,
    title: 'Data Scientist',
    icon: '📊',
    category: 'Data & AI',
    description: 'Design machine learning models and extract actionable insights from unstructured data to solve complex business queries.',
    resume: {
      name: 'Alex Johnson',
      contact: 'alex.johnson@email.com | linkedin.com/in/alexjohnson | +1 (555) 234-5678',
      summary: 'Data Scientist with 4+ years of experience building ML models and data pipelines. Proficient in Python, R, and SQL with expertise in deep learning and statistical modeling.',
      experience: [
        { role: 'Senior Data Scientist', company: 'TechCorp Inc.', period: '2022–Present', bullets: ['Built recommendation engine boosting CTR by 32%', 'Led cross-functional team of 5 analysts', 'Deployed 3 ML models to production using MLflow'] },
        { role: 'Data Scientist', company: 'Analytics Hub', period: '2020–2022', bullets: ['Developed NLP pipeline for sentiment analysis', 'Reduced churn prediction error by 18%'] },
      ],
      education: [{ degree: 'M.S. Data Science', school: 'Stanford University', year: '2020' }],
      skills: ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Spark', 'Tableau', 'AWS SageMaker'],
    },
  },
  {
    id: 2,
    title: 'ML Engineer',
    icon: '🤖',
    category: 'Data & AI',
    description: 'Build, deploy, and scale machine learning models into production systems with high performance and continuous monitoring.',
    resume: {
      name: 'Priya Patel',
      contact: 'priya.patel@email.com | github.com/priyapatel | +91 98765 43210',
      summary: 'ML Engineer with expertise in designing and deploying scalable machine learning systems. Strong background in MLOps, model optimization, and cloud deployment.',
      experience: [
        { role: 'ML Engineer', company: 'AI Solutions Ltd.', period: '2021–Present', bullets: ['Reduced model inference time by 60% via quantization', 'Built CI/CD pipeline for ML models using GitHub Actions', 'Deployed real-time fraud detection system serving 1M+ users'] },
        { role: 'Junior ML Engineer', company: 'DataMinds', period: '2019–2021', bullets: ['Implemented feature engineering pipelines in Apache Spark', 'Containerized ML services using Docker and Kubernetes'] },
      ],
      education: [{ degree: 'B.Tech Computer Science', school: 'IIT Bombay', year: '2019' }],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'MLflow', 'FastAPI', 'AWS'],
    },
  },
  {
    id: 3,
    title: 'Data Analyst',
    icon: '📈',
    category: 'Data & AI',
    description: 'Transform raw data sets into compelling visual dashboards and reports to guide strategic business decisions.',
    resume: {
      name: 'Rahul Sharma',
      contact: 'rahul.sharma@email.com | linkedin.com/in/rahulsharma | +91 91234 56789',
      summary: 'Detail-oriented Data Analyst with 3 years of experience turning complex data into actionable business insights. Expert in SQL, Power BI, and Python-based analytics.',
      experience: [
        { role: 'Data Analyst', company: 'FinTech Corp', period: '2021–Present', bullets: ['Created 15+ executive dashboards in Power BI', 'Automated weekly reports saving 8 hours/week', 'Performed A/B test analysis leading to 24% conversion improvement'] },
        { role: 'Junior Analyst', company: 'MarketEdge', period: '2020–2021', bullets: ['Cleaned and processed 5M+ row datasets', 'Built SQL queries for sales performance tracking'] },
      ],
      education: [{ degree: 'B.Com Business Analytics', school: 'Delhi University', year: '2020' }],
      skills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel', 'Google Data Studio', 'Statistics'],
    },
  },
  {
    id: 4,
    title: 'Content Creator',
    icon: '✍️',
    category: 'Creative',
    description: 'Craft engaging digital media, engaging videos and high-quality storytelling that drives audience retention and growth.',
    resume: {
      name: 'Sneha Verma',
      contact: 'sneha.verma@email.com | youtube.com/@snehaverma | +91 98001 23456',
      summary: 'Creative Content Creator with 200K+ subscribers and 3 years of building engaging digital content across YouTube, Instagram, and LinkedIn.',
      experience: [
        { role: 'Senior Content Creator', company: 'BrandWave Agency', period: '2022–Present', bullets: ['Grew brand YouTube channel from 5K to 200K subscribers', 'Produced 50+ long-form videos with avg 85% watch-through rate', 'Managed editorial calendar and team of 4 content writers'] },
        { role: 'Content Writer', company: 'DigitalEdge', period: '2020–2022', bullets: ['Wrote 300+ SEO-optimized blog posts', 'Increased organic traffic by 180%'] },
      ],
      education: [{ degree: 'B.A. Mass Communication', school: 'Symbiosis International University', year: '2020' }],
      skills: ['Video Editing', 'SEO', 'Copywriting', 'Adobe Premiere', 'Canva', 'Analytics', 'Instagram', 'YouTube'],
    },
  },
  {
    id: 5,
    title: 'Business Analyst',
    icon: '💼',
    category: 'Business',
    description: 'Bridge the gap between IT and business users by gathering requirements and optimizing process efficiency.',
    resume: {
      name: 'Arjun Mehta',
      contact: 'arjun.mehta@email.com | linkedin.com/in/arjunmehta | +91 87654 32109',
      summary: 'Business Analyst with 4+ years bridging business and IT. Expert in requirements gathering, process optimization, and stakeholder management.',
      experience: [
        { role: 'Business Analyst', company: 'Enterprise Solutions', period: '2021–Present', bullets: ['Gathered requirements for $2M ERP implementation', 'Reduced process inefficiencies by 35% via workflow mapping', 'Led sprint planning for cross-functional agile team of 12'] },
        { role: 'Junior BA', company: 'ConsultPro', period: '2019–2021', bullets: ['Created detailed BRDs and functional specifications', 'Conducted UAT with business stakeholders'] },
      ],
      education: [{ degree: 'MBA Business Analytics', school: 'ISB Hyderabad', year: '2019' }],
      skills: ['JIRA', 'Confluence', 'SQL', 'Visio', 'Agile', 'Scrum', 'Data Analysis', 'Stakeholder Management'],
    },
  },
  {
    id: 6,
    title: 'Project Manager',
    icon: '📋',
    category: 'Business',
    description: 'Oversee project lifecycles from conception to delivery, managing resources, budget, and mitigating inherent risks.',
    resume: {
      name: 'Divya Nair',
      contact: 'divya.nair@email.com | linkedin.com/in/divyanair | +91 99123 45678',
      summary: 'PMP-certified Project Manager with 6+ years delivering complex IT and business projects on time and within budget. Expert in Agile and hybrid methodologies.',
      experience: [
        { role: 'Senior Project Manager', company: 'GlobalTech', period: '2020–Present', bullets: ['Managed $5M product launch across 3 countries', 'Led 20-member cross-functional team to deliver 98% SLA', 'Implemented Agile transformation reducing delivery time by 40%'] },
        { role: 'Project Manager', company: 'InfraWorks', period: '2018–2020', bullets: ['Delivered 10+ projects with average 15% under budget', 'Conducted risk assessments and mitigation planning'] },
      ],
      education: [{ degree: 'B.E. Computer Science', school: 'VIT Vellore', year: '2018' }, { degree: 'PMP Certification', school: 'PMI', year: '2020' }],
      skills: ['Agile', 'Scrum', 'MS Project', 'JIRA', 'Risk Management', 'Stakeholder Communication', 'Budgeting'],
    },
  },
  {
    id: 7,
    title: 'Android Developer',
    icon: '📱',
    category: 'Engineering',
    description: 'Design and develop robust, immersive mobile applications natively optimized for the Android platform.',
    resume: {
      name: 'Karan Singh',
      contact: 'karan.singh@email.com | github.com/karansingh | +91 98765 12340',
      summary: 'Android Developer with 3+ years building smooth, production-grade apps on Android. Expert in Kotlin, Jetpack Compose, and MVVM architecture.',
      experience: [
        { role: 'Android Developer', company: 'AppNation', period: '2021–Present', bullets: ['Built fintech app with 500K+ downloads on Play Store', 'Implemented offline-first architecture using Room + WorkManager', 'Reduced app crash rate from 2.3% to 0.1%'] },
        { role: 'Junior Android Dev', company: 'StartupStudio', period: '2020–2021', bullets: ['Developed 4 client apps from scratch', 'Integrated payment gateways (Razorpay, PayTM)'] },
      ],
      education: [{ degree: 'B.Tech Computer Science', school: 'NIT Trichy', year: '2020' }],
      skills: ['Kotlin', 'Java', 'Jetpack Compose', 'Room', 'Retrofit', 'Firebase', 'Git', 'MVVM', 'REST APIs'],
    },
  },
  {
    id: 8,
    title: 'Full Stack Developer',
    icon: '🌐',
    category: 'Engineering',
    description: 'Architect complete end-to-end web applications, handling both scalable backend microservices and dynamic frontends.',
    resume: {
      name: 'Aisha Khan',
      contact: 'aisha.khan@email.com | github.com/aishakhan | +91 77890 12345',
      summary: 'Full Stack Developer with 4+ years building scalable web platforms. Proficient across the entire stack from React frontends to Node.js microservices and cloud deployment.',
      experience: [
        { role: 'Full Stack Developer', company: 'WebCraft Labs', period: '2021–Present', bullets: ['Architected SaaS platform serving 50K+ monthly active users', 'Built real-time collaboration features using WebSockets', 'Reduced API response time by 45% through Redis caching'] },
        { role: 'Frontend Developer', company: 'PixelPerfect', period: '2019–2021', bullets: ['Built 10+ React.js applications for enterprise clients', 'Implemented CI/CD with GitHub Actions and Vercel'] },
      ],
      education: [{ degree: 'B.Tech Information Technology', school: 'BITS Pilani', year: '2019' }],
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'TypeScript'],
    },
  },
  {
    id: 9,
    title: 'Data Warehouse Developer',
    icon: '🏗️',
    category: 'Data & AI',
    description: 'Construct robust data pipelines, ETL flows, and centralized cloud warehouses to support enterprise-scale analytics.',
    resume: {
      name: 'Vikram Reddy',
      contact: 'vikram.reddy@email.com | linkedin.com/in/vikramreddy | +91 90123 45678',
      summary: 'Data Warehouse Developer with 5+ years designing and implementing scalable data platforms. Expert in cloud DWH solutions, ETL pipelines, and data modelling.',
      experience: [
        { role: 'DWH Developer', company: 'DataHouse Corp', period: '2020–Present', bullets: ['Migrated on-prem DWH to Snowflake saving $200K/year', 'Designed star-schema models for 500GB+ datasets', 'Built 100+ dbt models with automated testing'] },
        { role: 'ETL Developer', company: 'DataSync', period: '2018–2020', bullets: ['Developed Informatica pipelines for 20+ source systems', 'Improved ETL job performance by 70% via optimization'] },
      ],
      education: [{ degree: 'B.E. Information Systems', school: 'Osmania University', year: '2018' }],
      skills: ['SQL', 'Snowflake', 'dbt', 'Informatica', 'Airflow', 'Python', 'AWS Redshift', 'Data Modelling'],
    },
  },
  {
    id: 10,
    title: 'UI/UX Designer',
    icon: '🎨',
    category: 'Design',
    description: 'Map user journeys, conduct user research, and craft beautiful responsive interfaces utilizing modern design systems.',
    resume: {
      name: 'Meera Iyer',
      contact: 'meera.iyer@email.com | behance.net/meeraiyer | +91 98456 78901',
      summary: 'UI/UX Designer with 4+ years crafting intuitive digital experiences. Strong foundation in user research, interaction design, and design systems.',
      experience: [
        { role: 'Senior UI/UX Designer', company: 'DesignFirst Studio', period: '2021–Present', bullets: ['Led redesign of e-commerce platform increasing conversions by 28%', 'Created and maintained design system with 200+ components', 'Conducted 50+ user interviews and usability tests'] },
        { role: 'UI Designer', company: 'Pixel & Co.', period: '2019–2021', bullets: ['Designed mobile apps for 8 clients across FinTech, HealthTech', 'Delivered hi-fi prototypes using Figma'] },
      ],
      education: [{ degree: 'B.Des Interaction Design', school: 'NID Ahmedabad', year: '2019' }],
      skills: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'User Research', 'Prototyping', 'Accessibility', 'Design Systems'],
    },
  },
  {
    id: 11,
    title: 'Career Counsellor',
    icon: '🧭',
    category: 'Consulting',
    description: 'Empower job seekers by refining resumes, guiding interview prep, and providing tailored career path consultation.',
    resume: {
      name: 'Ananya Bose',
      contact: 'ananya.bose@email.com | linkedin.com/in/ananyabose | +91 87012 34567',
      summary: 'Certified Career Counsellor with 6+ years guiding students and professionals in career transitions, resume building, and interview preparation.',
      experience: [
        { role: 'Senior Career Counsellor', company: 'CareerPath Institute', period: '2019–Present', bullets: ['Counselled 500+ students with 80% placement success rate', 'Conducted 300+ mock interviews and resume reviews', 'Developed career curriculum adopted by 5 universities'] },
        { role: 'Career Advisor', company: 'EduGrowth', period: '2017–2019', bullets: ['Managed career development programs for 200+ students', 'Organized campus recruitment workshops'] },
      ],
      education: [{ degree: 'M.A. Counselling Psychology', school: 'Jadavpur University', year: '2017' }, { degree: 'Certified Career Coach (ICF)', school: 'ICF India', year: '2018' }],
      skills: ['Career Planning', 'Resume Building', 'Interview Coaching', 'LinkedIn Optimization', 'Aptitude Assessment', 'Communication'],
    },
  },
  {
    id: 12,
    title: 'Real Estate Agent',
    icon: '🏠',
    category: 'Sales',
    description: 'Drive strategic property transactions using deep market analysis, client relationship management, and negotiation execution.',
    resume: {
      name: 'Rohit Kapoor',
      contact: 'rohit.kapoor@email.com | linkedin.com/in/rohitkapoor | +91 99887 65432',
      summary: 'Licensed Real Estate Agent with 5+ years of expertise in residential and commercial property sales. Consistent top performer with $10M+ in annual sales.',
      experience: [
        { role: 'Senior Real Estate Agent', company: 'PropElite Realty', period: '2021–Present', bullets: ['Closed $12M in residential sales in 2023', 'Maintained 98% client satisfaction rating', 'Managed portfolio of 40+ active listings simultaneously'] },
        { role: 'Real Estate Agent', company: 'HomeFirst Properties', period: '2018–2021', bullets: ['Facilitated 80+ property transactions', 'Generated 60% of leads through referrals and networking'] },
      ],
      education: [{ degree: 'B.B.A. Marketing', school: 'Amity University', year: '2018' }, { degree: 'Real Estate License', school: 'Maharashtra RERA', year: '2018' }],
      skills: ['Negotiation', 'CRM (Salesforce)', 'Market Analysis', 'Property Valuation', 'Client Relations', 'Networking', 'Contract Management'],
    },
  },
  {
    id: 13,
    title: 'Graphic Designer',
    icon: '🖌️',
    category: 'Design',
    description: 'Transform brand visions into engaging visual identities using illustration, typography, and robust graphic editing suites.',
    resume: {
      name: 'Riya Desai',
      contact: 'riya.desai@email.com | behance.net/riyadesai | +91 97634 56789',
      summary: 'Creative Graphic Designer with 4+ years crafting compelling visual identities and marketing materials for brands across industries.',
      experience: [
        { role: 'Senior Graphic Designer', company: 'CreativeHive Studio', period: '2021–Present', bullets: ['Rebranded 12 companies from logo to full brand guidelines', 'Designed marketing campaigns reaching 2M+ impressions', 'Led team of 3 junior designers'] },
        { role: 'Graphic Designer', company: 'VisualEdge', period: '2019–2021', bullets: ['Created 500+ social media assets and print collaterals', 'Designed UI mockups in collaboration with web team'] },
      ],
      education: [{ degree: 'B.Des Visual Communication', school: 'NIFT Mumbai', year: '2019' }],
      skills: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Figma', 'Branding', 'Typography', 'Motion Graphics'],
    },
  },
];

const categoryColors = {
  'Data & AI': '#002147',
  'Engineering': '#1a4a8a',
  'Design': '#0a5e6b',
  'Business': '#002147',
  'Creative': '#6b3a00',
  'Consulting': '#1a4a1a',
  'Sales': '#6b1a00',
};

export default function RolesSection({ onViewRole }) {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

  const filtered = useMemo(() =>
    roles.filter(r => r.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <section className="roles" id="roles">
      <div className="roles-inner">

        {/* ===== HEADER ===== */}
        <div className="roles-header">
          <span className="roles-label">Browse Careers</span>
          <h2 className="roles-heading">Explore Roles</h2>
          <p className="roles-desc">
            Explore roles and view real successful resumes to understand what it takes to get hired.
          </p>

          {/* Search Bar */}
          <div className="roles-search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a6080" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              id="role-search-input"
              className="roles-search"
              type="text"
              placeholder="Search roles… e.g. Data Scientist, React Developer"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
            )}
          </div>
        </div>

        {/* ===== ROLE CARDS GRID ===== */}
        {filtered.length === 0 ? (
          <div className="roles-empty">
            <span>🔍</span>
            <p>No roles found for "<strong>{search}</strong>"</p>
          </div>
        ) : (
          <div className="roles-grid">
            {filtered.map(role => (
              <div className="role-card" key={role.id} id={`role-card-${role.id}`}>
                <div className="role-card-top">
                  <div className="role-icon-wrap" style={{ background: `${categoryColors[role.category]}12` }}>
                    <span className="role-icon">{role.icon}</span>
                  </div>
                  <span className="role-category" style={{ color: categoryColors[role.category] }}>
                    {role.category}
                  </span>
                </div>

                <h3 className="role-title">{role.title}</h3>

                <p className="role-card-desc">{role.description}</p>

                <div className="role-card-actions">
                  <button
                    className="btn-view-resume"
                    id={`view-resume-${role.id}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    View Resume
                  </button>
                  <button
                    className="btn-view-role"
                    id={`view-role-${role.id}`}
                    onClick={() => {
                       if(onViewRole) onViewRole(role.title);
                    }}
                  >
                    View Roadmap
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== RESUME MODAL ===== */}
      {selectedRole && (
        <div className="resume-modal-overlay" id="resume-modal" onClick={() => setSelectedRole(null)}>
          <div className="resume-modal" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-left">
                <span className="modal-icon">{selectedRole.icon}</span>
                <div>
                  <p className="modal-role-label">Sample Resume</p>
                  <h3 className="modal-role-title">{selectedRole.title}</h3>
                </div>
              </div>
              <button className="modal-close" id="modal-close-btn" onClick={() => setSelectedRole(null)} aria-label="Close">✕</button>
            </div>

            {/* Resume Content */}
            <div className="resume-body">
              <div className="resume-name-row">
                <h2 className="resume-name">{selectedRole.resume.name}</h2>
                <p className="resume-contact">{selectedRole.resume.contact}</p>
              </div>

              <div className="resume-divider" />

              <div className="resume-section">
                <h4 className="resume-section-title">Professional Summary</h4>
                <p className="resume-summary">{selectedRole.resume.summary}</p>
              </div>

              <div className="resume-section">
                <h4 className="resume-section-title">Experience</h4>
                {selectedRole.resume.experience.map((exp, i) => (
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
                {selectedRole.resume.education.map((edu, i) => (
                  <div key={i} className="resume-edu">
                    <span className="resume-edu-degree">{edu.degree}</span>
                    <span className="resume-edu-school"> — {edu.school}, {edu.year}</span>
                  </div>
                ))}
              </div>

              <div className="resume-section">
                <h4 className="resume-section-title">Skills</h4>
                <div className="resume-skills">
                  {selectedRole.resume.skills.map(s => (
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
