import React, { useState, useEffect } from 'react';
import { Member, TraitId, Department } from './types';
import { TEAMS } from './data/teams';
import {
  loadMembers,
  saveMembers,
  loadCurrentUser,
  saveCurrentUser,
  getTeamCounts,
  assignMember
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { WelcomeView } from './components/WelcomeView';
import { QuizView } from './components/QuizView';
import { CalculatingView } from './components/CalculatingView';
import { ResultView } from './components/ResultView';
import { AdminView } from './components/AdminView';
import { TeamDetailModal } from './components/TeamDetailModal';
import { VercelGuideModal } from './components/VercelGuideModal';

export default function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const [view, setView] = useState<'welcome' | 'quiz' | 'calculating' | 'result' | 'admin'>('welcome');
  
  // Pending user session during quiz
  const [quizUser, setQuizUser] = useState<{
    name: string;
    department: Department;
    avatar: string;
  } | null>(null);

  // Modals
  const [selectedTeamDetail, setSelectedTeamDetail] = useState<TraitId | null>(null);
  const [isVercelGuideOpen, setIsVercelGuideOpen] = useState(false);

  // Initial load
  useEffect(() => {
    const loadedMembers = loadMembers();
    setMembers(loadedMembers);

    const savedUser = loadCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  const teamCounts = getTeamCounts(members);

  const handleStartQuiz = (name: string, department: Department, avatar: string) => {
    setQuizUser({ name, department, avatar });
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishQuiz = (selectedTraits: TraitId[]) => {
    if (!quizUser) return;

    setView('calculating');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Visual pause to heighten anticipation and display calculation animation
    setTimeout(() => {
      const assignment = assignMember(
        quizUser.name,
        quizUser.department,
        quizUser.avatar,
        selectedTraits
      );

      const refreshed = loadMembers();
      setMembers(refreshed);
      setCurrentUser(assignment.member);
      setView('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  const handleNextPerson = () => {
    setQuizUser(null);
    saveCurrentUser(null);
    setCurrentUser(null);
    setView('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMembersChange = (updatedMembers: Member[]) => {
    setMembers(updatedMembers);
    saveMembers(updatedMembers);
    if (currentUser) {
      const exists = updatedMembers.find((m) => m.id === currentUser.id);
      setCurrentUser(exists || null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Abstract Background Subtle Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `radial-gradient(#4338ca 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Top Navigation */}
      <Navbar
        currentView={view}
        onNavigate={(newView) => {
          setView(newView);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGuide={() => setIsVercelGuideOpen(true)}
        totalMembers={members.length}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1">
        {view === 'welcome' && (
          <WelcomeView
            onStartQuiz={handleStartQuiz}
            teamCounts={teamCounts}
            totalMembers={members.length}
            onSelectTeamDetail={(tid) => setSelectedTeamDetail(tid)}
            onGoToAdmin={() => setView('admin')}
          />
        )}

        {view === 'quiz' && quizUser && (
          <QuizView
            userName={quizUser.name}
            userDepartment={quizUser.department}
            userAvatar={quizUser.avatar}
            onFinishQuiz={handleFinishQuiz}
            onCancel={() => setView('welcome')}
          />
        )}

        {view === 'calculating' && (
          <CalculatingView userName={quizUser?.name || 'bạn'} />
        )}

        {view === 'result' && currentUser && (
          <ResultView
            member={currentUser}
            allMembers={members}
            onNextPerson={handleNextPerson}
            onGoToAdmin={() => setView('admin')}
          />
        )}

        {view === 'admin' && (
          <AdminView
            members={members}
            onMembersChange={handleMembersChange}
            onBackToQuiz={() => setView('welcome')}
            onSelectTeamDetail={(tid) => setSelectedTeamDetail(tid)}
          />
        )}
      </main>

      {/* Modals */}
      <TeamDetailModal
        teamId={selectedTeamDetail}
        onClose={() => setSelectedTeamDetail(null)}
        members={members}
      />

      <VercelGuideModal
        isOpen={isVercelGuideOpen}
        onClose={() => setIsVercelGuideOpen(false)}
      />

      {/* Bottom Footer */}
      <footer className="relative z-10 border-t border-slate-200/80 bg-white/70 backdrop-blur-xs py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium">
            © 2026 Bản Sắc MAC Media · Sinh Nhật Công Ty · Mắc Six Team Quiz
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>6 Đội · 10 Người/Đội</span>
            <span>•</span>
            <button
              onClick={() => setIsVercelGuideOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Cài đặt Vercel (Zero-Setup)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
