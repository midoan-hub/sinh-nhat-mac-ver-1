import React from 'react';
import { ShieldCheck, Sparkles, BookOpen, Users, HelpCircle } from 'lucide-react';

interface NavbarProps {
  currentView: 'welcome' | 'quiz' | 'calculating' | 'result' | 'admin';
  onNavigate: (view: 'welcome' | 'admin') => void;
  onOpenGuide: () => void;
  totalMembers: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenGuide,
  totalMembers
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 tracking-tight text-lg leading-tight group-hover:text-indigo-600 transition-colors">
              BẢN SẮC MAC
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
              Mắc Six Birthday Quiz
            </span>
          </div>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('welcome')}
            className={`hover:text-slate-900 transition-colors ${
              currentView === 'welcome' || currentView === 'quiz' || currentView === 'result'
                ? 'text-indigo-600 font-semibold'
                : ''
            }`}
          >
            Trắc Nghiệm
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors ${
              currentView === 'admin' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            <span>Bảng Quản Trị BTC</span>
            <span className="text-xs bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-full font-mono">
              {totalMembers}/60
            </span>
          </button>

          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors text-slate-500"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Cài Vercel</span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          {currentView === 'admin' ? (
            <button
              onClick={() => onNavigate('welcome')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Vào Làm Quiz</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('admin')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Dành cho</span> BTC
            </button>
          )}

          <button
            onClick={onOpenGuide}
            className="md:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg border border-slate-200"
            title="Hướng dẫn cài Vercel"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
