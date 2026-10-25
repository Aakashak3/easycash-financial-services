import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Briefcase,
  GraduationCap,
  Coins,
  ShieldCheck,
  Landmark,
  Tv,
  Armchair,
  TrendingUp,
  PiggyBank,
  HeartHandshake,
  HeartPulse,
  UserCheck,
  HardHat,
  ArrowRight
} from 'lucide-react';
import { homeServices, ServiceSlideItem } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

interface HomeServiceSliderProps {
  activeServiceId?: string;
  onSelectService?: (service: ServiceSlideItem) => void;
}

export const HomeServiceSlider: React.FC<HomeServiceSliderProps> = ({
  activeServiceId = 'home-loan',
  onSelectService
}) => {
  const { lang, t } = useLanguage();
  const [selectedId, setSelectedId] = useState(activeServiceId);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);

  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);
  const prefersReducedMotionRef = useRef<boolean>(false);

  const touchStartXRef = useRef<number>(0);
  const touchStartPosRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Duplicated service items to achieve a truly seamless infinite loop
  const duplicatedServices = [...homeServices, ...homeServices];

  // Measure single track width (half of duplicated track)
  const updateMetrics = useCallback(() => {
    if (trackRef.current) {
      const totalWidth = trackRef.current.scrollWidth;
      singleSetWidthRef.current = totalWidth / 2;
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);

    // Reduced motion preference check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mediaQuery.matches;

    const motionListener = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', motionListener);

    return () => {
      window.removeEventListener('resize', updateMetrics);
      mediaQuery.removeEventListener('change', motionListener);
    };
  }, [updateMetrics]);

  // Continuous, slow, smooth linear animation loop (~38-42s per loop)
  useEffect(() => {
    let lastTime: number | null = null;
    // ~55 pixels per second provides a gentle, premium, easily readable glide
    const speedPxPerSecond = 55;

    const animate = (currentTime: number) => {
      if (
        lastTime !== null &&
        !isHoveredRef.current &&
        !isDraggingRef.current &&
        !isInteractingRef.current &&
        !prefersReducedMotionRef.current
      ) {
        const deltaSeconds = (currentTime - lastTime) / 1000;
        const singleSetWidth = singleSetWidthRef.current;

        positionRef.current += speedPxPerSecond * deltaSeconds;

        if (singleSetWidth > 0 && positionRef.current >= singleSetWidth) {
          positionRef.current -= singleSetWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;
        }
      }

      lastTime = currentTime;
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Arrow button click navigation (smoothly advances or rewinds by one card)
  const handleArrowClick = (direction: 'left' | 'right') => {
    const singleSetWidth = singleSetWidthRef.current;
    if (!singleSetWidth || !trackRef.current) return;

    isInteractingRef.current = true;
    const step = 220; // Average card width + gap

    if (direction === 'right') {
      positionRef.current = (positionRef.current + step) % singleSetWidth;
    } else {
      positionRef.current = (positionRef.current - step + singleSetWidth) % singleSetWidth;
    }

    trackRef.current.style.transition = 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
    trackRef.current.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;

    setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
      }
      isInteractingRef.current = false;
    }, 380);
  };

  // Mobile Touch Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartPosRef.current = positionRef.current;

    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const singleSetWidth = singleSetWidthRef.current;
    if (!singleSetWidth) return;

    const diff = touchStartXRef.current - e.touches[0].clientX;
    let newPos = touchStartPosRef.current + diff;

    while (newPos < 0) newPos += singleSetWidth;
    while (newPos >= singleSetWidth) newPos -= singleSetWidth;

    positionRef.current = newPos;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${newPos}px, 0, 0)`;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    isInteractingRef.current = true;
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 1200);
  };

  const handleItemClick = (service: ServiceSlideItem) => {
    setSelectedId(service.id);
    if (onSelectService) {
      onSelectService(service);
    }
  };

  /**
   * Renders recognizable, service-specific icons with consistent size and alignment.
   * Matches the visual reference from the prompt screenshots.
   */
  const renderIcon = (type: string, isActive: boolean) => {
    const iconClass = "w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0";

    switch (type) {
      case 'home':
        return <Home className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-emerald-700'}`} />;
      case 'user':
        return <User className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-slate-700'}`} />;
      case 'business':
        return <Briefcase className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-emerald-800'}`} />;
      case 'education':
        return <GraduationCap className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-slate-800'}`} />;
      case 'gold':
        return <Coins className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-amber-600'}`} />;
      case 'insurance':
        return <ShieldCheck className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-emerald-700'}`} />;
      case 'property-loan':
        return <Landmark className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-slate-700'}`} />;
      case 'appliances':
        return <Tv className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-blue-700'}`} />;
      case 'furniture':
        return <Armchair className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-amber-800'}`} />;
      case 'investments':
        return <TrendingUp className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-emerald-700'}`} />;
      case 'funds':
        return <PiggyBank className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-emerald-600'}`} />;
      case 'life-insurance':
        return <HeartHandshake className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-rose-700'}`} />;
      case 'health-insurance':
        return <HeartPulse className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-rose-600'}`} />;
      case 'job':
        return <UserCheck className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-indigo-700'}`} />;
      case 'property-dev':
        return <HardHat className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-amber-700'}`} />;
      default:
        return <Home className={`${iconClass} ${isActive ? 'text-[#044e29]' : 'text-slate-700'}`} />;
    }
  };

  return (
    <div className="w-full relative select-none max-w-7xl mx-auto px-2 sm:px-4">
      {/* Horizontal Pill Slider Container matching reference screenshot */}
      <div
        ref={containerRef}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative bg-white/95 rounded-full border border-slate-200/90 shadow-md p-1.5 sm:p-2 flex items-center backdrop-blur-xs overflow-hidden touch-pan-y"
        role="region"
        aria-label="Services slider"
      >
        {/* Left Circular Arrow Button */}
        <button
          type="button"
          onClick={() => handleArrowClick('left')}
          className="btn-interactive group w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 shadow-2xs hover:text-white hover:bg-[#044e29] hover:border-[#044e29] shrink-0 z-20 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          aria-label={t('services.sliderPrev')}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Soft edge gradient fades for elegant infinite carousel entrance/exit */}
        <div className="pointer-events-none absolute left-10 sm:left-13 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-white/95 to-transparent z-10" />
        <div className="pointer-events-none absolute right-10 sm:right-13 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-white/95 to-transparent z-10" />

        {/* Smooth Continuous Moving Track Window */}
        <div className="flex-1 overflow-hidden mx-1 sm:mx-2 py-0.5">
          <div
            ref={trackRef}
            className="flex items-center gap-1.5 sm:gap-3 w-max"
            style={{ willChange: 'transform' }}
          >
            {duplicatedServices.map((service, index) => {
              const isActive = selectedId === service.id;
              const uniqueKey = `${service.id}-${index}`;

              return (
                <button
                  key={uniqueKey}
                  type="button"
                  onClick={() => handleItemClick(service)}
                  className={`btn-interactive group flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm tracking-normal shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isActive
                      ? 'bg-[#dcfce7] hover:bg-[#cbf7da] text-[#044e29] border border-emerald-400/80 shadow-xs font-semibold'
                      : 'bg-white hover:bg-emerald-50/70 text-slate-700 hover:text-[#044e29] border border-slate-100 hover:border-emerald-200 font-medium'
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Service Icon inside subtle circular container */}
                  <span
                    className={`flex items-center justify-center w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full shrink-0 transition-colors ${
                      isActive ? 'bg-emerald-200/70 text-[#044e29]' : 'bg-slate-100/70 group-hover:bg-emerald-100/80'
                    }`}
                  >
                    {renderIcon(service.iconType, isActive)}
                  </span>

                  {/* Service Title */}
                  <span className="whitespace-nowrap font-medium sm:font-semibold">
                    {lang === 'ta' ? service.titleTa : (service.titleEn || service.title)}
                  </span>

                  {/* Directional Arrow */}
                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive
                        ? 'text-[#044e29] translate-x-0.5'
                        : 'text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Circular Arrow Button */}
        <button
          type="button"
          onClick={() => handleArrowClick('right')}
          className="btn-interactive group w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 shadow-2xs hover:text-white hover:bg-[#044e29] hover:border-[#044e29] shrink-0 z-20 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          aria-label={t('services.sliderNext')}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
