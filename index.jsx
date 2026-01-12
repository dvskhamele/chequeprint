import React, { useState, useEffect, useMemo } from 'react';
import { 
  Printer, 
  Users, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  Search, 
  CheckCircle, 
  Download, 
  PlayCircle, 
  Briefcase, 
  Globe,
  HelpCircle,
  X,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Server,
  Lock,
  ArrowRight,
  Info,
  UploadCloud,
  Zap,
  Brain,
  Layers,
  FileSpreadsheet,
  CheckSquare,
  List,
  Save,
  Eye
} from 'lucide-react';

// --- LOCALIZATION ENGINE ---
const LANGUAGES = {
  en: { label: "English", flag: "🇬🇧" },
  hi: { label: "हिंदी", flag: "🇮🇳" },
  bn: { label: "বাংলা", flag: "🇮🇳" },
  or: { label: "ଓଡ଼ିଆ", flag: "🇮🇳" }
};

const TRANSLATIONS = {
  en: {
    appTitle: "ChequeGenerator Pro",
    subtitle: "Enterprise Automation Edition for Utkal Polyweave Industries Pvt. Ltd.",
    welcome: "Welcome back, T. N. Singh",
    dashboard: "Command Center",
    bulkGen: "Bulk Builder (Main)",
    chequeGen: "Quick Cheque",
    payAdvice: "Payment Advice",
    partyMaster: "Vendor Master",
    register: "Audit Register",
    plans: "Enterprise Plans",
    
    // Exact UI Headers (Mandatory)
    bank_header: "SELECT BANK ACCOUNT",
    ac_payee: "A/C PAYEE ONLY",
    cheque_header: "Cheque Generator — State Bank of India",
    date_format: "Date (DDMMYYYY)",
    advice_header: "Payment Advice",
    advice_payee: "PAYEE NAME:",
    advice_refs: "BILL REFERENCES:",
    vendor_select: "Select Vendor (e.g., Ganpati Plastic)",
    vendor_bal: "Vendor Balance: ₹0/-",
    reg_header: "Cheque Register",
    reg_amount: "AMOUNT (₹)",
    auth_sig: "AUTHORISED SIGNATORY",

    // Tooltips (Mandatory)
    tip_bank: "System will auto-fill cheque settings based on the bank.",
    tip_party: "No need to type details again. System remembers vendor details.",
    tip_cheque: "Just enter the amount. Everything else is automatic.",
    tip_advice: "All fields copied from the cheque. No retyping needed.",
    tip_register: "Every cheque you generate is saved here automatically.",
    
    // Bulk Specific
    step_input: "1. Input Invoices",
    step_review: "2. Auto-Group",
    step_print: "3. Bulk Print",
    upload_csv: "Upload CSV",
    auto_group: "Auto-Grouping Active",
    
    // Onboarding
    ob1_title: "Utkal Polyweave Enterprise Suite",
    ob1_desc: "Your all-in-one automation for Cheques, Advices, and Bulk Payments.",
    ob2_title: "Bulk Automation Engine",
    ob2_desc: "Upload one Excel sheet -> Generate 300 Cheques instantly.",
    ob3_title: "Quick Cheque Mode",
    ob3_desc: "Zero-typing tool for urgent single payments.",
    ob4_title: "Smart Memory",
    ob4_desc: "System remembers every vendor, bank, and bill pattern.",
    start: "Start System",
    prev: "Back",
    next: "Next",

    // Actions
    generate_link: "Generate Cheque + Advice",
    approve_save: "Approve & Save to Register",
    generate_all: "Generate All Cheques",
    
    // Common
    amount_words: "Amount in Words",
    purpose: "Purpose",
  },
  hi: {
    appTitle: "चेक जनरेटर प्रो",
    subtitle: "उत्कल पॉलीविव इंडस्ट्रीज के लिए एंटरप्राइज ऑटोमेशन संस्करण",
    welcome: "स्वागत है, टी. एन. सिंह",
    dashboard: "कमांड सेंटर",
    bulkGen: "बल्क बिल्डर (मुख्य)",
    chequeGen: "क्विक चेक",
    payAdvice: "पेमेंट एडवाइस",
    partyMaster: "वेंडर मास्टर",
    register: "ऑडिट रजिस्टर",
    plans: "एंटरप्राइज़ प्लान",
    
    bank_header: "बैंक खाता चुनें",
    ac_payee: "केवल A/C Payee",
    cheque_header: "चेक जनरेटर — स्टेट बैंक ऑफ इंडिया",
    date_format: "तारीख (DDMMYYYY)",
    advice_header: "पेमेंट एडवाइस",
    advice_payee: "पाने वाले का नाम:",
    advice_refs: "बिल संदर्भ:",
    vendor_select: "वेंडर चुनें (जैसे गणपति प्लास्टिक)",
    vendor_bal: "वेंडर बैलेंस: ₹0/-",
    reg_header: "चेक रजिस्टर",
    reg_amount: "राशि (₹)",
    auth_sig: "अधिकृत हस्ताक्षरकर्ता",

    tip_bank: "सिस्टम बैंक के आधार पर चेक सेटिंग्स अपने आप भर देगा।",
    tip_party: "विवरण दोबारा टाइप करने की आवश्यकता नहीं है। सिस्टम वेंडर विवरण याद रखता है।",
    tip_cheque: "बस राशि दर्ज करें। बाकी सब कुछ स्वचालित है।",
    tip_advice: "सभी फ़ील्ड चेक से कॉपी किए गए हैं। दोबारा टाइप करने की आवश्यकता नहीं है।",
    tip_register: "आपके द्वारा बनाया गया हर चेक यहां अपने आप सहेज लिया जाता है।",

    step_input: "1. चालान डालें",
    step_review: "2. ऑटो-ग्रुप",
    step_print: "3. एक साथ प्रिंट",
    upload_csv: "CSV अपलोड करें",
    auto_group: "ऑटो-ग्रुपिंग सक्रिय",

    ob1_title: "उत्कल पॉलीविव एंटरप्राइज सुइट",
    ob1_desc: "चेक, एडवाइस और बल्क पेमेंट के लिए आपका ऑल-इन-वन ऑटोमेशन।",
    ob2_title: "बल्क ऑटोमेशन इंजन",
    ob2_desc: "एक एक्सेल शीट अपलोड करें -> तुरंत 300 चेक बनाएं।",
    ob3_title: "क्विक चेक मोड",
    ob3_desc: "तत्काल एकल भुगतान के लिए जीरो-टाइपिंग टूल।",
    ob4_title: "स्मार्ट मेमोरी",
    ob4_desc: "सिस्टम हर वेंडर, बैंक और बिल पैटर्न को याद रखता है।",
    start: "सिस्टम शुरू करें",
    prev: "पीछे",
    next: "अगला",

    generate_link: "चेक + एडवाइस बनाएं",
    approve_save: "मंजूर करें और रजिस्टर में सहेजें",
    generate_all: "सभी चेक बनाएं",
    
    amount_words: "शब्दों में राशि",
    purpose: "उद्देश्य",
  },
  bn: {
    appTitle: "চেক জেনারেটর প্রো",
    subtitle: "উৎকল পলিওয়েভ ইন্ডাস্ট্রিজের জন্য এন্টারপ্রাইজ অটোমেশন এডিশন",
    welcome: "স্বাগতম, টি. এন. সিং",
    dashboard: "কমান্ড সেন্টার",
    bulkGen: "বাল্ক বিল্ডার (প্রধান)",
    chequeGen: "কুইক চেক",
    payAdvice: "পেমেন্ট অ্যাডভাইস",
    partyMaster: "ভেন্ডর মাস্টার",
    register: "অডিট রেজিস্টার",
    plans: "এন্টারপ্রাইজ প্ল্যান",
    
    bank_header: "ব্যাংক অ্যাকাউন্ট নির্বাচন করুন",
    ac_payee: "শুধুমাত্র A/C Payee",
    cheque_header: "চেক জেনারেটর — স্টেট ব্যাংক অফ ইন্ডিয়া",
    date_format: "তারিখ (DDMMYYYY)",
    advice_header: "পেমেন্ট অ্যাডভাইস",
    advice_payee: "প্রাপকের নাম:",
    advice_refs: "বিল রেফারেন্স:",
    vendor_select: "ভেন্ডর নির্বাচন করুন (যেমন গণপতি প্লাস্টিক)",
    vendor_bal: "ভেন্ডর ব্যালেন্স: ₹০/-",
    reg_header: "চেক রেজিস্টার",
    reg_amount: "টাকার পরিমাণ (₹)",
    auth_sig: "অনুমোদিত স্বাক্ষরকারী",

    tip_bank: "সিস্টেম ব্যাংকের উপর ভিত্তি করে চেক সেটিংস স্বয়ংক্রিয়ভাবে পূরণ করবে।",
    tip_party: "বিস্তারিত আবার টাইপ করার দরকার নেই। সিস্টেম ভেন্ডর তথ্য মনে রাখে।",
    tip_cheque: "শুধু টাকার পরিমাণ লিখুন। বাকি সবকিছু স্বয়ংক্রিয়।",
    tip_advice: "সব তথ্য চেক থেকে কপি করা হয়েছে। পুনরায় টাইপ করার প্রয়োজন নেই।",
    tip_register: "আপনার তৈরি প্রতিটি চেক এখানে স্বয়ংক্রিয়ভাবে সেভ হয়।",

    step_input: "১. ইনভয়েস দিন",
    step_review: "২. অটো-গ্রুপ",
    step_print: "৩. বাল্ক প্রিন্ট",
    upload_csv: "CSV আপলোড",
    auto_group: "অটো-গ্রুপিং চালু",

    ob1_title: "উৎকল পলিওয়েভ এন্টারপ্রাইজ স্যুট",
    ob1_desc: "চেক, অ্যাডভাইস এবং বাল্ক পেমেন্টের জন্য আপনার অল-ইন-ওয়ান অটোমেশন।",
    ob2_title: "বাল্ক অটোমেশন ইঞ্জিন",
    ob2_desc: "একটি এক্সেল শিট আপলোড করুন -> অবিলম্বে ৩০০ চেক তৈরি করুন।",
    ob3_title: "কুইক চেক মোড",
    ob3_desc: "জরুরী একক পেমেন্টের জন্য জিরো-টাইপিং টুল।",
    ob4_title: "স্মার্ট মেমরি",
    ob4_desc: "সিস্টেম প্রতিটি ভেন্ডর, ব্যাংক এবং বিল প্যাটার্ন মনে রাখে।",
    start: "শুরু করুন",
    prev: "পেছনে",
    next: "পরবর্তী",

    generate_link: "চেক + অ্যাডভাইস তৈরি করুন",
    approve_save: "অনুমোদন করুন এবং রেজিস্টারে সেভ করুন",
    generate_all: "সব চেক তৈরি করুন",
    
    amount_words: "কথায়",
    purpose: "উদ্দেশ্য",
  },
  or: {
    appTitle: "ଚେକ୍ ଜେନେରେଟର ପ୍ରୋ",
    subtitle: "ଉତ୍କଳ ପଲିୱେଭ୍ ଇଣ୍ଡଷ୍ଟ୍ରିଜ୍ ପାଇଁ ଏଣ୍ଟରପ୍ରାଇଜ୍ ଅଟୋମେସନ୍ ସଂସ୍କରଣ",
    welcome: "ସ୍ୱାଗତ, ଟି. ଏନ୍. ସିଂହ",
    dashboard: "କମାଣ୍ଡ ସେଣ୍ଟର",
    bulkGen: "ବଲ୍କ ବିଲଡର (ମୁଖ୍ୟ)",
    chequeGen: "କ୍ୱିକ୍ ଚେକ୍",
    payAdvice: "ପେମେଣ୍ଟ ଆଡଭାଇସ୍",
    partyMaster: "ଭେଣ୍ଡର ମାଷ୍ଟର",
    register: "ଅଡିଟ୍ ରେଜିଷ୍ଟର",
    plans: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ପ୍ଲାନ",
    
    bank_header: "ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ବାଛନ୍ତୁ",
    ac_payee: "କେବଳ A/C Payee",
    cheque_header: "ଚେକ୍ ଜେନେରେଟର — ଷ୍ଟେଟ୍ ବ୍ୟାଙ୍କ ଅଫ୍ ଇଣ୍ଡିଆ",
    date_format: "ତାରିଖ (DDMMYYYY)",
    advice_header: "ପେମେଣ୍ଟ ଆଡଭାଇସ୍",
    advice_payee: "ପ୍ରାପକଙ୍କ ନାମ:",
    advice_refs: "ବିଲ୍ ରେଫରେନ୍ସ:",
    vendor_select: "ଭେଣ୍ଡର ବାଛନ୍ତୁ (ଯେପରି ଗଣପତି ପ୍ଲାଷ୍ଟିକ୍)",
    vendor_bal: "ଭେଣ୍ଡର ବାଲାନ୍ସ: ₹୦/-",
    reg_header: "ଚେକ୍ ରେଜିଷ୍ଟର",
    reg_amount: "ରାଶି (ଟଙ୍କା)",
    auth_sig: "ଅନୁମୋଦିତ ସ୍ୱାକ୍ଷରକାରୀ",

    tip_bank: "ସିଷ୍ଟମ୍ ବ୍ୟାଙ୍କ ଆଧାରରେ ଚେକ୍ ସେଟିଙ୍ଗ୍ସ ନିଜେ ପୂରଣ କରିବ |",
    tip_party: "ବିବରଣୀ ପୁଣି ଟାଇପ୍ କରିବା ଆବଶ୍ୟକ ନାହିଁ | ସିଷ୍ଟମ୍ ଭେଣ୍ଡର ବିବରଣୀ ମନେରଖେ |",
    tip_cheque: "କେବଳ ରାଶି ଲେଖନ୍ତୁ | ବାକି ସବୁ ସ୍ୱୟଂଚାଳିତ |",
    tip_advice: "ସମସ୍ତ ତଥ୍ୟ ଚେକ୍ ରୁ କପି କରାଯାଇଛି | ପୁନର୍ବାର ଟାଇପ୍ କରିବା ଆବଶ୍ୟକ ନାହିଁ |",
    tip_register: "ଆପଣ ତିଆରି କରିଥିବା ପ୍ରତ୍ୟେକ ଚେକ୍ ଏଠାରେ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ସେଭ୍ ହୁଏ |",

    step_input: "୧. ବିଲ୍ ଦିଅନ୍ତୁ",
    step_review: "୨. ଅଟୋ-ଗ୍ରୁପ୍",
    step_print: "୩. ବଲ୍କ ପ୍ରିଣ୍ଟ",
    upload_csv: "CSV ଅପଲୋଡ୍",
    auto_group: "ଅଟୋ-ଗ୍ରୁପିଙ୍ଗ୍ ସକ୍ରିୟ",

    ob1_title: "ଉତ୍କଳ ପଲିୱେଭ୍ ଏଣ୍ଟରପ୍ରାଇଜ୍ ସୁଇଟ୍",
    ob1_desc: "ଚେକ୍, ଆଡଭାଇସ୍ ଏବଂ ବଲ୍କ ପେମେଣ୍ଟ ପାଇଁ ଆପଣଙ୍କର ଅଲ-ଇନ୍-ୱାନ୍ ଅଟୋମେସନ୍ |",
    ob2_title: "ବଲ୍କ ଅଟୋମେସନ୍ ଇଞ୍ଜିନ୍",
    ob2_desc: "ଗୋଟିଏ ଏକ୍ସେଲ୍ ସିଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ -> ତୁରନ୍ତ ୩୦୦ ଚେକ୍ ତିଆରି କରନ୍ତୁ |",
    ob3_title: "କ୍ୱିକ୍ ଚେକ୍ ମୋଡ୍",
    ob3_desc: "ଜରୁରୀ ଏକକ ପେମେଣ୍ଟ ପାଇଁ ଜିରୋ-ଟାଇପିଂ ଟୁଲ୍ |",
    ob4_title: "ସ୍ମାର୍ଟ ମେମୋରୀ",
    ob4_desc: "ସିଷ୍ଟମ୍ ପ୍ରତ୍ୟେକ ଭେଣ୍ଡର, ବ୍ୟାଙ୍କ ଏବଂ ବିଲ୍ ପ୍ୟାଟର୍ନ ମନେରଖେ |",
    start: "ଆରମ୍ଭ କରନ୍ତୁ",
    prev: "ପଛକୁ",
    next: "ପରବର୍ତ୍ତୀ",

    generate_link: "ଚେକ୍ + ଆଡଭାଇସ୍ ତିଆରି କରନ୍ତୁ",
    approve_save: "ଅନୁମୋଦନ କରନ୍ତୁ ଏବଂ ରେଜିଷ୍ଟରରେ ସେଭ୍ କରନ୍ତୁ",
    generate_all: "ସମସ୍ତ ଚେକ୍ ତିଆରି କରନ୍ତୁ",
    
    amount_words: "ଶବ୍ଦରେ",
    purpose: "ଉଦ୍ଦେଶ୍ୟ",
  }
};

// --- DATA & MEMORY ---
const VENDOR_MEMORY = [
  { id: 1, name: "Ganpati Plastic", bank: "HDFC Bank", acc: "50200045112233", ifsc: "HDFC0001234", ledger: "Raw Material - Granules", purpose: "Granules Supply Bill" },
  { id: 2, name: "Vakrangee Packaging LLP", bank: "SBI", acc: "305600223344", ifsc: "SBIN0002233", ledger: "Packing Material", purpose: "Packaging Material Inv" },
  { id: 3, name: "Prem Packaging", bank: "Axis Bank", acc: "91501002233", ifsc: "UTIB0001122", ledger: "PP Fabric Purchase", purpose: "Fabric Roll Supply" },
  { id: 4, name: "S.S. Polymers", bank: "ICICI Bank", acc: "000405009988", ifsc: "ICIC0000004", ledger: "Masterbatch Supply", purpose: "Masterbatch Purchase" }
];

const BANK_MEMORY = {
  SBI: { lastCheque: 45102, label: "STATE BANK OF INDIA", color: "#e3f2fd", acPayeeDefault: true },
  HDFC: { lastCheque: 100234, label: "HDFC BANK", color: "#e0f2f1", acPayeeDefault: true },
  ICICI: { lastCheque: 88901, label: "ICICI BANK", color: "#fff3e0", acPayeeDefault: true },
  Axis: { lastCheque: 22011, label: "AXIS BANK", color: "#f3e5f5", acPayeeDefault: true },
  PNB: { lastCheque: 55601, label: "PUNJAB NATIONAL BANK", color: "#ffebee", acPayeeDefault: true }
};

// --- UTILS ---
const numToWords = (num) => {
  if (!num || num === 0) return "";
  const a = ['','One ','Two ','Three ','Four ','Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const convert = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n/10)] + (n%10? ' ' + a[n%10] : '');
    if (n < 1000) return a[Math.floor(n/100)] + 'Hundred ' + convert(n%100);
    if (n < 100000) return convert(Math.floor(n/1000)) + 'Thousand ' + convert(n%1000);
    if (n < 10000000) return convert(Math.floor(n/100000)) + 'Lakh ' + convert(n%100000);
    return convert(Math.floor(n/10000000)) + 'Crore ' + convert(n%10000000);
  }
  return convert(Number(num)) + "Only";
};

// --- PACKAGING INDUSTRY SAMPLE DATA ---
const SAMPLE_REGISTER = [
  { id: 45100, date: "2025-10-01", party: "Ganpati Plastic", amount: 120000, bank: "SBI", status: "Cleared", notes: "Inv #GP/24-25/104" },
  { id: 45101, date: "2025-10-02", party: "Prem Packaging", amount: 45000, bank: "SBI", status: "Issued", notes: "Oct Supply" }
];

// --- COMPONENTS ---

// 1. ONBOARDING WIZARD
const Onboarding = ({ lang, t, onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: t('ob1_title'), desc: t('ob1_desc'), icon: <Briefcase size={64} className="text-blue-600"/> },
    { title: t('ob2_title'), desc: t('ob2_desc'), icon: <Layers size={64} className="text-purple-600"/> },
    { title: t('ob3_title'), desc: t('ob3_desc'), icon: <Zap size={64} className="text-orange-600"/> },
    { title: t('ob4_title'), desc: t('ob4_desc'), icon: <Brain size={64} className="text-green-600"/> },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 text-center border-t-8 border-blue-600">
        <div className="flex justify-center mb-6 bg-slate-50 p-6 rounded-full w-32 h-32 mx-auto items-center">
          {steps[step].icon}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{steps[step].title}</h2>
        <p className="text-slate-600 mb-8 text-lg">{steps[step].desc}</p>
        
        <div className="flex gap-2 justify-center mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'}`}></div>
          ))}
        </div>

        <div className="flex justify-between">
          <button 
            onClick={() => step > 0 ? setStep(step - 1) : null}
            className={`flex items-center text-slate-500 font-bold ${step === 0 ? 'opacity-0' : ''}`}
          >
            <ChevronLeft/> {t('prev')}
          </button>
          
          {step < steps.length - 1 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-blue-700"
            >
              {t('next')} <ChevronRight size={18}/>
            </button>
          ) : (
            <button 
              onClick={onComplete}
              className="bg-green-600 text-white px-8 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-green-700 shadow-lg"
            >
              {t('start')} <PlayCircle size={18}/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. BULK AUTOMATION ENGINE (The Main "Volume" Driver)
const BulkAutomation = ({ t, vendors, onRegisterUpdate }) => {
  const [step, setStep] = useState(1);
  const [invoices] = useState([
    { id: 1, vendorId: 1, invNo: "GP/001", amount: 125000, date: "2025-10-01" },
    { id: 2, vendorId: 1, invNo: "GP/004", amount: 50000, date: "2025-10-02" },
    { id: 3, vendorId: 2, invNo: "VAK/992", amount: 210000, date: "2025-10-05" },
    { id: 4, vendorId: 3, invNo: "PREM/88", amount: 45000, date: "2025-10-06" },
  ]);

  const groupedPayments = useMemo(() => {
    const groups = {};
    invoices.forEach(inv => {
      if (!groups[inv.vendorId]) {
        groups[inv.vendorId] = {
          vendor: vendors.find(v => v.id === inv.vendorId),
          invoices: [],
          totalAmount: 0
        };
      }
      groups[inv.vendorId].invoices.push(inv);
      groups[inv.vendorId].totalAmount += inv.amount;
    });
    return Object.values(groups);
  }, [invoices, vendors]);

  const handleSimulatedUpload = () => {
    alert("SIMULATION: Reading 'Invoices_Oct_2025.csv'...\n\nFound 45 invoices.\nMatched 4 known vendors.\nAuto-grouped successfully.");
    setStep(2);
  };

  const handleBulkPrint = () => {
    // Add all to register
    groupedPayments.forEach((group, idx) => {
        const newEntry = {
            id: BANK_MEMORY[group.vendor.bank.split(' ')[0]]?.lastCheque + idx + 1,
            date: new Date().toISOString().split('T')[0],
            party: group.vendor.name,
            amount: group.totalAmount,
            bank: group.vendor.bank.split(' ')[0], // Simulating bank extraction
            status: 'Issued'
        };
        onRegisterUpdate(newEntry);
    });
    alert("Success: Batch Printed & Register Updated!");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Wizard Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className={`flex items-center gap-2 ${step===1 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <div className="bg-slate-100 p-2 rounded-full"><UploadCloud size={20}/></div> {t('step_input')}
        </div>
        <ChevronRight className="text-slate-300"/>
        <div className={`flex items-center gap-2 ${step===2 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <div className="bg-slate-100 p-2 rounded-full"><Layers size={20}/></div> {t('step_review')}
        </div>
        <ChevronRight className="text-slate-300"/>
        <div className={`flex items-center gap-2 ${step===3 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <div className="bg-slate-100 p-2 rounded-full"><Printer size={20}/></div> {t('step_print')}
        </div>
      </div>

      {/* STEP 1: INPUT */}
      {step === 1 && (
        <div className="flex-1 bg-white rounded-xl shadow p-8 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors">
          <FileSpreadsheet size={64} className="text-slate-300 mb-4"/>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Drag & Drop Invoices CSV</h2>
          <p className="text-slate-500 mb-6 max-w-md">System will auto-read vendor names, amounts, and dates. We automatically group multiple bills from the same vendor.</p>
          <div className="flex gap-4">
            <button onClick={handleSimulatedUpload} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 flex items-center gap-2">
              <UploadCloud size={20}/> {t('upload_csv')}
            </button>
            <button onClick={() => setStep(2)} className="bg-slate-100 text-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-200">
              Manual Entry
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: REVIEW (AUTO GROUPING) */}
      {step === 2 && (
        <div className="flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Brain className="text-purple-500"/> {t('auto_group')}
            </h2>
            <button onClick={() => setStep(3)} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-green-700 flex items-center gap-2">
              {t('generate_all')} <ArrowRight size={18}/>
            </button>
          </div>
          <div className="space-y-4">
            {groupedPayments.map((group, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-700 font-bold text-xl">{idx + 1}</div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{group.vendor.name}</h3>
                    <p className="text-xs text-slate-500">{group.vendor.bank}</p>
                    <div className="flex gap-2 mt-1">
                      {group.invoices.map(inv => (
                        <span key={inv.id} className="text-[10px] bg-slate-100 px-2 py-1 rounded border border-slate-200 text-slate-600">
                          {inv.invNo} (₹{(inv.amount/1000).toFixed(1)}k)
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₹{group.totalAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: PREVIEW BATCH */}
      {step === 3 && (
        <div className="flex-1 flex gap-6 overflow-hidden">
           <div className="w-1/3 overflow-y-auto pr-2 space-y-3">
             <h3 className="font-bold text-slate-500 uppercase text-xs mb-2">Generated Batch</h3>
             {groupedPayments.map((group, idx) => (
                <div key={idx} className="bg-white p-3 rounded border border-slate-200 cursor-pointer hover:border-blue-500">
                   <div className="flex justify-between">
                     <span className="font-bold text-sm">{group.vendor.name}</span>
                     <span className="font-mono text-xs font-bold">#{BANK_MEMORY[group.vendor.bank.split(' ')[0]]?.lastCheque + idx + 1}</span>
                   </div>
                   <div className="text-xs text-slate-500 mt-1">₹{group.totalAmount.toLocaleString()}</div>
                </div>
             ))}
           </div>
           
           <div className="flex-1 bg-slate-600 rounded-xl p-8 flex flex-col items-center justify-center relative">
              <div className="bg-white w-[600px] h-[280px] shadow-2xl relative flex-shrink-0 mb-8" style={{backgroundImage: `repeating-linear-gradient(45deg, #e3f2fd 0, #e3f2fd 2px, white 0, white 10px)`}}>
                  <div className="absolute top-4 left-4 font-bold text-xl opacity-50">STATE BANK OF INDIA</div>
                  <div className="absolute top-20 left-12 font-bold text-lg uppercase">{groupedPayments[0].vendor.name}</div>
                  <div className="absolute top-32 right-8 font-mono text-xl border-2 border-black p-1">₹{groupedPayments[0].totalAmount.toLocaleString()}/-</div>
                  <div className="absolute top-32 left-16 text-sm w-1/2 leading-relaxed">{numToWords(groupedPayments[0].totalAmount)}</div>
              </div>
              <button onClick={handleBulkPrint} className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold shadow hover:bg-slate-100 flex items-center gap-2">
                 <Printer size={16}/> Print All Cheques
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

// 3. QUICK SINGLE CHEQUE (Zero-Typing Automation)
const SingleChequeAutomation = ({ t, vendors, onRegisterUpdate }) => {
  const [bank, setBank] = useState('SBI');
  const [partyId, setPartyId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [chequeNo, setChequeNo] = useState('');
  const [acPayee, setAcPayee] = useState(true);
  const [generated, setGenerated] = useState(false);

  const selectedParty = vendors.find(p => p.id === parseInt(partyId));
  const bankDetails = BANK_MEMORY[bank];
  
  useEffect(() => {
    if (bankDetails) {
      setChequeNo(bankDetails.lastCheque + 1);
      setAcPayee(bankDetails.acPayeeDefault);
    }
  }, [bank]);

  const handleGenerate = () => {
    if (!partyId || !amount) return alert("Please select Vendor and Amount");
    setGenerated(true);
  };

  const handleApprove = () => {
    const newEntry = {
      id: chequeNo,
      date: date,
      party: selectedParty.name,
      amount: amount,
      bank: bank,
      status: 'Issued'
    };
    onRegisterUpdate(newEntry);
    setGenerated(false);
    setAmount('');
    setPartyId('');
    setChequeNo(prev => parseInt(prev) + 1);
    alert("Success: Cheque Printed & Register Updated!");
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
          <Brain size={14} className="text-purple-500"/> {t('bank_header')}
        </h3>
        <div className="flex gap-4">
          {Object.keys(BANK_MEMORY).map(bKey => (
            <button 
              key={bKey}
              onClick={() => setBank(bKey)}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-bold text-sm transition-all ${bank === bKey ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-600 hover:border-blue-200'}`}
            >
              {BANK_MEMORY[bKey].label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left: Form */}
        <div className="w-full xl:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800">{t('chequeGen')}</h3>
            <span className="text-xs font-mono text-slate-500">{t('date_format')}</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">{t('vendor_select')}</label>
              <select 
                className="w-full p-3 border rounded-lg bg-slate-50 font-medium"
                value={partyId}
                onChange={(e) => setPartyId(e.target.value)}
              >
                <option value="">-- Select --</option>
                {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">{t('reg_amount')}</label>
                <input 
                  type="number" 
                  className="w-full p-3 border rounded-lg font-mono text-lg font-bold text-right"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Cheque No (Auto)</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg font-mono text-slate-500 bg-slate-100"
                  value={chequeNo}
                  readOnly
                />
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-100">
               <span className="text-xs font-bold text-slate-400 block mb-1">{t('amount_words')}</span>
               <p className="text-sm font-medium italic text-slate-700">{numToWords(amount) || "..."}</p>
            </div>
            
            <button onClick={handleGenerate} className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
              <Zap size={18}/> {t('generate_link')}
            </button>
          </div>
        </div>

        {/* Right: Live Preview & Advice */}
        <div className="flex-1 flex flex-col gap-6">
            
            {/* LIVE CHEQUE PREVIEW (ALWAYS VISIBLE) */}
            <div className="bg-slate-100 p-8 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-2 left-4 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Eye size={12}/> Live Print Preview
                </div>
                
                <div 
                    className="bg-white w-full max-w-[650px] aspect-[2.5/1] shadow-xl relative transition-all duration-300"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, ${bankDetails?.color || '#fff'} 0, ${bankDetails?.color || '#fff'} 2px, white 0, white 10px)`,
                        borderLeft: `8px solid ${bankDetails?.color ? bankDetails.color.replace('e', 'b') : '#ccc'}`
                    }}
                >
                    <div className="absolute top-4 left-6 font-bold text-xl opacity-70 text-slate-700 tracking-wide uppercase">
                        {bankDetails?.label || "SELECT BANK"}
                    </div>
                    
                    <div className="absolute top-4 right-6 border-b border-slate-400 pb-1">
                        <span className="font-mono text-lg tracking-[0.5em] text-slate-800">
                             {date ? date.split('-').reverse().join('') : "DDMMYYYY"}
                        </span>
                    </div>

                    <div className="absolute top-16 left-6 w-3/4">
                        <span className="text-[10px] text-slate-400 uppercase block mb-1">Pay</span>
                        <div className="border-b border-dashed border-slate-400 pb-1 pl-2 font-bold text-lg font-handwriting uppercase text-slate-800">
                            {selectedParty?.name || "------------------"}
                        </div>
                    </div>

                    <div className="absolute top-28 left-6 w-3/4">
                        <span className="text-[10px] text-slate-400 uppercase block mb-1">Rupees</span>
                        <div className="leading-6 text-sm font-medium italic text-slate-600 pl-2">
                             {numToWords(amount)}
                        </div>
                    </div>

                    <div className="absolute top-28 right-6 w-1/4">
                         <div className="border-2 border-slate-800 bg-white/50 p-2 font-mono text-xl font-bold text-right text-slate-900 shadow-inner">
                            ₹{amount ? parseInt(amount).toLocaleString('en-IN') : ""}
                         </div>
                    </div>

                    <div className="absolute bottom-6 right-6 text-center">
                        <div className="h-8"></div>
                        <div className="border-t border-slate-400 w-32 pt-1 text-[10px] text-slate-500 uppercase font-bold">
                            Authorised Signatory
                        </div>
                    </div>

                    {acPayee && (
                        <div className="absolute top-12 left-1/3 border-t-2 border-b-2 border-slate-800 -rotate-12 px-4 py-0.5 font-bold text-xs">
                            A/C PAYEE ONLY
                        </div>
                    )}
                    
                     <div className="absolute bottom-2 left-0 w-full text-center font-mono text-xs tracking-widest text-slate-500 opacity-60">
                        {chequeNo ? chequeNo.toString().padStart(6,'0') : '000000'} | 110002033 | 22
                    </div>
                </div>
            </div>

            {/* Payment Advice (Only if Generated) */}
            {generated && selectedParty && (
              <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-right-4">
                <div className="absolute top-0 right-0 p-4 opacity-10"><FileText size={120}/></div>
                <div className="flex justify-between items-center mb-6 border-b border-slate-600 pb-2">
                   <h3 className="font-bold text-lg">{t('advice_header')}</h3>
                   <span className="bg-green-500 text-[10px] px-2 py-1 rounded font-bold text-slate-900">READY TO PRINT</span>
                </div>
                <div className="space-y-4 text-sm">
                   <div className="flex justify-between">
                      <span className="text-slate-400 font-bold">{t('advice_payee')}</span>
                      <span className="font-mono text-lg font-bold">{selectedParty.name}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-slate-400 font-bold">AMOUNT:</span>
                      <span className="font-mono text-xl text-green-400">₹{parseInt(amount).toLocaleString('en-IN')}/-</span>
                   </div>
                </div>
                <div className="mt-8">
                   <button onClick={handleApprove} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold shadow flex items-center justify-center gap-2">
                     <CheckCircle size={18}/> {t('approve_save')}
                   </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

// 4. BULK ADVICE PREVIEW
const BulkAdvicePreview = ({ t, vendors }) => {
   return (
     <div className="h-full flex flex-col bg-slate-50 p-6 rounded-xl overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
           <div>
              <h2 className="text-xl font-bold text-slate-800">{t('payAdvice')} (Batch Mode)</h2>
              <p className="text-sm text-slate-500">Auto-generated for 4 Vendors • Total ₹4,30,000</p>
           </div>
           <button className="bg-slate-800 text-white px-4 py-2 rounded shadow flex gap-2 items-center"><Download size={16}/> Download All PDFs</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white shadow-lg p-8 text-xs border border-slate-200">
              <div className="border-b-2 border-blue-900 pb-2 mb-4 flex justify-between">
                 <span className="font-bold text-lg">UTKAL POLYWEAVE IND. PVT. LTD.</span>
                 <span className="font-mono">#PA-OCT-001</span>
              </div>
              <div className="flex justify-between mb-4">
                 <div>
                    <p className="font-bold">TO: Ganpati Plastic</p>
                    <p>HDFC Bank | A/c: XXXXX2233</p>
                 </div>
                 <div className="text-right">
                    <p className="font-bold">Date: 10-Oct-2025</p>
                    <p>Chq No: 004513</p>
                 </div>
              </div>
              <table className="w-full border collapse mb-4">
                 <thead className="bg-slate-100"><tr><th className="border p-1 text-left">Bill No</th><th className="border p-1 text-right">Amount</th></tr></thead>
                 <tbody>
                    <tr><td className="border p-1">GP/001 (01-Oct)</td><td className="border p-1 text-right">1,25,000</td></tr>
                    <tr><td className="border p-1">GP/004 (02-Oct)</td><td className="border p-1 text-right">50,000</td></tr>
                    <tr className="font-bold bg-slate-50"><td className="border p-1 text-right">TOTAL</td><td className="border p-1 text-right">1,75,000</td></tr>
                 </tbody>
              </table>
              <p className="italic text-slate-500">{numToWords(175000)}</p>
           </div>
           
           <div className="bg-white shadow-lg p-8 text-xs border border-slate-200 opacity-75">
              <div className="border-b-2 border-blue-900 pb-2 mb-4 flex justify-between">
                 <span className="font-bold text-lg">UTKAL POLYWEAVE IND. PVT. LTD.</span>
                 <span className="font-mono">#PA-OCT-002</span>
              </div>
              <div className="flex justify-between mb-4">
                 <div>
                    <p className="font-bold">TO: Vakrangee Packaging</p>
                    <p>SBI | A/c: XXXXX3344</p>
                 </div>
                 <div className="text-right">
                    <p className="font-bold">Date: 10-Oct-2025</p>
                    <p>Chq No: 004514</p>
                 </div>
              </div>
              <table className="w-full border collapse mb-4">
                 <thead className="bg-slate-100"><tr><th className="border p-1 text-left">Bill No</th><th className="border p-1 text-right">Amount</th></tr></thead>
                 <tbody>
                    <tr><td className="border p-1">VAK/992 (05-Oct)</td><td className="border p-1 text-right">2,10,000</td></tr>
                    <tr className="font-bold bg-slate-50"><td className="border p-1 text-right">TOTAL</td><td className="border p-1 text-right">2,10,000</td></tr>
                 </tbody>
              </table>
              <p className="italic text-slate-500">{numToWords(210000)}</p>
           </div>
        </div>
     </div>
   )
}

// 5. CHEQUE REGISTER
const ChequeRegister = ({ t, data }) => (
  <div className="h-full bg-white rounded-xl shadow border border-slate-200 p-6 overflow-hidden flex flex-col">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
        <List className="text-blue-600"/> {t('reg_header')}
      </h2>
      <div className="bg-green-50 text-green-700 px-3 py-1 rounded text-xs font-bold border border-green-200 flex items-center gap-2">
         <Brain size={12}/> {t('tip_register')}
      </div>
    </div>
    <div className="overflow-y-auto flex-1">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 sticky top-0">
          <tr>
            <th className="p-4 font-bold uppercase text-xs">Date</th>
            <th className="p-4 font-bold uppercase text-xs">Chq No</th>
            <th className="p-4 font-bold uppercase text-xs">Party</th>
            <th className="p-4 font-bold uppercase text-xs">Bank</th>
            <th className="p-4 font-bold uppercase text-xs text-right">{t('reg_amount')}</th>
            <th className="p-4 font-bold uppercase text-xs text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-blue-50 transition-colors">
              <td className="p-4 font-mono text-slate-500">{row.date}</td>
              <td className="p-4 font-mono font-bold text-slate-800">{row.id}</td>
              <td className="p-4 font-medium">{row.party}</td>
              <td className="p-4 text-xs font-bold text-slate-500 uppercase">{row.bank}</td>
              <td className="p-4 text-right font-mono font-bold text-slate-800">₹{parseInt(row.amount).toLocaleString('en-IN')}</td>
              <td className="p-4 text-center">
                 <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-green-200">Generated</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// 6. SYSTEM SECURITY INFO
const SystemInfo = ({ t }) => (
  <div className="p-8 h-full overflow-y-auto flex items-center justify-center">
    <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full">
      <div className="flex items-center gap-4 mb-6 border-b border-slate-600 pb-6">
        <ShieldCheck size={48} className="text-green-400"/>
        <div>
          <h2 className="text-2xl font-bold">{t('systemInfo')}</h2>
          <p className="text-slate-400">Utkal Polyweave Industries Pvt. Ltd. (Licensed Copy)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
             <Server className="mt-1 text-blue-400" size={20}/>
             <div>
               <h3 className="font-bold text-lg">{t('sys_offline')}</h3>
               <p className="text-sm text-slate-400 mt-1">This software runs 100% on your local computer. No internet required for printing.</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <Lock className="mt-1 text-blue-400" size={20}/>
             <div>
               <h3 className="font-bold text-lg">{t('sys_secure')}</h3>
               <p className="text-sm text-slate-400 mt-1">{t('sys_desc')}</p>
             </div>
          </div>
        </div>
        
        <div className="bg-slate-700 p-4 rounded-xl text-sm space-y-2">
           <h4 className="font-bold text-slate-300 uppercase text-xs mb-2">Technical Specs</h4>
           <div className="flex justify-between border-b border-slate-600 pb-1"><span>Version:</span> <span className="font-mono">v2.4 (Ent)</span></div>
           <div className="flex justify-between border-b border-slate-600 pb-1"><span>Database:</span> <span className="font-mono">Local SQLite</span></div>
           <div className="flex justify-between border-b border-slate-600 pb-1"><span>Encryption:</span> <span className="font-mono">AES-256</span></div>
           <div className="flex justify-between"><span>License:</span> <span className="font-mono text-green-400">Active</span></div>
        </div>
      </div>
    </div>
  </div>
);

// MAIN APP SHELL
export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [parties, setParties] = useState(VENDOR_MEMORY);
  const [registerData, setRegisterData] = useState(SAMPLE_REGISTER);
  
  // Translation Helper
  const t = (key) => TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || key;
  
  const updateRegister = (newEntry) => {
    setRegisterData([newEntry, ...registerData]);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* ONBOARDING MODAL */}
      {showOnboarding && <Onboarding lang={lang} t={t} onComplete={() => setShowOnboarding(false)} />}

      {/* HEADER */}
      <header className="bg-slate-900 text-white px-6 py-3 shadow-md border-b border-slate-700 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-500/50"><Zap size={24}/></div>
          <div>
            <h1 className="text-xl font-bold leading-tight">{t('appTitle')}</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{t('subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-2 bg-slate-800 px-3 py-1 rounded text-xs text-green-400 border border-slate-700">
              <ShieldCheck size={14}/> <span>21AAACU3799H1Z8</span>
           </div>
          <div className="relative group">
            <button className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
              <Globe size={16}/> {LANGUAGES[lang].flag} {LANGUAGES[lang].label}
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white text-slate-900 shadow-xl rounded-xl p-2 hidden group-hover:block border border-slate-100 z-50">
              {Object.keys(LANGUAGES).map(l => (
                <button key={l} onClick={()=>setLang(l)} className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-lg text-sm flex gap-2">
                  <span>{LANGUAGES[l].flag}</span> {LANGUAGES[l].label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-white">T. N. Singh</p>
            <p className="text-[10px] text-slate-400">Accountant</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col p-4 gap-2 shadow-sm z-10">
          <div className="mb-2 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Production</div>
          <button onClick={()=>setActiveTab('bulk')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab==='bulk'?'bg-purple-50 text-purple-700 border border-purple-200':'hover:bg-slate-50 text-slate-600'}`}>
            <Layers size={20}/> {t('bulkGen')}
          </button>
          <button onClick={()=>setActiveTab('cheque')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab==='cheque'?'bg-blue-50 text-blue-700 border border-blue-200':'hover:bg-slate-50 text-slate-600'}`}>
            <Zap size={20}/> {t('chequeGen')}
          </button>
          
          <div className="my-2 border-t border-slate-100"></div>
          <div className="mb-2 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Records</div>
          
          <button onClick={()=>setActiveTab('register')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab==='register'?'bg-slate-100 text-slate-800':'hover:bg-slate-50 text-slate-600'}`}>
            <List size={20}/> {t('register')}
          </button>
          <button onClick={()=>setActiveTab('party')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab==='party'?'bg-slate-100 text-slate-800':'hover:bg-slate-50 text-slate-600'}`}>
            <Users size={20}/> {t('partyMaster')}
          </button>
          <button onClick={()=>setActiveTab('advice')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab==='advice'?'bg-orange-50 text-orange-700 border border-orange-200':'hover:bg-slate-50 text-slate-600'}`}>
            <FileText size={20}/> {t('payAdvice')}
          </button>
          
          <div className="mt-auto">
            <div className="bg-slate-900 rounded-xl p-4 text-white">
               <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Memory Status</h4>
               <div className="flex items-center gap-2 text-sm"><Brain size={14} className="text-green-400"/> Learning Active</div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 bg-slate-50 p-8 overflow-hidden relative">
          
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
              <div onClick={()=>setActiveTab('bulk')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                   <div className="bg-purple-100 p-3 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors"><Layers size={24}/></div>
                   <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">RECOMMENDED</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{t('bulkGen')}</h3>
                <p className="text-sm text-slate-500 mt-1">Upload CSV or add multiple invoices. System handles the rest.</p>
              </div>

              <div onClick={()=>setActiveTab('cheque')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                   <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Zap size={24}/></div>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{t('chequeGen')}</h3>
                <p className="text-sm text-slate-500 mt-1">Single cheque with zero-typing automation.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h3 className="text-slate-500 mb-2 font-bold uppercase text-xs">Vendor Memory</h3>
                 <p className="text-3xl font-bold text-slate-800">4 Active</p>
                 <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs border-b border-slate-100 pb-1">
                       <span>Ganpati Plastic</span>
                       <span className="font-bold">HDFC</span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-slate-100 pb-1">
                       <span>Vakrangee Pkg</span>
                       <span className="font-bold">SBI</span>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'bulk' && <BulkAutomation t={t} vendors={parties} onRegisterUpdate={updateRegister} />}
          
          {activeTab === 'cheque' && <SingleChequeAutomation t={t} vendors={parties} onRegisterUpdate={updateRegister} />}

          {activeTab === 'register' && <ChequeRegister t={t} data={registerData} />}

          {activeTab === 'advice' && <BulkAdvicePreview t={t} vendors={parties} />}
          
          {activeTab === 'party' && (
             <div className="bg-white rounded-xl shadow border border-slate-200 h-full p-6">
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl font-bold">{t('partyMaster')}</h2>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-green-700"><Users size={16}/> Add Vendor</button>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b">
                    <tr><th className="p-4">{t('vendor_select')}</th><th className="p-4">Bank Details</th><th className="p-4">Auto-Ledger</th></tr>
                  </thead>
                  <tbody>
                    {parties.map(p=>(
                      <tr key={p.id} className="border-b hover:bg-slate-50">
                        <td className="p-4 font-bold">{p.name}</td>
                        <td className="p-4 font-mono text-slate-600">{p.acc} <span className="text-xs bg-slate-200 px-1 rounded ml-2">{p.bank}</span></td>
                        <td className="p-4 text-slate-500"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{p.ledger}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          )}
          
          {activeTab === 'system' && <SystemInfo t={t} />}
          
        </main>
      </div>
    </div>
  );
}
