import React, { useState } from 'react';
import { Department, TraitId } from '../types';
import { TEAMS, DEPARTMENTS, AVATAR_OPTIONS, MAX_MEMBERS_PER_TEAM } from '../data/teams';
import { Sparkles, ArrowRight, Users, CheckCircle2, ShieldAlert } from 'lucide-react';

interface WelcomeViewProps {
  onStartQuiz: (name: string, department: Department, avatar: string) => void;
  teamCounts: Record<TraitId, number>;
  totalMembers: number;
  onSelectTeamDetail: (teamId: TraitId) => void;
  onGoToAdmin: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onStartQuiz,
  teamCounts,
  totalMembers,
  onSelectTeamDetail,
  onGoToAdmin
}) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState<Department>('Creative & Design');
  const [avatar, setAvatar] = useState('🦊');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn để bắt đầu nhé!');
      return;
    }
    if (name.trim().length < 2) {
      setErrorMsg('Tên cần có ít nhất 2 ký tự.');
      return;
    }
    setErrorMsg('');
    onStartQuiz(name.trim(), department, avatar);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sinh Nhật MAC Media · Hội Tụ 6 Bản Sắc</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Khám Phá <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">Mắc Six</span> Của Bạn
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Bạn là mảnh ghép nào trong bức tranh đa sắc của MAC? Thực hiện bài trắc nghiệm ngắn 5 câu để tìm ra bản sắc tiềm ẩn và cùng anh em nhập hội thi tài rực rỡ!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Registration Form Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Thông Tin Tham Gia</h2>
              <p className="text-xs text-slate-500 mt-0.5">Nhập tên để hệ thống vinh danh bạn vào đội</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl">
              {avatar}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Họ và Tên <span className="text-rose-500">*</span>
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="VD: Nguyễn Văn Anh"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-800 placeholder:text-slate-400"
                autoComplete="name"
              />
              {errorMsg && (
                <p className="text-xs text-rose-600 font-medium mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> {errorMsg}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="dept-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Phòng Ban / Bộ Phận
              </label>
              <select
                id="dept-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-800 bg-white"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Chọn Linh Vật Avatar
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`h-11 rounded-xl text-xl flex items-center justify-center transition-all ${
                      avatar === av
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105 ring-2 ring-indigo-500'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-base shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Bắt Đầu Làm Trắc Nghiệm</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onGoToAdmin}
                className="text-xs text-slate-500 hover:text-indigo-600 font-medium inline-flex items-center gap-1 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Xem danh sách phân đội Ban Tổ Chức ({totalMembers}/60 người)</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Quota Tracker & 6 Teams Overview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Hiện Trạng Đội Hình 6 Mắc Six</h3>
                <p className="text-xs text-slate-500 mt-0.5">Mỗi đội nhận tối đa 10 chiến binh để thi đấu công bằng</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-indigo-600">{totalMembers}</span>
                <span className="text-xs text-slate-400 font-medium">/60 người</span>
              </div>
            </div>

            {/* Overall progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalMembers / 60) * 100)}%` }}
              ></div>
            </div>

            {/* 6 Teams List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(TEAMS) as TraitId[]).map((teamId) => {
                const team = TEAMS[teamId];
                const count = teamCounts[teamId] || 0;
                const isFull = count >= MAX_MEMBERS_PER_TEAM;
                const percent = (count / MAX_MEMBERS_PER_TEAM) * 100;

                return (
                  <button
                    key={teamId}
                    type="button"
                    onClick={() => onSelectTeamDetail(teamId)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs text-left transition-all group bg-slate-50/50 hover:bg-white"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{team.icon}</span>
                        <span className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                          {team.shortName}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          isFull
                            ? 'bg-rose-100 text-rose-700'
                            : count >= 8
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200/80 text-slate-700'
                        }`}
                      >
                        {count}/{MAX_MEMBERS_PER_TEAM}
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: team.color
                        }}
                      ></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rule note callout */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-900 text-xs leading-relaxed flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-indigo-950">Quy tắc phân bổ thông minh của MAC:</p>
              <p className="text-indigo-800 mt-0.5">
                Khi đội bản sắc chính của bạn đã đủ 10 người, hệ thống sẽ linh hoạt ghép bạn vào đội bản sắc phụ phù hợp tiếp theo để mọi đội đều cân bằng và có cơ hội tỏa sáng!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
