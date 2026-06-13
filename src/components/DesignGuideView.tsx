import React, { useState } from "react";
import { DesignTheme } from "../types";
import { Copy, Check, Palette, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface DesignGuideProps {
  activeTheme: DesignTheme;
}

export default function DesignGuideView({ activeTheme }: DesignGuideProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-y-auto max-h-[85vh] flex flex-col gap-6" id="design-guide-container">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-teal-600 font-medium text-sm mb-1">
          <Sparkles className="w-4 h-4" />
          <span>밀레니얼 & Z세대 맞춤형 가이드</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Palette className="w-5 h-5 text-slate-600" />
          미리캔버스 & Canva 제작 가이드
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          해당 텍스트를 인스타 스토리 및 모바일 주보 카드뉴스로 제작할 때 유용한 전문가 팁입니다.
        </p>
      </div>

      {/* Recommended Theme Concept */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <h3 className="font-semibold text-sm text-slate-700 flex items-center gap-1.5 mb-2">
          <span>🎨</span> 현재 컨셉: <strong className="text-slate-900">{activeTheme.name}</strong>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {activeTheme.concept}
        </p>
        <div className="mt-3 text-[10px] text-slate-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>각 색깔 원을 클릭하면 HEX 색상 코드가 클립보드에 복사됩니다!</span>
        </div>
      </div>

      {/* Color Palette Choice */}
      <div>
        <h3 className="font-bold text-xs text-slate-500 tracking-wider uppercase mb-3">
          추천 전용 컬러 팔레트 (HEX Codes)
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {activeTheme.colors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleCopyColor(color.hex)}
              className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-left relative focus:outline-none focus:ring-2 focus:ring-teal-500"
              title={`${color.hex} 복사하기`}
              id={`color-swatch-${index}`}
            >
              <div className={`w-8 h-8 rounded-full ${color.tailwind} border border-black/5 shadow-inner flex items-center justify-center shrink-0`}>
                {copiedColor === color.hex && (
                  <Check className="w-4 h-4 text-white drop-shadow-md" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold text-slate-800 truncate">{color.name}</div>
                <div className="font-mono text-[10px] text-slate-400 truncate flex items-center gap-1">
                  <span>{color.hex}</span>
                  <Copy className="w-2.5 h-2.5 shrink-0 opacity-50 group-hover:opacity-100" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font pairing guidelines */}
      <div>
        <h3 className="font-bold text-xs text-slate-500 tracking-wider uppercase mb-3">
          추천 폰트 페어링 (Font Pairing)
        </h3>
        <div className="flex flex-col gap-3">
          {activeTheme.recommendedFonts.map((font, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full inline-block mb-1">
                {font.target}
              </span>
              <h4 className="font-bold text-xs text-slate-800 mb-0.5">
                {font.name}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {font.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Tip */}
      <div>
        <h3 className="font-bold text-xs text-slate-500 tracking-wider uppercase mb-3">
          감각적인 Z세대 디자인 꿀팁 3가지
        </h3>
        <ul className="flex flex-col gap-3 text-xs text-slate-600">
          <li className="flex gap-2.5">
            <span className="text-teal-600 font-bold shrink-0">01</span>
            <div>
              <strong className="text-slate-800 block">여백(White Space)을 사랑하세요</strong>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                글씨가 꽉 차 있으면 '올드'해 보입니다. 요소와 경계선 사이에 스마트폰 두 손가락 두께 정도의 화면 여백을 과감히 보장해 주세요.
              </p>
            </div>
          </li>
          <li className="flex gap-2.5">
            <span className="text-teal-600 font-bold shrink-0">02</span>
            <div>
              <strong className="text-slate-800 block">인스타용 레이아웃 분할</strong>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                이 텍스트 전체를 한 슬라이드에 다 넣기보다는, <strong>1장: 인트로 & 찬양 목록, 2장: 예배 순서 및 말씀, 3장: 인스타 소식 & 체크리스트</strong> 형식으로 3장 분할 카드뉴스로 올리면 인스타 피드 노출 최적이 됩니다.
              </p>
            </div>
          </li>
          <li className="flex gap-2.5">
            <span className="text-teal-600 font-bold shrink-0">03</span>
            <div>
              <strong className="text-slate-800 block">텍스트 복사 및 활용</strong>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                왼쪽 전송 상자 하단의 버튼을 사용해 정갈하게 변환된 KakaoTalk용 일괄 메시지를 받아 바로 발송해 청년들의 참여율을 높이세요!
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Real-time preview note */}
      <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5 flex gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-[11px] text-amber-800 leading-relaxed">
          <span className="font-bold">실시간 테마 미리보기 연동:</span> 웹의 중앙 모바일 미리보기 테마를 전환하면, 이 가이드 북의 컬러 및 폰트 페어링 제안 명단도 자동 매칭되어 즉시 활용 가능한 코드가 표시됩니다!
        </div>
      </div>
    </div>
  );
}
