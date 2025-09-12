import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  BarChart3, 
  Sprout, 
  Users,
  Settings,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Navigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navigationItems = [
    { path: '/', labelKey: 'nav.chat', icon: MessageSquare },
    { path: '/dashboard', labelKey: 'nav.dashboard', icon: BarChart3 },
    { path: '/crops', labelKey: 'nav.crops', icon: Sprout },
    { path: '/community', labelKey: 'nav.community', icon: Users }
  ];

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex ${mobile ? 'flex-col' : 'flex-row'} gap-2`}>
      {navigationItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link key={item.path} to={item.path}>
            <Button
              variant={isActive ? "default" : "ghost"}
              size={mobile ? "lg" : "sm"}
              className={`${mobile ? 'w-full justify-start' : ''} gap-2 transition-all hover:scale-105`}
            >
              <IconComponent className="h-4 w-4" />
              <span className="text-xs sm:text-sm">{t(item.labelKey)}</span>
            </Button>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between p-4 bg-card border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 animate-scale-in">
            <Sprout className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">{t('app.name')}</h1>
            <p className="text-xs text-muted-foreground">{t('app.tagline')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <NavItems />
          <LanguageSwitcher />
        </div>
        
        <Button variant="ghost" size="sm" aria-label={t('nav.settings')} className="transition-all hover:scale-105">
          <Settings className="h-4 w-4" />
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-between p-4 bg-card border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-primary/10 animate-scale-in">
            <Sprout className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-base font-semibold">{t('app.name')}</h1>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="transition-all hover:scale-105">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="animate-slide-in-right">
            <div className="mt-6">
              <NavItems mobile />
              <div className="mt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t p-2">
        <div className="flex justify-around">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path} className="flex-1">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="w-full flex-col h-12 text-xs gap-1 transition-all hover:scale-105"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{t(item.labelKey)}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;