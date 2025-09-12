import React, { forwardRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isRecording: boolean;
  onToggleRecording: () => void;
}

const MessageInput = forwardRef<HTMLInputElement, MessageInputProps>(
  ({ value, onChange, onSend, isRecording, onToggleRecording }, ref) => {
    const { t } = useTranslation();

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    return (
      <div className="flex gap-2">
        <div className="flex-1 flex gap-2">
          <Input
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chatbot.inputPlaceholder')}
            className="flex-1 transition-all focus:ring-2 focus:ring-primary/20"
          />
          
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            onClick={onToggleRecording}
            className="shrink-0 transition-all hover:scale-105"
          >
            {isRecording ? 
              <MicOff className="h-4 w-4" /> : 
              <Mic className="h-4 w-4" />
            }
          </Button>
          
          <Button
            onClick={onSend}
            disabled={!value.trim()}
            className="shrink-0 transition-all hover:scale-105 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
);

MessageInput.displayName = 'MessageInput';

export default MessageInput;