import React from 'react';
import {
  Handshake,
  ShieldCheck,
  BarChart3,
  Users,
  Phone
} from 'lucide-react';
import { EasyCashLogo } from './EasyCashLogo';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

interface CardAnimatedBorderProps {
  delay: string;
  gradientId: string;
}

const CardAnimatedBorder: React.FC<CardAnimatedBorderProps> = ({ delay, gradientId }) => {
  const containerRef = React.useRef<SVGSVGElement | null>(null);
  const [dims, setDims] = React.useState<{ width: number; height: number }>({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) {
        setDims({ width: w, height: h });
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10 overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3cb334" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#044e29" />
        </linearGradient>
      </defs>
      <rect
        x={1}
        y={1}
        width={dims.width > 0 ? Math.max(0, dims.width - 2) : 'calc(100% - 2px)'}
        height={dims.height > 0 ? Math.max(0, dims.height - 2) : 'calc(100% - 2px)'}
        rx={15}
        ry={15}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
        strokeLinecap="round"
        pathLength={100}
        className="card-border-travel-line transition-all duration-300 group-hover:stroke-[2.5px] group-hover:drop-shadow-[0_0_3px_rgba(60,179,52,0.45)]"
        style={{
          animationDelay: delay,
        }}
      />
    </svg>
  );
};

interface AboutSectionProps {
  onEnquireClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onEnquireClick }) => {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-14 sm:py-20 bg-white overflow-hidden border-t border-emerald-100">
      {/* Soft botanical corner leaves framing the section matching the reference */}
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
      <div className="absolute bottom-0 right-0 w-48 sm:w-64 h-48 sm:h-64 translate-x-12 translate-y-12 pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#3cb334]">
          <path d="M0 40 C80 20 140 80 200 200 C120 180 60 120 0 40 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            TOP CENTERED HEADER: ABOUT US - YOUR TRUSTED FINANCIAL PARTNER
           ======================================================== */}
        {/* ========================================================
            TOP CENTERED HEADER: ABOUT US - YOUR TRUSTED FINANCIAL PARTNER
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Eyebrow */}
          <ScrollReveal delay={0}>
            <div className="inline-flex flex-col items-center">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#3cb334]">
                {t('about.eyebrow')}
              </span>
              <div className="w-12 h-1 bg-[#3cb334] rounded-full mt-1.5" />
            </div>
          </ScrollReveal>

          {/* Main Heading (Centered) */}
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e2b1f] tracking-tight mt-2.5 leading-[1.15]">
              {t('about.title1')}
              <br />
              {t('about.title2')}
            </h2>
          </ScrollReveal>

          {/* Description Paragraph (Centered) */}
          <ScrollReveal delay={200}>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-2xl mx-auto">
              {t('about.desc')}
            </p>
          </ScrollReveal>
        </div>

        {/* Corporate Reception Office Visual Card */}
        <ScrollReveal delay={150} className="mb-10 sm:mb-14">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#f4fbf6] via-white to-[#e8f5ea] border border-slate-200/80 shadow-md p-4 sm:p-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

            {/* Office Wall with 3D EasyCash Branding & Signature Script */}
            <div className="relative z-10 py-1 sm:py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Brand Logo Wall Display */}
                <div className="overflow-hidden">
                  <EasyCashLogo size="md" className="sm:hidden" />
                  <EasyCashLogo size="lg" className="hidden sm:flex" />
                </div>

                {/* Handwritten Script Signature "People Plans Progress" */}
                <div className="text-left sm:text-right select-none pr-1">
                  <div className="font-serif italic text-base sm:text-lg font-semibold text-slate-700 tracking-wide leading-tight">
                    {t('about.signature1')}
                  </div>
                  <div className="font-serif italic text-base sm:text-lg font-semibold text-slate-700 tracking-wide leading-tight">
                    {t('about.signature2')}
                  </div>
                  <div className="font-serif italic text-base sm:text-lg font-semibold text-slate-700 tracking-wide leading-tight">
                    {t('about.signature3')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Pillars / Features Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {/* Pillar 1: Trusted Guidance */}
          <ScrollReveal delay={0} className="h-full">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden group h-full">
              <CardAnimatedBorder delay="0s" gradientId="card-border-grad-1" />
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#044e29] mb-3">
                  <Handshake className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#0e2b1f] mb-1">
                  {t('about.p1Title')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {t('about.p1Desc')}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 2: Secure Process */}
          <ScrollReveal delay={100} className="h-full">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden group h-full">
              <CardAnimatedBorder delay="-0.9s" gradientId="card-border-grad-2" />
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#044e29] mb-3">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#0e2b1f] mb-1">
                  {t('about.p2Title')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {t('about.p2Desc')}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 3: Multiple Loan Options */}
          <ScrollReveal delay={200} className="h-full">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden group h-full">
              <CardAnimatedBorder delay="-1.8s" gradientId="card-border-grad-3" />
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#044e29] mb-3">
                  <BarChart3 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#0e2b1f] mb-1">
                  {t('about.p3Title')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {t('about.p3Desc')}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 4: Customer Focused */}
          <ScrollReveal delay={300} className="h-full">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden group h-full">
              <CardAnimatedBorder delay="-2.7s" gradientId="card-border-grad-4" />
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#044e29] mb-3">
                  <Users className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#0e2b1f] mb-1">
                  {t('about.p4Title')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {t('about.p4Desc')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Regulatory / Disclaimer & CTA Banner */}
        <ScrollReveal delay={150}>
          <div className="bg-[#f0fdf4] rounded-2xl border border-emerald-200/80 p-4 sm:p-5 shadow-xs w-full overflow-hidden">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Left: Info icon & Terms Notice */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#044e29] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 mt-0.5 sm:mt-0">
                    i
                  </div>
                  <span className="font-bold text-sm sm:text-base text-[#0e2b1f] leading-snug">
                    {t('about.termsTitle')}
                  </span>
                </div>

                {/* Vertical divider */}
                <div className="hidden sm:block w-px h-8 bg-emerald-300/80 shrink-0" />

                {/* Disclaimer text */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal min-w-0">
                  {t('about.termsDesc')}
                </p>
              </div>

              {/* Right: Enquire Now Button */}
              <div className="w-full sm:w-auto shrink-0 pt-1 lg:pt-0">
                <button
                  type="button"
                  onClick={onEnquireClick}
                  className="btn-primary-action btn-interactive group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base tracking-normal cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <Phone className="w-4 h-4 fill-white btn-icon-shift shrink-0" />
                  <span>{t('about.enquireNow')}</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
