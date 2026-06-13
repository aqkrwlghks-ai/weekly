import React, { useState } from "react";
import { DEFAULT_BULLETIN_DATA, DESIGN_THEMES } from "./presets";
import { BulletinData, DesignTheme } from "./types";
import WorshipForm from "./components/WorshipForm";
import MobilePreview from "./components/MobilePreview";
import DesignGuideView from "./components/DesignGuideView";
import { decodeData } from "./utils";
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  Smile, 
  HelpCircle, 
  Info,
  Compass,
  ArrowRight,
  ClipboardCopy
} from "lucide-react";

export default function App() {
  // Parse shared query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const sharedDataParam = queryParams.get("data");
  const sharedThemeParam = queryParams.get("theme");
  const isSharedView = !!sharedDataParam;

  const [bulletinData, setBulletinData] = useState<BulletinData>(() => {
    if (sharedDataParam) {
      const decoded = decodeData(sharedDataParam);
      if (decoded) return decoded;
    }
    return DEFAULT_BULLETIN_DATA;
  });

  const [activeTheme, setActiveTheme] = useState<DesignTheme>(() => {
    if (sharedThemeParam) {
      const found = DESIGN_THEMES.find((t) => t.id === sharedThemeParam);
      if (found) return found;
    }
    return DESIGN_THEMES[0];
  });

  const [showWelcomeMsg, setShowWelcomeMsg] = useState(true);

  // Quick reset to default templates
  const handleResetData = () => {
    if (window.confirm("주보 편집 내용을 원본 초기값으로 리셋하시겠습니까?")) {
      setBulletinData(DEFAULT_BULLETIN_DATA);
    }
  };

  if (isSharedView) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[360px] flex flex-col gap-4">
          <div className="text-center text-white space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-teal-400 uppercase font-mono">Mobile Bulletin</span>
            <h1 className="text-sm font-bold opacity-90">⛪️ 주일 예배 모바일 주보</h1>
          </div>
          
          <MobilePreview data={bulletinData} activeTheme={activeTheme} hideToggle={true} />
          
          <div className="flex flex-col gap-2 mt-2">
            <a 
              href={window.location.pathname}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-all shadow-md flex items-center justify-center gap-2 border-0 no-underline"
            >
              <span>✨ 나도 모바일 주보 작성기 만들기</span>
            </a>
            <p className="text-[10px] text-slate-500 text-center font-mono">
              © 2026 Mobile Bulletin Editor. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      
      {/* Top Main Navigation / Bar */}
      <header className="bg-white border-b border-slate-100 px-5 py-4 shrink-0 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white text-xl shadow-md rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              ⛪️
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-bold text-slate-800 tracking-tight">감성 모바일 주보 작성기</h1>
                <span className="text-[10px] font-bold bg-teal-50 text-teal-700 py-0.5 px-2 rounded-full border border-teal-100">
                  Z세대 사역 에디터
                </span>
              </div>
              <p className="text-xs text-slate-500">
                토요일 저녁, 우리 청년들의 메신저에 흘러갈 다정하고 힙한 주일 예배 모바일 가이드
              </p>
            </div>
          </div>

          {/* Quick Info & Action Header */}
          <div className="flex items-center gap-2.5">
            <button
               onClick={handleResetData}
               className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 py-2 px-3 rounded-xl transition-all"
               id="reset-bulletin-btn"
            >
              초기값 리셋
            </button>
            <div className="text-right hidden md:block">
              <span className="text-[10px] text-slate-400 font-mono block">오늘의 사역 캘린더</span>
              <span className="text-xs font-bold text-slate-600">내일은 거룩한 주일 예배 🌿</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-5">
        
        {/* Welcome Pastor Message Roleplay Callout */}
        {showWelcomeMsg && (
          <div 
            className="bg-teal-50/60 border border-teal-100/60 rounded-2xl p-4 flex gap-3.5 relative transition-all duration-300 animate-fade-in"
            id="welcome-pastors-box"
          >
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 shadow-inner text-xl">
              🕊️
            </div>
            <div className="text-xs text-teal-900 leading-relaxed max-w-5xl pr-6">
              <div className="flex items-center gap-1.5 mb-1 text-teal-800">
                <span className="font-bold">반가워요! 청소년/청년부를 지극히 품고 섬기는 낭만 사역자님! 🌿</span>
                <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full font-mono">Pastor Chat</span>
              </div>
              <p className="opacity-90">
                내일 주일 예배를 앞둔 토요일 저녁, 우리 지체들의 피로한 일상에 따뜻한 노크가 되어 줄 감각적인 1쪽 모바일 주보 전송기를 선물해 드려요. 
                너무 딱딱하고 무거운 종교적인 어법은 줄이고, 마치 다정한 형/누나 혹은 감성 가득한 담임 사사가 친근하게 말을 건네듯 가상의 인사와 일정을 구성했습니다.
                아래 <strong>[1. 테마 선택]</strong>을 통해 젊은 층이 열광할 디자인 톤을 고르고, 왼쪽 패널에서 주보 정보를 입력해 보세요. 카톡 복사뿐만 아니라 <strong>미리캔버스/Canva 작업용 전용 디자인 팁과 스와치</strong>도 함께 안내됩니다.
              </p>
            </div>
            <button
              onClick={() => setShowWelcomeMsg(false)}
              className="absolute top-3 right-3 text-teal-400 hover:text-teal-700 text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-teal-100/40 transition-all focus:outline-none"
              title="안내 닫기"
              id="close-welcome-btn"
            >
              ×
            </button>
          </div>
        )}

        {/* Section: Interactive Theme Picker */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5" id="theme-selector-root">
          <div className="flex items-center gap-2 mb-3.5">
            <Compass className="w-5 h-5 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              [1단계] 모바일 주보 디자인 감성 톤앤매너 선택
            </h2>
            <span className="text-[10px] text-slate-400">선택한 감성이 실시간 모바일 폰 렌더링에 영입됩니다!</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {DESIGN_THEMES.map((theme) => {
              const isActive = activeTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme)}
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col gap-1.5 focus:outline-none select-none relative overflow-hidden ${
                    isActive
                      ? "border-teal-500 bg-teal-500/5 ring-1 ring-teal-500/20 shadow-md"
                      : "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-350"
                  }`}
                  id={`theme-btn-${theme.id}`}
                >
                  {isActive && (
                    <div className="absolute top-0 right-0 bg-teal-600 text-white p-1 rounded-bl-lg text-[9px] font-bold">
                      선택됨
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {/* Visual Color Dots snippet */}
                    <div className="flex gap-1">
                      {theme.colors.slice(0, 3).map((col, idx) => (
                        <span key={idx} className={`w-3 h-3 rounded-full ${col.tailwind} border border-black/5`}></span>
                      ))}
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">
                      {theme.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    {theme.description}
                  </p>
                  <span className="text-[10px] font-mono text-teal-600 bg-teal-50 py-0.5 px-2 rounded-full self-start font-semibold">
                    {theme.fontNameKorean}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Three Column Custom Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start" id="three-column-grid">
          
          {/* Column A: Information Builder Form (Left Panel) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-1 px-1 text-slate-500 text-xs font-bold uppercase tracking-widest shrink-0">
              <span className="bg-slate-400 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[9px] mr-1">A</span>
              <span>모바일 주보 정보 디테일 편집기</span>
            </div>
            <WorshipForm 
              data={bulletinData} 
              onChange={setBulletinData} 
            />
          </div>

          {/* Column B: Interactive Smartphone Mockup (Center Panel) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-3 items-center">
            <div className="w-full flex items-center gap-1 px-1 text-slate-500 text-xs font-bold uppercase tracking-widest shrink-0">
              <span className="bg-slate-400 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[9px] mr-1">B</span>
              <span>1쪽 모바일 카드 & 전송 실시간 미리보기</span>
            </div>
            <MobilePreview 
              data={bulletinData} 
              activeTheme={activeTheme} 
            />
          </div>

          {/* Column C: Canva/Miricanvas Production Guide (Right Panel) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-1 px-1 text-slate-500 text-xs font-bold uppercase tracking-widest shrink-0">
              <span className="bg-slate-400 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[9px] mr-1">C</span>
              <span>미리캔버스 & Canva 디자인 전술 가이드</span>
            </div>
            <DesignGuideView 
              activeTheme={activeTheme} 
            />
          </div>

        </div>

      </main>

      {/* App Main Bottom Banner */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-5 mt-auto text-center border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-semibold text-slate-300 flex items-center justify-center gap-1">
            <span>⛪️</span> 예배와 공동체를 깊이 사모하는 든든한 청년 동역자들과 함께합니다.
          </p>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed text-[11px]">
            작성기에서 제공하는 텍스트 셰어링 파일은 개인정보를 보호하며, 클라이언트 브라우저 로컬 저장으로 메모리를 누수하지 않습니다. 내일 있을 청소년/청년들의 예배가 생명력 있기를 간절히 축복합니다.
          </p>
          <div className="pt-2 text-[10px] text-slate-600 block">
             © 2026 Mobile Bulletin Editor for Generational Ministry. Made with Pure Craft.
          </div>
        </div>
      </footer>

    </div>
  );
}
