export interface BulletinData {
  greetingTitle: string;
  greetingContent: string;
  praiseSongs: string[];
  prayerLeader: string;
  bibleVerse: string;
  sermonTitle: string;
  preacher: string;
  decisionText: string;
  announcements: {
    id: string;
    title: string;
    content: string;
    tag: string;
  }[];
  checklists: {
    id: string;
    emoji: string;
    text: string;
    subtext: string;
  }[];
}

export interface DesignTheme {
  id: string;
  name: string;
  description: string;
  concept: string;
  bgColor: string;      // Tailwind class for mobile preview background
  textColor: string;    // Tailwind class for body text
  accentBg: string;     // Tailwind class for accent background
  accentText: string;   // Tailwind class for accent text
  cardBg: string;       // Tailwind class for internal cards
  borderColor: string;  // Tailwind class for borders
  fontFamily: string;   // font-sans, font-serif, or font-mono style name
  fontImportName: string;
  fontNameKorean: string;
  tagline: string;
  colors: {
    name: string;
    hex: string;
    tailwind: string;
    role: string;
  }[];
  recommendedFonts: {
    target: string;
    name: string;
    details: string;
  }[];
}
