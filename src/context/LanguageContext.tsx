import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.enquireNow': 'Enquire Now',
    'nav.switchLanguage': 'Switch Language',

    // Hero Section
    'hero.eyebrow': 'LOANS | INSURANCE | INVESTMENTS',
    'hero.heading1': 'Your Financial Dreams,',
    'hero.heading2': 'Finance is Not an Obstacle!',
    'hero.desc': 'From home loans to business loans, we guide you to choose the right financial services tailored to your needs.',
    'hero.callNow': 'Call Us',
    'hero.whatsapp': 'Chat on WhatsApp',
    'hero.trust1Title': 'Trusted Guidance',
    'hero.trust1Subtitle': 'Tailored advice for your needs',
    'hero.trust2Title': 'Personal Attention',
    'hero.trust2Subtitle': 'Dedicated approach for every need',
    'hero.trust3Title': 'Simple Financial Guidance',
    'hero.trust3Subtitle': 'Move forward with clear choices',
    'hero.trust1': 'Trusted Guidance',
    'hero.trust2': 'Personal Attention',
    'hero.trust3': 'Simple Financial Guidance',

    // Services Section
    'services.eyebrow': 'SERVICES',
    'services.title': 'Financial Services',
    'services.desc': 'Explore our wide range of trusted loan, insurance, and wealth solutions right here in Nagapattinam.',
    'services.call': 'Call',
    'services.whatsapp': 'WhatsApp',
    'services.sliderPrev': 'Previous service',
    'services.sliderNext': 'Next service',

    // About Section
    'about.eyebrow': 'ABOUT US',
    'about.title1': 'Your Trusted',
    'about.title2': 'Financial Partner',
    'about.desc': 'At EasyCash Financial Services, we help individuals and businesses access the right loan solutions with trusted banks and financial partners. Our focus is on simple process, clear guidance, and your financial growth.',
    'about.signature1': 'People',
    'about.signature2': 'Plans',
    'about.signature3': 'Progress',
    'about.p1Title': 'Trusted Guidance',
    'about.p1Desc': 'Clear and transparent loan guidance tailored to your goals.',
    'about.p2Title': 'Secure Process',
    'about.p2Desc': 'Seamless processing through verified partner banks and NBFCs.',
    'about.p3Title': 'Multiple Loan Options',
    'about.p3Desc': 'Personal, Business, Home, Gold, Education loans, and more.',
    'about.p4Title': 'Customer Focused',
    'about.p4Desc': 'Dedicated financial assistance right here in Nagapattinam.',
    'about.termsTitle': 'Terms & Conditions Apply.',
    'about.termsDesc': 'Loan approval is subject to eligibility criteria and partner bank/NBFC policies. Interest rates and processing time may vary based on applicant profile.',
    'about.enquireNow': 'Enquire Now',

    // Contact Section
    'contact.eyebrow': 'CONTACT US',
    'contact.title': 'Get in Touch',
    'contact.desc': 'Have financial questions or need personalized guidance? Connect with our Nagapattinam office today.',
    'contact.consultantTitle': 'Branch Manager',
    'contact.consultantRole': 'Branch Manager & Financial Advisor',
    'contact.consultantName': 'S. Balachandran',
    'contact.consultantOrg': 'EasyCash Financial Services',
    'contact.phoneLabel': 'Direct Phone',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.emailLabel': 'Official Email',
    'contact.locationLabel': 'Branch Office Address',
    'contact.locationVal': 'No. 6, Naduvar Sannathi Street, Dr. Ramanan Clinic Upstairs, Nagapattinam – 611001, Tamil Nadu.',
    'contact.companyLabel': 'Organization',
    'contact.callNow': 'Call Now',
    'contact.whatsapp': 'Chat on WhatsApp',
    'contact.emailNow': 'Send Email',
    'contact.managerLabel': 'Branch Manager',
    'contact.videoEyebrow': 'HAVE ANY LOAN QUESTIONS?',
    'contact.videoLine1': 'If you have questions regarding loans',
    'contact.videoLine2': 'and financial services',
    'contact.videoLine3': 'Contact EasyCash today!',
    'contact.videoPlay': 'Play presentation',
    'contact.videoPause': 'Pause presentation',

    // Contact Form
    'contact.formTitle': 'Quick Loan & Service Enquiry',
    'contact.formDesc': 'Fill in your details below and our financial advisor will reach out to you promptly.',
    'contact.nameLabel': 'Full Name',
    'contact.namePlaceholder': 'e.g. Ramesh Kumar',
    'contact.phoneLabel2': 'Mobile Number',
    'contact.phonePlaceholder': '10-digit mobile number',
    'contact.serviceLabel': 'Service Needed',
    'contact.serviceSelectDefault': 'Select a service',
    'contact.messageLabel': 'Your Requirements (Optional)',
    'contact.messagePlaceholder': 'Tell us about your loan amount or question...',
    'contact.submitBtn': 'Submit Enquiry',
    'contact.submitting': 'Sending...',
    'contact.callDirectly': 'Call Directly',
    'contact.chatWhatsapp': 'Chat on WhatsApp',
    'contact.successTitle': 'Enquiry Submitted Successfully!',
    'contact.successDesc': 'Thank you! Our Nagapattinam representative will contact you shortly.',
    'contact.errName': 'Please enter your full name.',
    'contact.errPhone': 'Please enter a valid 10-digit mobile number.',
    'contact.sendAnother': 'Submit Another Enquiry',

    // Footer
    'footer.tagline': 'Simpler financial solutions for a brighter tomorrow.',
    'footer.quickLinks': 'Quick Links',
    'footer.socialMedia': 'Social Media',
    'footer.getInTouch': 'Get in Touch',
    'footer.enquireNow': 'Enquire Now',
    'footer.chatOnWhatsapp': 'Chat on WhatsApp',
    'footer.copyright': '© 2024 EasyCash Financial Services. All rights reserved.',
    'footer.terms': 'Terms & Conditions apply',
    'footer.privacy': 'Privacy Policy',
    'footer.disclaimer': 'Disclaimer',

    // Modal
    'modal.branch': 'Nagapattinam Branch',
    'modal.title': 'Enquire for Service',
    'modal.desc': 'Get quick financial guidance from our local office.',
    'modal.name': 'Your Name',
    'modal.phone': 'Mobile Number',
    'modal.submit': 'Submit Enquiry',
    'modal.callNow': 'Call Now',
    'modal.successTitle': 'Thank You for Reaching Out!',
    'modal.successDesc': 'Our Nagapattinam team has received your enquiry. We will call you shortly.',
    'modal.openWhatsapp': 'Open in WhatsApp',
    'modal.close': 'Close'
  },
  ta: {
    // Navbar
    'nav.home': 'முகப்பு',
    'nav.services': 'சேவைகள்',
    'nav.about': 'எங்களை பற்றி',
    'nav.contact': 'தொடர்புக்கு',
    'nav.enquireNow': 'விசாரிக்க',
    'nav.switchLanguage': 'மொழியை மாற்றுக',

    // Hero Section
    'hero.eyebrow': 'கடன்கள் | காப்பீடு | முதலீடுகள்',
    'hero.heading1': 'உங்கள் கனவுகளுக்கு',
    'hero.heading2': 'நிதி ஒரு தடையல்ல!',
    'hero.desc': 'வீட்டுக் கடன் முதல் வியாபாரக் கடன் வரை, உங்கள் தேவைக்கு ஏற்ற நிதிச் சேவைகளைத் தேர்ந்தெடுக்க நாங்கள் வழிகாட்டுகிறோம்.',
    'hero.callNow': 'எங்களை அழைக்க',
    'hero.whatsapp': 'வாட்ஸ்அப்பில் பேசுங்கள்',
    'hero.trust1Title': 'நம்பிக்கையான ஆலோசனை',
    'hero.trust1Subtitle': 'உங்கள் தேவைக்கு ஏற்ற வழிகாட்டுதல்',
    'hero.trust2Title': 'உங்கள் தேவைக்கு ஏற்ற உதவி',
    'hero.trust2Subtitle': 'ஒவ்வொரு தேவைக்கும் உரிய அணுகுமுறை',
    'hero.trust3Title': 'எளிய நிதி ஆலோசனை',
    'hero.trust3Subtitle': 'தெளிவான தேர்வுகளுடன் முன்னேறுங்கள்',
    'hero.trust1': 'நம்பிக்கையான ஆலோசனை',
    'hero.trust2': 'உங்கள் தேவைக்கு ஏற்ற உதவி',
    'hero.trust3': 'எளிய நிதி ஆலோசனை',

    // Services Section
    'services.eyebrow': 'சேவைகள்',
    'services.title': 'நிதி சேவைகள்',
    'services.desc': 'நாகப்பட்டினத்தில் கடன், காப்பீடு மற்றும் முதலீட்டுச் சேவைகள் பற்றிய வழிகாட்டுதலைப் பெறுங்கள்.',
    'services.call': 'அழைக்க',
    'services.whatsapp': 'வாட்ஸ்அப்',
    'services.sliderPrev': 'முந்தைய சேவை',
    'services.sliderNext': 'அடுத்த சேவை',

    // About Section
    'about.eyebrow': 'எங்களை பற்றி',
    'about.title1': 'உங்கள் நம்பிக்கைக்குரிய',
    'about.title2': 'நிதி வழிகாட்டி',
    'about.desc': 'EasyCash Financial Services மூலம் பல்வேறு கடன், காப்பீடு மற்றும் முதலீட்டுச் சேவைகள் பற்றிய தகவல்களைப் பெறலாம். உங்கள் தேவைக்கு ஏற்ற சேவையைத் தேர்ந்தெடுக்க நாங்கள் வழிகாட்டுகிறோம்.',
    'about.signature1': 'மக்கள்',
    'about.signature2': 'திட்டங்கள்',
    'about.signature3': 'வளர்ச்சி',
    'about.p1Title': 'நம்பகமான வழிகாட்டுதல்',
    'about.p1Desc': 'கடன் விவரங்களைத் தெளிவாகப் புரிந்துகொள்ள உதவி.',
    'about.p2Title': 'பாதுகாப்பான நடைமுறை',
    'about.p2Desc': 'வங்கிகள் மற்றும் நிதி நிறுவனங்கள் வழங்கும் சேவைகளைப் புரிந்துகொள்ள வழிகாட்டுதல்.',
    'about.p3Title': 'பல்வேறு கடன் திட்டங்கள்',
    'about.p3Desc': 'வீட்டுக் கடன், தனிநபர் கடன், வியாபாரக் கடன், தங்கக் கடன் உள்ளிட்ட பல சேவைகள்.',
    'about.p4Title': 'வாடிக்கையாளர் முன்னுரிமை',
    'about.p4Desc': 'நாகப்பட்டினத்தில் உங்கள் நிதித் தேவைகளுக்கு ஏற்ற வழிகாட்டுதல்.',
    'about.termsTitle': 'விதிமுறைகள் & நிபந்தனைகள் உட்பட்டவை.',
    'about.termsDesc': 'கடன் ஒப்புதல் வங்கி மற்றும் NBFC விதிமுறைகளுக்கு உட்பட்டது. வட்டி விகிதங்கள் மற்றும் செயலாக்க நேரம் தனிநபர் விவரங்களின் அடிப்படையில் மாறுபடலாம்.',
    'about.enquireNow': 'விசாரிக்க',

    // Contact Section
    'contact.eyebrow': 'தொடர்பு கொள்ள',
    'contact.title': 'தொடர்புக்கு',
    'contact.desc': 'கடன் அல்லது நிதிச் சேவைகள் பற்றி தெரிந்துகொள்ள வேண்டுமா? எங்களைத் தொடர்புகொள்ளுங்கள்.',
    'contact.consultantTitle': 'கிளை மேலாளர்',
    'contact.consultantRole': 'கிளை மேலாளர் & நிதி ஆலோசகர்',
    'contact.consultantName': 'எஸ். பாலச்சந்திரன்',
    'contact.consultantOrg': 'ஈசிகேஷ் பைனான்சியல் சர்வீசஸ்',
    'contact.phoneLabel': 'நேரடி அழைப்பு',
    'contact.whatsappLabel': 'வாட்ஸ்அப்',
    'contact.emailLabel': 'மின்னஞ்சல் முகவரி',
    'contact.locationLabel': 'கிளை அலுவலக முகவரி',
    'contact.locationVal': 'எண். 6, நடுவர் சன்னதி தெரு, டாக்டர் ரமணன் கிளினிக் மாடியில், நாகப்பட்டினம் – 611001, தமிழ்நாடு.',
    'contact.companyLabel': 'நிறுவனம்',
    'contact.callNow': 'இப்போது அழைக்கவும்',
    'contact.whatsapp': 'வாட்ஸ்அப்பில் தொடர்புகொள்ள',
    'contact.emailNow': 'மின்னஞ்சல் அனுப்ப',
    'contact.managerLabel': 'கிளை மேலாளர்',
    'contact.videoEyebrow': 'கடன் சம்பந்தமான சந்தேகங்களா?',
    'contact.videoLine1': 'கடன் மற்றும்',
    'contact.videoLine2': 'நிதிச் சேவைகள் பற்றிய விவரங்களுக்கு',
    'contact.videoLine3': 'மேலும் விவரங்களுக்கு EasyCash-ஐத் தொடர்புகொள்ளுங்கள்!',
    'contact.videoPlay': 'வீடியோ இயக்க',
    'contact.videoPause': 'வீடியோ இடைநிறுத்த',

    // Contact Form
    'contact.formTitle': 'கடன் & சேவை பற்றிய விசாரணை',
    'contact.formDesc': 'உங்கள் பெயர், கைபேசி எண் மற்றும் தேவையான சேவையைத் தெரிவியுங்கள். எங்கள் குழுவினர் உங்களைத் தொடர்புகொள்வார்கள்.',
    'contact.nameLabel': 'உங்கள் பெயர்',
    'contact.namePlaceholder': 'எ.கா. ரமேஷ் குமார்',
    'contact.phoneLabel2': 'கைபேசி எண்',
    'contact.phonePlaceholder': '10 இலக்க கைபேசி எண்',
    'contact.serviceLabel': 'உங்களுக்குத் தேவையான சேவை',
    'contact.serviceSelectDefault': 'சேவையைத் தேர்ந்தெடுக்கவும்',
    'contact.messageLabel': 'கூடுதல் விவரங்கள் (விருப்பமிருந்தால்)',
    'contact.messagePlaceholder': 'உங்களுக்கு தேவையான கடன் தொகை அல்லது சந்தேகங்களை உள்ளிடவும்...',
    'contact.submitBtn': 'விவரங்களை அனுப்பவும்',
    'contact.submitting': 'அனுப்பப்படுகிறது...',
    'contact.callDirectly': 'இப்போது அழைக்கவும்',
    'contact.chatWhatsapp': 'வாட்ஸ்அப்பில் தொடர்புகொள்ள',
    'contact.successTitle': 'விசாரணை வெற்றிகரமாக பெறப்பட்டது!',
    'contact.successDesc': 'நன்றி! எங்கள் நாகப்பட்டினம் அலுவலகப் பிரதிநிதி விரைவில் உங்களைத் தொடர்புகொள்வார்.',
    'contact.errName': 'தயவுசெய்து உங்கள் முழு பெயரை உள்ளிடவும்.',
    'contact.errPhone': 'தயவுசெய்து சரியான 10 இலக்க கைபேசி எண்ணை உள்ளிடவும்.',
    'contact.sendAnother': 'மற்றுமொரு விசாரணை அனுப்ப',

    // Footer
    'footer.tagline': 'உங்கள் நிதித் தேவைகளுக்கு ஏற்ற சேவைகளைத் தேர்ந்தெடுக்க உதவுகிறோம்.',
    'footer.quickLinks': 'முக்கிய இணைப்புகள்',
    'footer.socialMedia': 'சமூக ஊடகங்கள்',
    'footer.getInTouch': 'தொடர்புக்கு',
    'footer.enquireNow': 'விசாரிக்க',
    'footer.chatOnWhatsapp': 'வாட்ஸ்அப்பில் தொடர்புகொள்ள',
    'footer.copyright': '© 2024 EasyCash Financial Services. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    'footer.terms': 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
    'footer.privacy': 'தனியுரிமைக் கொள்கை',
    'footer.disclaimer': 'பொறுப்பு வரம்பு குறித்த அறிவிப்பு',

    // Modal
    'modal.branch': 'நாகப்பட்டினம் கிளை',
    'modal.title': 'சேவை விசாரணை',
    'modal.desc': 'எங்கள் உள்ளூர் கிளையிலிருந்து உடனடி நிதி வழிகாட்டுதலைப் பெறுங்கள்.',
    'modal.name': 'உங்கள் பெயர்',
    'modal.phone': 'கைபேசி எண்',
    'modal.submit': 'விசாரணையை சமர்ப்பிக்க',
    'modal.callNow': 'அழைக்க',
    'modal.successTitle': 'தொடர்பு கொண்டமைக்கு நன்றி!',
    'modal.successDesc': 'உங்கள் விசாரணை பெறப்பட்டது. விரைவில் உங்களை அழைப்போம்.',
    'modal.openWhatsapp': 'வாட்ஸ்அப்பில் திறக்க',
    'modal.close': 'மூடு'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('easycash_lang');
      if (saved === 'ta' || saved === 'en') return saved;
    } catch {
      // fallback
    }
    return 'en';
  });

  useEffect(() => {
    // Set document lang attribute dynamically for screen readers, SEO, and browsers
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('easycash_lang', newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ta' : 'en');
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
