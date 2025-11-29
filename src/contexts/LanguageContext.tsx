import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "sw" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Support Page
    "support.title": "Survivor Support",
    "support.portal": "Portal",
    "support.description": "A safe, confidential space for survivors. Access resources, create safety plans, and connect with support.",
    "support.africa_banner": "Supporting Communities Across Africa",
    "support.africa_description": "Built with understanding of African contexts, cultures, and community values.",
    
    // Sidebar
    "sidebar.support_tools": "Support Tools",
    "sidebar.emergency_resources": "Emergency Resources",
    "sidebar.crisis_help": "Crisis lines & help",
    "sidebar.report_incident": "Report Incident",
    "sidebar.document_safely": "Document safely",
    "sidebar.trusted_contacts": "Trusted Contacts",
    "sidebar.safe_people": "Your safe people",
    "sidebar.risk_assessment": "Risk Assessment",
    "sidebar.check_safety": "Check your safety",
    "sidebar.resource_directory": "Resource Directory",
    "sidebar.find_help": "Find local help",
    "sidebar.safety_plan": "Safety Plan",
    "sidebar.escape_plan": "Your escape plan",
    "sidebar.ai_support": "HERA AI Support",
    "sidebar.chat_hera": "Chat with HERA",
    "sidebar.quick_access": "Quick Access",
    "sidebar.evidence_locker": "Evidence Locker",
    "sidebar.community_forum": "Community Forum",
    "sidebar.learn_safety": "Learn Safety",
    
    // Emergency Resources
    "emergency.encrypted_storage": "Encrypted Storage",
    "emergency.military_encryption": "Military-grade AES encryption",
    "emergency.digital_reports": "Digital Reports",
    "emergency.legal_documentation": "Structured legal documentation",
    "emergency.connect_help": "Connect with Help",
    "emergency.verified_resources": "Verified support resources",
    "emergency.title": "Emergency Resources",
    "emergency.kenya_resources": "Kenya Resources",
    "emergency.international_crisis": "International Crisis Lines",
    "emergency.emergency_services": "Emergency Services",
    "emergency.crisis_text": "Crisis Text Line",
    "emergency.mental_health": "Mental Health Support",
    "emergency.legal_aid": "Legal Aid & Support",
    "emergency.safety_priority": "Your Safety Is Our Priority",
    "emergency.safety_message": "All resources are verified organizations. If you're in immediate danger, call emergency services (112 in Kenya, 999 in many African countries).",
    
    // AI Support
    "ai.title": "HERA AI Support Assistant",
    "ai.description": "HERA is here to listen and support you. Chat confidentially about your situation, get information about resources, or simply talk to someone who understands.",
    "ai.confidential": "Confidential",
    "ai.private_chats": "Private chats",
    "ai.trauma_informed": "Trauma-Informed",
    "ai.supportive": "Supportive",
    "ai.african_context": "African Context",
    "ai.local_help": "Local help",
    "ai.start_chat": "Click the chat button in the bottom right corner to start talking to HERA.",
    
    // Risk Assessment
    "risk.title": "Safety Risk Assessment",
    "risk.description": "Answer questions to understand your situation",
    
    // Auth Required
    "auth.required": "Sign In Required",
    "auth.contacts_message": "Please sign in to add and manage your trusted contacts.",
    "auth.safety_message": "Please sign in to create and save your personal safety plan.",
    "auth.signin": "Sign In to Continue",
    
    // Language
    "language.select": "Language",
    "language.english": "English",
    "language.swahili": "Kiswahili",
    "language.french": "Français",
    "language.arabic": "العربية",
  },
  sw: {
    // Support Page - Swahili
    "support.title": "Msaada kwa Walionusurika",
    "support.portal": "Lango",
    "support.description": "Nafasi salama na ya siri kwa walionusurika. Pata rasilimali, tengeneza mipango ya usalama, na uungane na msaada.",
    "support.africa_banner": "Kusaidia Jamii Katika Afrika",
    "support.africa_description": "Imejengwa kwa kuelewa muktadha wa Kiafrika, tamaduni, na maadili ya jamii.",
    
    // Sidebar
    "sidebar.support_tools": "Zana za Msaada",
    "sidebar.emergency_resources": "Rasilimali za Dharura",
    "sidebar.crisis_help": "Simu za msaada",
    "sidebar.report_incident": "Ripoti Tukio",
    "sidebar.document_safely": "Hifadhi kwa usalama",
    "sidebar.trusted_contacts": "Mawasiliano Yanayoaminika",
    "sidebar.safe_people": "Watu wako salama",
    "sidebar.risk_assessment": "Tathmini ya Hatari",
    "sidebar.check_safety": "Angalia usalama wako",
    "sidebar.resource_directory": "Orodha ya Rasilimali",
    "sidebar.find_help": "Pata msaada wa karibu",
    "sidebar.safety_plan": "Mpango wa Usalama",
    "sidebar.escape_plan": "Mpango wako wa kutoroka",
    "sidebar.ai_support": "Msaada wa HERA AI",
    "sidebar.chat_hera": "Ongea na HERA",
    "sidebar.quick_access": "Ufikiaji wa Haraka",
    "sidebar.evidence_locker": "Hifadhi ya Ushahidi",
    "sidebar.community_forum": "Jukwaa la Jamii",
    "sidebar.learn_safety": "Jifunze Usalama",
    
    // Emergency Resources
    "emergency.encrypted_storage": "Hifadhi Iliyosimbwa",
    "emergency.military_encryption": "Usimbaji wa kijeshi AES",
    "emergency.digital_reports": "Ripoti za Kidijitali",
    "emergency.legal_documentation": "Nyaraka za kisheria zilizopangwa",
    "emergency.connect_help": "Ungana na Msaada",
    "emergency.verified_resources": "Rasilimali zilizothibitishwa",
    "emergency.title": "Rasilimali za Dharura",
    "emergency.kenya_resources": "Rasilimali za Kenya",
    "emergency.international_crisis": "Simu za Dharura za Kimataifa",
    "emergency.emergency_services": "Huduma za Dharura",
    "emergency.crisis_text": "Ujumbe wa Msaada",
    "emergency.mental_health": "Msaada wa Afya ya Akili",
    "emergency.legal_aid": "Msaada wa Kisheria",
    "emergency.safety_priority": "Usalama Wako ni Kipaumbele Chetu",
    "emergency.safety_message": "Rasilimali zote ni mashirika yaliyothibitishwa. Ukiwa hatarini moja kwa moja, piga simu huduma za dharura (112 Kenya, 999 nchi nyingi za Afrika).",
    
    // AI Support
    "ai.title": "Msaidizi wa HERA AI",
    "ai.description": "HERA yuko hapa kukusikiliza na kukusaidia. Ongea kwa siri kuhusu hali yako, pata habari kuhusu rasilimali, au ongea tu na mtu anayeelewa.",
    "ai.confidential": "Siri",
    "ai.private_chats": "Mazungumzo ya faragha",
    "ai.trauma_informed": "Inayoelewa Trauma",
    "ai.supportive": "Inayosaidia",
    "ai.african_context": "Muktadha wa Kiafrika",
    "ai.local_help": "Msaada wa karibu",
    "ai.start_chat": "Bonyeza kitufe cha mazungumzo kwenye kona ya kulia chini kuanza kuongea na HERA.",
    
    // Risk Assessment
    "risk.title": "Tathmini ya Hatari ya Usalama",
    "risk.description": "Jibu maswali kuelewa hali yako",
    
    // Auth Required
    "auth.required": "Ingia Inahitajika",
    "auth.contacts_message": "Tafadhali ingia kuongeza na kusimamia mawasiliano yako yanayoaminika.",
    "auth.safety_message": "Tafadhali ingia kuunda na kuhifadhi mpango wako wa usalama.",
    "auth.signin": "Ingia Kuendelea",
    
    // Language
    "language.select": "Lugha",
    "language.english": "English",
    "language.swahili": "Kiswahili",
    "language.french": "Français",
    "language.arabic": "العربية",
  },
  fr: {
    // Support Page - French
    "support.title": "Soutien aux Survivantes",
    "support.portal": "Portail",
    "support.description": "Un espace sûr et confidentiel pour les survivantes. Accédez aux ressources, créez des plans de sécurité et connectez-vous au soutien.",
    "support.africa_banner": "Soutenir les Communautés à Travers l'Afrique",
    "support.africa_description": "Conçu avec une compréhension des contextes africains, des cultures et des valeurs communautaires.",
    
    // Sidebar
    "sidebar.support_tools": "Outils de Soutien",
    "sidebar.emergency_resources": "Ressources d'Urgence",
    "sidebar.crisis_help": "Lignes de crise",
    "sidebar.report_incident": "Signaler un Incident",
    "sidebar.document_safely": "Documenter en sécurité",
    "sidebar.trusted_contacts": "Contacts de Confiance",
    "sidebar.safe_people": "Vos personnes sûres",
    "sidebar.risk_assessment": "Évaluation des Risques",
    "sidebar.check_safety": "Vérifiez votre sécurité",
    "sidebar.resource_directory": "Répertoire des Ressources",
    "sidebar.find_help": "Trouver de l'aide locale",
    "sidebar.safety_plan": "Plan de Sécurité",
    "sidebar.escape_plan": "Votre plan d'évasion",
    "sidebar.ai_support": "Support IA HERA",
    "sidebar.chat_hera": "Discuter avec HERA",
    "sidebar.quick_access": "Accès Rapide",
    "sidebar.evidence_locker": "Coffre de Preuves",
    "sidebar.community_forum": "Forum Communautaire",
    "sidebar.learn_safety": "Apprendre la Sécurité",
    
    // Emergency Resources
    "emergency.encrypted_storage": "Stockage Crypté",
    "emergency.military_encryption": "Cryptage AES militaire",
    "emergency.digital_reports": "Rapports Numériques",
    "emergency.legal_documentation": "Documentation juridique structurée",
    "emergency.connect_help": "Connectez-vous à l'Aide",
    "emergency.verified_resources": "Ressources vérifiées",
    "emergency.title": "Ressources d'Urgence",
    "emergency.kenya_resources": "Ressources du Kenya",
    "emergency.international_crisis": "Lignes de Crise Internationales",
    "emergency.emergency_services": "Services d'Urgence",
    "emergency.crisis_text": "Ligne de Crise par SMS",
    "emergency.mental_health": "Soutien en Santé Mentale",
    "emergency.legal_aid": "Aide Juridique",
    "emergency.safety_priority": "Votre Sécurité est Notre Priorité",
    "emergency.safety_message": "Toutes les ressources sont des organisations vérifiées. Si vous êtes en danger immédiat, appelez les services d'urgence (112 au Kenya, 999 dans de nombreux pays africains).",
    
    // AI Support
    "ai.title": "Assistant IA HERA",
    "ai.description": "HERA est là pour vous écouter et vous soutenir. Discutez confidentiellement de votre situation, obtenez des informations sur les ressources, ou parlez simplement à quelqu'un qui comprend.",
    "ai.confidential": "Confidentiel",
    "ai.private_chats": "Discussions privées",
    "ai.trauma_informed": "Sensible au Trauma",
    "ai.supportive": "Soutenant",
    "ai.african_context": "Contexte Africain",
    "ai.local_help": "Aide locale",
    "ai.start_chat": "Cliquez sur le bouton de chat en bas à droite pour commencer à parler avec HERA.",
    
    // Risk Assessment
    "risk.title": "Évaluation des Risques de Sécurité",
    "risk.description": "Répondez aux questions pour comprendre votre situation",
    
    // Auth Required
    "auth.required": "Connexion Requise",
    "auth.contacts_message": "Veuillez vous connecter pour ajouter et gérer vos contacts de confiance.",
    "auth.safety_message": "Veuillez vous connecter pour créer et sauvegarder votre plan de sécurité personnel.",
    "auth.signin": "Se Connecter pour Continuer",
    
    // Language
    "language.select": "Langue",
    "language.english": "English",
    "language.swahili": "Kiswahili",
    "language.french": "Français",
    "language.arabic": "العربية",
  },
  ar: {
    // Support Page - Arabic
    "support.title": "دعم الناجيات",
    "support.portal": "البوابة",
    "support.description": "مساحة آمنة وسرية للناجيات. الوصول إلى الموارد، وإنشاء خطط السلامة، والتواصل مع الدعم.",
    "support.africa_banner": "دعم المجتمعات في جميع أنحاء أفريقيا",
    "support.africa_description": "مبني على فهم السياقات الأفريقية والثقافات وقيم المجتمع.",
    
    // Sidebar
    "sidebar.support_tools": "أدوات الدعم",
    "sidebar.emergency_resources": "موارد الطوارئ",
    "sidebar.crisis_help": "خطوط الأزمات والمساعدة",
    "sidebar.report_incident": "الإبلاغ عن حادث",
    "sidebar.document_safely": "التوثيق بأمان",
    "sidebar.trusted_contacts": "جهات الاتصال الموثوقة",
    "sidebar.safe_people": "أشخاصك الآمنون",
    "sidebar.risk_assessment": "تقييم المخاطر",
    "sidebar.check_safety": "تحقق من سلامتك",
    "sidebar.resource_directory": "دليل الموارد",
    "sidebar.find_help": "ابحث عن مساعدة محلية",
    "sidebar.safety_plan": "خطة السلامة",
    "sidebar.escape_plan": "خطة الهروب الخاصة بك",
    "sidebar.ai_support": "دعم HERA AI",
    "sidebar.chat_hera": "تحدث مع HERA",
    "sidebar.quick_access": "الوصول السريع",
    "sidebar.evidence_locker": "خزنة الأدلة",
    "sidebar.community_forum": "منتدى المجتمع",
    "sidebar.learn_safety": "تعلم السلامة",
    
    // Emergency Resources
    "emergency.encrypted_storage": "تخزين مشفر",
    "emergency.military_encryption": "تشفير AES عسكري",
    "emergency.digital_reports": "تقارير رقمية",
    "emergency.legal_documentation": "وثائق قانونية منظمة",
    "emergency.connect_help": "تواصل مع المساعدة",
    "emergency.verified_resources": "موارد موثقة",
    "emergency.title": "موارد الطوارئ",
    "emergency.kenya_resources": "موارد كينيا",
    "emergency.international_crisis": "خطوط الأزمات الدولية",
    "emergency.emergency_services": "خدمات الطوارئ",
    "emergency.crisis_text": "خط نص الأزمات",
    "emergency.mental_health": "دعم الصحة النفسية",
    "emergency.legal_aid": "المساعدة القانونية",
    "emergency.safety_priority": "سلامتك هي أولويتنا",
    "emergency.safety_message": "جميع الموارد منظمات موثقة. إذا كنت في خطر فوري، اتصل بخدمات الطوارئ (112 في كينيا، 999 في العديد من الدول الأفريقية).",
    
    // AI Support
    "ai.title": "مساعد HERA AI",
    "ai.description": "HERA هنا للاستماع إليك ودعمك. تحدث بسرية عن موقفك، احصل على معلومات حول الموارد، أو تحدث ببساطة مع شخص يفهم.",
    "ai.confidential": "سري",
    "ai.private_chats": "محادثات خاصة",
    "ai.trauma_informed": "مدرك للصدمات",
    "ai.supportive": "داعم",
    "ai.african_context": "السياق الأفريقي",
    "ai.local_help": "مساعدة محلية",
    "ai.start_chat": "انقر على زر الدردشة في الزاوية اليمنى السفلية لبدء التحدث مع HERA.",
    
    // Risk Assessment
    "risk.title": "تقييم مخاطر السلامة",
    "risk.description": "أجب على الأسئلة لفهم وضعك",
    
    // Auth Required
    "auth.required": "تسجيل الدخول مطلوب",
    "auth.contacts_message": "يرجى تسجيل الدخول لإضافة وإدارة جهات الاتصال الموثوقة.",
    "auth.safety_message": "يرجى تسجيل الدخول لإنشاء وحفظ خطة السلامة الشخصية.",
    "auth.signin": "تسجيل الدخول للمتابعة",
    
    // Language
    "language.select": "اللغة",
    "language.english": "English",
    "language.swahili": "Kiswahili",
    "language.french": "Français",
    "language.arabic": "العربية",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("hera-language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("hera-language", lang);
    // Set document direction for RTL languages
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
