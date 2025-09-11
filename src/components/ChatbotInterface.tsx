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

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

const ChatbotInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'नमस्ते! मैं आपका कृषि सहायक हूं। आप मुझसे फसल, मौसम, या कृषि संबंधी कोई भी प्रश्न पूछ सकते हैं। 🌾',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(true);
  const [language, setLanguage] = useState('hi');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" }
  ];

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
        content: getBotResponse(inputMessage, language),
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
      }
    };

    const currentLang = responses[lang as keyof typeof responses] || responses.hi;
    
    if (message.toLowerCase().includes('weather') || message.includes('मौसम')) {
      return currentLang.weather;
    } else if (message.toLowerCase().includes('crop') || message.includes('फसल')) {
      return currentLang.crop;
    } else if (message.toLowerCase().includes('pest') || message.includes('कीट')) {
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">कृषि मित्र AI</h1>
                <p className="text-muted-foreground">Your Smart Farming Assistant</p>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="flex gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage(lang.code)}
                  className="text-xs"
                >
                  {lang.flag} {lang.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat with AI Assistant
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant={isListening ? "default" : "secondary"} className="flex items-center gap-1">
                  {isListening ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                  {isListening ? "Listening" : "Muted"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-4">
            {/* Messages */}
            <ScrollArea className="flex-1 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`p-2 rounded-full ${
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
                        <p className="text-sm">{message.content}</p>
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
            <div className="flex gap-2">
              <div className="flex-1 flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={language === 'hi' ? 'अपना संदेश टाइप करें...' : 'Type your message...'}
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
                { text: language === 'hi' ? 'मौसम जानकारी' : 'Weather Info', action: () => setInputMessage(language === 'hi' ? 'आज का मौसम कैसा है?' : 'What is today\'s weather?') },
                { text: language === 'hi' ? 'फसल सलाह' : 'Crop Advice', action: () => setInputMessage(language === 'hi' ? 'मेरी फसल के लिए सलाह दें' : 'Give advice for my crops') },
                { text: language === 'hi' ? 'कीट नियंत्रण' : 'Pest Control', action: () => setInputMessage(language === 'hi' ? 'कीट नियंत्रण के उपाय' : 'Pest control measures') },
                { text: language === 'hi' ? 'बाजार भाव' : 'Market Prices', action: () => setInputMessage(language === 'hi' ? 'आज के बाजार भाव' : 'Today\'s market prices') }
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={item.action}
                  className="text-xs"
                >
                  {item.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotInterface;