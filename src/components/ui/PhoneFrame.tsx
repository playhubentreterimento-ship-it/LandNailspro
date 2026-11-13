import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  currentTime?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  dark = false,
  className = '',
  currentTime = '09:41',
}) => {
  return (
    <div
      className={`relative mx-auto rounded-[48px] p-3 shadow-2xl transition-all duration-500 ${
        dark
          ? 'bg-gradient-to-b from-[#381B2D] via-[#240C1A] to-[#170510] border-[4px] border-[#4A263C] shadow-magenta-glow/30'
          : 'bg-gradient-to-b from-[#F3DFE5] via-[#E4BAC7] to-[#D598AB] border-[4px] border-[#F8E9EE] shadow-rose-hover'
      } ${className}`}
      style={{
        maxWidth: '320px',
        width: '100%',
      }}
    >
      {/* Botões laterais simulados no chassi */}
      <div className="absolute -left-[7px] top-24 w-[3px] h-8 bg-[#C294A7] rounded-l-sm" />
      <div className="absolute -left-[7px] top-36 w-[3px] h-12 bg-[#C294A7] rounded-l-sm" />
      <div className="absolute -left-[7px] top-52 w-[3px] h-12 bg-[#C294A7] rounded-l-sm" />
      <div className="absolute -right-[7px] top-32 w-[3px] h-16 bg-[#C294A7] rounded-r-sm" />

      {/* Vidro e Tela interna */}
      <div
        className={`relative w-full rounded-[38px] overflow-hidden flex flex-col ${
          dark ? 'bg-[#1F0917] text-white' : 'bg-[#FCF9F7] text-plum'
        }`}
        style={{
          minHeight: '620px',
        }}
      >
        {/* Dynamic Island & Barra de Status do iPhone */}
        <div className="relative pt-3 px-6 pb-2 flex items-center justify-between text-xs select-none z-30">
          <span className="font-semibold tracking-tight text-[11px] opacity-80">{currentTime}</span>

          {/* Dynamic Island */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 h-6 w-24 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#101010]" />
          </div>

          <div className="flex items-center gap-1.5 opacity-80 text-[10px]">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Conteúdo da tela */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {children}
        </div>

        {/* Barra inferior de navegação do iPhone */}
        <div className="h-6 flex items-center justify-center pb-1">
          <div className="w-32 h-1 bg-current opacity-25 rounded-full" />
        </div>
      </div>
    </div>
  );
};
