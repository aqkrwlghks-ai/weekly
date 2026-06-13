import { BulletinData, DesignTheme } from "./types";

export const GREETING_PRESETS = [
  {
    id: "g1",
    title: "Hello, Sunday! ✨",
    content: "안녕, 청년부 친구들! :) 설레는 토요일 밤이야. 내일 우리가 함께 모여 드릴 예배를 기대하며, 미리 주보를 보내줄게. 따뜻한 마음으로 내일 만나자! 🌱"
  },
  {
    id: "g2",
    title: "한 주 동안 고생 많았어, 우리 내일 만나자! 👋",
    content: "숨가쁘게 달려온 한 주의 토요일 저녁. 세상의 소음은 잠시 꺼둔 채, 있는 모습 그대로 나와서 편히 쉬어갔으면 좋겠어. 내일 예배하는 이곳이 너의 따뜻한 쉼표이기를. ☕️"
  },
  {
    id: "g3",
    title: "온전히 너를 사랑하고 기쁨으로 기다려 ✨",
    content: "누구에게도 털어놓지 못한 마음의 짐이 있다면 내일 전부 예배 드리는 가운데 쏟아놓길 바랄게. 주님은 언제나 너의 작은 신음에도 귀 기울이시니까. 설레는 맘으로 너를 기다려. 🕊️"
  }
];

export const DEFAULT_BULLETIN_DATA: BulletinData = {
  greetingTitle: "Hello, Sunday! ✨",
  greetingContent: "안녕, 청년부 친구들! :) 설레는 토요일 밤이야. 내일 우리가 함께 모여 드릴 예배를 기대하며, 미리 주보를 보내줄게. 따뜻한 마음으로 내일 만나자! 🌱",
  praiseSongs: [
    "Way Maker (길을 만드시는 분)",
    "주를 위한 노래 (Song for the Lord)",
    "소원 (My Desire)"
  ],
  prayerLeader: "김다윗 리더",
  announcementLeader: "임원진",
  bibleVerse: "마태복음 5장 13-16절 (Matthew 5:13-16)",
  sermonTitle: "소금과 빛",
  preacher: "박사랑 목사님",
  decisionText: "어두운 세상에 따뜻하고 선명한 사랑의 온도를 전하는 소금과 빛으로 살아가기",
  announcements: [
    {
      id: "ann1",
      title: "[봄 소풍] 장소 투표 마감 임박 ☀️",
      content: "이번 주 소그룹 야외 봄 소풍 희망 부지 투표가 오늘 자정 마감됩니다! 대댓글이나 단체 톡방 공지 상단 프로필 링크를 통해 소중한 한 표 행사해 주세요!",
      tag: "#봄소풍 #투표바람 #설레는봄"
    },
    {
      id: "ann2",
      title: "[새가족 환영회] 웰컴 투 패밀리 🍰",
      content: "다음 주 주일 예배 후 친교실 카페 '온'에서 소박하고 감각적인 새 지체 환영 다과회가 있겠습니다. 모든 새친구들과 기존 순장님들은 꼭 참석해 주세요!",
      tag: "#웰컴테이블 #친교의시간 #카페온"
    },
    {
      id: "ann3",
      title: "기부와 사랑의 '옷장 나눔' 프로젝트 👕",
      content: "안 입는 깨끗한 옷을 모아 지역 단체에 기부하는 프로젝트가 주중에 진행됩니다. 보관 상태가 좋은 아우터나 셔츠 위주로 기부에 동참해 주세요!",
      tag: "#따뜻한나눔 #사랑실천"
    }
  ],
  checklists: [
    {
      id: "chk1",
      emoji: "⏰",
      text: "예배 시작 10분 전 도착하기",
      subtext: "조금 일찍 자리에 앉아 찬미하며, 스마트폰을 잠시 무음으로 두고 은혜의 주파태로 맞추어 보아요."
    },
    {
      id: "chk2",
      emoji: "📖",
      text: "개인 성경책과 노트를 준비해요",
      subtext: "예배의 자리에 주보의 구절을 내 눈과 귀로 직접 따라가며 기쁜 기록으로 말씀을 새겨보세요."
    },
    {
      id: "chk3",
      emoji: "🙏",
      text: "기대하는 마음으로 기도하기",
      subtext: "상처 나고 어긋난 일주일의 삶 주 앞에 내놓고 은혜 가로막는 걸림돌 없게 해달라고 호소해보세요."
    }
  ]
};

export const INSTAGRAM_PRESETS = [
  {
    id: "insta1",
    title: "공동체 소그룹 순모임 편성 🌿",
    content: "2026년 하반기를 뜨겁고 행복하게 채워갈 새로운 소그룹(순) 편성이 완료되었습니다. 주일 광고 시간에 발표되니 많은 기대와 기도 부탁드립니다!",
    tag: "#새로운순모임 #함께걸어가기"
  },
  {
    id: "insta2",
    title: "중보기도 카드 개설 🙏",
    content: "서로 마음의 기도제목을 나눌 온라인 건의가 열렸습니다. 익명 또는 기명으로 제출해주시면 임원단과 사역자가 매일을 기도로 든든히 지원하겠습니다.",
    tag: "#중보기도 #기도의끈"
  }
];

export const DESIGN_THEMES: DesignTheme[] = [
  {
    id: "bold",
    name: "볼드 타이포 & 레트로 세이지 (Bold Sage)",
    description: "따뜻한 일상의 기록 - 매거진 감성 세리프와 차분한 초록 에디션",
    concept: "인드타그램 매거진이나 디자인 무드보드에서 영감을 얻은 레이아웃. 과감한 폰트 대비와 코지한 리츄얼 세이지 그린(#7D8F69), 초콜릿 브라운(#4A3728) 조합이 세심하고 깊이 있는 청년들의 감수성을 자극합니다.",
    bgColor: "bg-[#F9F7F2]",
    textColor: "text-[#4A3728]",
    accentBg: "bg-[#7D8F69]",
    accentText: "text-white",
    cardBg: "bg-[#FDFCF9]",
    borderColor: "border-stone-200/80",
    fontFamily: "font-playfair",
    fontImportName: "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');",
    fontNameKorean: "플레이페어 & 노토산스 (Playfair Display & Noto Sans)",
    tagline: "따스한 온기와 잡지 지면의 아름다운 조화",
    colors: [
      { name: "세이지 그린 (Sage)", hex: "#7D8F69", tailwind: "bg-[#7D8F69]", role: "오프닝 타이틀 및 핵심 컴포넌트 후광" },
      { name: "내추럴 아이보리", hex: "#F9F7F2", tailwind: "bg-[#F9F7F2]", role: "지면의 차분함과 크리미한 베이스 제공" },
      { name: "초콜릿 브라운", hex: "#4A3728", tailwind: "bg-[#4A3728]", role: "모든 텍스트 정보의 정갈한 가독성 보완" },
      { name: "네추럴 진저 스킨", hex: "#F5F2ED", tailwind: "bg-[#F5F2ED]", role: "알림판 및 공지 카드의 부드러운 배경" }
    ],
    recommendedFonts: [
      { target: "대제목 / 영문 슬로건", name: "Playfair Display (Italic 700)", details: "클래식하고 세련된 영문 셰리프. 스토리 지면 및 주보의 강력한 인상 선사" },
      { target: "본문 구절 및 디테일", name: "맑은 고디 / 라인 고딕 / Noto Sans KR", details: "눈에 불편함 없이 매력을 가장 온전히 전해주는 현대식 서체" }
    ]
  },
  {
    id: "warm",
    name: "웜 코지 베이지 (Cafe Beige)",
    description: "따뜻한 카페나 일상의 안락함이 느껴지는 크림피치 에디션",
    concept: "마음의 온도를 높여주는 온화하고 단아한 분위기. 눈이 편안한 페이퍼 톤 베경에 복숭아색 포인트를 주어 세심하고 감수성이 풍부한 청년들의 감성에 제격입니다.",
    bgColor: "bg-amber-50/70",
    textColor: "text-amber-950",
    accentBg: "bg-amber-100",
    accentText: "text-amber-800",
    cardBg: "bg-white",
    borderColor: "border-amber-100",
    fontFamily: "font-[GowunBatang]",
    fontImportName: "@import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap');",
    fontNameKorean: "고운바탕 (Gowun Batang)",
    tagline: "따스하고 부드러운 아날로그 감성 가득",
    colors: [
      { name: "메인 크림 배경", hex: "#FDFBF7", tailwind: "bg-[#FDFBF7]", role: "지면적 베이스 및 차분함 유지" },
      { name: "초콜릿 계열 텍스트", hex: "#451A03", tailwind: "bg-[#451A03]", role: "편안한 가독성에 깊이 가미" },
      { name: "따스한 살구 포인트", hex: "#E07A5F", tailwind: "bg-[#E07A5F]", role: "인사말 강조 및 주요 컴포넌트 후광" },
      { name: "로즈빛 베이지", hex: "#F2CC8F", tailwind: "bg-[#F2CC8F]", role: "체크리스트 장식 및 아이콘 서포터" }
    ],
    recommendedFonts: [
      { target: "대제목 / 메인 타이틀", name: "Gowun Batang (700 Bold)", details: "아름답고 클래식한 감성 서체. 정성스럽게 쓴 편지 느낌 창출" },
      { target: "본문 / 디테일 리스트", name: "Pretendard 또는 Gowun Batang", details: "눈에 거스름 없이 정갈하게 안착되어 편안하게 완독 가능한 가독성 보장" }
    ]
  },
  {
    id: "modern",
    name: "시크 민트 슬레이트 (Modern Slate)",
    description: "인스타그램이나 핀터레스트에서 많이 보이는 쿨하고 트렌디한 무드",
    concept: "세련되고 힙한 레이아웃. 연회색 무채색 슬레이트 베이스에 형광빛이 감도는 브라이트 민트그린을 포인트로 삼아 활기차고 정갈한 현대 세대 감성을 자극합니다.",
    bgColor: "bg-slate-50",
    textColor: "text-slate-900",
    accentBg: "bg-teal-100",
    accentText: "text-teal-900",
    cardBg: "bg-white",
    borderColor: "border-slate-200",
    fontFamily: "font-[Outfit]",
    fontImportName: "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Noto+Sans+KR:wght@300;500;700&display=swap');",
    fontNameKorean: "아웃핏 & 노토산스 (Outfit & Noto Sans)",
    tagline: "군더더기 없는 도회적 미니멀리즘",
    colors: [
      { name: "오프화이트 슬레이트", hex: "#F8FAFC", tailwind: "bg-[#F8FAFC]", role: "정갈함과 넓고 깨끗한 여백 가이드" },
      { name: "차콜 블랙 텍스트", hex: "#0F172A", tailwind: "bg-[#0F172A]", role: "확실하고 굵직한 제목 및 경계감 마련" },
      { name: "팝 브라이트 민트", hex: "#2DD4BF", tailwind: "bg-[#2DD4BF]", role: "예배 순서 및 인스타 카드 주요 포커싱 벨트" },
      { name: "미디엄 그레이 배경", hex: "#E2E8F0", tailwind: "bg-[#E2E8F0]", role: "부드러운 정보 구분을 짓는 보행선" }
    ],
    recommendedFonts: [
      { target: "대제목 / 영문 타이틀", name: "Outfit (Extra Bold)", details: "젊은 세대들의 브랜드에 자주 이용되는 세련된 지오메트릭 폰트" },
      { target: "본문 한글", name: "Noto Sans KR (Regular/Medium)", details: "화면 밀도를 가지런하게 채워 가독성을 최고치로 정돈해 주는 폰트" }
    ]
  },
  {
    id: "deep",
    name: "딥 스피릿 나잇 (Deep Spiritual Space)",
    description: "밤하늘 은하수 밑, 찬양 사역과 어쿠스틱 예배에 어울리는 감성 다크 모드",
    concept: "오직 주님의 임재와 내 내면의 묵상에 고도로 불을 밝히는 아우라 무드. 딥 인디고 밤하늘 색상 위에 레몬 옐로우와 아쿠아 스카이 블루가 은은하게 도드라져 마음을 집중하게 만듭니다.",
    bgColor: "bg-slate-950",
    textColor: "text-slate-100",
    accentBg: "bg-slate-800",
    accentText: "text-amber-300",
    cardBg: "bg-slate-900/90",
    borderColor: "border-slate-800",
    fontFamily: "font-[SpaceGrotesk]",
    fontImportName: "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap');",
    fontNameKorean: "스페이스 그로테스크 (Space Grotesk)",
    tagline: "어스름 속에서 빛나는 거룩한 스펙트럼",
    colors: [
      { name: "미드나잇 인디고/블랙", hex: "#020617", tailwind: "bg-[#020617]", role: "도심의 밤하늘, 고요한 기도의 다락방 분위기" },
      { name: "소프트 레몬 옐로", hex: "#FEF08A", tailwind: "bg-[#FEF08A]", role: "어둠 속에서 환하게 켜지는 촛불처럼 중요 헤드라인 장식" },
      { name: "아쿠아 라이트 스카이", hex: "#38BDF8", tailwind: "bg-[#38BDF8]", role: "찬양 곡목 및 십자가 심볼 등 유용한 링크 레이어링" },
      { name: "스모크 실버 그레이", hex: "#94A3B8", tailwind: "bg-[#94A3B8]", role: "본문의 피로도를 누르고 잔잔하게 녹을 수 있도록 받쳐주는 서체를 담당" }
    ],
    recommendedFonts: [
      { target: "대제목 / 영문 슬로건", name: "Space Grotesk (700)", details: "테크니컬하면서도 빈티지한 멋이 살아있는 폰트. 무한한 하늘을 표현" },
      { target: "디테일 데이터 및 한글", name: "JetBrains Mono / Pretendard", details: "정보를 깔끔하고 빈티지한 아레나 타자기 스타일로 전달" }
    ]
  }
];
