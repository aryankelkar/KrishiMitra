import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  };

  return (
    <Select value={i18n.language} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder={t('lang.label')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t('lang.english')}</SelectItem>
        <SelectItem value="hi">{t('lang.hindi')}</SelectItem>
        <SelectItem value="pa">{t('lang.punjabi')}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;


