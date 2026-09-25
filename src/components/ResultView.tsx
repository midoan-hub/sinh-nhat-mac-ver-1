import React, { useEffect, useState } from 'react';
import { Member, TraitId } from '../types';
import { TEAMS, MAX_MEMBERS_PER_TEAM } from '../data/teams';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, Check, Users, ArrowRight, RotateCcw, ShieldCheck, Flame } from 'lucide-react';

interface ResultViewProps {
  member: Member;
  allMembers: Member[];
  onNextPerson: () => void;
  onGoToAdmin: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  member,
  allMembers,
  onNextPerson,
  onGoToAdmin
}) => {
  const [copied, setCopied] = useState(false);
  const team = TEAMS[member.assignedTeam];
  const primaryTeam = TEAMS[member.primaryTrait];
  const isFallback = member.rankUsed > 1;

  // Teammates in the same assigned team
  const teammates = allMembers.filter(
    (m) => m.assignedTeam === member.assignedTeam && m.id !== member.id
  );

  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
    } catch (e) {
      console.error('Confetti trigger', e);
    }
  }, []);

  const handleCopyShare = async () => {
    const text = `🎉 Tôi vừa khám phá bản sắc tại MAC Media: Tôi thuộc ${team.name} (${team.icon})! Slogan: "${team.motto}". Cùng tham gia sinh nhật MAC nhé!`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  // Trait scores sorted descending
  const scoreEntries = (Object.entries(member.scores) as [TraitId, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const maxScore = Math.max(...scoreEntries.map((s) => s[1]), 1);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top Banner Celebration */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Phân Đội Thành Công · Sinh Nhật MAC</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Chào Mừng Đến Với Biệt Đội Của Bạn!
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Bản sắc và năng lượng cá nhân của bạn đã tìm thấy nơi tỏa sáng rực rỡ nhất
        </p>
      </div>

      {/* Main Result Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden mb-8">
        {/* Colorful Team Header */}
        <div
          className="p-8 sm:p-10 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${team.color} 0%, ${team.accentColor} 100%)`
          }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-5xl shadow-lg shrink-0">
              {team.icon}
            </div>

            <div className="flex-1">
              <span className="text-xs uppercase tracking-widest font-bold text-white/80 block mb-1">
                Bản sắc sinh nhật MAC
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                {team.name}
              </h2>
              <p className="text-white/90 text-sm sm:text-base italic mt-1 font-medium">
                "{team.motto}"
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
                <span className="bg-white/20 backdrop-blur-xs px-3 py-1 rounded-lg font-semibold">
                  Thành viên: {member.name}
                </span>
                <span className="bg-white/20 backdrop-blur-xs px-3 py-1 rounded-lg font-semibold">
                  {member.department}
                </span>
                <span className="bg-white/20 backdrop-blur-xs px-3 py-1 rounded-lg font-semibold">
                  {teammates.length + 1}/{MAX_MEMBERS_PER_TEAM} người
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Fallback secondary trait notification */}
          {isFallback && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
              <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950">Siêu Năng Lực Kép Đáng Tự Hào!</p>
                <p className="mt-1 text-amber-800">
                  Bài test cho thấy bạn có tố chất rất mạnh về{' '}
                  <span className="font-semibold underline">{primaryTeam.name}</span>. Tuy nhiên đội này đã đủ chỉ tiêu 10 thành viên trước đó. Bạn được hệ thống điều chuyển sang{' '}
                  <span className="font-semibold underline">{team.name}</span> để mang góc nhìn đa chiều và nguồn năng lượng vô giá giúp đội cân bằng sức mạnh!
                </p>
              </div>
            </div>
          )}

          {/* Description & Superpower */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Hồ Sơ Tính Cách
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {team.description}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Siêu Năng Lực Đóng Góp
              </h3>
              <p className="text-base font-bold text-slate-900 mb-3">
                {team.superpower}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {team.strengths.map((str, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium"
                  >
                    ✓ {str}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trait Radar breakdown */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Biểu Đồ Phân Bổ Điểm Số Bài Trắc Nghiệm Của Bạn
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {scoreEntries.map(([tid, score]) => {
                const tInfo = TEAMS[tid];
                const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
                const isAssigned = tid === member.assignedTeam;

                return (
                  <div
                    key={tid}
                    className={`p-3 rounded-xl border transition-all ${
                      isAssigned
                        ? 'border-indigo-400 bg-indigo-50/50 shadow-2xs'
                        : 'border-slate-100 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span>{tInfo.icon}</span>
                        <span className={isAssigned ? 'text-indigo-900' : 'text-slate-700'}>
                          {tInfo.shortName}
                        </span>
                      </span>
                      <span className="font-mono text-slate-500">{score} điểm</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: tInfo.color
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teammates List */}
          <div className="border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Đồng Đội Cùng {team.name} ({teammates.length + 1}/{MAX_MEMBERS_PER_TEAM})
              </h3>
              <span className="text-xs text-slate-400">
                Còn lại {Math.max(0, MAX_MEMBERS_PER_TEAM - (teammates.length + 1))} vị trí
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Current user tile */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/80 border border-indigo-200">
                <span className="text-2xl">{member.avatar}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-indigo-950 truncate">{member.name}</p>
                    <span className="text-[10px] bg-indigo-600 text-white font-bold px-1.5 py-0.2 rounded-sm uppercase">
                      Bạn
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 truncate">{member.department}</p>
                </div>
              </div>

              {/* Other teammates */}
              {teammates.map((tm) => (
                <div
                  key={tm.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="text-2xl">{tm.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{tm.name}</p>
                    <p className="text-xs text-slate-500 truncate">{tm.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="bg-slate-50 px-6 sm:px-8 py-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyShare}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs shadow-2xs flex items-center justify-center gap-2 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Đã sao chép vào bộ nhớ tạm!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Sao chép kết quả chia sẻ</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onGoToAdmin}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Bảng Tổng Sắp BTC</span>
            </button>

            <button
              type="button"
              onClick={onNextPerson}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Người Tiếp Theo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
