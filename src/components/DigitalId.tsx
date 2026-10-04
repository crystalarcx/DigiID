import React, { useState, useEffect } from 'react';
import { IdCardData } from '../types';
import { format } from 'date-fns';
import Barcode from 'react-barcode';
import { Pencil, ShieldCheck, Camera } from 'lucide-react';
import { CHIMEI_LOGO_DATA_URL } from '../assets/chimeiLogo';
import { DOCTOR_PHOTO_DATA_URL } from '../assets/doctorPhoto';
import { resizeImage } from '../lib/utils';

interface DigitalIdProps {
  data: IdCardData;
  onEdit: () => void;
  onPhotoUpload?: (photoDataUrl: string) => void;
}

export default function DigitalId({ data, onEdit, onPhotoUpload }: DigitalIdProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [watermarkMode, setWatermarkMode] = useState<'normal' | 'prominent' | 'off'>('normal');

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onPhotoUpload) {
      try {
        const dataUrl = await resizeImage(e.target.files[0], 800, 800);
        onPhotoUpload(dataUrl);
      } catch (err) {
        console.error('Failed to resize photo', err);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden overscroll-none select-none">
      
      {/* The Card - Vertical full screen layout */}
      <div 
        onDoubleClick={onEdit}
        className="relative w-full h-[100dvh] sm:h-[90dvh] sm:max-w-md sm:rounded-[2rem] bg-white overflow-hidden shadow-2xl text-black font-sans cursor-pointer group flex flex-col justify-between"
      >
        {/* Animated Shimmer (security feature) */}
        <div className="absolute inset-0 z-40 pointer-events-none opacity-30">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full animate-shimmer" />
        </div>

        {/* Dynamic Anti-Spoofing Background Watermark Layer */}
        {watermarkMode !== 'off' && (
          <div 
            className="absolute inset-0 z-35 pointer-events-none overflow-hidden select-none transition-opacity duration-300"
            style={{
              opacity: watermarkMode === 'prominent' ? 0.22 : 0.09,
            }}
          >
            <div 
              className="absolute -inset-[80%] flex flex-col justify-around rotate-[-25deg] pointer-events-none"
              style={{ animation: 'watermarkDrift 20s linear infinite' }}
            >
              {Array.from({ length: 36 }).map((_, i) => (
                <div 
                  key={i} 
                  className="whitespace-nowrap font-mono text-[11px] font-medium tracking-[0.2em] text-slate-800 flex gap-12 select-none"
                  style={{ transform: `translateX(${i % 2 === 0 ? '-30px' : '-110px'})` }}
                >
                  {Array.from({ length: 6 }).map((_, j) => (
                    <span key={j} className="flex items-center gap-2.5">
                      <span className="font-sans font-semibold tracking-wider">{data.companyName || '奇美醫院'}</span>
                      <span className="text-slate-400 font-sans">·</span>
                      <span className="font-sans font-semibold">{data.employeeName || '員工'}</span>
                      <span className="text-slate-400 font-sans">·</span>
                      <span className="font-mono tracking-widest">{data.idNumber || 'NO ID'}</span>
                      <span className="text-slate-400 font-sans">·</span>
                      <span className="font-mono">{format(currentTime, 'yyyy.MM.dd HH:mm:ss')}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Background Grid */}
        <div 
          className="absolute inset-0 opacity-[0.12] z-0" 
          style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* Top Left Wave */}
        <svg className="absolute top-0 left-0 w-full h-[28%] z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,30 C60,40 30,10 0,30 Z" fill={data.themeColor} />
          <path d="M0,0 L100,0 L100,15 C50,25 20,5 0,10 Z" fill="rgba(255,255,255,0.3)" />
        </svg>

        {/* Bottom Right Wave */}
        <svg className="absolute bottom-[20%] right-0 w-[80%] h-[20%] z-0 opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M100,100 L0,100 C30,70 50,30 100,0 Z" fill={data.themeColor} />
        </svg>

        {/* Top Right Logo (if uploaded) */}
        {data.logoDataUrl && (
          <div className="absolute top-14 right-6 w-14 h-14 flex items-center justify-center z-20">
            <img src={data.logoDataUrl} className="w-full h-full object-contain drop-shadow-md" alt="Logo" />
          </div>
        )}

        {/* Main Content Area: Department, Title, Photo, and Name */}
        <div className="relative z-10 flex-1 flex flex-col justify-between pt-[max(4.25rem,calc(env(safe-area-inset-top)+3.25rem))] px-7 pb-4 min-h-0">
          
          <div className="flex justify-between items-start gap-4">
            {/* Left Column: Dept & Title */}
            <div className="flex flex-col gap-5 pt-2 flex-1 min-w-0">
              {/* Department */}
              <div>
                <div 
                  className="inline-block text-white px-3 py-1 rounded-full text-[0.7rem] font-bold mb-1 shadow-sm tracking-widest" 
                  style={{ backgroundColor: data.themeColor }}
                >
                  單位
                </div>
                <div className="text-[1.3rem] font-black tracking-widest text-gray-900 leading-tight">
                  {data.department || '無單位'}
                </div>
                <div className="text-[0.65rem] font-serif text-gray-700 leading-tight mt-1">
                  {data.departmentEn || 'No Department'}
                </div>
              </div>

              {/* Title */}
              <div>
                <div 
                  className="inline-block text-white px-3 py-1 rounded-full text-[0.7rem] font-bold mb-1 shadow-sm tracking-widest" 
                  style={{ backgroundColor: data.themeColor }}
                >
                  職稱
                </div>
                <div className="text-[1.3rem] font-black tracking-widest text-gray-900 leading-tight">
                  {data.jobTitle || '無職稱'}
                </div>
                <div className="text-[0.65rem] font-serif text-gray-700 leading-tight mt-1">
                  {data.jobTitleEn || 'No Title'}
                </div>
              </div>
            </div>

            {/* Right Column: Photo (Directly applied official photo, click to change) */}
            <div className="relative group/photo w-[120px] aspect-[3/4] bg-gray-100 shadow-xl border-[3px] border-white z-20 shrink-0 overflow-hidden rounded-md cursor-pointer transition-transform hover:scale-[1.02]">
              <img 
                src={data.photoDataUrl || DOCTOR_PHOTO_DATA_URL} 
                className="w-full h-full object-cover select-none" 
                alt={data.employeeName || 'Profile'} 
              />

              {/* Upload / Replace Overlay on Hover or Touch */}
              <label 
                className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/45 hover:bg-black/45 transition-colors flex flex-col items-center justify-center text-white opacity-0 group-hover/photo:opacity-100 cursor-pointer"
                title="點擊更換照片"
              >
                <Camera className="w-6 h-6 drop-shadow text-white mb-0.5" />
                <span className="text-[10px] font-bold tracking-wider drop-shadow text-white">更換照片</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePhotoFileChange} 
                />
              </label>
            </div>
          </div>

          {/* Name Area */}
          <div className="mt-auto pt-4 relative z-20">
            <div className="text-[2.85rem] font-black tracking-widest font-serif leading-none text-gray-900 drop-shadow-sm mb-2">
              {data.employeeName || '姓名'}
            </div>
            <div className="flex items-center">
              <div className="text-lg font-serif uppercase tracking-widest text-gray-800 shrink-0">
                {data.employeeNameEn || 'NAME'}
              </div>
              <div className="ml-4 h-[3px] flex-1 min-w-[2rem]" style={{ backgroundColor: data.themeColor }} />
            </div>
          </div>
        </div>

        {/* Footer Area: Dedicated Barcode & Hospital Branding (Zero-Overlap Stacked Layout) */}
        <div className="relative z-30 w-full bg-gradient-to-b from-[#f9fafb] to-[#f1f3f5] border-t border-gray-200 px-6 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex flex-col gap-2 shrink-0">
          
          {/* Row 1: Official Chi Mei Hospital Logo & Brandmark (Emblem + Calligraphy "奇美醫院") */}
          <div className="w-full flex items-center justify-between pb-2 border-b border-gray-200 min-w-0">
            <div className="flex items-center min-w-0 flex-1 mr-2 py-0.5">
              <img 
                src={data.logoDataUrl || CHIMEI_LOGO_DATA_URL} 
                alt="奇美醫院" 
                className="h-9 sm:h-10 w-auto max-w-[240px] sm:max-w-[260px] object-contain drop-shadow-sm select-none" 
              />
            </div>

            {/* Official Badge Tag */}
            <div 
              className="text-[0.7rem] font-bold tracking-widest px-2.5 py-1 rounded text-white shadow-sm shrink-0"
              style={{ backgroundColor: data.themeColor || '#ff8c00' }}
            >
              員工識別證
            </div>
          </div>

          {/* Row 2: Barcode & Employee Number (Full width, centered, completely separated) */}
          <div className="w-full flex flex-col items-center justify-center pt-0.5">
            <div className="w-full max-w-[320px] flex justify-center items-center overflow-hidden [&>svg]:max-w-full [&>svg]:w-auto [&>svg]:h-[42px]">
              <Barcode 
                value={data.idNumber || '00000'} 
                width={1.65} 
                height={40} 
                displayValue={false} 
                margin={0} 
                background="transparent" 
              />
            </div>
            <div className="text-[0.82rem] font-mono font-bold tracking-[0.22em] text-gray-800 mt-1">
              {data.idNumber || 'NO ID'}
            </div>
          </div>

        </div>
      </div>

      {/* Top Bar - "Live" indicator, Watermark toggle & Time (Pinned to screen top with safe-area spacing) */}
      <div className="absolute top-0 left-0 right-0 pt-[max(0.75rem,env(safe-area-inset-top))] px-4 sm:px-6 pb-2 flex justify-between items-center text-white z-50 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-full border border-white/15 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider">ACTIVE</span>
          </div>

          {/* Watermark mode switch button */}
          <button
            onClick={() => setWatermarkMode(prev => prev === 'normal' ? 'prominent' : prev === 'prominent' ? 'off' : 'normal')}
            className="flex items-center gap-1.5 bg-black/50 hover:bg-black/70 active:scale-95 transition-all backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-full border border-white/15 text-white/90 shadow-lg cursor-pointer"
            title={`動態浮水印：${watermarkMode === 'normal' ? '標準防偽' : watermarkMode === 'prominent' ? '強對比模式' : '已關閉'} (點擊切換)`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${watermarkMode === 'off' ? 'text-gray-400' : watermarkMode === 'prominent' ? 'text-amber-400' : 'text-cyan-400'}`} />
            <span className="text-[11px] sm:text-xs font-medium tracking-wide">
              {watermarkMode === 'normal' ? '防偽浮水印' : watermarkMode === 'prominent' ? '浮水印:強' : '浮水印:關'}
            </span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-xs sm:text-sm font-semibold tracking-widest font-mono drop-shadow-md bg-black/50 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-full border border-white/15">
            {format(currentTime, 'HH:mm:ss')}
          </div>
          <button 
            onClick={onEdit} 
            className="p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full border border-white/15 text-white/90 hover:text-white transition-colors cursor-pointer shadow-lg active:scale-95" 
            title="編輯識別證資訊"
            aria-label="編輯識別證資訊"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
