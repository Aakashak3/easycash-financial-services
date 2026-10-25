import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Animation stages:
  // 0: Initial blank white
  // 1: Leaf emblem reveals (fade-in + subtle scale up)
  // 2: EASYCASH brand name reveals
  // 3: FINANCIAL SERVICES text reveals
  // 4: Hold completed logo briefly
  // 5: Fade out splash screen overlay
  // 6: Finished (unmount)
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setStage(4);
      const timer = setTimeout(() => {
        setStage(5);
        setTimeout(() => {
          setStage(6);
          onFinish?.();
        }, 300);
      }, 700);
      return () => clearTimeout(timer);
    }

    // Lock body scroll during splash screen
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Sequence timeline (~2.8s total)
    const t1 = setTimeout(() => setStage(1), 80);    // Leaf symbol
    const t2 = setTimeout(() => setStage(2), 650);   // EASYCASH
    const t3 = setTimeout(() => setStage(3), 1150);  // FINANCIAL SERVICES
    const t4 = setTimeout(() => setStage(4), 1650);  // Completed hold
    const t5 = setTimeout(() => setStage(5), 2200);  // Smooth fade-out start
    const t6 = setTimeout(() => {
      setStage(6);
      document.body.style.overflow = originalOverflow;
      onFinish?.();
    }, 2850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      document.body.style.overflow = originalOverflow;
    };
  }, [onFinish]);

  if (stage === 6) {
    return null;
  }

  const logoSrc = '/assets/aistudio/Logo-2_page-0001_708d915f.jpg';

  return (
    <div
      role="status"
      aria-label="EasyCash Financial Services Loading"
      className={`fixed inset-0 z-[99999] bg-white flex items-center justify-center transition-opacity duration-650 ease-out select-none ${
        stage >= 5 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Background Soft Radiant Pulse behind logo */}
      <div
        className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-emerald-50/70 blur-3xl pointer-events-none transition-all duration-1000 ${
          stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      />

      {/* Main Logo Container */}
      <div
        className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center transition-transform duration-700 ease-out ${
          stage >= 4 ? 'scale-[1.02]' : 'scale-100'
        }`}
      >
        {/* Layer 1: Green Leaf Botanical Symbol (Revealed First) */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-600 ease-out ${
            stage >= 1
              ? 'opacity-100 scale-100 translate-y-0 filter drop-shadow-xs'
              : 'opacity-0 scale-90 translate-y-3'
          }`}
          style={{
            clipPath: 'inset(0% 0% 45.2% 0%)'
          }}
        >
          <img
            src={logoSrc}
            alt=""
            className="w-full h-full object-contain pointer-events-none"
            loading="eager"
            decoding="sync"
          />
        </div>

        {/* Layer 2: "EASYCASH" Brand Text (Revealed Second) */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-550 ease-out ${
            stage >= 2
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-3'
          }`}
          style={{
            clipPath: 'inset(55.0% 0% 39.0% 0%)'
          }}
        >
          <img
            src={logoSrc}
            alt="EasyCash"
            className="w-full h-full object-contain pointer-events-none"
            loading="eager"
            decoding="sync"
          />
        </div>

        {/* Layer 3: "FINANCIAL SERVICES" Subtitle Text (Revealed Third) */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
            stage >= 3
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2'
          }`}
          style={{
            clipPath: 'inset(61.2% 0% 34.0% 0%)'
          }}
        >
          <img
            src={logoSrc}
            alt="Financial Services"
            className="w-full h-full object-contain pointer-events-none"
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>
    </div>
  );
};
