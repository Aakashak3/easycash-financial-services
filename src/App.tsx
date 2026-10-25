import React, { useState } from 'react';
import { HomeNavbar } from './components/HomeNavbar';
import { HomeHero } from './components/HomeHero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { HomeFooter } from './components/HomeFooter';
import { siteConfig, ServiceSlideItem } from './config/siteConfig';
import { Phone, MessageSquare, X, CheckCircle2 } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SplashScreen } from './components/SplashScreen';

function AppContent() {
  const { lang, t } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Home Loan');
  const [selectedServiceTa, setSelectedServiceTa] = useState<string>('வீட்டுக் கடன்');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSelectService = (service: ServiceSlideItem) => {
    setSelectedService(service.titleEn || service.title);
    setSelectedServiceTa(service.titleTa || service.title);
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireClick = () => {
    setEnquiryModalOpen(true);
    setSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const serviceName = lang === 'ta' ? selectedServiceTa : selectedService;
    const text = lang === 'ta'
      ? `வணக்கம் EasyCash Nagapattinam, நான் "${serviceName}" குறித்து அறிய விரும்புகிறேன்.\nபெயர்: ${formData.name || 'வாடிக்கையாளர்'}\nகைபேசி: ${formData.phone}`
      : `Hello EasyCash Nagapattinam, I want to enquire regarding "${serviceName}".\nName: ${formData.name || 'Customer'}\nPhone: ${formData.phone}`;

    window.open(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const activeServiceName = lang === 'ta' ? selectedServiceTa : selectedService;

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#dcfce7] selection:text-[#044e29]">
        {/* 1. Navbar — With functional Tamil / English language switcher */}
        <HomeNavbar onEnquireClick={handleEnquireClick} />

      {/* Main Sections: Home Hero → Services Section → About Us Section → Contact Us Section */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HomeHero
          onSelectService={handleSelectService}
          onEnquireClick={handleEnquireClick}
        />

        {/* Section 2: Services Page (15 Financial Services Cards with Photorealistic Images) */}
        <ServicesSection />

        {/* Section 3: About Us Section */}
        <AboutSection onEnquireClick={handleEnquireClick} />

        {/* Section 4: Contact Us Section (Video Presentation + Consultant Card + Enquiry Form) */}
        <ContactSection />
      </main>

      {/* Section 5: Footer */}
      <HomeFooter onEnquireClick={handleEnquireClick} />

      {/* Accessible Interactive Enquiry Modal for 'Enquire Now' action */}
      {enquiryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs"
          onClick={() => setEnquiryModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-7 shadow-2xl border border-emerald-100 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setEnquiryModalOpen(false)}
              className="btn-interactive absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer focus:outline-none"
              aria-label={t('modal.close')}
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#044e29] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-[#044e29]">
                  {t('modal.successTitle')}
                </h3>
                <p className="text-sm text-slate-600">
                  {t('modal.successDesc')}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="btn-whatsapp btn-interactive group flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <MessageSquare className="w-4 h-4 fill-[#25D366] text-[#25D366] btn-icon-shift shrink-0" />
                    <span>{t('modal.openWhatsapp')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnquiryModalOpen(false)}
                    className="btn-secondary-action btn-interactive py-2.5 px-4 rounded-xl text-slate-700 text-xs sm:text-sm font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {t('modal.close')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#2ea347]">
                    {t('modal.branch')}
                  </span>
                  <h3 id="enquiry-title" className="text-xl font-bold text-[#044e29] mt-0.5">
                    {lang === 'ta' ? `${activeServiceName} - ${t('modal.title')}` : `${t('modal.title')} - ${activeServiceName}`}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t('modal.desc')}
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('modal.name')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'ta' ? 'எ.கா. ரமேஷ் குமார்' : 'e.g. Ramesh Kumar'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('modal.phone')}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-slate-500 font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder={lang === 'ta' ? '10 இலக்க எண்' : '98421 23456'}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        className="w-full pl-11 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="submit"
                      className="btn-primary-action btn-interactive group flex-1 py-3 rounded-xl font-bold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {t('modal.submit')}
                    </button>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="btn-call btn-interactive group py-3 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <Phone className="w-4 h-4 fill-current btn-icon-shift shrink-0" />
                      <span>{t('modal.callNow')}</span>
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </>
);
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
