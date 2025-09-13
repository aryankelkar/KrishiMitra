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
              className={`${mobile ? 'w-full justify-start' : ''} gap-2 hover-lift transition-all duration-300 ${
                isActive ? 'shadow-medium hover-glow' : 'hover:bg-primary/10'
              }`}
            >
              <IconComponent className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
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
      <nav className="hidden md:flex items-center justify-between p-4 bg-card/80 backdrop-blur-md border-b shadow-soft sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <img src="/logo.png" alt="logo" className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow"></div>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gradient">{t('app.name')}</h1>
            <p className="text-xs text-muted-foreground">{t('app.tagline')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <NavItems />
          <LanguageSwitcher />
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          aria-label={t('nav.settings')}
          className="hover-lift transition-all duration-300"
          onClick={() => {
            alert('Settings: App preferences and configuration - Feature coming soon!');
          }}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-between p-4 bg-card/80 backdrop-blur-md border-b shadow-soft sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="relative group">
            <img src="/logo.png" alt="logo" className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h1 className="text-base font-semibold text-gradient">{t('app.name')}</h1>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t shadow-strong p-2 z-40">
        <div className="flex justify-around">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path} className="flex-1">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`w-full flex-col h-12 text-xs gap-1 transition-all duration-300 hover-lift ${
                    isActive ? 'shadow-medium hover-glow' : 'hover:bg-primary/10'
                  }`}
                >
                  <IconComponent className={`h-4 w-4 transition-transform duration-300 ${
                    isActive ? 'animate-bounce-gentle' : ''
                  }`} />
                  <span className="font-medium">{t(item.labelKey)}</span>
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