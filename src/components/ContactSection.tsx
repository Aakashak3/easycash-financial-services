import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Mail
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { EasyCashLogo } from './EasyCashLogo';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

const CONTACT_VIDEO_SRC = '/contact%20page/clean_Woman_speaking_corporate_welcome%E2%80%A6_20261025202433.mp4';

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Video control handlers
  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch((err) => {
        console.warn('Playback error:', err);
      });
    } else {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = clickRatio * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    const container = videoContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <section id="contact" className="relative py-14 sm:py-20 bg-[#f8faf8] overflow-hidden border-t border-emerald-100">
      {/* Background soft botanical corner leaf flourishes matching reference */}
      <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 -translate-x-12 -translate-y-12 pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#3cb334]">
          <path d="M40 0 C120 20 180 80 200 160 C120 140 40 80 0 0 Z" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 translate-x-12 -translate-y-12 pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#3cb334]">
          <path d="M0 40 C80 20 140 80 200 200 C120 180 60 120 0 40 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <ScrollReveal delay={0}>
            <div className="inline-flex flex-col items-center">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#3cb334]">
                {t('contact.eyebrow')}
              </span>
              <div className="w-12 h-1 bg-[#3cb334] rounded-full mt-1.5" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e2b1f] tracking-tight mt-2.5">
              {t('contact.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t('contact.desc')}
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column Main Layout: Left Video Player + Right Financial Consultant Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ========================================================
              LEFT COLUMN: Video Player Card
             ======================================================== */}
          <ScrollReveal delay={100} className="lg:col-span-7 flex flex-col h-full">
            <div
              ref={videoContainerRef}
              className="relative flex-1 bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md flex flex-col justify-between group h-full"
            >
              {/* Video Viewport */}
              <div className="relative flex-1 min-h-[280px] sm:min-h-[380px] bg-black flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  src={CONTACT_VIDEO_SRC}
                  className="w-full h-full object-cover cursor-pointer"
                  playsInline
                  preload="metadata"
                  muted={isMuted}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleVideoEnded}
                  onClick={toggleVideo}
                />

                {/* Subtle Top-Left Logo Watermark */}
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-xs pointer-events-none transition-opacity duration-300">
                  <EasyCashLogo size="sm" />
                </div>

                {/* Floating Badge (Top Right) */}
                <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-300 pointer-events-none flex items-center gap-1.5 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{lang === 'ta' ? 'அறிமுகம்' : 'Welcome'}</span>
                </div>

                {/* Center Play / Pause Button Overlay */}
                <button
                  type="button"
                  onClick={toggleVideo}
                  className={`btn-interactive absolute inset-0 m-auto w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-black/60 hover:bg-[#044e29]/90 text-white flex items-center justify-center shadow-xl border-2 border-white/70 hover:border-emerald-300 z-20 focus:outline-none focus:ring-4 focus:ring-emerald-400 cursor-pointer transition-all duration-300 ${
                    isVideoPlaying ? 'opacity-0 group-hover:opacity-90 scale-95 group-hover:scale-100' : 'opacity-100 scale-100'
                  }`}
                  aria-label={isVideoPlaying ? t('contact.videoPause') : t('contact.videoPlay')}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-6 h-6 sm:w-9 sm:h-9 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Video Player Bottom Controls Bar */}
              <div className="bg-[#0b1f14] px-3 sm:px-4 py-2.5 sm:py-3 text-white flex items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm border-t border-emerald-950 select-none z-20">
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={toggleVideo}
                    className="hover:text-emerald-400 transition-colors p-1 cursor-pointer focus:outline-none"
                    aria-label={isVideoPlaying ? t('contact.videoPause') : t('contact.videoPlay')}
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current" />
                    )}
                  </button>

                  <span className="font-mono text-[11px] sm:text-xs text-slate-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Timeline Progress Bar (Seekable) */}
                <div
                  className="flex-1 mx-2 sm:mx-4 relative flex items-center cursor-pointer py-2 group/bar"
                  onClick={handleProgressClick}
                  title="Seek"
                >
                  <div className="w-full h-1.5 group-hover/bar:h-2 bg-slate-700/80 rounded-full overflow-hidden transition-all">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-75"
                      style={{
                        width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`
                      }}
                    />
                  </div>
                </div>

                {/* Right: Sound & Display */}
                <div className="flex items-center gap-2.5 sm:gap-3 text-slate-300">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="hover:text-white transition-colors p-1 cursor-pointer focus:outline-none"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="hover:text-white transition-colors p-1 cursor-pointer focus:outline-none"
                    aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ========================================================
              RIGHT COLUMN: Financial Consultant Profile Card
             ======================================================== */}
          <ScrollReveal delay={200} className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex-1 flex flex-col justify-between space-y-6 h-full">
              {/* Header: Avatar + Manager Title & Name */}
              <div className="flex items-center gap-4 sm:gap-5 pb-5 border-b border-slate-100">
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0 shadow-2xs">
                  <svg viewBox="0 0 100 100" className="w-12 h-12 text-[#044e29] fill-current">
                    <circle cx="50" cy="34" r="16" />
                    <path d="M50 56 C34 56 22 68 22 84 L78 84 C78 68 66 56 50 56 Z" />
                  </svg>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white p-0.5 shadow-xs flex items-center justify-center overflow-hidden border border-emerald-100">
                    <img
                      src="/assets/easycash-logo.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2ea347]">
                    {t('contact.consultantTitle')}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0e2b1f] tracking-tight mt-0.5">
                    {lang === 'ta' ? siteConfig.managerNameTa : siteConfig.managerName}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                    {lang === 'ta' ? siteConfig.managerTitleTa : siteConfig.managerTitle}
                  </div>
                  <div className="w-12 h-1 bg-[#3cb334] rounded-full mt-2" />
                </div>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4 py-1">
                {/* 1. Phone */}
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0">
                    <Phone className="w-5 h-5 fill-[#044e29]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      {t('contact.phoneLabel')}
                    </span>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="font-bold text-base sm:text-lg text-slate-900 hover:text-emerald-700 transition-colors"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* 2. WhatsApp */}
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageSquare className="w-5 h-5 fill-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      {t('contact.whatsappLabel')}
                    </span>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-base sm:text-lg text-slate-900 hover:text-emerald-700 transition-colors"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* 3. Email */}
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0">
                    <Mail className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      {t('contact.emailLabel')}
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors break-all"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* 4. Complete Office Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      {t('contact.locationLabel')}
                    </span>
                    <div className="font-semibold text-xs sm:text-sm text-slate-800 leading-relaxed mt-0.5">
                      {lang === 'ta' ? siteConfig.addressTa : siteConfig.address}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons: Call Now, WhatsApp & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="btn-call btn-interactive group inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm tracking-normal focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer text-center"
                  aria-label={`Call EasyCash at ${siteConfig.phoneDisplay}`}
                >
                  <Phone className="w-4 h-4 fill-current btn-icon-shift shrink-0" />
                  <span>{t('contact.callNow')}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    siteConfig.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp btn-interactive group inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm tracking-normal focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer text-center"
                  aria-label="Chat with EasyCash on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 fill-[#25D366] text-[#25D366] btn-icon-shift shrink-0" />
                  <span>{t('contact.whatsapp')}</span>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn-secondary-action btn-interactive group inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm tracking-normal focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer text-center"
                  aria-label={`Email EasyCash at ${siteConfig.email}`}
                >
                  <Mail className="w-4 h-4 text-[#044e29] btn-icon-shift shrink-0" />
                  <span>{t('contact.emailNow')}</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
