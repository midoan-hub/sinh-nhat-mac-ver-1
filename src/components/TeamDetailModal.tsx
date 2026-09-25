import React from 'react';
import { TraitId, Member } from '../types';
import { TEAMS, MAX_MEMBERS_PER_TEAM } from '../data/teams';
import { X, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface TeamDetailModalProps {
  teamId: TraitId | null;
  onClose: () => void;
  members: Member[];
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({
  teamId,
  onClose,
  members
}) => {
  if (!teamId) return null;
  const team = TEAMS[teamId];
  const teamMembers = members.filter((m) => m.assignedTeam === teamId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header with team color */}
        <div
          className="p-6 sm:p-8 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${team.color} 0%, ${team.accentColor} 100%)`
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-md shrink-0">
              {team.icon}
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-white/80 block">
                Hồ Sơ Mắc Six
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">{team.name}</h2>
              <p className="text-white/90 text-xs sm:text-sm italic mt-0.5">"{team.motto}"</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Đặc Trưng Tính Cách
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {team.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Siêu Năng Lực Cốt Lõi
              </span>
              <p className="text-sm font-bold text-slate-900">{team.superpower}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Thế Mạnh Nổi Bật
              </span>
              <div className="flex flex-wrap gap-1.5">
                {team.strengths.map((str, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700"
                  >
                    ✓ {str}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Members list */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-500" />
                <span>
                  Danh Sách Thành Viên ({teamMembers.length}/{MAX_MEMBERS_PER_TEAM})
                </span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {teamMembers.length >= MAX_MEMBERS_PER_TEAM ? 'Đã đủ 10/10' : `Còn ${MAX_MEMBERS_PER_TEAM - teamMembers.length} chỗ`}
              </span>
            </div>

            {teamMembers.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4 text-center bg-slate-50 rounded-xl">
                Chưa có thành viên nào trong đội này.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {teamMembers.map((m, idx) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 bg-slate-50/70"
                  >
                    <span className="text-xl">{m.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {idx + 1}. {m.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{m.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold"
          >
            Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
};
