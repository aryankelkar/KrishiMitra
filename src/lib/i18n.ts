import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;

export const resources = {
  en: {
    translation: {
      app: {
        name: 'Krishi Mitra',
        tagline: 'Smart Farming Assistant'
      },
      nav: {
        chat: 'AI Chat',
        dashboard: 'Dashboard',
        crops: 'My Crops',
        community: 'Community',
        settings: 'Settings'
      },
      crops: {
        title: 'My Crops',
        subtitle: 'Monitor all your crops',
        addCrop: 'Add Crop',
        plantedOn: 'Planted On',
        area: 'Area',
        currentStage: 'Current Stage',
        harvestIn: 'Harvest In',
        days: 'days',
        healthStatus: 'Health Status',
        nextAction: 'Next Action',
        expectedYield: 'Expected Yield',
        takePhoto: 'Take Photo',
        record: 'Record',
        irrigate: 'Irrigate',
        quickActions: 'Quick Actions',
        soilTest: 'Soil Test',
        soilTestDesc: 'Check soil quality',
        weatherAlert: 'Weather Alert',
        weatherAlertDesc: 'Today’s weather info',
        irrigationPlan: 'Irrigation Plan',
        irrigationPlanDesc: 'Schedule irrigation',
        cropRecords: 'Crop Records',
        cropRecordsDesc: 'View your records'
      },
      community: {
        title: 'Farmer Community',
        subtitle: 'Share experiences and learn from others',
        newPost: 'Write a new post',
        placeholder: 'Share your experience, question, or advice...',
        photo: 'Photo',
        video: 'Video',
        post: 'Post',
        loadMore: 'Load more posts'
      },
      lang: {
        label: 'Language',
        english: 'English',
        hindi: 'Hindi',
        punjabi: 'Punjabi'
      },
      dashboard: {
        brand: 'KrishiMitra',
        alerts: 'Alerts',
        profile: 'Profile',
        heroTitle: 'Smart Farming for Better Harvests',
        heroSubtitle: 'AI-powered insights for crop prediction, weather monitoring, and pest detection',
        setFarmLocation: 'Set Farm Location',
        weatherToday: 'Weather Today',
        humidity: 'Humidity',
        wind: 'Wind',
        rainfall: 'Rainfall',
        cropPredictions: 'Crop Predictions',
        health: 'Health',
        pestDetection: 'Pest Detection',
        pestDetectionDesc: 'AI-powered pest identification and treatment recommendations',
        scanCrop: 'Scan Crop',
        diseaseAnalysis: 'Disease Analysis',
        diseaseAnalysisDesc: 'Early disease detection with treatment suggestions',
        analyzePlant: 'Analyze Plant',
        soilHealth: 'Soil Health',
        soilHealthDesc: 'Comprehensive soil analysis and improvement tips',
        checkSoil: 'Check Soil',
        marketPrices: 'Market Prices',
        marketPricesDesc: 'Real-time crop prices and market trends',
        viewPrices: 'View Prices',
        askAssistant: 'Ask KrishiMitra Assistant',
        askAssistantDesc: 'Get instant answers in your local language about farming, weather, and crops',
        voiceChat: 'Voice Chat',
        textChat: 'Text Chat'
      },
      advisories: {
        title: 'Farm Advisories',
        newCount: '{{count}} new',
        none: 'No advisories available',
        markRead: 'Mark Read'
      },
      offline: {
        online: 'Online',
        offline: 'Offline',
        lastSync: 'Last sync:'
      },
      chatbot: {
        title: 'Krishi Mitra AI',
        subtitle: 'Your Smart Farming Assistant',
        chatTitle: 'Chat with AI Assistant',
        listening: 'Listening',
        muted: 'Muted',
        inputPlaceholder: 'Type your message...',
        
      },
      notFound: {
        oops: 'Oops! Page not found',
        returnHome: 'Return to Home'
      }
    }
  },
  hi: {
    translation: {
      app: {
        name: 'कृषि मित्र',
        tagline: 'Smart Farming Assistant'
      },
      nav: {
        chat: 'AI चैट',
        dashboard: 'डैशबोर्ड',
        crops: 'मेरी फसलें',
        community: 'समुदाय',
        settings: 'सेटिंग्स'
      },
      crops: {
        title: 'मेरी फसलें',
        subtitle: 'अपनी सभी फसलों की निगरानी करें',
        addCrop: 'नई फसल जोड़ें',
        plantedOn: 'रोपण तिथि',
        area: 'क्षेत्रफल',
        currentStage: 'वर्तमान अवस्था',
        harvestIn: 'कटाई में',
        days: 'दिन',
        healthStatus: 'स्वास्थ्य स्थिति',
        nextAction: 'अगला कार्य',
        expectedYield: 'अपेक्षित उत्पादन',
        takePhoto: 'फोटो लें',
        record: 'रिकॉर्ड',
        irrigate: 'सिंचाई',
        quickActions: 'त्वरित कार्य',
        soilTest: 'मिट्टी परीक्षण',
        soilTestDesc: 'मिट्टी की गुणवत्ता जांचें',
        weatherAlert: 'मौसम अलर्ट',
        weatherAlertDesc: 'आज के मौसम की जानकारी',
        irrigationPlan: 'सिंचाई योजना',
        irrigationPlanDesc: 'सिंचाई का समय निर्धारित करें',
        cropRecords: 'फसल रिकॉर्ड',
        cropRecordsDesc: 'अपने रिकॉर्ड देखें'
      },
      community: {
        title: 'किसान समुदाय',
        subtitle: 'अपने अनुभव साझा करें और दूसरों से सीखें',
        newPost: 'नई पोस्ट लिखें',
        placeholder: 'अपना अनुभव, सवाल या सलाह साझा करें...',
        photo: 'फोटो',
        video: 'वीडियो',
        post: 'पोस्ट करें',
        loadMore: 'और पोस्ट देखें'
      },
      lang: {
        label: 'भाषा',
        english: 'English',
        hindi: 'हिन्दी'
      },
      dashboard: {
        brand: 'कृषि मित्र',
        alerts: 'अलर्ट',
        profile: 'प्रोफ़ाइल',
        heroTitle: 'बेहतर फसल के लिए स्मार्ट खेती',
        heroSubtitle: 'फसल पूर्वानुमान, मौसम निगरानी और कीट पहचान के लिए AI-आधारित समाधान',
        setFarmLocation: 'खेत का स्थान सेट करें',
        weatherToday: 'आज का मौसम',
        humidity: 'आर्द्रता',
        wind: 'हवा',
        rainfall: 'वर्षा',
        cropPredictions: 'फसल पूर्वानुमान',
        health: 'स्वास्थ्य',
        pestDetection: 'कीट पहचान',
        pestDetectionDesc: 'AI आधारित कीट पहचान और उपचार की सिफारिशें',
        scanCrop: 'फसल स्कैन करें',
        diseaseAnalysis: 'रोग विश्लेषण',
        diseaseAnalysisDesc: 'रोगों की शीघ्र पहचान और उपचार सुझाव',
        analyzePlant: 'पौधा विश्लेषण',
        soilHealth: 'मृदा स्वास्थ्य',
        soilHealthDesc: 'व्यापक मृदा विश्लेषण और सुधार सुझाव',
        checkSoil: 'मिट्टी जांचें',
        marketPrices: 'बाजार भाव',
        marketPricesDesc: 'रियल-टाइम फसल भाव और बाजार रुझान',
        viewPrices: 'भाव देखें',
        askAssistant: 'कृषि मित्र सहायक से पूछें',
        askAssistantDesc: 'खेती, मौसम और फसलों पर अपने स्थानीय भाषा में तुरंत उत्तर पाएं',
        voiceChat: 'वॉइस चैट',
        textChat: 'टेक्स्ट चैट'
      },
      advisories: {
        title: 'खेत परामर्श',
        newCount: '{{count}} नए',
        none: 'कोई परामर्श उपलब्ध नहीं',
        markRead: 'पढ़ा हुआ चिह्नित करें'
      },
      offline: {
        online: 'ऑनलाइन',
        offline: 'ऑफलाइन',
        lastSync: 'अंतिम सिंक:'
      },
      chatbot: {
        title: 'कृषि मित्र AI',
        subtitle: 'आपका स्मार्ट खेती सहायक',
        chatTitle: 'AI सहायक से बातचीत',
        listening: 'सुन रहा है',
        muted: 'म्यूट',
        inputPlaceholder: 'अपना संदेश टाइप करें...',
        
      },
      notFound: {
        oops: 'अरे! पेज नहीं मिला',
        returnHome: 'होम पर लौटें'
      }
    }
  },
  pa: {
    translation: {
      app: {
        name: 'ਖੇਤੀ ਮਿਤਰ',
        tagline: 'ਸਮਾਰਟ ਖੇਤੀ ਸਹਾਇਕ'
      },
      nav: {
        chat: 'AI ਚੈਟ',
        dashboard: 'ਡੈਸ਼ਬੋਰਡ',
        crops: 'ਮੇਰੀ ਫਸਲਾਂ',
        community: 'ਸਮੁਦਾਇ',
        settings: 'ਸੈਟਿੰਗਜ਼'
      },
      crops: {
        title: 'ਮੇਰੀ ਫਸਲਾਂ',
        subtitle: 'ਆਪਣੀਆਂ ਸਭ ਫਸਲਾਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ',
        addCrop: 'ਨਵੀਂ ਫਸਲ ਜੋੜੋ',
        plantedOn: 'ਰੋਪਣ ਦੀ ਤਾਰੀਖ',
        area: 'ਖੇਤਰਫਲ',
        currentStage: 'ਮੌਜੂਦਾ ਹਾਲਤ',
        harvestIn: 'ਕਟਾਈ ਵਿੱਚ',
        days: 'ਦਿਨ',
        healthStatus: 'ਸਿਹਤ ਹਾਲਤ',
        nextAction: 'ਅਗਲਾ ਕੰਮ',
        expectedYield: 'ਅਪੇਕਸ਼ਿਤ ਉਤਪਾਦਨ',
        takePhoto: 'ਫੋਟੋ ਲਵੋ',
        record: 'ਰਿਕਾਰਡ',
        irrigate: 'ਸਿੰਚਾਈ',
        quickActions: 'ਤੇਜ਼ ਕਾਰਵਾਈਆਂ',
        soilTest: 'ਮਿੱਟੀ ਟੈਸਟ',
        soilTestDesc: 'ਮਿੱਟੀ ਦੀ ਗੁਣਵੱਤਾ ਚੈਕ ਕਰੋ',
        weatherAlert: 'ਮੌਸਮ ਚੇਤਾਵਨੀ',
        weatherAlertDesc: 'ਅੱਜ ਦਾ ਮੌਸਮ',
        irrigationPlan: 'ਸਿੰਚਾਈ ਯੋਜਨਾ',
        irrigationPlanDesc: 'ਸਿੰਚਾਈ ਸਮਾਂ ਤੈਅ ਕਰੋ',
        cropRecords: 'ਫਸਲ ਰਿਕਾਰਡ',
        cropRecordsDesc: 'ਆਪਣੇ ਰਿਕਾਰਡ ਵੇਖੋ'
      },
      community: {
        title: 'ਕਿਸਾਨ ਸਮੁਦਾਇ',
        subtitle: 'ਅਨੁਭਵ ਸਾਂਝੇ ਕਰੋ ਅਤੇ ਹੋਰਾਂ ਤੋਂ ਸਿਖੋ',
        newPost: 'ਨਵੀਂ ਪੋਸਟ ਲਿਖੋ',
        placeholder: 'ਆਪਣਾ ਅਨੁਭਵ, ਸਵਾਲ ਜਾਂ ਸਲਾਹ ਸਾਂਝੀ ਕਰੋ...',
        photo: 'ਫੋਟੋ',
        video: 'ਵੀਡੀਓ',
        post: 'ਪੋਸਟ ਕਰੋ',
        loadMore: 'ਹੋਰ ਪੋਸਟਾਂ ਵੇਖੋ'
      },
      lang: {
        label: 'ਭਾਸ਼ਾ',
        english: 'English',
        hindi: 'हिन्दी',
        punjabi: 'ਪੰਜਾਬੀ'
      },
      dashboard: {
        brand: 'ਖੇਤੀ ਮਿਤਰ',
        alerts: 'ਅਲਰਟ',
        profile: 'ਪ੍ਰੋਫ਼ਾਈਲ',
        heroTitle: 'ਵਧੀਆ ਫਸਲ ਲਈ ਸਮਾਰਟ ਖੇਤੀ',
        heroSubtitle: 'ਫਸਲ ਅਨੁਮਾਨ, ਮੌਸਮ ਨਿਗਰਾਨੀ ਅਤੇ ਕੀਟ ਪਛਾਣ ਲਈ AI',
        setFarmLocation: 'ਖੇਤ ਦਾ ਟਿਕਾਣਾ ਸੈਟ ਕਰੋ',
        weatherToday: 'ਅੱਜ ਦਾ ਮੌਸਮ',
        humidity: 'ਨਾਂਮੀ',
        wind: 'ਹਵਾ',
        rainfall: 'ਵਰਖਾ',
        cropPredictions: 'ਫਸਲ ਅਨੁਮਾਨ',
        health: 'ਸਿਹਤ',
        pestDetection: 'ਕੀਟ ਪਛਾਣ',
        pestDetectionDesc: 'AI ਆਧਾਰਿਤ ਕੀਟ ਪਛਾਣ ਅਤੇ ਇਲਾਜ ਸਿਫ਼ਾਰਸ਼ਾਂ',
        scanCrop: 'ਫਸਲ ਸਕੈਨ ਕਰੋ',
        diseaseAnalysis: 'ਰੋਗ ਵਿਸ਼ਲੇਸ਼ਣ',
        diseaseAnalysisDesc: 'ਰੋਗਾਂ ਦੀ ਜਲਦੀ ਪਛਾਣ ਅਤੇ ਸੁਝਾਅ',
        analyzePlant: 'ਪੌਦਾ ਵਿਸ਼ਲੇਸ਼ਣ',
        soilHealth: 'ਮਿੱਟੀ ਸਿਹਤ',
        soilHealthDesc: 'ਵਿਆਪਕ ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਸੁਧਾਰ',
        checkSoil: 'ਮਿੱਟੀ ਚੈਕ ਕਰੋ',
        marketPrices: 'ਮੰਡੀ ਭਾਵ',
        marketPricesDesc: 'ਰੀਅਲ-ਟਾਇਮ ਫਸਲ ਭਾਵ ਅਤੇ ਰੁਝਾਨ',
        viewPrices: 'ਭਾਵ ਵੇਖੋ',
        askAssistant: 'ਖੇਤੀ ਮਿਤਰ ਸਹਾਇਕ ਨੂੰ ਪੁੱਛੋ',
        askAssistantDesc: 'ਖੇਤੀ, ਮੌਸਮ ਅਤੇ ਫਸਲਾਂ ਬਾਰੇ ਤੁਰੰਤ ਜਵਾਬ',
        voiceChat: 'ਵਾਇਸ ਚੈਟ',
        textChat: 'ਟੈਕਸਟ ਚੈਟ'
      },
      advisories: {
        title: 'ਫਾਰਮ ਸਲਾਹ',
        newCount: '{{count}} ਨਵੇਂ',
        none: 'ਕੋਈ ਸਲਾਹ ਉਪਲਬਧ ਨਹੀਂ',
        markRead: 'ਪੜ੍ਹਿਆ ਚਿੰਨ੍ਹਿਤ ਕਰੋ'
      },
      offline: {
        online: 'ਆਨਲਾਈਨ',
        offline: 'ਆਫਲਾਈਨ',
        lastSync: 'ਆਖਰੀ ਸਿੰਕ:'
      },
      chatbot: {
        title: 'ਖੇਤੀ ਮਿਤਰ AI',
        subtitle: 'ਤੁਹਾਡਾ ਸਮਾਰਟ ਖੇਤੀ ਸਹਾਇਕ',
        chatTitle: 'AI ਸਹਾਇਕ ਨਾਲ ਗੱਲਬਾਤ',
        listening: 'ਸੁਣ ਰਿਹਾ',
        muted: 'ਮਿਊਟ',
        inputPlaceholder: 'ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ...',
        
      },
      notFound: {
        oops: 'ਓਹੁ! ਪੇਜ ਨਹੀਂ ਮਿਲਿਆ',
        returnHome: 'ਘਰ ਵਾਪਸ ਜਾਓ'
      }
    }
  }
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang || 'hi',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;


