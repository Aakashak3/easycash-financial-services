import React, { useState } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { EasyCashLogo } from './EasyCashLogo';
import { useLanguage } from '../context/LanguageContext';

interface HomeNavbarProps {
  onEnquireClick?: () => void;
}

export const HomeNavbar: React.FC<HomeNavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, toggleLang, t } = useLanguage();

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Logo */}
          <a
            href="/"
            className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-0.5"
            aria-label="EasyCash Financial Services Home"
          >
            <EasyCashLogo />
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 xl:space-x-12" aria-label="Main Navigation">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative text-[#054e29] font-medium text-sm lg:text-base tracking-wide py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              {t('nav.home')}
              {/* Active green underline matching reference */}
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#3cb334] rounded-full" />
            </a>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-slate-800 hover:text-[#054e29] font-medium text-sm lg:text-base tracking-wide transition-colors py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              {t('nav.services')}
            </a>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-slate-800 hover:text-[#054e29] font-medium text-sm lg:text-base tracking-wide transition-colors py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              {t('nav.about')}
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-slate-800 hover:text-[#054e29] font-medium text-sm lg:text-base tracking-wide transition-colors py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              {t('nav.contact')}
            </a>
          </nav>

          {/* Right Language Transfer/Toggle Button (Desktop & Tablet) */}
          <div className="hidden md:flex items-center">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50/90 border border-emerald-200/90 p-1.5 rounded-2xl shadow-2xs">
              <Languages className="w-4 h-4 text-[#044e29] ml-2 mr-0.5 shrink-0" />
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`btn-interactive px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  lang === 'en'
                    ? 'bg-[#044e29] hover:bg-[#066e3a] text-white shadow-xs'
                    : 'text-[#044e29] hover:bg-emerald-100/80'
                }`}
                aria-pressed={lang === 'en'}
                title="Switch to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('ta')}
                className={`btn-interactive px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  lang === 'ta'
                    ? 'bg-[#044e29] hover:bg-[#066e3a] text-white shadow-xs'
                    : 'text-[#044e29] hover:bg-emerald-100/80'
                }`}
                aria-pressed={lang === 'ta'}
                title="தமிழுக்கு மாற்ற"
              >
                தமிழ்
              </button>
            </div>
          </div>

          {/* Mobile Right Controls - Language Transfer Toggle + Hamburger Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
            {/* Mobile Language Switcher Button */}
            <button
              type="button"
              onClick={toggleLang}
              className="btn-interactive inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300 text-[#044e29] text-[11px] sm:text-xs font-bold shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Switch Language / மொழியை மாற்றுக"
              title="Switch Language"
            >
              <Languages className="w-3.5 h-3.5 text-[#044e29] btn-icon-shift shrink-0" />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-interactive p-1.5 sm:p-2 rounded-lg text-slate-700 hover:text-[#044e29] hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-20 z-50 bg-black/40 md:hidden backdrop-blur-2xs"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-emerald-100 p-6 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation Links">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#044e29] py-2 border-b border-slate-100 flex items-center justify-between"
              >
                <span>{t('nav.home')}</span>
                <span className="w-2 h-2 rounded-full bg-[#3cb334]" />
              </a>
              <a
                href="#services"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-base font-medium text-slate-800 hover:text-[#044e29] py-2 border-b border-slate-100"
              >
                {t('nav.services')}
              </a>
              <a
                href="#about"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-base font-medium text-slate-800 hover:text-[#044e29] py-2 border-b border-slate-100"
              >
                {t('nav.about')}
              </a>
              <a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-base font-medium text-slate-800 hover:text-[#044e29] py-2 border-b border-slate-100"
              >
                {t('nav.contact')}
              </a>
            </nav>

            {/* Mobile Language Switcher Segment inside menu */}
            <div className="pt-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/80 border border-emerald-200">
                <span className="text-xs font-semibold text-[#044e29] flex items-center gap-1.5">
                  <Languages className="w-4 h-4" />
                  {t('nav.switchLanguage')}
                </span>
                <div className="inline-flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLang('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`btn-interactive px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      lang === 'en'
                        ? 'bg-[#044e29] hover:bg-[#066e3a] text-white shadow-2xs'
                        : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLang('ta');
                      setMobileMenuOpen(false);
                    }}
                    className={`btn-interactive px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      lang === 'ta'
                        ? 'bg-[#044e29] hover:bg-[#066e3a] text-white shadow-2xs'
                        : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
