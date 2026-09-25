import React, { useState } from 'react';
import { Question, TraitId, Department } from '../types';
import { QUESTIONS, TEAMS } from '../data/teams';
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react';

interface QuizViewProps {
  userName: string;
  userDepartment: Department;
  userAvatar: string;
  onFinishQuiz: (selectedTraits: TraitId[]) => void;
  onCancel: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  userName,
  userDepartment,
  userAvatar,
  onFinishQuiz,
  onCancel
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, TraitId>>({});
  const [highlightedOption, setHighlightedOption] = useState<number | null>(null);

  const question = QUESTIONS[currentIndex];
  const total = QUESTIONS.length;
  const progressPercent = ((currentIndex + 1) / total) * 100;
  const currentSelection = selectedAnswers[currentIndex];

  const handleSelectOption = (trait: TraitId, optionIdx: number) => {
    setHighlightedOption(optionIdx);
    const updated = { ...selectedAnswers, [currentIndex]: trait };
    setSelectedAnswers(updated);

    // Auto advance after slight delay for visual satisfaction
    setTimeout(() => {
      setHighlightedOption(null);
      if (currentIndex < total - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Collect answers in order
        const answersArray: TraitId[] = [];
        for (let i = 0; i < total; i++) {
          answersArray.push(updated[i] || 'SANG_TAO');
        }
        onFinishQuiz(answersArray);
      }
    }, 280);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Top Header & Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <button
            onClick={onCancel}
            className="hover:text-slate-800 transition-colors flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Thoát ra trang chủ</span>
          </button>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-slate-400">Thí sinh:</span>
            <span className="text-slate-700 font-semibold flex items-center gap-1">
              <span>{userAvatar}</span>
              <span>{userName}</span>
            </span>
          </div>
        </div>

        {/* Question Counter & Progress Bar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-bold text-slate-800">
              Câu hỏi {currentIndex + 1} / {total}
            </span>
            <span className="font-mono text-xs font-semibold text-indigo-600">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
            {question.subtitle}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
            {question.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {question.situation}
          </p>
        </div>

        {/* 6 Personality Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = currentSelection === option.trait;
            const isJustClicked = highlightedOption === idx;
            const teamInfo = TEAMS[option.trait];

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(option.trait, idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group relative ${
                  isSelected || isJustClicked
                    ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
                }`}
              >
                {/* Index badge */}
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs transition-colors mt-0.5 ${
                    isSelected || isJustClicked
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? <Check className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
                </div>

                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug group-hover:text-indigo-900">
                    {option.text}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    {option.detail}
                  </p>
                </div>

                <div className="shrink-0 text-lg opacity-40 group-hover:opacity-100 transition-opacity">
                  {teamInfo?.icon}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white text-xs font-semibold disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Chọn một đáp án đúng với phản xạ tự nhiên của bạn
        </span>
      </div>
    </div>
  );
};
