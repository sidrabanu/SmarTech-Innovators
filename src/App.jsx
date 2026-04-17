import React, { useState } from 'react';
import './index.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RolesSection from './components/RolesSection';
import AboutSection from './components/AboutSection';
import RoadmapSection from './components/RoadmapSection';
import BestResumesSection from './components/BestResumesSection';
import VerificationSection from './components/VerificationSection';
import ExpertLoginSection from './components/ExpertLoginSection';
import UserDashboardSection from './components/UserDashboardSection';
import AuthModal from './components/AuthModal';

export default function App() {
  const [globalResumeUploaded, setGlobalResumeUploaded] = useState(false);
  const [targetRoleTitle, setTargetRoleTitle] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  const handleHeaderUpload = () => {
    setGlobalResumeUploaded(true);
    const roadmapEl = document.getElementById('roadmap');
    if (roadmapEl) roadmapEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewRoadmapRole = (title) => {
    setTargetRoleTitle(title);
    const roadmapEl = document.getElementById('roadmap');
    if (roadmapEl) roadmapEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowAuth(false);
    // Scroll to profile after login
    setTimeout(() => {
      const el = document.getElementById('user-dashboard');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.hash = '';
  };

  return (
    <div className="app">
      <Header
        onUpload={handleHeaderUpload}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuth(true)}
        onLogout={handleLogout}
      />
      <main>
        <HeroSection onUpload={handleHeaderUpload} />
        <RolesSection onViewRole={handleViewRoadmapRole} />
        <AboutSection />
        <RoadmapSection 
          globalResumeUploaded={globalResumeUploaded} 
          setGlobalResumeUploaded={setGlobalResumeUploaded} 
          targetRoleTitle={targetRoleTitle}
          setTargetRoleTitle={setTargetRoleTitle}
        />
        <BestResumesSection />
        <VerificationSection />
        <ExpertLoginSection />
        <UserDashboardSection currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </main>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}
