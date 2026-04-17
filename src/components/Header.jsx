import React, { useState, useEffect } from 'react';
import './Header.css';

const navLinks = ['Homepage', 'Roles', 'About', 'Roadmap', 'Best Resumes', 'Resume Verification', 'Expert Login'];

export default function Header({ onUpload, currentUser, onOpenAuth, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('homepage');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
      } else {
        setActiveSection('homepage');
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`} id="main-header">
      <nav className="nav-container">
        {/* Logo */}
        <a href="#" className="logo" id="logo-link">
          <span className="logo-icon">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="14" stroke="#F97316" strokeWidth="2"/>
              <circle cx="15" cy="15" r="4" fill="#F97316"/>
              <line x1="15" y1="1" x2="15" y2="8" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
              <line x1="15" y1="22" x2="15" y2="29" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
              <line x1="1" y1="15" x2="8" y2="15" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
              <line x1="22" y1="15" x2="29" y2="15" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
              <line x1="5" y1="5" x2="10" y2="10" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              <line x1="20" y1="20" x2="25" y2="25" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              <line x1="25" y1="5" x2="20" y2="10" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              <line x1="5" y1="25" x2="10" y2="20" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            </svg>
          </span>
          <span className="logo-text">SkillBridge</span>
        </a>

        {/* Center Nav */}
        <ul className={`nav-links${menuOpen ? ' nav-links--open' : ''}`} id="nav-menu">
          {navLinks.map((link) => {
            const id = link.toLowerCase().replace(/\s+/g, '-');
            const isActive = activeSection === id;
            return (
              <li key={link}>
                <a
                  href={`#${id}`}
                  className={`nav-link${isActive ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right CTA */}
        <div className="nav-right">
          {currentUser ? (
            /* Logged-in: show avatar + logout */
            <div className="nav-user-group">
              <a href="#user-dashboard" className="nav-profile-link" onClick={() => setMenuOpen(false)} title={currentUser.name}>
                <div className="nav-avatar">{currentUser.initials}</div>
              </a>
              <button className="btn-logout" onClick={onLogout}>Logout</button>
            </div>
          ) : (
            /* Logged-out: show Login / Sign Up button */
            <button className="btn-auth" id="login-signup-btn" onClick={onOpenAuth}>
              Login / Sign Up
            </button>
          )}

          {/* Hamburger */}
          <button className="hamburger" id="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`ham-line${menuOpen ? ' open' : ''}`}/>
            <span className={`ham-line${menuOpen ? ' open' : ''}`}/>
            <span className={`ham-line${menuOpen ? ' open' : ''}`}/>
          </button>
        </div>
      </nav>
    </header>
  );
}
