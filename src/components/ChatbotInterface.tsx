import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX,
  Sprout,
  MessageCircle
} from "lucide-react";
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

const ChatbotInterface = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: i18n.language === 'hi' ? 'नमस्ते! मैं आपका कृषि सहायक हूं। आप मुझसे फसल, मौसम, या कृषि संबंधी कोई भी प्रश्न पूछ सकते हैं। 🌾' : i18n.language === 'pa' ? 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ। ਤੁਸੀਂ ਮੈਨੂੰ ਫਸਲ, ਮੌਸਮ ਜਾਂ ਖੇਤੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛ ਸਕਦੇ ਹੋ। 🌾' : "Hello! I'm your farming assistant. Ask me about crops, weather, or agriculture. 🌾",
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputMessage, i18n.language),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message: string, lang: string): string => {
    const responses = {
      hi: {
        weather: "आज का मौसम अच्छा है। तापमान 28°C है, आर्द्रता 65% है। फसल की सिंचाई के लिए उपयुक्त समय है।",
        crop: "आपकी फसल स्वस्थ दिख रही है। नियमित पानी दें और खरपतवार से बचाव करें।",
        pest: "कीट संक्रमण से बचने के लिए नीम का तेल का छिड़काव करें। जैविक कीटनाशक का उपयोग करें।",
        soil: "मिट्टी की गुणवत्ता सुधारने के लिए जैविक खाद, कंपोस्ट और हरी खाद का उपयोग करें। मिट्टी की जांच करवाएं।",
        irrigation: "फसल की सिंचाई सुबह या शाम के समय करें। मिट्टी की नमी के अनुसार सिंचाई करें।",
        fertilizer: "फसल के अनुसार उर्वरक का चुनाव करें। NPK का संतुलित उपयोग करें। जैविक उर्वरक प्राथमिकता दें।",
        harvest: "कटाई का सही समय फसल की पकाव अवस्था पर निर्भर करता है। पूरी तरह पकने के बाद कटाई करें।",
        market: "आज के बाजार भाव अच्छे हैं। गेहूं 2500 रुपये प्रति क्विंटल, चना 4000 रुपये प्रति क्विंटल।",
        default: "मैं आपकी मदद करने के लिए यहाँ हूँ। आप मुझसे फसल, मौसम, या कृषि के बारे में पूछ सकते हैं।"
      },
      en: {
        weather: "Today's weather is good. Temperature is 28°C, humidity 65%. Good time for crop irrigation.",
        crop: "Your crops look healthy. Water regularly and protect from weeds.",
        pest: "To prevent pest infestation, spray neem oil. Use organic pesticides.",
        soil: "To improve soil health, use organic manure, compost, and green manure. Get soil tested regularly.",
        irrigation: "Irrigate crops in the morning or evening. Water according to soil moisture levels.",
        fertilizer: "Choose fertilizers based on crop needs. Use balanced NPK. Prefer organic fertilizers.",
        harvest: "Harvest timing depends on crop maturity. Harvest when fully ripe for best quality.",
        market: "Today's market prices are good. Wheat ₹2500/quintal, Chickpea ₹4000/quintal.",
        default: "I'm here to help you. You can ask me about crops, weather, or agriculture."
      },
      pa: {
        weather: "ਅੱਜ ਮੌਸਮ ਵਧੀਆ ਹੈ। ਤਾਪਮਾਨ 28°C ਹੈ, ਨਾਂਮੀ 65%। ਸਿੰਚਾਈ ਲਈ ਚੰਗਾ ਸਮਾਂ ਹੈ।",
        crop: "ਤੁਹਾਡੀਆਂ ਫਸਲਾਂ ਸਿਹਤਮੰਦ ਲੱਗਦੀਆਂ ਹਨ। ਨਿਯਮਿਤ ਪਾਣੀ ਦਿਓ ਅਤੇ ਘਾਹ-ਫੂਸ ਤੋਂ ਬਚਾਓ।",
        pest: "ਕੀਟਾਂ ਤੋਂ ਬਚਣ ਲਈ ਨੀਮ ਤੇਲ ਦਾ ਛਿੜਕਾਅ ਕਰੋ। ਜੈਵਿਕ ਕੀਟਨਾਸ਼ਕ ਵਰਤੋ।",
        soil: "ਮਿੱਟੀ ਦੀ ਗੁਣਵੱਤਾ ਸੁਧਾਰਨ ਲਈ ਜੈਵਿਕ ਖਾਦ, ਕੰਪੋਸਟ ਅਤੇ ਹਰੀ ਖਾਦ ਵਰਤੋ। ਮਿੱਟੀ ਦੀ ਜਾਂਚ ਕਰਵਾਓ।",
        irrigation: "ਫਸਲ ਦੀ ਸਿੰਚਾਈ ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਕਰੋ। ਮਿੱਟੀ ਦੀ ਨਮੀ ਅਨੁਸਾਰ ਪਾਣੀ ਦਿਓ।",
        fertilizer: "ਫਸਲ ਦੇ ਅਨੁਸਾਰ ਖਾਦ ਚੁਣੋ। ਸੰਤੁਲਿਤ NPK ਵਰਤੋ। ਜੈਵਿਕ ਖਾਦ ਨੂੰ ਤਰਜੀਹ ਦਿਓ।",
        harvest: "ਕਟਾਈ ਦਾ ਸਮਾਂ ਫਸਲ ਦੀ ਪੱਕਣ ਦੀ ਅਵਸਥਾ 'ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ। ਪੂਰੀ ਤਰ੍ਹਾਂ ਪੱਕਣ ਤੋਂ ਬਾਅਦ ਕਟਾਈ ਕਰੋ।",
        market: "ਅੱਜ ਦੇ ਮੰਡੀ ਭਾਵ ਚੰਗੇ ਹਨ। ਗੇਹੂੰ ₹2500/ਕੁਇੰਟਲ, ਚਨਾ ₹4000/ਕੁਇੰਟਲ।",
        default: "ਮੈਂ ਮਦਦ ਲਈ ਹਾਜ਼ਰ ਹਾਂ। ਤੁਸੀਂ ਫਸਲ, ਮੌਸਮ ਜਾਂ ਖੇਤੀ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।"
      }
    } as const;

    const currentLang = (responses as any)[lang] || responses.hi;
    const lower = message.toLowerCase();
    
    if (lower.includes('weather') || message.includes('मौसम') || message.includes('ਮੌਸਮ')) {
      return currentLang.weather;
    } else if (lower.includes('crop') || message.includes('ਫਸਲ') || message.includes('फसल')) {
      return currentLang.crop;
    } else if (lower.includes('pest') || message.includes('ਕੀਟ') || message.includes('कीट')) {
      return currentLang.pest;
    } else if (lower.includes('soil') || message.includes('मिट्टी') || message.includes('ਮਿੱਟੀ')) {
      return currentLang.soil;
    } else if (lower.includes('irrigation') || message.includes('सिंचाई') || message.includes('ਸਿੰਚਾਈ')) {
      return currentLang.irrigation;
    } else if (lower.includes('fertilizer') || message.includes('उर्वरक') || message.includes('ਖਾਦ')) {
      return currentLang.fertilizer;
    } else if (lower.includes('harvest') || message.includes('कटाई') || message.includes('ਕਟਾਈ')) {
      return currentLang.harvest;
    } else if (lower.includes('market') || message.includes('बाजार') || message.includes('ਮੰਡੀ')) {
      return currentLang.market;
    }
    
    return currentLang.default;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      alert('Voice recording started! (Simulated)');
    } else {
      alert('Voice recording stopped! (Simulated)');
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (isListening) {
      alert('Assistant muted');
    } else {
      alert('Assistant listening');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="logo" className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t('chatbot.title')}</h1>
                <p className="text-muted-foreground">{t('chatbot.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="min-h-[500px] max-h-[calc(100vh-200px)] flex flex-col shadow-strong hover:shadow-strong transition-all duration-300">
          <CardHeader className="pb-3 flex-shrink-0 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gradient">
                <MessageCircle className="h-5 w-5 animate-float" />
                {t('chatbot.chatTitle')}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant={isListening ? "default" : "secondary"} className="flex items-center gap-1 animate-pulse-glow">
                  {isListening ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                  {isListening ? t('chatbot.listening') : t('chatbot.muted')}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-4 min-h-0">
            {/* Messages */}
            <ScrollArea className="flex-1 mb-4 min-h-0">
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <p className="text-sm break-words">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="flex-shrink-0">
              <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t('chatbot.inputPlaceholder')}
                    className="flex-1"
                  />
                  
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="icon"
                    onClick={toggleRecording}
                    className="shrink-0"
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { text: t('chatbot.quickWeather'), action: () => setInputMessage(t('chatbot.quickWeatherQ')) },
                { text: t('chatbot.quickCrop'), action: () => setInputMessage(t('chatbot.quickCropQ')) },
                { text: t('chatbot.quickPest'), action: () => setInputMessage(t('chatbot.quickPestQ')) },
                { text: t('chatbot.quickMarket'), action: () => setInputMessage(t('chatbot.quickMarketQ')) },
                { text: t('chatbot.quickSoil'), action: () => setInputMessage(t('chatbot.quickSoilQ')) },
                { text: t('chatbot.quickIrrigation'), action: () => setInputMessage(t('chatbot.quickIrrigationQ')) },
                { text: t('chatbot.quickFertilizer'), action: () => setInputMessage(t('chatbot.quickFertilizerQ')) },
                { text: t('chatbot.quickHarvest'), action: () => setInputMessage(t('chatbot.quickHarvestQ')) }
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={item.action}
                  className="text-xs hover:bg-primary/10 hover-lift transition-all duration-300 hover-glow"
                >
                  {item.text}
                </Button>
              ))}
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotInterface;