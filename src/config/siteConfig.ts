export interface ServiceSlideItem {
  id: string;
  title: string;
  titleEn: string;
  titleTa: string;
  iconType: string;
  badge?: string;
}

export const homeServices: ServiceSlideItem[] = [
  { id: 'home-loan', title: 'Home Loan', titleEn: 'Home Loan', titleTa: 'வீடு வாங்குவதற்கான கடன்', iconType: 'home' },
  { id: 'personal-loan', title: 'Personal Loan', titleEn: 'Personal Loan', titleTa: 'தனிநபர் கடன்', iconType: 'user' },
  { id: 'business-loan', title: 'Business Loan', titleEn: 'Business Loan', titleTa: 'வியாபாரக் கடன்', iconType: 'business' },
  { id: 'education-loan', title: 'Education Loan', titleEn: 'Education Loan', titleTa: 'கல்வி கடன்', iconType: 'education' },
  { id: 'gold-loan', title: 'Gold Loan', titleEn: 'Gold Loan', titleTa: 'தங்கக் கடன்', iconType: 'gold' },
  { id: 'insurance', title: 'Insurance', titleEn: 'Insurance', titleTa: 'காப்பீடு', iconType: 'insurance' },
  { id: 'loan-against-property', title: 'Loan Against Property', titleEn: 'Loan Against Property', titleTa: 'சொத்தை அடமானம் வைத்து கடன்', iconType: 'property-loan' },
  { id: 'home-appliances-loan', title: 'Home Appliances Loan', titleEn: 'Home Appliances Loan', titleTa: 'வீட்டு உபயோகப் பொருட்கள் கடன்', iconType: 'appliances' },
  { id: 'furniture-loan', title: 'Furniture Loan', titleEn: 'Furniture Loan', titleTa: 'மரச்சாமான்கள் வாங்குவதற்கான கடன்', iconType: 'furniture' },
  { id: 'shares-investments', title: 'Shares & Investments', titleEn: 'Shares & Investments', titleTa: 'பங்குகள் மற்றும் முதலீடுகள்', iconType: 'investments' },
  { id: 'mutual-funds', title: 'Mutual Funds', titleEn: 'Mutual Funds', titleTa: 'பரஸ்பர நிதி முதலீடுகள்', iconType: 'funds' },
  { id: 'life-insurance', title: 'Life Insurance', titleEn: 'Life Insurance', titleTa: 'ஆயுள் காப்பீடு', iconType: 'life-insurance' },
  { id: 'health-insurance', title: 'Health Insurance', titleEn: 'Health Insurance', titleTa: 'மருத்துவக் காப்பீடு', iconType: 'health-insurance' },
  { id: 'job-placement', title: 'Job Placement', titleEn: 'Job Placement', titleTa: 'வேலை வாய்ப்பு', iconType: 'job' },
  { id: 'property-development', title: 'Property Development', titleEn: 'Property Development', titleTa: 'சொத்து மேம்பாடு', iconType: 'property-dev' },
];

export const siteConfig = {
  companyName: 'EASYCASH',
  subtitle: 'FINANCIAL SERVICES',
  motto: '(Service Is Our Motta)',
  taglineEyebrow: 'LOANS | INSURANCE | INVESTMENTS',
  phone: '+919842097056',
  phoneDisplay: '+91 98420 97056',
  whatsappNumber: '919842097056',
  whatsappMessage: 'Hello EasyCash Financial Services Nagapattinam, I would like to enquire about your services.',
  managerName: 'S. Balachandran',
  managerNameTa: 'எஸ். பாலச்சந்திரன்',
  managerTitle: 'Branch Manager / Financial Consultant',
  managerTitleTa: 'கிளை மேலாளர் / நிதி ஆலோசகர்',
  email: 'easycashfinancial@gmail.com',
  address: 'No. 6, Naduvar Sannathi Street, Dr. Ramanan Clinic Upstairs, Nagapattinam – 611001, Tamil Nadu.',
  addressTa: 'எண். 6, நடுவர் சன்னதி தெரு, டாக்டர் ரமணன் கிளினிக் மாடியில், நாகப்பட்டினம் – 611001, தமிழ்நாடு.',
  location: 'Nagapattinam, Tamil Nadu',
  locationTa: 'நாகப்பட்டினம், தமிழ்நாடு',
  instagramUrl: 'https://www.instagram.com/easycash_financial_services/?hl=en',
  facebookUrl: 'https://www.facebook.com/EasyCashFinancialServices/'
};
