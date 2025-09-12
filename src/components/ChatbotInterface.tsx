import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sprout } from "lucide-react";
import { useTranslation } from 'react-i18next';
import MessageList from './chatbot/MessageList';
import MessageInput from './chatbot/MessageInput';
import QuickActions from './chatbot/QuickActions';
import ChatHeader from './chatbot/ChatHeader';

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
        default: "मैं आपकी मदद करने के लिए यहाँ हूँ। आप मुझसे फसल, मौसम, या कृषि के बारे में पूछ सकते हैं।"
      },
      en: {
        weather: "Today's weather is good. Temperature is 28°C, humidity 65%. Good time for crop irrigation.",
        crop: "Your crops look healthy. Water regularly and protect from weeds.",
        pest: "To prevent pest infestation, spray neem oil. Use organic pesticides.",
        default: "I'm here to help you. You can ask me about crops, weather, or agriculture."
      },
      pa: {
        weather: "ਅੱਜ ਮੌਸਮ ਵਧੀਆ ਹੈ। ਤਾਪਮਾਨ 28°C ਹੈ, ਨਾਂਮੀ 65%। ਸਿੰਚਾਈ ਲਈ ਚੰਗਾ ਸਮਾਂ ਹੈ।",
        crop: "ਤੁਹਾਡੀਆਂ ਫਸਲਾਂ ਸਿਹਤਮੰਦ ਲੱਗਦੀਆਂ ਹਨ। ਨਿਯਮਿਤ ਪਾਣੀ ਦਿਓ ਅਤੇ ਘਾਹ-ਫੂਸ ਤੋਂ ਬਚਾਓ।",
        pest: "ਕੀਟਾਂ ਤੋਂ ਬਚਣ ਲਈ ਨੀਮ ਤੇਲ ਦਾ ਛਿੜਕਾਅ ਕਰੋ। ਜੈਵਿਕ ਕੀਟਨਾਸ਼ਕ ਵਰਤੋ।",
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
    }
    
    return currentLang.default;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 animate-scale-in">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t('chatbot.title')}</h1>
                <p className="text-muted-foreground">{t('chatbot.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="h-[calc(100vh-200px)] flex flex-col shadow-lg border-0 bg-card/95 backdrop-blur-sm animate-scale-in">
          <ChatHeader isListening={isListening} />
          
          <CardContent className="flex-1 flex flex-col p-4">
            <MessageList messages={messages} ref={messagesEndRef} />
            
            <MessageInput
              ref={inputRef}
              value={inputMessage}
              onChange={setInputMessage}
              onSend={handleSendMessage}
              isRecording={isRecording}
              onToggleRecording={toggleRecording}
            />

            <QuickActions onActionClick={setInputMessage} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotInterface;