import { TeamInfo, TraitId, Question, Department, Member } from '../types';

export const MAX_MEMBERS_PER_TEAM = 10;
export const TOTAL_CAPACITY = 60;

export const TEAMS: Record<TraitId, TeamInfo> = {
  SANG_TAO: {
    id: 'SANG_TAO',
    name: 'Mắc Six Sáng Tạo',
    shortName: 'Sáng Tạo',
    color: '#2563EB',
    accentColor: '#3B82F6',
    badgeBg: 'bg-blue-600',
    lightBg: 'bg-blue-50/80',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    icon: '🎨',
    motto: 'Sáng tạo, bay bổng, dệt nên những mảng màu nghệ thuật.',
    description: 'Những tâm hồn nghệ sĩ với tư duy thẩm mỹ khác biệt, luôn thổi luồng sinh khí mới vào từng concept và mang lại những ý tưởng đột phá ngoài khuôn khổ.',
    superpower: 'Bùng nổ Concept & Tư duy Out-of-the-box',
    strengths: ['Đột phá ý tưởng', 'Thẩm mỹ thị giác', 'Cảm hứng bất tận', 'Linh hoạt biến hóa']
  },
  KET_NOI: {
    id: 'KET_NOI',
    name: 'Mắc Six Kết Nối',
    shortName: 'Kết Nối',
    color: '#9333EA',
    accentColor: '#A855F7',
    badgeBg: 'bg-purple-600',
    lightBg: 'bg-purple-50/80',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    icon: '🤝',
    motto: 'Nhiệt thành, thân thiện, gắn kết mọi người.',
    description: 'Chất keo gắn kết vô hình nhưng mạnh mẽ của tập thể MAC. Họ khéo léo hòa giải, lan tỏa năng lượng tích cực và luôn biến mọi cuộc trò chuyện thành cầu nối tin cậy.',
    superpower: 'Thỏi Nam Châm Ngoại Giao & Hòa Nhập',
    strengths: ['Giao tiếp lôi cuốn', 'Hòa giải mâu thuẫn', 'Mở rộng mạng lưới', 'Tạo thiện cảm nhanh']
  },
  CHIEN_LUOC: {
    id: 'CHIEN_LUOC',
    name: 'Mắc Six Chiến Lược',
    shortName: 'Chiến Lược',
    color: '#D97706',
    accentColor: '#F59E0B',
    badgeBg: 'bg-amber-600',
    lightBg: 'bg-amber-50/80',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    icon: '🧭',
    motto: 'Logic, nhìn xa trông rộng, xác định hướng đi.',
    description: 'Những bộ óc sắc bén với tư duy phân tích, khả năng đọc vị thị trường và luôn vạch ra lộ trình tối ưu nhất cho từng chiến dịch và dự án quy mô.',
    superpower: 'La Bàn Định Hướng & Tư Duy Hệ Thống',
    strengths: ['Tầm nhìn dài hạn', 'Phân tích đa chiều', 'Tối ưu hóa nguồn lực', 'Dự báo xu hướng']
  },
  HANH_DONG: {
    id: 'HANH_DONG',
    name: 'Mắc Six Hành Động',
    shortName: 'Hành Động',
    color: '#E11D48',
    accentColor: '#F43F5E',
    badgeBg: 'bg-rose-600',
    lightBg: 'bg-rose-50/80',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    icon: '⚡',
    motto: 'Nhanh nhẹn, quyết liệt, luôn trong tư thế bứt phá.',
    description: 'Nguồn động lực thần tốc với tinh thần không ngại va chạm. Khi có mục tiêu, họ lập tức lăn xả vào thực tế để biến kế hoạch trên giấy thành kết quả rõ ràng.',
    superpower: 'Tốc Độ Triển Khai Thần Tốc & Quyết Đoán',
    strengths: ['Bắt tay làm ngay', 'Xử lý khủng hoảng', 'Dám chấp nhận rủi ro', 'Tập trung vào kết quả']
  },
  GAN_KET: {
    id: 'GAN_KET',
    name: 'Mắc Six Gắn Kết',
    shortName: 'Gắn Kết',
    color: '#059669',
    accentColor: '#10B981',
    badgeBg: 'bg-emerald-600',
    lightBg: 'bg-emerald-50/80',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    icon: '🌿',
    motto: 'Hòa hợp, sẻ chia, tạo nên một tập thể vững chắc.',
    description: 'Chốn bình yên và sự tin cậy tuyệt đối trong văn phòng. Họ luôn lắng nghe, nâng đỡ đồng nghiệp, giữ gìn bầu không khí yêu thương và củng cố tinh thần đồng đội.',
    superpower: 'Trái Tim Ấm Áp & Người Giữ Lửa Tập Thể',
    strengths: ['Lắng nghe thấu cảm', 'Hậu thuẫn đồng đội', 'Xây dựng lòng tin', 'Duy trì hòa khí']
  },
  TAN_TAM: {
    id: 'TAN_TAM',
    name: 'Mắc Six Tận Tâm',
    shortName: 'Tận Tâm',
    color: '#475569',
    accentColor: '#64748B',
    badgeBg: 'bg-slate-700',
    lightBg: 'bg-slate-100',
    borderColor: 'border-slate-300',
    textColor: 'text-slate-800',
    icon: '🛡️',
    motto: 'Tỉ mỉ, chu toàn, luôn nỗ lực vì mục tiêu chung.',
    description: 'Chiếc mỏ neo vững vàng đảm bảo mọi chi tiết vận hành trơn tru. Tinh thần trách nhiệm cao độ và sự chỉn chu tuyệt đối giúp tập thể MAC luôn an tâm bàn giao mọi nhiệm vụ.',
    superpower: 'Bức Tường Kiên Định & Chu Toàn Từng Chi Tiết',
    strengths: ['Độ chính xác cao', 'Trách nhiệm trọn vẹn', 'Đúng giờ - Đúng hẹn', 'Bền bỉ kiên trì']
  }
};

export const DEPARTMENTS: Department[] = [
  'Creative & Design',
  'Account & Client Service',
  'Media & Planning',
  'Production & Video',
  'Tech & Digital',
  'HR, Admin & Finance',
  'Ban Giám Đốc (BOD)'
];

export const AVATAR_OPTIONS = [
  '🦊', '🦁', '🐯', '🐼', '🐨', '🦄', '🐬', '🦅', '🦉', '🐝', '🚀', '⭐'
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Khởi đầu tuần mới tại MAC',
    subtitle: 'Năng lượng 9h00 sáng thứ Hai',
    situation: 'Bạn vừa bước vào văn phòng MAC Media, việc đầu tiên bạn thường có xu hướng thực hiện nhất là:',
    options: [
      {
        trait: 'SANG_TAO',
        text: 'Bật playlist lofi yêu thích, sắp xếp lại góc làm việc thật chill để khơi gợi cảm hứng dạt dào.',
        detail: 'Cần không gian nghệ thuật và mood tốt để bắt đầu'
      },
      {
        trait: 'KET_NOI',
        text: 'Pha ly trà/cà phê rồi đi dạo một vòng chào hỏi các bàn, cập nhật tin tức cuối tuần cùng đồng nghiệp.',
        detail: 'Nạp năng lượng từ sự tương tác xã hội'
      },
      {
        trait: 'CHIEN_LUOC',
        text: 'Mở Notion/sổ tay, hệ thống hóa lại các mục tiêu ưu tiên và rà soát timeline tuần của toàn team.',
        detail: 'Tư duy logic, định hướng rõ đường đi nước bước'
      },
      {
        trait: 'HANH_DONG',
        text: 'Mở hòm thư và task backlog, giải quyết ngay những việc gấp nhất với tốc độ nhanh nhất.',
        detail: 'Ưu tiên hành động cụ thể, dứt điểm công việc'
      },
      {
        trait: 'GAN_KET',
        text: 'Hỏi han bạn ngồi cạnh xem cuối tuần qua thế nào, chia sẻ chút bánh kẹo mang từ quê lên.',
        detail: 'Tạo cảm giác gắn kết gia đình ấm cúng'
      },
      {
        trait: 'TAN_TAM',
        text: 'Kiểm tra kỹ lại từng đầu việc bàn giao, đối chiếu checklist đảm bảo không sót bất kỳ tiểu tiết nào.',
        detail: 'Cẩn trọng, chu đáo và cam kết độ chính xác'
      }
    ]
  },
  {
    id: 2,
    title: 'Khủng hoảng 48 giờ',
    subtitle: 'Campaign siêu gấp từ khách hàng lớn',
    situation: 'Khách hàng bất ngờ yêu cầu một phương án truyền thông hoàn toàn mới cần nộp trong 48 giờ tới. Bản năng của bạn:',
    options: [
      {
        trait: 'HANH_DONG',
        text: 'Xắn tay áo lên chia ngay việc khó nhất cho mình, bắt tay dựng khung triển khai ngay không đắn đo.',
        detail: 'Tiên phong dấn thân, không để thời gian trôi vô ích'
      },
      {
        trait: 'SANG_TAO',
        text: 'Khởi xướng ngay một buổi brainstorming điên rồ để tìm ra một big idea độc đáo nhất khiến client phải "wow".',
        detail: 'Tìm sự khác biệt vượt trội thay vì làm theo lối mòn'
      },
      {
        trait: 'CHIEN_LUOC',
        text: 'Phân tích mục tiêu cốt lõi của client, bóc tách rủi ro và vẽ nên khung định hướng thông điệp sắc bén.',
        detail: 'Chiến lược bài bản giúp hạn chế rủi ro thất bại'
      },
      {
        trait: 'KET_NOI',
        text: 'Liên hệ các bên liên quan, khéo léo kết nối các team Creative - Account - Media cùng ngồi lại hỗ trợ lẫn nhau.',
        detail: 'Huy động sức mạnh tập thể và đối ngoại linh hoạt'
      },
      {
        trait: 'GAN_KET',
        text: 'Lo trà sữa, tiếp tế đồ ăn đêm và động viên tinh thần để cả đội giữ vững sĩ khí, không ai bị kiệt sức.',
        detail: 'Hậu phương vững chắc nuôi dưỡng sức bền'
      },
      {
        trait: 'TAN_TAM',
        text: 'Rà soát cẩn thận từng yêu cầu trong brief, kiểm tra số liệu thị trường và chuẩn bị tài liệu kỹ lưỡng.',
        detail: 'Đảm bảo tính khả thi và hoàn hảo đến từng slide'
      }
    ]
  },
  {
    id: 3,
    title: 'Dấu ấn trong đêm tiệc MAC',
    subtitle: 'Gala Sinh Nhật Công Ty',
    situation: 'Tại đêm tiệc Sinh Nhật MAC với chủ đề "Mắc Six Hội Tụ", người ta sẽ dễ dàng bắt gặp bạn ở vị trí nào?',
    options: [
      {
        trait: 'SANG_TAO',
        text: 'Nổi bật với trang phục concept ấn tượng nhất tiệc, hào hứng lên sân khấu biểu diễn hoặc quẩy hết mình.',
        detail: 'Tâm điểm sáng tạo và phong cách nghệ sĩ'
      },
      {
        trait: 'KET_NOI',
        text: 'Cầm ly nước di chuyển qua từng bàn, kết nối mọi người từ người mới đến các sếp lớn rôm rả.',
        detail: 'Hòa đồng, biết tên tất cả mọi người trong công ty'
      },
      {
        trait: 'CHIEN_LUOC',
        text: 'Ngồi thưởng thức tiệc ở góc nhìn toàn cảnh, đàm đạo về hành trình phát triển và định hướng tương lai của MAC.',
        detail: 'Sâu sắc, nhìn nhận bức tranh tổng thể'
      },
      {
        trait: 'HANH_DONG',
        text: 'Hăng hái tham gia ngay các trò chơi minigame đối kháng, giành giải thưởng lớn về cho đội nhà.',
        detail: 'Máu lửa, nhiệt huyết và quyết tâm thắng lợi'
      },
      {
        trait: 'GAN_KET',
        text: 'Ngồi quây quần bên những người anh em chí cốt, tâm sự và nâng ly chúc mừng những kỷ niệm đã qua.',
        detail: 'Trân trọng tình cảm chân thành giữa đồng đội'
      },
      {
        trait: 'TAN_TAM',
        text: 'Hỗ trợ Ban Tổ Chức đón khách, quản lý quà tặng hoặc để mắt đến sân khấu để buổi tiệc diễn ra êm đẹp.',
        detail: 'Âm thầm cống hiến vì thành công chung của sự kiện'
      }
    ]
  },
  {
    id: 4,
    title: 'Giải tỏa nút thắt dự án',
    subtitle: 'Khi team rơi vào ngõ cụt',
    situation: 'Dự án gặp vấn đề hóc búa, các thành viên đang tranh cãi bất đồng ý kiến. Câu nói hoặc hành động tiêu biểu của bạn:',
    options: [
      {
        trait: 'CHIEN_LUOC',
        text: '"Dừng lại một nhịp! Hãy nhìn lại mục tiêu ban đầu của chúng ta là gì, dữ liệu đang nói điều gì?"',
        detail: 'Kéo cả team về với logic và bản chất vấn đề'
      },
      {
        trait: 'KET_NOI',
        text: '"Anh em hạ nhiệt nào! Đi uống trà sữa xả stress 15 phút rồi quay lại, đâu sẽ có đó cả thôi."',
        detail: 'Xoa dịu căng thẳng và làm mềm các mối quan hệ'
      },
      {
        trait: 'SANG_TAO',
        text: '"Nếu lối đi quen thuộc bị tắc, tại sao chúng ta không thử một góc nhìn hoàn toàn ngược lại xem?"',
        detail: 'Phá vỡ định kiến bằng giải pháp bất ngờ'
      },
      {
        trait: 'HANH_DONG',
        text: '"Tranh luận thế đủ rồi, để tôi thử nghiệm nhanh phương án A xem sao, có kết quả ngay biết liền!"',
        detail: 'Hành động thực tế thay vì lý thuyết suông'
      },
      {
        trait: 'GAN_KET',
        text: '"Mỗi người đều có cái lý đúng. Hãy cùng gom điểm mạnh của cả hai phương án lại để cùng vui vẻ."',
        detail: 'Dung hòa sự khác biệt vì sự đoàn kết'
      },
      {
        trait: 'TAN_TAM',
        text: '"Để mình mở lại tài liệu tiền lệ và ghi chép chi tiết, so sánh cụ thể ưu nhược từng bên để team quyết định."',
        detail: 'Cung cấp căn cứ xác đáng, minh bạch'
      }
    ]
  },
  {
    id: 5,
    title: 'Góc làm việc mang đậm bản sắc',
    subtitle: 'Chữ ký cá nhân tại bàn làm việc',
    situation: 'Nếu bước đến bàn làm việc của bạn ở MAC, mọi người sẽ nhận ra bạn qua dấu ấn nào?',
    options: [
      {
        trait: 'SANG_TAO',
        text: 'Nhiều mô hình art toy độc đáo, tranh ảnh moodboard cảm hứng, giấy note đủ màu sắc phá cách.',
        detail: 'Không gian đậm chất thẩm mỹ và tính cá nhân'
      },
      {
        trait: 'KET_NOI',
        text: 'Hũ kẹo bánh luôn sẵn sàng mời khách, ảnh chụp kỷ niệm với đồng nghiệp, điện thoại liên tục reo tin nhắn.',
        detail: 'Trạm dừng chân thân thiện cho bất kỳ ai ghé qua'
      },
      {
        trait: 'CHIEN_LUOC',
        text: 'Lịch bàn với các mốc milestone đánh dấu rõ ràng, sách chuyên ngành marketing/quản trị, sổ ghi chép cấu trúc.',
        detail: 'Thể hiện tư duy bài bản và mục tiêu rõ ràng'
      },
      {
        trait: 'HANH_DONG',
        text: 'Tối giản tối đa: chỉ có laptop cấu hình cao, cốc nước to, mọi thứ sẵn sàng để bật dậy di chuyển tác chiến.',
        detail: 'Ưu tiên sự gọn lẹ và cơ động trong công việc'
      },
      {
        trait: 'GAN_KET',
        text: 'Chậu cây xanh mướt mát mắt, quà tặng nhỏ từ đồng nghiệp, gối tựa lưng êm ái mang lại sự bình yên.',
        detail: 'Cảm giác ấm áp như một góc nhà thứ hai'
      },
      {
        trait: 'TAN_TAM',
        text: 'Tài liệu xếp thẳng tắp theo nhãn dán, bút thước ngay ngắn, màn hình quản lý file khoa học ngăn nắp tuyệt đối.',
        detail: 'Sự ngăn nắp phản ánh tâm thế chỉn chu trong mọi việc'
      }
    ]
  }
];

export const INITIAL_SEEDED_MEMBERS: Member[] = [
  // SÁNG TẠO (5 members)
  {
    id: 'seed-st-1',
    name: 'Nguyễn Phương Thảo',
    department: 'Creative & Design',
    avatar: '🎨',
    assignedTeam: 'SANG_TAO',
    primaryTrait: 'SANG_TAO',
    secondaryTrait: 'KET_NOI',
    scores: { SANG_TAO: 4, KET_NOI: 1, CHIEN_LUOC: 0, HANH_DONG: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-20 09:15'
  },
  {
    id: 'seed-st-2',
    name: 'Lê Trần Bảo Nam',
    department: 'Production & Video',
    avatar: '🚀',
    assignedTeam: 'SANG_TAO',
    primaryTrait: 'SANG_TAO',
    secondaryTrait: 'HANH_DONG',
    scores: { SANG_TAO: 3, HANH_DONG: 2, CHIEN_LUOC: 0, KET_NOI: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-20 10:30'
  },
  {
    id: 'seed-st-3',
    name: 'Đặng Mai Linh',
    department: 'Creative & Design',
    avatar: '⭐',
    assignedTeam: 'SANG_TAO',
    primaryTrait: 'SANG_TAO',
    secondaryTrait: 'GAN_KET',
    scores: { SANG_TAO: 4, GAN_KET: 1, CHIEN_LUOC: 0, HANH_DONG: 0, KET_NOI: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-21 14:10'
  },
  {
    id: 'seed-st-4',
    name: 'Võ Minh Quân',
    department: 'Tech & Digital',
    avatar: '🦁',
    assignedTeam: 'SANG_TAO',
    primaryTrait: 'SANG_TAO',
    secondaryTrait: 'CHIEN_LUOC',
    scores: { SANG_TAO: 3, CHIEN_LUOC: 2, HANH_DONG: 0, KET_NOI: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-22 11:05'
  },
  {
    id: 'seed-st-5',
    name: 'Phạm Quỳnh Anh',
    department: 'Account & Client Service',
    avatar: '🦄',
    assignedTeam: 'SANG_TAO',
    primaryTrait: 'SANG_TAO',
    secondaryTrait: 'KET_NOI',
    scores: { SANG_TAO: 3, KET_NOI: 1, CHIEN_LUOC: 1, HANH_DONG: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-22 16:40'
  },

  // KẾT NỐI (6 members)
  {
    id: 'seed-kn-1',
    name: 'Hoàng Quốc Việt',
    department: 'Account & Client Service',
    avatar: '🤝',
    assignedTeam: 'KET_NOI',
    primaryTrait: 'KET_NOI',
    secondaryTrait: 'CHIEN_LUOC',
    scores: { KET_NOI: 4, CHIEN_LUOC: 1, SANG_TAO: 0, HANH_DONG: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-20 08:50'
  },
  {
    id: 'seed-kn-2',
    name: 'Trần Thị Bích Ngọc',
    department: 'HR, Admin & Finance',
    avatar: '🐨',
    assignedTeam: 'KET_NOI',
    primaryTrait: 'KET_NOI',
    secondaryTrait: 'GAN_KET',
    scores: { KET_NOI: 3, GAN_KET: 2, SANG_TAO: 0, CHIEN_LUOC: 0, HANH_DONG: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-20 11:20'
  },
  {
    id: 'seed-kn-3',
    name: 'Ngô Đình Trọng',
    department: 'Media & Planning',
    avatar: '🐝',
    assignedTeam: 'KET_NOI',
    primaryTrait: 'KET_NOI',
    secondaryTrait: 'HANH_DONG',
    scores: { KET_NOI: 3, HANH_DONG: 2, SANG_TAO: 0, CHIEN_LUOC: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-21 09:30'
  },
  {
    id: 'seed-kn-4',
    name: 'Dương Thùy Trang',
    department: 'Account & Client Service',
    avatar: '🐬',
    assignedTeam: 'KET_NOI',
    primaryTrait: 'KET_NOI',
    secondaryTrait: 'SANG_TAO',
    scores: { KET_NOI: 4, SANG_TAO: 1, CHIEN_LUOC: 0, HANH_DONG: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-22 13:15'
  },
  {
    id: 'seed-kn-5',
    name: 'Lý Kiến Văn',
    department: 'Production & Video',
    avatar: '🦉',
    assignedTeam: 'KET_NOI',
    primaryTrait: 'KET_NOI',
    secondaryTrait: 'TAN_TAM',
    scores: { KET_NOI: 3, TAN_TAM: 1, SANG_TAO: 1, CHIEN_LUOC: 0, HANH_DONG: 0, GAN_KET: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-23 10:00'
  },
  {
    id: 'seed-kn-6',
    name: 'Vũ Hoài Thương',
    department: 'Media & Planning',
    avatar: '🦊',
    assignedTeam: 'KET_NOI',
    primaryTrait: 'KET_NOI',
    secondaryTrait: 'CHIEN_LUOC',
    scores: { KET_NOI: 3, CHIEN_LUOC: 2, SANG_TAO: 0, HANH_DONG: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-23 14:45'
  },

  // CHIẾN LƯỢC (4 members)
  {
    id: 'seed-cl-1',
    name: 'Bùi Thế Hiển',
    department: 'Ban Giám Đốc (BOD)',
    avatar: '🧭',
    assignedTeam: 'CHIEN_LUOC',
    primaryTrait: 'CHIEN_LUOC',
    secondaryTrait: 'HANH_DONG',
    scores: { CHIEN_LUOC: 4, HANH_DONG: 1, SANG_TAO: 0, KET_NOI: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-19 17:00'
  },
  {
    id: 'seed-cl-2',
    name: 'Trịnh Thanh Mai',
    department: 'Media & Planning',
    avatar: '🦅',
    assignedTeam: 'CHIEN_LUOC',
    primaryTrait: 'CHIEN_LUOC',
    secondaryTrait: 'TAN_TAM',
    scores: { CHIEN_LUOC: 3, TAN_TAM: 2, SANG_TAO: 0, KET_NOI: 0, HANH_DONG: 0, GAN_KET: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-21 08:45'
  },
  {
    id: 'seed-cl-3',
    name: 'Chu Quốc Đạt',
    department: 'Tech & Digital',
    avatar: '🦁',
    assignedTeam: 'CHIEN_LUOC',
    primaryTrait: 'CHIEN_LUOC',
    secondaryTrait: 'SANG_TAO',
    scores: { CHIEN_LUOC: 4, SANG_TAO: 1, KET_NOI: 0, HANH_DONG: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-22 15:20'
  },
  {
    id: 'seed-cl-4',
    name: 'Đỗ Hữu Phước',
    department: 'Account & Client Service',
    avatar: '⭐',
    assignedTeam: 'CHIEN_LUOC',
    primaryTrait: 'CHIEN_LUOC',
    secondaryTrait: 'KET_NOI',
    scores: { CHIEN_LUOC: 3, KET_NOI: 2, SANG_TAO: 0, HANH_DONG: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-23 11:30'
  },

  // HÀNH ĐỘNG (6 members)
  {
    id: 'seed-hd-1',
    name: 'Phan Minh Tuấn',
    department: 'Production & Video',
    avatar: '⚡',
    assignedTeam: 'HANH_DONG',
    primaryTrait: 'HANH_DONG',
    secondaryTrait: 'SANG_TAO',
    scores: { HANH_DONG: 4, SANG_TAO: 1, KET_NOI: 0, CHIEN_LUOC: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-20 13:40'
  },
  {
    id: 'seed-hd-2',
    name: 'Cao Đức Mạnh',
    department: 'Tech & Digital',
    avatar: '🚀',
    assignedTeam: 'HANH_DONG',
    primaryTrait: 'HANH_DONG',
    secondaryTrait: 'CHIEN_LUOC',
    scores: { HANH_DONG: 3, CHIEN_LUOC: 2, SANG_TAO: 0, KET_NOI: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-21 16:10'
  },
  {
    id: 'seed-hd-3',
    name: 'Nguyễn Hải Đăng',
    department: 'Media & Planning',
    avatar: '🐯',
    assignedTeam: 'HANH_DONG',
    primaryTrait: 'HANH_DONG',
    secondaryTrait: 'KET_NOI',
    scores: { HANH_DONG: 4, KET_NOI: 1, SANG_TAO: 0, CHIEN_LUOC: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-22 09:50'
  },
  {
    id: 'seed-hd-4',
    name: 'Lâm Thanh Trúc',
    department: 'Creative & Design',
    avatar: '🦊',
    assignedTeam: 'HANH_DONG',
    primaryTrait: 'HANH_DONG',
    secondaryTrait: 'SANG_TAO',
    scores: { HANH_DONG: 3, SANG_TAO: 2, KET_NOI: 0, CHIEN_LUOC: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-23 08:30'
  },
  {
    id: 'seed-hd-5',
    name: 'Đinh Tiến Dũng',
    department: 'Account & Client Service',
    avatar: '🦁',
    assignedTeam: 'HANH_DONG',
    primaryTrait: 'HANH_DONG',
    secondaryTrait: 'KET_NOI',
    scores: { HANH_DONG: 3, KET_NOI: 1, SANG_TAO: 1, CHIEN_LUOC: 0, GAN_KET: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-23 13:00'
  },
  {
    id: 'seed-hd-6',
    name: 'Trần Gia Huy',
    department: 'Production & Video',
    avatar: '⚡',
    assignedTeam: 'HANH_DONG',
    primaryTrait: 'HANH_DONG',
    secondaryTrait: 'TAN_TAM',
    scores: { HANH_DONG: 3, TAN_TAM: 2, SANG_TAO: 0, KET_NOI: 0, CHIEN_LUOC: 0, GAN_KET: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-24 09:15'
  },

  // GẮN KẾT (5 members)
  {
    id: 'seed-gk-1',
    name: 'Tạ Diệu Huyền',
    department: 'HR, Admin & Finance',
    avatar: '🌿',
    assignedTeam: 'GAN_KET',
    primaryTrait: 'GAN_KET',
    secondaryTrait: 'KET_NOI',
    scores: { GAN_KET: 4, KET_NOI: 1, SANG_TAO: 0, CHIEN_LUOC: 0, HANH_DONG: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-20 14:00'
  },
  {
    id: 'seed-gk-2',
    name: 'Vũ Như Quỳnh',
    department: 'Account & Client Service',
    avatar: '🐨',
    assignedTeam: 'GAN_KET',
    primaryTrait: 'GAN_KET',
    secondaryTrait: 'TAN_TAM',
    scores: { GAN_KET: 3, TAN_TAM: 2, SANG_TAO: 0, KET_NOI: 0, CHIEN_LUOC: 0, HANH_DONG: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-21 11:40'
  },
  {
    id: 'seed-gk-3',
    name: 'Nguyễn Tấn Lộc',
    department: 'Media & Planning',
    avatar: '🐼',
    assignedTeam: 'GAN_KET',
    primaryTrait: 'GAN_KET',
    secondaryTrait: 'CHIEN_LUOC',
    scores: { GAN_KET: 3, CHIEN_LUOC: 1, SANG_TAO: 1, KET_NOI: 0, HANH_DONG: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-22 14:25'
  },
  {
    id: 'seed-gk-4',
    name: 'Lê Kiều Oanh',
    department: 'Creative & Design',
    avatar: '🌸',
    assignedTeam: 'GAN_KET',
    primaryTrait: 'GAN_KET',
    secondaryTrait: 'SANG_TAO',
    scores: { GAN_KET: 3, SANG_TAO: 2, KET_NOI: 0, CHIEN_LUOC: 0, HANH_DONG: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-23 16:10'
  },
  {
    id: 'seed-gk-5',
    name: 'Hà Xuân Bách',
    department: 'HR, Admin & Finance',
    avatar: '🌿',
    assignedTeam: 'GAN_KET',
    primaryTrait: 'GAN_KET',
    secondaryTrait: 'KET_NOI',
    scores: { GAN_KET: 4, KET_NOI: 1, SANG_TAO: 0, CHIEN_LUOC: 0, HANH_DONG: 0, TAN_TAM: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-24 10:20'
  },

  // TẬN TÂM (5 members)
  {
    id: 'seed-tt-1',
    name: 'Lương Mỹ Hạnh',
    department: 'HR, Admin & Finance',
    avatar: '🛡️',
    assignedTeam: 'TAN_TAM',
    primaryTrait: 'TAN_TAM',
    secondaryTrait: 'GAN_KET',
    scores: { TAN_TAM: 4, GAN_KET: 1, SANG_TAO: 0, KET_NOI: 0, CHIEN_LUOC: 0, HANH_DONG: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-20 09:00'
  },
  {
    id: 'seed-tt-2',
    name: 'Bạch Đình Khôi',
    department: 'Tech & Digital',
    avatar: '🦉',
    assignedTeam: 'TAN_TAM',
    primaryTrait: 'TAN_TAM',
    secondaryTrait: 'CHIEN_LUOC',
    scores: { TAN_TAM: 3, CHIEN_LUOC: 2, SANG_TAO: 0, KET_NOI: 0, HANH_DONG: 0, GAN_KET: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-21 15:30'
  },
  {
    id: 'seed-tt-3',
    name: 'Phùng Thu Trang',
    department: 'Media & Planning',
    avatar: '🐼',
    assignedTeam: 'TAN_TAM',
    primaryTrait: 'TAN_TAM',
    secondaryTrait: 'HANH_DONG',
    scores: { TAN_TAM: 3, HANH_DONG: 2, SANG_TAO: 0, KET_NOI: 0, CHIEN_LUOC: 0, GAN_KET: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-22 10:15'
  },
  {
    id: 'seed-tt-4',
    name: 'Đoàn Nhật Minh',
    department: 'Account & Client Service',
    avatar: '🛡️',
    assignedTeam: 'TAN_TAM',
    primaryTrait: 'TAN_TAM',
    secondaryTrait: 'KET_NOI',
    scores: { TAN_TAM: 3, KET_NOI: 2, SANG_TAO: 0, CHIEN_LUOC: 0, HANH_DONG: 0, GAN_KET: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-23 15:00'
  },
  {
    id: 'seed-tt-5',
    name: 'Trần Văn Phong',
    department: 'Production & Video',
    avatar: '🐝',
    assignedTeam: 'TAN_TAM',
    primaryTrait: 'TAN_TAM',
    secondaryTrait: 'HANH_DONG',
    scores: { TAN_TAM: 4, HANH_DONG: 1, SANG_TAO: 0, KET_NOI: 0, CHIEN_LUOC: 0, GAN_KET: 0 },
    rankUsed: 1,
    joinedAt: '2026-09-24 11:45'
  }
];
