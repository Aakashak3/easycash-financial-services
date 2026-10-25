import React from 'react';
import { Phone, ChevronRight, Mail, MapPin, User } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { EasyCashLogo } from './EasyCashLogo';
import { ScrollReveal } from './ScrollReveal';

interface HomeFooterProps {
  onEnquireClick?: () => void;
}

export const HomeFooter: React.FC<HomeFooterProps> = ({ onEnquireClick }) => {
  const { lang, t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#00381e] text-white overflow-hidden border-t border-[#044e29]">
      {/* Background soft botanical curved leaf flourishes matching reference on right */}
      <div className="absolute right-0 top-0 bottom-0 w-80 sm:w-96 translate-x-16 pointer-events-none opacity-25">
        <svg viewBox="0 0 400 400" className="w-full h-full fill-[#3cb334]">
          <path d="M100 0 C250 50 350 200 400 400 C250 350 100 250 0 100 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-10 relative z-10">
        {/* Main 4-Column Grid with vertical dividers matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 sm:pb-16 items-start">
          {/* Column 1: Brand Info (Logo + Tagline) */}
          <ScrollReveal delay={0} className="lg:col-span-4 space-y-4">
            {/* Official EasyCash Logo Badge */}
            <div>
              <EasyCashLogo size="lg" variant="badge" />
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xs font-normal pt-1">
              {t('footer.tagline')}
            </p>

            {/* Manager Name */}
            <div className="pt-2 text-xs sm:text-sm text-emerald-200/95 font-medium flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-800/80 flex items-center justify-center text-[#3cb334]">
                <User className="w-3.5 h-3.5" />
              </div>
              <span>{lang === 'ta' ? `கிளை மேலாளர்: ${siteConfig.managerNameTa}` : `Branch Manager: ${siteConfig.managerName}`}</span>
            </div>
          </ScrollReveal>

          {/* Column 2: Quick Links */}
          <ScrollReveal delay={100} className="lg:col-span-2 space-y-3 lg:border-l lg:border-white/15 lg:pl-8">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-normal">
              {t('footer.quickLinks')}
            </h4>
            <div className="w-8 h-1 bg-[#48bb35] rounded-full mt-1 mb-4" />

            <ul className="space-y-2.5 text-sm sm:text-base font-normal text-white">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('home')}
                  className="btn-interactive group inline-flex items-center gap-1.5 hover:text-[#48bb35] cursor-pointer focus:outline-none"
                >
                  <ChevronRight className="w-4 h-4 text-[#48bb35] transition-transform group-hover:translate-x-1" />
                  <span>{t('nav.home')}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('about')}
                  className="btn-interactive group inline-flex items-center gap-1.5 hover:text-[#48bb35] cursor-pointer focus:outline-none"
                >
                  <ChevronRight className="w-4 h-4 text-[#48bb35] transition-transform group-hover:translate-x-1" />
                  <span>{t('nav.about')}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('services')}
                  className="btn-interactive group inline-flex items-center gap-1.5 hover:text-[#48bb35] cursor-pointer focus:outline-none"
                >
                  <ChevronRight className="w-4 h-4 text-[#48bb35] transition-transform group-hover:translate-x-1" />
                  <span>{t('nav.services')}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="btn-interactive group inline-flex items-center gap-1.5 hover:text-[#48bb35] cursor-pointer focus:outline-none"
                >
                  <ChevronRight className="w-4 h-4 text-[#48bb35] transition-transform group-hover:translate-x-1" />
                  <span>{t('nav.contact')}</span>
                </button>
              </li>
            </ul>
          </ScrollReveal>

          {/* Column 3: Social Media */}
          <ScrollReveal delay={200} className="lg:col-span-3 space-y-3 lg:border-l lg:border-white/15 lg:pl-8">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-normal">
              {t('footer.socialMedia')}
            </h4>
            <div className="w-8 h-1 bg-[#48bb35] rounded-full mt-1 mb-4" />

            <div className="space-y-3 pt-1">
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive flex items-center gap-3 group text-white hover:text-emerald-200 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-2xs group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="font-medium text-sm sm:text-base">Instagram</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive flex items-center gap-3 group text-white hover:text-emerald-200 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shadow-2xs group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="font-medium text-sm sm:text-base">Facebook</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Column 4: Get in Touch */}
          <ScrollReveal delay={300} className="lg:col-span-3 space-y-3 lg:border-l lg:border-white/15 lg:pl-8">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-normal">
              {t('footer.getInTouch')}
            </h4>
            <div className="w-8 h-1 bg-[#48bb35] rounded-full mt-1 mb-4" />

            <div className="space-y-3.5 pt-1">
              {/* Phone */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn-interactive group flex items-center gap-3 text-white hover:text-emerald-200 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#3cb334] group-hover:bg-[#48bb35] flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <Phone className="w-4 h-4 fill-white btn-icon-shift" />
                </div>
                <span className="font-semibold text-sm sm:text-base">
                  {siteConfig.phoneDisplay}
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  siteConfig.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive group flex items-center gap-3 text-white hover:text-emerald-200 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#25D366] group-hover:bg-[#20bd5a] flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <svg className="w-4.5 h-4.5 fill-current btn-icon-shift" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm sm:text-base">
                  {t('footer.chatOnWhatsapp')}
                </span>
              </a>

              {/* Enquire Now Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onEnquireClick}
                  className="btn-interactive group w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white hover:bg-[#f0fdf4] text-[#044e29] border border-white hover:border-emerald-300 font-bold text-sm sm:text-base tracking-normal shadow-xs hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <Phone className="w-4 h-4 fill-[#044e29] btn-icon-shift shrink-0" />
                  <span>{t('footer.enquireNow')}</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <ScrollReveal delay={150}>
          <div className="pt-6 border-t border-emerald-900/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-emerald-200/90 font-normal text-center md:text-left">
            {/* Copyright */}
            <div>
              {t('footer.copyright')}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onEnquireClick}
                className="hover:text-white transition-colors cursor-pointer hover:underline focus:outline-none"
              >
                {t('footer.terms')}
              </button>
              <span className="text-emerald-700">|</span>
              <button
                type="button"
                onClick={onEnquireClick}
                className="hover:text-white transition-colors cursor-pointer hover:underline focus:outline-none"
              >
                {t('footer.privacy')}
              </button>
              <span className="text-emerald-700">|</span>
              <button
                type="button"
                onClick={onEnquireClick}
                className="hover:text-white transition-colors cursor-pointer hover:underline focus:outline-none"
              >
                {t('footer.disclaimer')}
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
