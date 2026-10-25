import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export interface FinancialServiceItem {
  id: string;
  nameEn: string;
  nameTa: string;
  descEn: string;
  descTa: string;
  image: string;
}

export const servicesList: FinancialServiceItem[] = [
  {
    id: 'home-loan',
    nameEn: 'HOME LOAN',
    nameTa: 'வீடு வாங்குவதற்கான கடன்',
    descEn: 'Affordable interest rates and fast approvals to build or buy your dream home.',
    descTa: 'உங்கள் கனவு வீட்டை வாங்க அல்லது கட்ட தேவையான கடன் பெற வழிகாட்டுதல்.',
    image: '/services/home-loan.jpg'
  },
  {
    id: 'personal-loan',
    nameEn: 'PERSONAL LOAN',
    nameTa: 'தனிநபர் கடன்',
    descEn: 'Instant financial support for your personal, family, and medical emergencies.',
    descTa: 'உங்கள் தனிப்பட்ட தேவைகளுக்கான கடன் பெற உதவி.',
    image: '/services/personal-loan.jpg'
  },
  {
    id: 'loan-against-property',
    nameEn: 'LOAN AGAINST PROPERTY',
    nameTa: 'சொத்தை அடமானம் வைத்து கடன்',
    descEn: 'Unlock the value of your commercial or residential property with low interest.',
    descTa: 'உங்கள் வீடு அல்லது பிற சொத்துகளை அடமானம் வைத்து கடன் பெறுவதற்கான வழிகாட்டுதல்.',
    image: '/services/loan-against-property.jpg'
  },
  {
    id: 'education-loan',
    nameEn: 'EDUCATION LOAN',
    nameTa: 'கல்வி கடன்',
    descEn: 'Financial assistance for higher education in top institutions in India and abroad.',
    descTa: 'கல்லூரி மற்றும் உயர்கல்விச் செலவுகளுக்கான கடன் பெற உதவி.',
    image: '/services/education-loan.jpg'
  },
  {
    id: 'business-loan',
    nameEn: 'BUSINESS LOAN',
    nameTa: 'வியாபாரக் கடன்',
    descEn: 'Working capital and business expansion loans tailored for enterprises.',
    descTa: 'உங்கள் வியாபாரத்தைத் தொடங்க அல்லது வளர்க்க கடன் பெற வழிகாட்டுதல்.',
    image: '/services/business-loan.jpg'
  },
  {
    id: 'trade-gold-loan',
    nameEn: 'TRADE LOAN & GOLD LOAN',
    nameTa: 'வியாபாரக் கடன் மற்றும் தங்கக் கடன்',
    descEn: 'Instant maximum value funding against gold and business trade stock.',
    descTa: 'வியாபாரத் தேவைகளுக்கும் தங்கத்தை அடமானம் வைத்து கடன் பெறவும் உதவி.',
    image: '/services/trade-gold-loan.jpg'
  },
  {
    id: 'home-appliances-loan',
    nameEn: 'HOME APPLIANCES LOAN',
    nameTa: 'வீட்டு உபயோகப் பொருட்கள் கடன்',
    descEn: 'Easy EMI financing to purchase TVs, refrigerators, and essential home appliances.',
    descTa: 'டிவி, பிரிட்ஜ், வாஷிங் மெஷின் போன்ற பொருட்களை வாங்குவதற்கான கடன் வசதிகள்.',
    image: '/services/home-appliances-loan.jpg'
  },
  {
    id: 'furniture-loan',
    nameEn: 'FURNITURE LOAN',
    nameTa: 'மரச்சாமான்கள் வாங்குவதற்கான கடன்',
    descEn: 'Flexible financing options to furnish your home or workspace with quality decor.',
    descTa: 'கட்டில், சோபா, மேசை போன்ற வீட்டுத் தேவையான பொருட்களை வாங்குவதற்கான கடன் வசதிகள்.',
    image: '/services/furniture-loan.jpg'
  },
  {
    id: 'shares-investments',
    nameEn: 'SHARES AND INVESTMENTS',
    nameTa: 'பங்குகள் மற்றும் முதலீடுகள்',
    descEn: 'Strategic stock market advisory and smart investment portfolios for wealth growth.',
    descTa: 'பங்குச்சந்தை மற்றும் முதலீட்டு வாய்ப்புகள் பற்றிய வழிகாட்டுதல்.',
    image: '/services/shares-investments.jpg'
  },
  {
    id: 'mutual-funds',
    nameEn: 'MUTUAL FUNDS',
    nameTa: 'பரஸ்பர நிதி முதலீடுகள் (Mutual Funds)',
    descEn: 'Goal-based SIPs and diversified mutual fund portfolios guided by professionals.',
    descTa: 'SIP உள்ளிட்ட பரஸ்பர நிதி முதலீடுகள் பற்றிய வழிகாட்டுதல்.',
    image: '/services/mutual-funds.jpg'
  },
  {
    id: 'life-insurance',
    nameEn: 'LIFE INSURANCE',
    nameTa: 'ஆயுள் காப்பீடு',
    descEn: 'Secure your family’s future and financial stability with comprehensive life plans.',
    descTa: 'உங்கள் குடும்பத்தின் எதிர்கால நிதிப் பாதுகாப்பிற்கான ஆயுள் காப்பீட்டுத் திட்டங்கள்.',
    image: '/services/life-insurance.jpg'
  },
  {
    id: 'general-insurance',
    nameEn: 'GENERAL INSURANCE',
    nameTa: 'பொது காப்பீடு',
    descEn: 'Complete insurance protection for your motor vehicles, businesses, and properties.',
    descTa: 'வாகனம், வீடு மற்றும் பிற உடமைகளுக்கான காப்பீட்டுத் திட்டங்கள்.',
    image: '/services/general-insurance.jpg'
  },
  {
    id: 'health-insurance',
    nameEn: 'HEALTH INSURANCE',
    nameTa: 'மருத்துவக் காப்பீடு',
    descEn: 'Cashless hospitalization and comprehensive healthcare coverage for peace of mind.',
    descTa: 'மருத்துவச் செலவுகளுக்கான காப்பீட்டுத் திட்டங்களைத் தேர்ந்தெடுக்க உதவி.',
    image: '/services/health-insurance.jpg'
  },
  {
    id: 'job-placement',
    nameEn: 'JOB PLACEMENT',
    nameTa: 'வேலை வாய்ப்பு',
    descEn: 'Dedicated career guidance and verified corporate job placements tailored to your skills.',
    descTa: 'உங்கள் தகுதிக்கு ஏற்ற வேலை வாய்ப்புகளைத் தேடுவதற்கான வழிகாட்டுதல்.',
    image: '/services/job-placement.jpg'
  },
  {
    id: 'property-development',
    nameEn: 'PROPERTY DEVELOPMENT',
    nameTa: 'சொத்து மேம்பாடு',
    descEn: 'Real estate advisory, layout approvals, and property enhancement guidance.',
    descTa: 'நிலம் மற்றும் சொத்து தொடர்பான சேவைகள் பற்றிய ஆலோசனை.',
    image: '/services/property-development.jpg'
  }
];

export const ServicesSection: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="services" className="relative py-14 sm:py-20 bg-[#f8faf8] overflow-hidden border-t border-emerald-100">
      {/* Background soft botanical curved leaf flourishes */}
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
            <div className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#3cb334] mb-1">
              {t('services.eyebrow')}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e2b1f] tracking-tight">
              {t('services.title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t('services.desc')}
            </p>
          </ScrollReveal>
        </div>

        {/* 15 Financial Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {servicesList.map((service, index) => {
            const currentName = lang === 'ta' ? service.nameTa : service.nameEn;
            const currentDesc = lang === 'ta' ? service.descTa : service.descEn;
            const staggerDelay = (index % 5) * 60;

            return (
              <ScrollReveal
                key={service.id}
                delay={staggerDelay}
                duration={600}
                distance={24}
                className="h-full"
              >
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 p-4 sm:p-5 flex flex-col items-center justify-between text-center group h-full">
                  <div className="w-full flex flex-col items-center">
                    {/* Photorealistic 1:1 Image with object-fit: cover, centered, slightly rounded corners */}
                    <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3.5 bg-slate-100 shadow-2xs border border-slate-100 group-hover:border-emerald-200 transition-all duration-300">
                      <img
                        src={service.image}
                        alt={currentName}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Primary Title strictly in selected language */}
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0e2b1f] tracking-tight mt-1 mb-2 leading-snug">
                      {currentName}
                    </h3>

                    {/* Description strictly in selected language */}
                    <p className="text-xs text-slate-600 leading-relaxed min-h-[44px] px-1 font-normal">
                      {currentDesc}
                    </p>
                  </div>

                  {/* Action Buttons: Call & WhatsApp */}
                  <div className="w-full grid grid-cols-2 gap-1.5 sm:gap-2 mt-4 pt-3 border-t border-slate-100">
                    {/* Call Button: Dark green style, brighter green hover state, subtle lift */}
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="btn-call btn-interactive group/btn inline-flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 min-[360px]:px-2.5 rounded-xl font-semibold text-[11px] min-[360px]:text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      aria-label={`Call for ${currentName}`}
                    >
                      <Phone className="w-3.5 h-3.5 fill-current btn-icon-shift shrink-0" />
                      <span className="truncate">{t('services.call')}</span>
                    </a>

                    {/* WhatsApp Button: White background, green WhatsApp icon and text, pale-green hover & stronger green border */}
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                        lang === 'ta'
                          ? `வணக்கம் EasyCash Nagapattinam, நான் "${service.nameTa}" சேவை குறித்து அறிய விரும்புகிறேன்.`
                          : `Hello EasyCash Nagapattinam, I want to enquire about "${service.nameEn}".`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp btn-interactive group/btn inline-flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 min-[360px]:px-2.5 rounded-xl font-semibold text-[11px] min-[360px]:text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      aria-label={`WhatsApp for ${currentName}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366] btn-icon-shift shrink-0" />
                      <span className="truncate">{t('services.whatsapp')}</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
