import React, { useState } from "react";
import { BulletinData } from "../types";
import { GREETING_PRESETS, INSTAGRAM_PRESETS } from "../presets";
import { 
  Heart, 
  Music, 
  Calendar, 
  User, 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  ListTodo,
  FileText,
  Clock,
  Instagram,
  ChevronRight
} from "lucide-react";

interface WorshipFormProps {
  data: BulletinData;
  onChange: (newData: BulletinData) => void;
}

type TabType = "greeting-praise" | "liturgy" | "announcements" | "checklist" | "share";

export default function WorshipForm({ data, onChange }: WorshipFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("greeting-praise");
  const [copiedText, setCopiedText] = useState<"kakao" | "clean" | null>(null);

  const handleUpdateField = (key: keyof BulletinData, value: any) => {
    onChange({
      ...data,
      [key]: value
    });
  };

  const handlePraiseChange = (index: number, val: string) => {
    const updated = [...data.praiseSongs];
    updated[index] = val;
    handleUpdateField("praiseSongs", updated);
  };

  const handleAddPraise = () => {
    if (data.praiseSongs.length < 5) {
      handleUpdateField("praiseSongs", [...data.praiseSongs, "새 찬양곡을 입력하세요"]);
    }
  };

  const handleRemovePraise = (index: number) => {
    if (data.praiseSongs.length > 1) {
      const updated = data.praiseSongs.filter((_, idx) => idx !== index);
      handleUpdateField("praiseSongs", updated);
    }
  };

  // Announcements CRUD
  const handleAnnouncementChange = (id: string, field: "title" | "content" | "tag", val: string) => {
    const updated = data.announcements.map((ann) => {
      if (ann.id === id) {
        return { ...ann, [field]: val };
      }
      return ann;
    });
    handleUpdateField("announcements", updated);
  };

  const handleAddAnnouncement = () => {
    const newId = `ann-${Date.now()}`;
    const newAnn = {
      id: newId,
      title: "새로운 광고 제목을 입력하세요 📢",
      content: "이번 주 진행되는 구체적인 시간, 장소, 대상 등 자세한 내용을 센스 넘치게 작성해주세요.",
      tag: "#새소식 #함께해요"
    };
    handleUpdateField("announcements", [...data.announcements, newAnn]);
  };

  const handleLoadInstaPreset = (presetIndex: number) => {
    const preset = INSTAGRAM_PRESETS[presetIndex];
    if (!preset) return;
    const newId = `ann-${Date.now()}`;
    const newAnn = {
      id: newId,
      title: preset.title,
      content: preset.content,
      tag: preset.tag
    };
    handleUpdateField("announcements", [...data.announcements, newAnn]);
  };

  const handleRemoveAnnouncement = (id: string) => {
    if (data.announcements.length > 1) {
      const updated = data.announcements.filter((ann) => ann.id !== id);
      handleUpdateField("announcements", updated);
    }
  };

  // Checklists CRUD
  const handleChecklistChange = (id: string, field: "text" | "subtext" | "emoji", val: string) => {
    const updated = data.checklists.map((chk) => {
      if (chk.id === id) {
        return { ...chk, [field]: val };
      }
      return chk;
    });
    handleUpdateField("checklists", updated);
  };

  const handleSelectPresetGreeting = (preset: typeof GREETING_PRESETS[0]) => {
    onChange({
      ...data,
      greetingTitle: preset.title,
      greetingContent: preset.content
    });
  };

  // Copy helpers
  const generateKakaoText = () => {
    const praiseText = data.praiseSongs.map((song, i) => `   ${i + 1}. 🎵 ${song}`).join("\n");
    const announcementsText = data.announcements.map((ann, i) => 
      `📢 [소식 ${i + 1}] ${ann.title}\n  - ${ann.content}\n  ${ann.tag}`
    ).join("\n\n");
    
    const checklistText = data.checklists.map((chk, i) => 
      `${chk.emoji} ${chk.text}\n  : ${chk.subtext}`
    ).join("\n\n");

    return `🌟 [너를 기다리는 주일 모바일 주보] 🌟

💬 오늘의 다정한 인사말
"${data.greetingTitle}"
${data.greetingContent}

━━━━━━━━━━━━━━━━━━━━
⛪️ 돌아오는 주일 예배 순서
━━━━━━━━━━━━━━━━━━━━
• 🎵 찬양과 경배
${praiseText}

• 🙏 대표기도: ${data.prayerLeader}
• 📢 부서 광고 & 소식
• 📖 말씀봉독: ${data.bibleVerse}
• 💌 봉헌 & 감사의 기도
• 📖 말씀 선포: [${data.sermonTitle}] - ${data.preacher}
• 🔥 결단과 고백: ${data.decisionText}

━━━━━━━━━━━━━━━━━━━━
📌 이번 주 우리 부서 소식 (Insta)
━━━━━━━━━━━━━━━━━━━━
${announcementsText}

━━━━━━━━━━━━━━━━━━━━
💡 은혜 넘치는 예배 전 점검사항
━━━━━━━━━━━━━━━━━━━━
${checklistText}

━━━━━━━━━━━━━━━━━━━━
내일 우리 가장 복된 소식인 예수님의 은혜 속에서 설레는 미소로 반갑게 만나요! 🤍`;
  };

  const generateCleanTextForCanva = () => {
    return `[모바일 주보 텍스트 가이드]

제목: ${data.greetingTitle}
본문: ${data.greetingContent}

[예배 순서]
- 찬양 목록:
${data.praiseSongs.map((s, i) => `  ${i + 1}. ${s}`).join("\n")}
- 대표기도: ${data.prayerLeader}
- 오늘의 말씀: ${data.bibleVerse}
- 설교 제목: ${data.sermonTitle} (${data.preacher})
- 결단 고백: ${data.decisionText}

[이달의 소식]
${data.announcements.map((ann, i) => `소식 ${i + 1}: ${ann.title}\n내용: ${ann.content}\n태그: ${ann.tag}`).join("\n\n")}

[예배전 준비 사항]
${data.checklists.map((chk) => `${chk.emoji} ${chk.text} - ${chk.subtext}`).join("\n")}`;
  };

  const executeCopy = (textType: "kakao" | "clean") => {
    const text = textType === "kakao" ? generateKakaoText() : generateCleanTextForCanva();
    navigator.clipboard.writeText(text);
    setCopiedText(textType);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[85vh]" id="worship-form-container">
      {/* Editor Header Navigation */}
      <div className="bg-slate-50 p-3 pt-4 border-b border-slate-100 shrink-0">
        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setActiveTab("greeting-praise")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "greeting-praise"
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
            id="tab-btn-greeting-praise"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>인사 & 찬양</span>
          </button>
          
          <button
            onClick={() => setActiveTab("liturgy")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "liturgy"
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
            id="tab-btn-liturgy"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>예배 순서</span>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "announcements"
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
            id="tab-btn-announcements"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>인스타 소식</span>
          </button>

          <button
            onClick={() => setActiveTab("checklist")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "checklist"
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
            id="tab-btn-checklist"
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>예배 체크리스트</span>
          </button>

          <button
            onClick={() => setActiveTab("share")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "share"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
            id="tab-btn-share"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>인사발송 및 복사</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-5">
        
        {/* TAB 1: Greeting & Praise */}
        {activeTab === "greeting-praise" && (
          <div className="space-y-5 animate-fade-in" id="panel-greeting-praise">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1">
                  <span>💌</span> 토요 저녁 인사말 프리셋 선택
                </label>
                <span className="text-[10px] text-slate-400">클릭 시 자동 세팅</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {GREETING_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPresetGreeting(preset)}
                    className="p-3 text-left rounded-xl border border-slate-100 bg-slate-50 hover:bg-teal-50/50 hover:border-teal-300 transition-all text-xs"
                    id={`preset-${preset.id}`}
                  >
                    <div className="font-semibold text-slate-800 flex items-center gap-1">
                      <Heart className="w-3 h-3 text-teal-600 fill-teal-100 shrink-0" />
                      <span className="truncate">{preset.title}</span>
                    </div>
                    <p className="text-slate-500 mt-1 truncate max-w-md">{preset.content}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                오프닝 타이틀
              </label>
              <input
                type="text"
                value={data.greetingTitle}
                onChange={(e) => handleUpdateField("greetingTitle", e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:bg-white focus:border-teal-500 transition-all"
                placeholder="감성적인 문구의 대제목"
                id="input-greeting-title"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                오프닝 다정한 본문
              </label>
              <textarea
                value={data.greetingContent}
                onChange={(e) => handleUpdateField("greetingContent", e.target.value)}
                rows={4}
                className="w-full text-xs bg-slate-50 rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:bg-white focus:border-teal-500 transition-all resize-none leading-relaxed"
                placeholder="세상의 소음을 잠시 내려놓고 은혜로 안내할 감성 인사"
                id="input-greeting-content"
              />
            </div>

            {/* Praise Songs section */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-teal-600" />
                  <span>예배 찬양 선곡 (최대 5곡)</span>
                </label>
                <button
                  onClick={handleAddPraise}
                  disabled={data.praiseSongs.length >= 5}
                  className="text-[10px] text-teal-600 bg-teal-50 hover:bg-teal-100 disabled:bg-slate-50 disabled:text-slate-300 px-2 py-1 rounded font-bold transition-all flex items-center gap-0.5"
                  id="add-praise-btn"
                >
                  <Plus className="w-3 h-3" />
                  <span>추가</span>
                </button>
              </div>

              <div className="space-y-2">
                {data.praiseSongs.map((song, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-300 w-4 shrink-0">
                      0{index + 1}
                    </span>
                    <input
                      type="text"
                      value={song}
                      onChange={(e) => handlePraiseChange(index, e.target.value)}
                      className="flex-1 text-xs bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:bg-white focus:border-teal-500 transition-all font-medium"
                      placeholder={`곡명 ${index + 1}을 입력하세요`}
                      id={`praise-song-${index}`}
                    />
                    <button
                      onClick={() => handleRemovePraise(index)}
                      disabled={data.praiseSongs.length <= 1}
                      className="p-2 text-slate-400 hover:text-rose-500 disabled:opacity-30 rounded hover:bg-slate-50"
                      title="지우기"
                      id={`remove-praise-${index}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Liturgy Order */}
        {activeTab === "liturgy" && (
          <div className="space-y-4 animate-fade-in" id="panel-liturgy">
            <h3 className="text-xs font-bold text-rose-500 tracking-wide mb-1 flex items-center gap-1">
              <span>⛪️</span> 예배 순서 상세 설정 (예배의 핵심 구절과 명칭)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400 text-[10px]" /> 代表 대표기도 담당자
                </label>
                <input
                  type="text"
                  value={data.prayerLeader}
                  onChange={(e) => handleUpdateField("prayerLeader", e.target.value)}
                  className="w-full text-xs bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:bg-white focus:border-teal-500 transition-all"
                  placeholder="박순장 (청년부 임원)"
                  id="liturgy-prayer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 text-[10px]" /> 📖 성경 봉독 말씀 구절
                </label>
                <input
                  type="text"
                  value={data.bibleVerse}
                  onChange={(e) => handleUpdateField("bibleVerse", e.target.value)}
                  className="w-full text-xs bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:bg-white focus:border-teal-500 transition-all"
                  placeholder="로마서 12장 1-2절"
                  id="liturgy-bible"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  설교 제목 (Sermon Title)
                </label>
                <input
                  type="text"
                  value={data.sermonTitle}
                  onChange={(e) => handleUpdateField("sermonTitle", e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:bg-white focus:border-teal-500 transition-all"
                  placeholder="제목을 명확하고 힘있게 써주세요"
                  id="liturgy-sermon-title"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  설교자 파트너
                </label>
                <input
                  type="text"
                  value={data.preacher}
                  onChange={(e) => handleUpdateField("preacher", e.target.value)}
                  className="w-full text-xs bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:bg-white focus:border-teal-500 transition-all"
                  placeholder="이요셉 목사님 / 전도사님"
                  id="liturgy-preacher"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  🔥 결단 및 파송 고백 선언
                </label>
                <input
                  type="text"
                  value={data.decisionText}
                  onChange={(e) => handleUpdateField("decisionText", e.target.value)}
                  className="w-full text-xs bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:bg-white focus:border-teal-500 transition-all"
                  placeholder="예배 후 세상으로 나아가는 마음가짐 한 줄"
                  id="liturgy-decision"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Announcements */}
        {activeTab === "announcements" && (
          <div className="space-y-4 animate-fade-in" id="panel-announcements">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>인스타그램 피드형 부서 소식 광고</span>
                </h3>
                <p className="text-[10px] text-slate-400">후보를 수정하고 광고를 쉽게 편집하세요.</p>
              </div>

              <button
                onClick={handleAddAnnouncement}
                className="text-[10px] text-teal-600 bg-teal-50 hover:bg-teal-100 px-2 py-1.5 rounded font-bold transition-all flex items-center gap-0.5 shrink-0"
                id="add-ann-btn"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>새 광고 개설</span>
              </button>
            </div>

            {/* Quick Load presets for Announcements */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 block mb-1.5">
                🌟 실무용 가상 광고 템플릿 즉시 추가:
              </span>
              <div className="flex gap-2">
                {INSTAGRAM_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.id}
                    onClick={() => handleLoadInstaPreset(idx)}
                    className="bg-white hover:bg-teal-50 text-[10px] text-slate-600 hover:text-teal-700 border border-slate-200 hover:border-teal-200 rounded px-2.5 py-1 transition-all"
                    id={`add-insta-preset-${idx}`}
                  >
                    + {preset.title.split(" ")[0]} 소식 추가
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-1 max-h-[50vh] overflow-y-auto pr-1">
              {data.announcements.map((ann, index) => (
                <div 
                  key={ann.id} 
                  className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs relative flex flex-col gap-2.5"
                  id={`ann-card-edit-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-pink-100 text-pink-700 py-0.5 px-2 rounded-full">
                      소식 0{index + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveAnnouncement(ann.id)}
                      disabled={data.announcements.length <= 1}
                      className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-20 rounded"
                      id={`remove-ann-${index}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={ann.title}
                      onChange={(e) => handleAnnouncementChange(ann.id, "title", e.target.value)}
                      className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-100 rounded px-2 py-1.5 outline-none focus:bg-white focus:border-teal-500 transition-all"
                      placeholder="광고 한 줄 제목"
                      id={`ann-title-input-${index}`}
                    />
                  </div>

                  <div>
                    <textarea
                      value={ann.content}
                      onChange={(e) => handleAnnouncementChange(ann.id, "content", e.target.value)}
                      rows={2.5}
                      className="w-full text-[11px] text-slate-500 bg-slate-50 border border-slate-100 rounded px-2 py-1.5 outline-none focus:bg-white focus:border-teal-500 transition-all resize-none leading-relaxed"
                      placeholder="구체적인 일시, 장소를 포함한 광고 본문 내용"
                      id={`ann-content-textarea-${index}`}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={ann.tag}
                      onChange={(e) => handleAnnouncementChange(ann.id, "tag", e.target.value)}
                      className="w-full text-[10px] text-teal-600 font-mono font-bold bg-slate-50 border border-slate-100 rounded px-2 py-1.5 outline-none focus:bg-white focus:border-teal-500 transition-all"
                      placeholder="#해시태그 #예시"
                      id={`ann-tag-input-${index}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Checklist */}
        {activeTab === "checklist" && (
          <div className="space-y-4 animate-fade-in" id="panel-checklist">
            <div>
              <h3 className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1">
                <ListTodo className="w-4 h-4 text-emerald-500" />
                <span>예배 전 사랑 가득 품기 체크리스트</span>
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                예배에 몰입하기 전, 3가지 은혜로운 약속들을 가볍고 스무스하게 적어봐요.
              </p>
            </div>

            <div className="space-y-4">
              {data.checklists.map((chk, index) => (
                <div key={chk.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2" id={`checklist-edit-card-${index}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">#0{index + 1} 단골 약속</span>
                    <input
                      type="text"
                      value={chk.emoji}
                      onChange={(e) => handleChecklistChange(chk.id, "emoji", e.target.value)}
                      className="w-9 text-center text-xs bg-white border border-slate-200 rounded p-1 outline-none font-bold"
                      placeholder="😊"
                      title="대표 이모지"
                      id={`chk-emoji-input-${index}`}
                    />
                    <input
                      type="text"
                      value={chk.text}
                      onChange={(e) => handleChecklistChange(chk.id, "text", e.target.value)}
                      className="flex-1 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded p-1 px-2 outline-none focus:border-teal-500"
                      placeholder="체크 제목"
                      id={`chk-title-input-${index}`}
                    />
                  </div>
                  <div>
                    <textarea
                      value={chk.subtext}
                      onChange={(e) => handleChecklistChange(chk.id, "subtext", e.target.value)}
                      rows={2}
                      className="w-full text-[11px] text-slate-500 bg-white border border-slate-200 rounded p-1.5 px-2 outline-none focus:border-teal-500 resize-none leading-relaxed"
                      placeholder="설명 문안"
                      id={`chk-subtext-textarea-${index}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Share & Export */}
        {activeTab === "share" && (
          <div className="space-y-5 animate-fade-in" id="panel-share">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <h3 className="font-semibold text-sm text-emerald-900 flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                토요일 저녁 주보 발송 준비 끝!
              </h3>
              <p className="text-xs text-emerald-700 leading-relaxed">
                정성스레 편집하신 감성 충만 텍스트를 버튼 한 번으로 클립보드에 담아 카카오톡 단체방이나 문자 메시지, 인스타 DM에 바로 보내세요!
              </p>
            </div>

            <div className="space-y-3">
              {/* Kakao copy block */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white relative flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    1. 카카오톡 단체방 전송용 텍스트
                  </span>
                  <button
                    onClick={() => executeCopy("kakao")}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                      copiedText === "kakao"
                        ? "bg-teal-600 text-white"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    }`}
                    id="copy-kakao-btn"
                  >
                    {copiedText === "kakao" ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>전체 복사 (추천)</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  이모지와 디바이더(줄바꿈)가 적절하게 믹싱되어 카카오톡에서 완벽한 가독성으로 표시됩니다.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 font-mono overflow-y-auto max-h-[150px] border border-slate-100 whitespace-pre-line">
                  {generateKakaoText()}
                </div>
              </div>

              {/* Clean Canva copy block */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white relative flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    2. Canva / 미리캔버스 전용 텍스트
                  </span>
                  <button
                    onClick={() => executeCopy("clean")}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                      copiedText === "clean"
                        ? "bg-teal-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                    id="copy-clean-btn"
                  >
                    {copiedText === "clean" ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>깔끔한 텍스트 복사</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  불필요하게 뭉친 카톡용 장식선을 빼고, 디자인 마크업 복사용 원본 텍스트만 깔끔하게 저장합니다.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 font-mono overflow-y-auto max-h-[150px] border border-slate-100 whitespace-pre-wrap">
                  {generateCleanTextForCanva()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>작성된 주보는 브라우저의 상태 세션에 임시 저장되며, 별도의 DB 없이 즉시 적용됩니다.</span>
            </div>
          </div>
        )}

      </div>

      {/* Editor Footer / Help Text */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
        <span className="text-[10px] text-slate-400">
          교회 청약의 동반자 🤍 감성 청주 발송기 v1.0
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          <span className="text-[10px] text-slate-500 font-semibold">실시간 라이브 연동</span>
        </div>
      </div>
    </div>
  );
}
