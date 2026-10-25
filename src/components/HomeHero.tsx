import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Users, Wallet } from 'lucide-react';
import { siteConfig, ServiceSlideItem } from '../config/siteConfig';
import { HomeServiceSlider } from './HomeServiceSlider';
import { VideoBackground } from './VideoBackground';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

interface HomeHeroProps {
  onSelectService?: (service: ServiceSlideItem) => void;
  onEnquireClick?: () => void;
}

interface AnimatedHeroHeadingProps {
  heading1: string;
  heading2: string;
  lang: 'en' | 'ta';
  className?: string;
}

/**
 * Splits text into true grapheme clusters (crucial for Tamil script so combining
 * vowels/virama like கு, ல், ணா remain whole and never broken into loose marks).
 */
function splitGraphemes(text: string, lang: 'en' | 'ta'): string[] {
  try {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const segmenter = new Intl.Segmenter(lang === 'ta' ? 'ta' : 'en', { granularity: 'grapheme' });
      const clusters: string[] = [];
      for (const seg of segmenter.segment(text)) {
        clusters.push(seg.segment);
      }
      return clusters;
    }
  } catch {
    // fallback
  }
  return Array.from(text);
}

const AnimatedHeroHeading: React.FC<AnimatedHeroHeadingProps> = ({
  heading1,
  heading2,
  lang,
  className = ''
}) => {
  const words1 = heading1.trim().split(/\s+/).filter(Boolean);
  const words2 = heading2.trim().split(/\s+/).filter(Boolean);
  const totalWords = words1.length + words2.length;

  // Stagger parameters calibrated for ~2.2 - 2.5s total duration
  const wordDelay = totalWords > 1 ? Math.min(0.32, 1.6 / (totalWords - 1)) : 0.25;
  const letterDelay = 0.028;

  let currentWordIdx = 0;

  const line1Data = words1.map((w) => {
    const wordIdx = currentWordIdx++;
    const graphemes = splitGraphemes(w, lang);
    return {
      word: w,
      graphemes: graphemes.map((char, charIdx) => ({
        char,
        delay: (wordIdx * wordDelay + charIdx * letterDelay).toFixed(3)
      }))
    };
  });

  const line2Data = words2.map((w) => {
    const wordIdx = currentWordIdx++;
    const graphemes = splitGraphemes(w, lang);
    return {
      word: w,
      graphemes: graphemes.map((char, charIdx) => ({
        char,
        delay: (wordIdx * wordDelay + charIdx * letterDelay).toFixed(3)
      }))
    };
  });

  const fullText = `${heading1} ${heading2}`;

  return (
    <h1
      key={lang}
      aria-label={fullText}
      className={className}
    >
      <span aria-hidden="true" className="block">
        {/* Line 1 (Dark forest green #0e2b1f) */}
        <span className="inline-block">
          {line1Data.map((item, wIdx) => (
            <span
              key={`w1-${wIdx}`}
              className="inline-block whitespace-nowrap mr-[0.28em]"
            >
              {item.graphemes.map((g, gIdx) => (
                <span
                  key={`c1-${wIdx}-${gIdx}`}
                  className="hero-reveal-letter"
                  style={{ animationDelay: `${g.delay}s` }}
                >
                  {g.char}
                </span>
              ))}
            </span>
          ))}
        </span>

        <br />

        {/* Line 2 (Vibrant EasyCash green #3cb334) */}
        <span className="inline-block text-[#3cb334]">
          {line2Data.map((item, wIdx) => (
            <span
              key={`w2-${wIdx}`}
              className="inline-block whitespace-nowrap mr-[0.28em]"
            >
              {item.graphemes.map((g, gIdx) => (
                <span
                  key={`c2-${wIdx}-${gIdx}`}
                  className="hero-reveal-letter"
                  style={{ animationDelay: `${g.delay}s` }}
                >
                  {g.char}
                </span>
              ))}
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
};

export const HomeHero: React.FC<HomeHeroProps> = ({ onSelectService }) => {
  const { lang, t } = useLanguage();

  return (
    <section id="home" className="relative w-full bg-[#fbfdfb] overflow-hidden pt-6 sm:pt-10 pb-6 sm:pb-12">
      {/* Background Video Layer with Floating Leaves & Sunlight Ambience */}
      <VideoBackground />

      {/* Background soft botanical curved leaf flourishes matching reference */}
      <div className="absolute top-0 left-0 w-44 sm:w-64 h-44 sm:h-64 -translate-x-10 -translate-y-10 pointer-events-none opacity-20 z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#3cb334]">
          <path d="M40 0 C120 20 180 80 200 160 C120 140 40 80 0 0 Z" />
        </svg>
      </div>
      <div className="absolute top-16 right-0 w-48 sm:w-72 h-48 sm:h-72 translate-x-12 pointer-events-none opacity-20 z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#3cb334]">
          <path d="M0 40 C80 20 140 80 200 200 C120 180 60 120 0 40 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            DESKTOP LAYOUT (>= 1024px / lg)
           ======================================================== */}
        <div className="hidden lg:block py-2 sm:py-3">
          <div className="max-w-3xl space-y-4">
            {/* 1. Eyebrow Tag */}
            <div className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#2ea347]">
              {t('hero.eyebrow')}
            </div>

            {/* 2. Main Heading with Premium Smooth Letter Reveal Animation */}
            <AnimatedHeroHeading
              heading1={t('hero.heading1')}
              heading2={t('hero.heading2')}
              lang={lang}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-[#0e2b1f] tracking-tight leading-[1.18]"
            />

            {/* 3. Supporting Description directly below Main Headline */}
            <ScrollReveal delay={150}>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
                {t('hero.desc')}
              </p>
            </ScrollReveal>

            {/* 4. Action Buttons */}
            <ScrollReveal delay={300}>
              <div className="pt-2 flex items-center gap-4">
                {/* Call Now */}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#044e29] hover:bg-[#033c20] active:scale-[0.98] text-white font-medium text-base tracking-normal transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                  aria-label={`Call EasyCash at ${siteConfig.phoneDisplay}`}
                >
                  <Phone className="w-4.5 h-4.5 fill-white" />
                  <span>{t('hero.callNow')}</span>
                </a>

                {/* Chat on WhatsApp */}
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    siteConfig.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-300 text-[#044e29] font-medium text-base tracking-normal transition-all shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label="Chat with EasyCash on WhatsApp"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-[#25D366] fill-[#25D366]/20" />
                  <span>{t('hero.whatsapp')}</span>
                </a>
              </div>
            </ScrollReveal>

            {/* 5. Trust Highlights */}
            <ScrollReveal delay={450}>
              <div className="pt-4 border-t border-emerald-950/10 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-emerald-100/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">
                        {t('hero.trust1Title')}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                        {t('hero.trust1Subtitle')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0 mt-0.5">
                      <Users className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">
                        {t('hero.trust2Title')}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                        {t('hero.trust2Subtitle')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0 mt-0.5">
                      <Wallet className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">
                        {t('hero.trust3Title')}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                        {t('hero.trust3Subtitle')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ========================================================
            MOBILE & TABLET LAYOUT (< 1024px)
            Strictly matches the uploaded Mobile Reference Image!
           ======================================================== */}
        <div className="lg:hidden flex flex-col space-y-3.5">
          {/* 1. Eyebrow */}
          <div className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-[#2ea347]">
            {t('hero.eyebrow')}
          </div>

          {/* 2. Main Heading with Premium Smooth Letter Reveal Animation */}
          <AnimatedHeroHeading
            heading1={t('hero.heading1')}
            heading2={t('hero.heading2')}
            lang={lang}
            className="text-2xl sm:text-3xl font-extrabold text-[#0e2b1f] tracking-tight leading-[1.22]"
          />

          {/* 3. Supporting Description directly below Main Headline */}
          <ScrollReveal delay={150}>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-md">
              {t('hero.desc')}
            </p>
          </ScrollReveal>

          {/* 4. Action Buttons (Stacked vertically on mobile to perfectly fit within the screen without clipping, side-by-side on tablet) */}
          <ScrollReveal delay={250}>
            <div className="flex flex-col sm:flex-row gap-3 pt-1 w-full max-w-md">
              {/* Call Now */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#044e29] active:scale-[0.98] text-white font-medium text-sm sm:text-base tracking-normal transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600"
                aria-label={`Call EasyCash at ${siteConfig.phoneDisplay}`}
              >
                <Phone className="w-4.5 h-4.5 fill-white shrink-0" />
                <span>{t('hero.callNow')}</span>
              </a>

              {/* Chat on WhatsApp */}
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  siteConfig.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white active:scale-[0.98] border border-slate-300 text-[#044e29] font-medium text-sm sm:text-base tracking-normal transition-all shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Chat with EasyCash on WhatsApp"
              >
                <MessageSquare className="w-4.5 h-4.5 text-[#25D366] fill-[#25D366]/20 shrink-0" />
                <span>{t('hero.whatsapp')}</span>
              </a>
            </div>
          </ScrollReveal>

          {/* 5. Trust Features (Matching reference image with divider and title+subtitle) */}
          <ScrollReveal delay={350}>
            <div className="pt-4 border-t border-slate-200/90 w-full max-w-lg">
              <div className="flex flex-col space-y-4 bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
                {/* Feature 1: Trusted Guidance */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {t('hero.trust1Title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-snug">
                      {t('hero.trust1Subtitle')}
                    </p>
                  </div>
                </div>

                {/* Feature 2: Personal Attention */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0 mt-0.5">
                    <Users className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {t('hero.trust2Title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-snug">
                      {t('hero.trust2Subtitle')}
                    </p>
                  </div>
                </div>

                {/* Feature 3: Simple Financial Guidance */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#044e29] shrink-0 mt-0.5">
                    <Wallet className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {t('hero.trust3Title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-snug">
                      {t('hero.trust3Subtitle')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ========================================================
            HORIZONTAL SERVICE SLIDER
           ======================================================== */}
        <ScrollReveal delay={200} distance={24} className="mt-6 sm:mt-10 lg:mt-12">
          <HomeServiceSlider onSelectService={onSelectService} />
        </ScrollReveal>
      </div>

      {/* Bottom subtle green wave decoration */}
      <div className="w-full h-8 sm:h-12 mt-4 pointer-events-none opacity-25">
        <svg viewBox="0 0 1200 60" className="w-full h-full fill-[#3cb334]" preserveAspectRatio="none">
          <path d="M0 30 Q 300 0, 600 30 T 1200 30 L 1200 60 L 0 60 Z" />
        </svg>
      </div>
    </section>
  );
};
