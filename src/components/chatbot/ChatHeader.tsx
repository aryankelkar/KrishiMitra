import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface ChatHeaderProps {
  isListening: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isListening }) => {
  const { t } = useTranslation();

  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-primary/10">
            <MessageCircle className="h-4 w-4 text-primary" />
          </div>
          {t('chatbot.chatTitle')}
        </CardTitle>
        <div className="flex gap-2">
          <Badge 
            variant={isListening ? "default" : "secondary"} 
            className="flex items-center gap-1 transition-all"
          >
            {isListening ? 
              <Volume2 className="h-3 w-3" /> : 
              <VolumeX className="h-3 w-3" />
            }
            {isListening ? t('chatbot.listening') : t('chatbot.muted')}
          </Badge>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;