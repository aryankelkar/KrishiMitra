import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const { t } = useTranslation();

  const quickActions = [
    { text: t('chatbot.quickWeather'), action: () => onActionClick(t('chatbot.quickWeatherQ')) },
    { text: t('chatbot.quickCrop'), action: () => onActionClick(t('chatbot.quickCropQ')) },
    { text: t('chatbot.quickPest'), action: () => onActionClick(t('chatbot.quickPestQ')) },
    { text: t('chatbot.quickMarket'), action: () => onActionClick(t('chatbot.quickMarketQ')) }
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {quickActions.map((item, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={item.action}
          className="text-xs transition-all hover:scale-105 hover:shadow-sm"
        >
          {item.text}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;