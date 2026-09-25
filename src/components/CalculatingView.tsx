import React, { useEffect, useState } from 'react';
import { TEAMS } from '../data/teams';
import { TraitId } from '../types';
import { Sparkles } from 'lucide-react';

interface CalculatingViewProps {
  userName: string;
}

export const CalculatingView: React.FC<CalculatingViewProps> = ({ userName }) => {
  const traitKeys = Object.keys(TEAMS) as TraitId[];
  const [activeTraitIdx, setActiveTraitIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTraitIdx((prev) => (prev + 1) % traitKeys.length);
    }, 250);
    return () => clearInterval(interval);
  }, [traitKeys.length]);

  const currentTrait = TEAMS[traitKeys[activeTraitIdx]];

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
        {/* Outer rotating pulse ring */}
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping opacity-60"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-purple-600 border-l-transparent animate-spin"></div>

        {/* Center Trait Icon */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-4xl border border-slate-100 transition-all transform scale-105">
          {currentTrait.icon}
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Thuật toán Bản Sắc MAC</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
        Đang phân tích siêu năng lực của {userName}...
      </h2>
      <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
        Hệ thống đang đối soát dữ liệu câu trả lời với chỉ số 6 đội Mắc Six và kiểm tra dung lượng đội hình theo thời gian thực...
      </p>

      <div className="mt-6 flex items-center justify-center gap-2">
        {traitKeys.map((key, i) => (
          <div
            key={key}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === activeTraitIdx ? 'bg-indigo-600 scale-125' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
