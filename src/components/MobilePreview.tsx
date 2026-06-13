import React, { useState } from "react";
import { BulletinData, DesignTheme } from "../types";
import { encodeData, shortenUrl, copyTextLegacy } from "../utils";
import html2canvas from "html2canvas-pro";
import { 
  Smartphone, 
  MessageSquare, 
  Music, 
  User, 
  BookOpen, 
  Flame, 
  Instagram,
  CheckCircle2,
  ChevronRight,
  ClipboardCopy,
  Download,
  Link2
} from "lucide-react";

interface MobilePreviewProps {
  data: BulletinData;
  activeTheme: DesignTheme;
  hideToggle?: boolean;
}

export default function MobilePreview({ data, activeTheme, hideToggle = false }: MobilePreviewProps) {
  const [viewMode, setViewMode] = useState<"card" | "kakao">("card");
  const [isShortening, setIsShortening] = useState(false);

  const praiseList = data.praiseSongs;

  // 1. Copy Card View as Image to Clipboard
  const handleCopyImage = async () => {
    const element = document.getElementById("card-mode-content");
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2.5, // High resolution
      });
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                [blob.type]: blob
              })
            ]);
            alert("✨ 카드뷰 이미지가 클립보드에 복사되었습니다!\n카카오톡 채팅방에서 붙여넣기(Cmd+V 또는 Ctrl+V)하여 바로 전송해 보세요.");
          } catch (err) {
            console.error("Clipboard image copy failed:", err);
            alert("브라우저 보안 설정으로 인해 이미지 복사가 제한되었습니다. 대신 아래 '이미지 다운로드' 버튼을 이용해 주세요!");
          }
        }
      }, "image/png");
    } catch (error: any) {
      console.error("Image generation failed:", error);
      alert(`이미지 생성 중 오류가 발생했습니다: ${error?.message || error}`);
    }
  };

  // 2. Download Card View as Image
  const handleDownloadImage = async () => {
    const element = document.getElementById("card-mode-content");
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2.5,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `weekly-bulletin-${(data.sermonTitle || 'card').replace(/\s+/g, '_')}.png`;
      link.click();
    } catch (error: any) {
      console.error("Image download failed:", error);
      alert(`이미지 다운로드 중 오류가 발생했습니다: ${error?.message || error}`);
    }
  };

  // 3. Copy Web Share Link (One-click copy with prompt fallback)
  const handleCopyShareLink = async () => {
    const encoded = encodeData(data);
    const longUrl = `${window.location.origin}${window.location.pathname}?theme=${activeTheme.id}&data=${encoded}`;
    
    setIsShortening(true);
    try {
      const shortUrl = await shortenUrl(longUrl);
      
      // Try copying short URL to clipboard
      let copySuccess = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(shortUrl);
          copySuccess = true;
        } catch (e) {
          console.warn("navigator.clipboard.writeText failed:", e);
        }
      }
      
      if (!copySuccess) {
        copySuccess = copyTextLegacy(shortUrl);
      }
      
      if (copySuccess) {
        alert("🔗 단축된 모바일 주보 공유 주소가 복사되었습니다!\n카카오톡 단체방이나 공지방에 붙여넣기(Ctrl+V) 하세요.");
      } else {
        // Fallback for strict mobile webviews where clipboard write is blocked
        window.prompt("브라우저 보안으로 인해 자동 복사가 차단되었습니다.\n아래의 단축 링크를 직접 복사해 주세요:", shortUrl);
      }
    } catch (err) {
      console.warn("Link shortening failed, using long URL:", err);
      
      // Try copying long URL to clipboard
      let copySuccess = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(longUrl);
          copySuccess = true;
        } catch (e) {
          console.warn("navigator.clipboard.writeText for long URL failed:", e);
        }
      }
      
      if (!copySuccess) {
        copySuccess = copyTextLegacy(longUrl);
      }
      
      if (copySuccess) {
        alert("🔗 모바일 주보 공유 주소가 복사되었습니다!\n(단축 API 오류로 긴 원본 주소가 복사되었습니다.)");
      } else {
        window.prompt("브라우저 보안으로 인해 자동 복사가 차단되었습니다.\n아래의 주소를 직접 복사해 주세요:", longUrl);
      }
    } finally {
      setIsShortening(false);
    }
  };

  // 4. Copy Kakao Text equivalent
  const handleCopyKakaoText = () => {
    const praises = praiseList.map((song, i) => `   ${i + 1}. ${song}`).join("\n");
    const announcementsText = data.announcements.map((ann, i) => 
      `[소식 ${i+1}] ${ann.title}\n  - ${ann.content.slice(0, 45)}...\n  ${ann.tag}`
    ).join("\n\n");
    const checklistsText = data.checklists.map((chk) => `${chk.emoji} ${chk.text}`).join("\n");

    const text = `🌟 [주일 예배 모바일 주보] 🌟

💬 오늘의 다정한 인사
"${data.greetingTitle}"
${data.greetingContent}

━━━━━━━━━━━━━━━
⛪️ 돌아오는 주일 예배 순서
━━━━━━━━━━━━━━━
• 🎵 찬양과 경배
${praises}

• 🙏 대표기도: ${data.prayerLeader}
• 📢 교제 및 소식: ${data.announcementLeader || "임원진"}
• 📖 말씀봉독: ${data.bibleVerse}
• 📖 말씀선포:
 [${data.sermonTitle}] - ${data.preacher}
• 🔥 결단의 고백: ${data.decisionText}

━━━━━━━━━━━━━━━
📌 이번 주 우리 부서 소식 (Insta)
━━━━━━━━━━━━━━━
${announcementsText}

━━━━━━━━━━━━━━━
💡 은혜 넘치는 예배 전 점검사항
━━━━━━━━━━━━━━━
${checklistsText}

내일 예배에서 만나요! 🤍`;

    navigator.clipboard.writeText(text)
      .then(() => alert("카카오톡 전송용 텍스트가 클립보드에 복사되었습니다! 카카오톡 채팅방에 바로 붙여넣기(Ctrl+V / Cmd+V) 하세요."))
      .catch((err) => {
        console.error("Text copy failed:", err);
        alert("텍스트 복사 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2 w-full" id="mobile-preview-container">
      
      {/* View Mode Selector */}
      {!hideToggle && (
        <div className="flex bg-slate-200/80 p-1.5 rounded-xl gap-1 shrink-0 w-full max-w-[340px]">
          <button
            onClick={() => setViewMode("card")}
            className={`flex-1 py-1 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === "card"
                ? "bg-white text-slate-800 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
            id="toggle-view-card"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>감성 지면 카드뷰</span>
          </button>
          
          <button
            onClick={() => setViewMode("kakao")}
            className={`flex-1 py-1 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === "kakao"
                ? "bg-white text-slate-800 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
            id="toggle-view-kakao"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>카카오톡 전송뷰</span>
          </button>
        </div>
      )}

      {/* Smartphone Outer Shell Mockup */}
      <div className="relative w-full max-w-[350px] aspect-[9/19.5] bg-slate-950 rounded-[40px] p-2.5 shadow-2xl border-4 border-slate-800 ring-8 ring-slate-900 ring-offset-2 ring-offset-slate-100 flex flex-col overflow-hidden">
        
        {/* Smartphone Speaker Sensor Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-black rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-neutral-800 rounded-full mb-1"></div>
        </div>

        {/* Smartphone Status Bar Area */}
        <div className="flex justify-between items-center px-6 pt-3.5 pb-1 text-black/85 z-40 text-[10px] font-mono shrink-0 font-medium">
          <span className={(viewMode === "card" || hideToggle) && activeTheme.id === "deep" ? "text-slate-400" : "text-slate-600"}>
            20:00 Sat
          </span>
          <div className="flex items-center gap-1">
            <span className={`w-3 h-1.5 rounded-xs border ${(viewMode === "card" || hideToggle) && activeTheme.id === "deep" ? "border-slate-500 bg-emerald-500" : "border-slate-800 bg-emerald-600"}`}></span>
            <span className={(viewMode === "card" || hideToggle) && activeTheme.id === "deep" ? "text-slate-400" : "text-slate-600"}>
              LTE
            </span>
          </div>
        </div>

        {/* INTERNALS OF SCREEN */}
        <div className="flex-1 rounded-[32px] overflow-hidden relative flex flex-col">
          
          {/* VIEW: Card (Canva Graphic Design Theme Preview) */}
          {(viewMode === "card" || hideToggle) && (
            <div 
              style={{ 
                fontFamily: activeTheme.fontFamily.startsWith("font-[")
                  ? activeTheme.fontFamily.replace("font-[", "").replace("]", "").replace(/_/g, " ")
                  : activeTheme.fontFamily === "font-playfair"
                    ? "'Playfair Display', serif"
                    : undefined
              }}
              className="flex-1 overflow-y-auto select-none scrollbar-thin bg-white"
              id="card-mode-view"
            >
              {/* Inner wrapper for html2canvas capturing */}
              <div 
                id="card-mode-content"
                className={`p-5 pb-12 flex flex-col gap-6 relative ${activeTheme.bgColor} ${activeTheme.textColor}`}
              >
                {/* Star decoration for Deep dark theme */}
                {activeTheme.id === "deep" && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <span className="absolute top-10 left-12 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    <span className="absolute top-48 right-16 w-1 h-1 bg-white rounded-full"></span>
                    <span className="absolute bottom-28 left-8 w-2 h-2 bg-yellow-200 rounded-full animate-ping"></span>
                    <span className="absolute top-[350px] right-24 w-1 h-1 bg-white rounded-full"></span>
                  </div>
                )}

                {/* Card Header decoration */}
                <div className="text-center pt-2 shrink-0">
                  <div className="inline-flex items-center justify-center gap-1 text-[9px] tracking-[0.25em] font-bold uppercase py-1 px-3 border-b border-rose-400/30 font-mono">
                    <span>†</span>
                    <span>Youth Ministry</span>
                  </div>
                  <div className="text-[10px] font-bold tracking-wider mt-1 opacity-70">
                    SUNDAY WORSHIP BULLETIN
                  </div>
                </div>

                {/* Section 1: Opening Greeting */}
                <div className="text-center space-y-2.5 shrink-0">
                  <h1 className="text-base font-bold tracking-tight px-1 leading-relaxed text-balance">
                    {data.greetingTitle}
                  </h1>
                  
                  <div className={`p-4 rounded-2xl ${activeTheme.cardBg} border ${activeTheme.borderColor} shadow-xs text-xs leading-relaxed text-left relative`}>
                    <span className="text-2xl font-serif text-teal-400/40 absolute -top-1 -left-1">“</span>
                    <div className="relative z-10 px-1 pt-1 break-keep text-[11px] opacity-90 whitespace-pre-line">
                      {data.greetingContent}
                    </div>
                    <span className="text-2xl font-serif text-teal-400/40 absolute bottom-0 right-1 leading-none">”</span>
                  </div>
                </div>

                {/* Section 2: Worship Order List */}
                <div className={`p-4 rounded-2xl ${activeTheme.cardBg} border ${activeTheme.borderColor} shadow-xs space-y-4`}>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-wrap gap-y-1">
                    <h3 className="text-xs font-bold tracking-wider flex items-center gap-1.5 font-mono whitespace-nowrap">
                      <span>✝</span> SCHEDULE OF WORSHIP
                    </h3>
                    <span className="text-[9px] font-bold opacity-60 whitespace-nowrap">주일 부서 예배순서</span>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    
                    {/* Praise list */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-5 h-5 rounded-full ${activeTheme.accentBg} ${activeTheme.accentText} flex items-center justify-center shrink-0`}>
                          <Music className="w-3 h-3" />
                        </div>
                        <span className="font-bold text-[11px] tracking-wide">찬양과 경배 (Praise)</span>
                      </div>
                      <ul className="pl-6 space-y-1">
                        {praiseList.map((song, i) => {
                          const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(song + " 찬양")}`;
                          return (
                            <li key={i} className="text-[10.5px] opacity-85 flex items-start gap-1">
                              <span className="text-teal-500 font-mono select-none">•</span>
                              <a 
                                href={youtubeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="break-all hover:text-red-500 hover:underline transition-all cursor-pointer flex items-center gap-1 text-inherit no-underline"
                                title="유튜브로 찬양 검색해서 듣기"
                              >
                                <span>{song}</span>
                                <span className="text-[7px] bg-red-500 text-white px-1 py-0.5 rounded font-sans font-extrabold tracking-tighter scale-90 inline-block leading-none">PLAY</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Prayer */}
                    <div className="flex justify-between items-center text-[11px] border-t border-slate-100/60 pt-2 pb-0.5">
                      <span className="opacity-80 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 opacity-60 text-teal-500" />
                        <span>대표기도 (Prayer)</span>
                      </span>
                      <span className="font-bold">{data.prayerLeader}</span>
                    </div>

                    {/* Announcement header */}
                    <div className="flex justify-between items-center text-[11px] border-t border-slate-100/60 pt-2 pb-0.5">
                      <span className="opacity-80 flex items-center gap-1">
                        <ChevronRight className="w-3.5 h-3.5 opacity-60 text-teal-500" />
                        <span>교제 및 소식</span>
                      </span>
                      <span className="font-bold">{data.announcementLeader || "임원진"}</span>
                    </div>

                    {/* Scripture Reading */}
                    <div className="flex justify-between items-center text-[11px] border-t border-slate-100/60 pt-2 pb-0.5">
                      <span className="opacity-80 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 opacity-60 text-teal-500" />
                        <span>말씀봉독 (Scripture)</span>
                      </span>
                      <span className="font-semibold text-teal-600 truncate max-w-[140px] text-right" title={data.bibleVerse}>
                        {data.bibleVerse}
                      </span>
                    </div>

                    {/* Worship Offering */}
                    <div className="flex justify-between items-center text-[11px] border-t border-slate-100/60 pt-2 pb-0.5">
                      <span className="opacity-80 flex items-center gap-1">
                        <ChevronRight className="w-3.5 h-3.5 opacity-60 text-teal-500" />
                        <span>봉헌과 감사의 기도</span>
                      </span>
                      <span className="font-bold">온 회중</span>
                    </div>

                    {/* Sermon Box */}
                    <div className="border-t border-slate-100/65 pt-3 mt-1 text-center bg-slate-50/50 -mx-4 px-4 py-2.5 space-y-1">
                      <span className="text-[9px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full inline-block">
                        TODAY'S MESSAGE
                      </span>
                      <h4 className="font-bold text-[11.5px] leading-snug tracking-tight text-slate-800 px-1 dark:text-slate-100">
                        「{data.sermonTitle}」
                      </h4>
                      <p className="text-[10px] opacity-70">
                        설교: {data.preacher}
                      </p>
                    </div>

                    {/* Decision */}
                    <div className="flex items-start gap-2 border-t border-slate-100/60 pt-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Flame className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-[10px] block text-amber-800">결단의 선언 (Response)</span>
                        <p className="text-[10px] opacity-80 leading-relaxed italic">{data.decisionText}</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Section 3: Ministry Instagram Feed Ads */}
                <div className="space-y-3.5 shrink-0">
                  <div className="flex items-center gap-1.5 px-0.5">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <h3 className="text-xs font-bold tracking-tight">이번 주 소식 (Insta)</h3>
                  </div>

                  <div className="space-y-3">
                    {data.announcements.map((ann, idx) => (
                      <div 
                        key={ann.id}
                        className={`rounded-2xl overflow-hidden border ${activeTheme.borderColor} ${activeTheme.cardBg} shadow-xs`}
                      >
                        {/* Insta Mock Header */}
                        <div className="p-3 bg-slate-50/40 border-b border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-500 text-white font-serif flex items-center justify-center text-[10px] italic font-bold shrink-0">
                              Y
                            </div>
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold block leading-none">우리들 청년부</span>
                              <span className="text-[8px] opacity-40">@weekly_youth</span>
                            </div>
                          </div>
                          <span className="text-[10px] opacity-30">💙</span>
                        </div>

                        {/* Insta Content Body */}
                        <div className="p-3.5 space-y-1.5">
                          <h4 className="text-[11.5px] font-extrabold text-slate-800 tracking-tight leading-snug">
                            {ann.title}
                          </h4>
                          <p className="text-[10.5px] leading-relaxed text-slate-600 whitespace-pre-line">
                            {ann.content}
                          </p>
                          <span className="text-[10px] text-teal-600 font-bold block mt-1.5 font-mono">
                            {ann.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Pre-worship Checklist */}
                <div className={`p-4 rounded-2xl ${activeTheme.cardBg} border ${activeTheme.borderColor} shadow-xs space-y-3 shrink-0`}>
                  <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-xs font-bold tracking-tight">예배 전 은혜 채우기 체크리스트</h3>
                  </div>

                  <ul className="space-y-3">
                    {data.checklists.map((chk) => (
                      <li key={chk.id} className="flex gap-2.5 items-start">
                        <span className="text-sm shrink-0 bg-slate-50 w-6 h-6 rounded-lg flex items-center justify-center border border-slate-150">
                          {chk.emoji}
                        </span>
                        <div className="min-w-0">
                          <strong className="text-[10.5px] font-bold text-slate-800 leading-none block">{chk.text}</strong>
                          <span className="text-[9.5px] text-slate-400 leading-snug block mt-0.5 break-keep">
                            {chk.subtext}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer branding */}
                <div className="text-center pt-2 pb-4 opacity-40">
                  <p className="text-[9px] font-mono">예배에 마음을 담는 당신이 가장 소중합니다.</p>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: KakaoTalk Chat (Classic Bubble Mockup) */}
          {viewMode === "kakao" && !hideToggle && (
            <div className="flex-1 overflow-y-auto bg-[#BACEE0] p-4 flex flex-col font-sans select-text scrollbar-thin" id="kakao-mode-view">
              
              {/* Chat Date Divider */}
              <div className="mx-auto my-3 bg-black/10 text-white text-[9.5px] py-1 px-3 rounded-full text-center tracking-tight">
                2026년 6월 13일 토요일
              </div>

              {/* Profile Wrapper */}
              <div className="flex gap-2.5 mt-2">
                <div className="w-9 h-9 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-xs select-none">
                  ✝️
                </div>
                
                <div className="flex flex-col gap-1 items-start min-w-0 flex-1">
                  <span className="text-[10.5px] text-slate-700 font-bold select-none">
                    행복한 우리 청년부 (Mobile Bulletin)
                  </span>
                  
                  {/* Chat Bubble card */}
                  <div className="bg-white text-slate-900 rounded-tr-xl rounded-b-xl px-3.5 py-3 shadow-xs border border-slate-200/50 max-w-[240px] text-[10px] leading-relaxed whitespace-pre-wrap select-all selection:bg-teal-100 font-mono">
                    <span className="text-rose-500 font-bold block mb-1">🌟 [주일 예배 모바일 주보] 🌟</span>
                     
                    <strong className="block text-slate-800">💬 오늘의 다정한 인사</strong>
                    "{data.greetingTitle}"<br/>
                    {data.greetingContent}<br/>
                    
                    ━━━━━━━━━━━━━━━<br/>
                    ⛪️ 돌아오는 주일 예배 순서<br/>
                    ━━━━━━━━━━━━━━━<br/>
                    • 🎵 찬양과 경배<br/>
                    {praiseList.map((song, i) => `   ${i + 1}. ${song}`).join("\n")}<br/><br/>
                    
                    • 🙏 대표기도: {data.prayerLeader}<br/>
                    • 📖 말씀봉독: {data.bibleVerse}<br/>
                    • 📖 말씀선포:<br/>
                     [{data.sermonTitle}] - {data.preacher}<br/>
                    • 🔥 결단의 고백: {data.decisionText}<br/>
                    
                    ━━━━━━━━━━━━━━━<br/>
                    📌 이번 주 우리 부서 소식 (Insta)<br/>
                    ━━━━━━━━━━━━━━━<br/>
                    {data.announcements.map((ann, i) => 
                      `[소식 ${i+1}] ${ann.title}\n  - ${ann.content.slice(0, 40)}...\n  ${ann.tag}`
                    ).join("\n\n")}<br/>
                    <br/>
                    ━━━━━━━━━━━━━━━<br/>
                    💡 은혜 넘치는 예배 전 점검사항<br/>
                    ━━━━━━━━━━━━━━━<br/>
                    {data.checklists.map((chk, i) => 
                      `${chk.emoji} ${chk.text}`
                    ).join("\n")}<br/>
                    <br/>
                    내일 예배에서 만나요! 🤍
                  </div>
                  
                  <span className="text-[8px] text-slate-500 ml-1 self-start select-none">
                    오후 8:12
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Action Buttons beneath smartphone mockup */}
      {!hideToggle && (
        <div className="flex flex-col gap-2 w-full max-w-[340px] mt-1">
          {viewMode === "card" ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyImage}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xs transition-all cursor-pointer border-0"
                >
                  <ClipboardCopy className="w-3.5 h-3.5" />
                  <span>이미지 복사</span>
                </button>
                
                <button
                  onClick={handleDownloadImage}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-xl shadow-xs transition-all cursor-pointer border-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>이미지 다운로드</span>
                </button>
              </div>

              <button
                onClick={handleCopyShareLink}
                disabled={isShortening}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Link2 className={`w-3.5 h-3.5 text-teal-600 ${isShortening ? "animate-spin" : ""}`} />
                <span>{isShortening ? "링크 축소 중..." : "💬 카카오톡 공유 링크 복사"}</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleCopyKakaoText}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl shadow-xs transition-all cursor-pointer border-0"
            >
              <ClipboardCopy className="w-3.5 h-3.5" />
              <span>카카오톡 전송 텍스트 복사</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
}
