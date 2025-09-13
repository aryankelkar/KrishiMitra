import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  MessageCircle,
  Loader2
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { sendChatMessage } from '@/services/apiService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

const ChatbotInterface = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: i18n.language === 'hi' ? 'नमस्ते! मैं आपका कृषि सहायक हूं। आप मुझसे फसल, मौसम, या कृषि संबंधी कोई भी प्रश्न पूछ सकते हैं। 🌾' : i18n.language === 'pa' ? 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ। ਤੁਸੀਂ ਮੈਨੂੰ ਫਸਲ, ਮੌਸਮ ਜਾਂ ਖੇਤੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛ ਸਕਦੇ ਹੋ। 🌾' : "Hello! I'm your farming assistant. Ask me about crops, weather, or agriculture. 🌾",
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const userId = currentUser?.id || 'anonymous';
      const response = await sendChatMessage(content, conversationId, userId);
      setConversationId(response.conversationId);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      toast.success('Message sent successfully');
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Fallback to mock response if API fails
      const mockResponse = getBotResponse(content, i18n.language);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      toast.error('Using offline mode - limited functionality');
    } finally {
      setIsTyping(false);
    }
  }, [conversationId, currentUser, i18n.language]);

  const handleSendMessage = () => {
    sendMessage(inputMessage);
  };

  const getBotResponse = (message: string, lang: string): string => {
    // Mock response logic for offline fallback
    if (message.toLowerCase().includes('weather') || message.includes('मौसम')) {
      return lang === 'hi' ? 'आज का मौसम अच्छा है। तापमान 28°C है।' : "Today's weather is good. Temperature is 28°C.";
    }
    return lang === 'hi' ? 'मैं आपकी मदद करने के लिए यहाँ हूँ।' : "I'm here to help you.";
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4">
      <div className="max-w-4xl mx-auto">
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

        <Card className="min-h-[500px] max-h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {t('chatbot.chatTitle')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-4 min-h-0">
            <ScrollArea className="flex-1 mb-4 min-h-0">
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        message.role === 'user'
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
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="p-2 rounded-full flex-shrink-0 bg-accent text-accent-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="flex-shrink-0">
              <div className="flex gap-2">
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
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotInterface;