import { Member, TraitId, Department } from '../types';
import { TEAMS, MAX_MEMBERS_PER_TEAM, INITIAL_SEEDED_MEMBERS } from '../data/teams';

const STORAGE_KEY = 'mac_six_roster_v2';
const CURRENT_USER_KEY = 'mac_six_current_user_v2';

export const loadMembers = (): Member[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_MEMBERS));
      return INITIAL_SEEDED_MEMBERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_MEMBERS));
      return INITIAL_SEEDED_MEMBERS;
    }
    return parsed;
  } catch (e) {
    console.error('Error loading members from localStorage', e);
    return INITIAL_SEEDED_MEMBERS;
  }
};

export const saveMembers = (members: Member[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch (e) {
    console.error('Error saving members to localStorage', e);
  }
};

export const loadCurrentUser = (): Member | null => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveCurrentUser = (member: Member | null): void => {
  try {
    if (member) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(member));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Error saving current user', e);
  }
};

export const getTeamCounts = (members: Member[]): Record<TraitId, number> => {
  const counts: Record<TraitId, number> = {
    SANG_TAO: 0,
    KET_NOI: 0,
    CHIEN_LUOC: 0,
    HANH_DONG: 0,
    GAN_KET: 0,
    TAN_TAM: 0
  };
  members.forEach((m) => {
    if (counts[m.assignedTeam] !== undefined) {
      counts[m.assignedTeam]++;
    }
  });
  return counts;
};

export interface AssignmentResult {
  member: Member;
  traitScores: Record<TraitId, number>;
  rankedTraits: TraitId[];
  isFallback: boolean;
  primaryTeamFull: boolean;
}

export const assignMember = (
  name: string,
  department: Department,
  avatar: string,
  selectedTraits: TraitId[]
): AssignmentResult => {
  const members = loadMembers();
  const counts = getTeamCounts(members);

  // 1. Tally trait scores
  const traitScores: Record<TraitId, number> = {
    SANG_TAO: 0,
    KET_NOI: 0,
    CHIEN_LUOC: 0,
    HANH_DONG: 0,
    GAN_KET: 0,
    TAN_TAM: 0
  };

  selectedTraits.forEach((t) => {
    if (traitScores[t] !== undefined) {
      traitScores[t] += 1;
    }
  });

  // 2. Rank traits descending
  const rankedTraits = (Object.keys(traitScores) as TraitId[]).sort((a, b) => {
    if (traitScores[b] === traitScores[a]) {
      // Tie breaker: prefer team with fewer members to promote balance
      return (counts[a] || 0) - (counts[b] || 0);
    }
    return traitScores[b] - traitScores[a];
  });

  const primaryTrait = rankedTraits[0];
  const primaryTeamFull = (counts[primaryTrait] || 0) >= MAX_MEMBERS_PER_TEAM;

  // 3. Find first team with remaining capacity
  let assignedTeam: TraitId = primaryTrait;
  let rankUsed = 1;

  for (let i = 0; i < rankedTraits.length; i++) {
    const trait = rankedTraits[i];
    if ((counts[trait] || 0) < MAX_MEMBERS_PER_TEAM) {
      assignedTeam = trait;
      rankUsed = i + 1;
      break;
    }
  }

  const secondaryTrait = rankedTraits[1] || primaryTrait;

  const now = new Date();
  const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newMember: Member = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    department,
    avatar,
    assignedTeam,
    primaryTrait,
    secondaryTrait,
    scores: traitScores,
    rankUsed,
    joinedAt: timeString
  };

  // 4. Save to members list
  // If user with same name already exists, update them, otherwise append
  const existingIdx = members.findIndex((m) => m.name.toLowerCase() === name.trim().toLowerCase());
  let updatedList: Member[];
  if (existingIdx >= 0) {
    updatedList = [...members];
    updatedList[existingIdx] = newMember;
  } else {
    updatedList = [newMember, ...members];
  }

  saveMembers(updatedList);
  saveCurrentUser(newMember);

  return {
    member: newMember,
    traitScores,
    rankedTraits,
    isFallback: rankUsed > 1,
    primaryTeamFull
  };
};

export const simulateAddRandomMembers = (count: number = 5): Member[] => {
  const current = loadMembers();
  const counts = getTeamCounts(current);

  const sampleFirstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
  const sampleMiddleNames = ['Văn', 'Thị', 'Thanh', 'Minh', 'Hồng', 'Hải', 'Tuấn', 'Quang', 'Đức', 'Phương', 'Ngọc', 'Quốc'];
  const sampleLastNames = ['An', 'Bình', 'Châu', 'Dũng', 'Giang', 'Hà', 'Khánh', 'Lâm', 'Nam', 'Oanh', 'Phúc', 'Sơn', 'Tâm', 'Trâm', 'Uyên', 'Vy', 'Yến'];
  
  const sampleDepartments: Department[] = [
    'Creative & Design',
    'Account & Client Service',
    'Media & Planning',
    'Production & Video',
    'Tech & Digital',
    'HR, Admin & Finance'
  ];

  const traitList: TraitId[] = ['SANG_TAO', 'KET_NOI', 'CHIEN_LUOC', 'HANH_DONG', 'GAN_KET', 'TAN_TAM'];
  const avatars = ['🦊', '🦁', '🐯', '🐼', '🐨', '🦄', '🐬', '🦅', '🦉', '🐝', '🚀', '⭐'];

  const newlyAdded: Member[] = [];

  for (let i = 0; i < count; i++) {
    // Check if all teams are full
    const availableTraits = traitList.filter((t) => (counts[t] || 0) < MAX_MEMBERS_PER_TEAM);
    if (availableTraits.length === 0) break;

    const chosenTrait = availableTraits[Math.floor(Math.random() * availableTraits.length)];
    counts[chosenTrait] = (counts[chosenTrait] || 0) + 1;

    const randomName = `${sampleFirstNames[Math.floor(Math.random() * sampleFirstNames.length)]} ${sampleMiddleNames[Math.floor(Math.random() * sampleMiddleNames.length)]} ${sampleLastNames[Math.floor(Math.random() * sampleLastNames.length)]}`;
    const randomDept = sampleDepartments[Math.floor(Math.random() * sampleDepartments.length)];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const now = new Date();
    const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const member: Member = {
      id: `sim-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      name: randomName,
      department: randomDept,
      avatar: randomAvatar,
      assignedTeam: chosenTrait,
      primaryTrait: chosenTrait,
      secondaryTrait: traitList[(traitList.indexOf(chosenTrait) + 1) % traitList.length],
      scores: {
        SANG_TAO: chosenTrait === 'SANG_TAO' ? 3 : 1,
        KET_NOI: chosenTrait === 'KET_NOI' ? 3 : 1,
        CHIEN_LUOC: chosenTrait === 'CHIEN_LUOC' ? 3 : 1,
        HANH_DONG: chosenTrait === 'HANH_DONG' ? 3 : 1,
        GAN_KET: chosenTrait === 'GAN_KET' ? 3 : 1,
        TAN_TAM: chosenTrait === 'TAN_TAM' ? 3 : 1
      },
      rankUsed: 1,
      joinedAt: timeString
    };

    newlyAdded.push(member);
  }

  const updated = [...newlyAdded, ...current];
  saveMembers(updated);
  return updated;
};

export const resetToDefaultRoster = (): Member[] => {
  saveMembers(INITIAL_SEEDED_MEMBERS);
  saveCurrentUser(null);
  return INITIAL_SEEDED_MEMBERS;
};

export const clearAllMembers = (): Member[] => {
  saveMembers([]);
  saveCurrentUser(null);
  return [];
};

export const moveMemberToTeam = (memberId: string, newTeamId: TraitId): Member[] => {
  const current = loadMembers();
  const counts = getTeamCounts(current);
  if ((counts[newTeamId] || 0) >= MAX_MEMBERS_PER_TEAM) {
    throw new Error(`Đội ${TEAMS[newTeamId].name} đã đạt tối đa 10 người!`);
  }

  const updated = current.map((m) => {
    if (m.id === memberId) {
      return {
        ...m,
        assignedTeam: newTeamId,
        notes: `Điều chuyển thủ công sang ${TEAMS[newTeamId].shortName}`
      };
    }
    return m;
  });

  saveMembers(updated);
  return updated;
};

export const removeMemberById = (memberId: string): Member[] => {
  const current = loadMembers();
  const updated = current.filter((m) => m.id !== memberId);
  saveMembers(updated);
  return updated;
};

export const exportMembersToCsv = (members: Member[]): string => {
  const header = ['STT', 'Họ và tên', 'Phòng ban', 'Đội Mắc Six', 'Bản sắc chính', 'Đội phụ', 'Thời gian tham gia'];
  const rows = members.map((m, idx) => [
    idx + 1,
    `"${m.name.replace(/"/g, '""')}"`,
    `"${m.department}"`,
    `"${TEAMS[m.assignedTeam]?.name || m.assignedTeam}"`,
    `"${TEAMS[m.primaryTrait]?.shortName || m.primaryTrait}"`,
    m.secondaryTrait ? `"${TEAMS[m.secondaryTrait]?.shortName || m.secondaryTrait}"` : '""',
    `"${m.joinedAt}"`
  ]);

  const csvContent = '\uFEFF' + [header.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  return csvContent;
};
