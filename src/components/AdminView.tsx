import React, { useState } from 'react';
import { Member, TraitId, Department } from '../types';
import { TEAMS, DEPARTMENTS, MAX_MEMBERS_PER_TEAM, TOTAL_CAPACITY } from '../data/teams';
import {
  exportMembersToCsv,
  moveMemberToTeam,
  removeMemberById,
  simulateAddRandomMembers,
  resetToDefaultRoster,
  clearAllMembers
} from '../utils/storage';
import {
  ShieldCheck,
  Users,
  Download,
  PlusCircle,
  RefreshCw,
  Trash2,
  ArrowRightLeft,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';

interface AdminViewProps {
  members: Member[];
  onMembersChange: (newMembers: Member[]) => void;
  onBackToQuiz: () => void;
  onSelectTeamDetail: (teamId: TraitId) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  members,
  onMembersChange,
  onBackToQuiz,
  onSelectTeamDetail
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>('ALL');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('ALL');
  const [movingMemberId, setMovingMemberId] = useState<string | null>(null);
  const [targetTeamId, setTargetTeamId] = useState<TraitId>('SANG_TAO');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Team counts
  const teamStats = (Object.keys(TEAMS) as TraitId[]).map((tid) => {
    const list = members.filter((m) => m.assignedTeam === tid);
    return {
      teamId: tid,
      team: TEAMS[tid],
      count: list.length,
      members: list,
      isFull: list.length >= MAX_MEMBERS_PER_TEAM,
      remaining: Math.max(0, MAX_MEMBERS_PER_TEAM - list.length)
    };
  });

  const totalMembers = members.length;

  // Filtered members list
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = selectedTeamFilter === 'ALL' || m.assignedTeam === selectedTeamFilter;
    const matchesDept = selectedDeptFilter === 'ALL' || m.department === selectedDeptFilter;
    return matchesSearch && matchesTeam && matchesDept;
  });

  const handleExportCsv = () => {
    const csv = exportMembersToCsv(members);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `danh_sach_mac_six_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Đã xuất thành công file danh sách CSV cho BTC!');
  };

  const handleSimulate = (count: number) => {
    const updated = simulateAddRandomMembers(count);
    onMembersChange(updated);
    showNotification(`Đã tự động thêm ${count} nhân sự mô phỏng vào các đội còn chỗ!`);
  };

  const handleResetDefault = () => {
    if (window.confirm('Khôi phục danh sách về 31 nhân sự mẫu ban đầu?')) {
      const updated = resetToDefaultRoster();
      onMembersChange(updated);
      showNotification('Đã khôi phục dữ liệu mẫu ban đầu thành công!');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('CẢNH BÁO: Xóa sạch toàn bộ nhân sự để bắt đầu chia đội mới từ số 0?')) {
      const updated = clearAllMembers();
      onMembersChange(updated);
      showNotification('Đã làm trống danh sách đội hình!');
    }
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (window.confirm(`Xác nhận xóa thành viên "${name}" khỏi danh sách?`)) {
      const updated = removeMemberById(id);
      onMembersChange(updated);
      showNotification(`Đã xóa ${name} khỏi danh sách.`);
    }
  };

  const handleConfirmMove = () => {
    if (!movingMemberId) return;
    try {
      const updated = moveMemberToTeam(movingMemberId, targetTeamId);
      onMembersChange(updated);
      showNotification(`Đã điều chuyển nhân sự sang ${TEAMS[targetTeamId].name}!`);
      setMovingMemberId(null);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi chuyển đội');
    }
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Ban Tổ Chức MAC Media
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bảng Quản Trị Đội Hình Mắc Six
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Theo dõi quân số thời gian thực, điều phối chuyển đội và xuất dữ liệu Gala Sinh Nhật
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onBackToQuiz}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Vào Làm Quiz</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Xuất File CSV</span>
          </button>

          <button
            onClick={() => handleSimulate(5)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            title="Thêm nhanh 5 nhân viên để kiểm tra tính năng khóa đội khi đủ 10 người"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+5 Người Thử Nghiệm</span>
          </button>
        </div>
      </div>

      {/* Floating alert notification */}
      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-indigo-600 text-white text-xs font-medium flex items-center justify-between shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-200" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-indigo-200 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* 6 Teams Quota Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Tình Trạng 6 Đội Mắc Six ({totalMembers} / {TOTAL_CAPACITY} nhân sự)
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleResetDefault}
              className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Dữ liệu mẫu (31 người)</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={handleClearAll}
              className="text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa sạch</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamStats.map(({ teamId, team, count, isFull, remaining }) => {
            const pct = (count / MAX_MEMBERS_PER_TEAM) * 100;
            return (
              <div
                key={teamId}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="text-2xl">{team.icon}</div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm leading-tight">
                          {team.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{team.motto}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isFull
                          ? 'bg-rose-100 text-rose-700'
                          : count >= 8
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isFull ? 'ĐÃ ĐỦ 10' : `${count}/10`}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: team.color
                      }}
                    ></div>
                  </div>

                  <p className="text-xs text-slate-500 mb-3">
                    {isFull
                      ? 'Đã đủ quân số, tự động chuyển người mới sang đội bản sắc phụ'
                      : `Còn trống ${remaining} vị trí cho các thành viên mới`}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setSelectedTeamFilter(teamId);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold"
                  >
                    Lọc xem {count} thành viên →
                  </button>
                  <button
                    onClick={() => onSelectTeamDetail(teamId)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Member Roster Table & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-500" />
            <h2 className="font-bold text-slate-800 text-sm">
              Danh Sách Nhân Sự ({filteredMembers.length} / {totalMembers})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên hoặc phòng ban..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs outline-none focus:border-indigo-500"
              />
            </div>

            {/* Team Filter */}
            <select
              value={selectedTeamFilter}
              onChange={(e) => setSelectedTeamFilter(e.target.value)}
              className="py-1.5 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 font-medium outline-none focus:border-indigo-500"
            >
              <option value="ALL">Tất cả đội ({totalMembers})</option>
              {(Object.keys(TEAMS) as TraitId[]).map((tid) => (
                <option key={tid} value={tid}>
                  {TEAMS[tid].shortName}
                </option>
              ))}
            </select>

            {/* Department Filter */}
            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="py-1.5 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 font-medium outline-none focus:border-indigo-500"
            >
              <option value="ALL">Tất cả phòng ban</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Member Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 w-12 text-center">STT</th>
                <th className="py-3 px-4">Thành Viên</th>
                <th className="py-3 px-4">Phòng Ban</th>
                <th className="py-3 px-4">Đội Mắc Six Hiện Tại</th>
                <th className="py-3 px-4">Bản Sắc Gốc</th>
                <th className="py-3 px-4">Thời Gian</th>
                <th className="py-3 px-4 text-right">Thao Tác BTC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                    Không tìm thấy nhân sự phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member, idx) => {
                  const assignedInfo = TEAMS[member.assignedTeam];
                  const primaryInfo = TEAMS[member.primaryTrait];
                  const isRedirected = member.rankUsed > 1;

                  return (
                    <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-center text-slate-400">{idx + 1}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{member.avatar}</span>
                          <div>
                            <span className="font-bold text-slate-900 block">{member.name}</span>
                            {member.notes && (
                              <span className="text-[10px] text-amber-600 block">
                                {member.notes}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{member.department}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold"
                          style={{
                            backgroundColor: `${assignedInfo.color}15`,
                            color: assignedInfo.color
                          }}
                        >
                          <span>{assignedInfo.icon}</span>
                          <span>{assignedInfo.name}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {isRedirected ? (
                          <div className="flex items-center gap-1 text-[11px] text-amber-700">
                            <Flame className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              Gốc: <strong>{primaryInfo.shortName}</strong> (Ưu tiên {member.rankUsed})
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">Chuẩn 100%</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {member.joinedAt || 'Vừa xong'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setMovingMemberId(member.id);
                              setTargetTeamId(member.assignedTeam);
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors"
                            title="Điều chuyển đội"
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id, member.name)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Xóa thành viên"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Reassign Member */}
      {movingMemberId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg mb-1">
              Điều Chuyển Đội Mắc Six
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Chọn đội mới cho thành viên. Đội chuyển tới phải còn vị trí trống (dưới 10 người).
            </p>

            <div className="space-y-2 mb-6">
              {(Object.keys(TEAMS) as TraitId[]).map((tid) => {
                const count = members.filter((m) => m.assignedTeam === tid).length;
                const isFull = count >= MAX_MEMBERS_PER_TEAM;
                const isSelected = targetTeamId === tid;

                return (
                  <button
                    key={tid}
                    disabled={isFull}
                    onClick={() => setTargetTeamId(tid)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 font-bold'
                        : isFull
                        ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{TEAMS[tid].icon}</span>
                      <span>{TEAMS[tid].name}</span>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold ${
                        isFull ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {count}/10
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setMovingMemberId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmMove}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
              >
                Xác Nhận Chuyển Đội
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
