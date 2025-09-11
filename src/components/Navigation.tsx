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

const Navigation = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      path: '/',
      label: 'AI Chat',
      labelHi: 'AI चैट',
      icon: MessageSquare
    },
    {
      path: '/dashboard',
      label: 'Dashboard',
      labelHi: 'डैशबोर्ड',
      icon: BarChart3
    },
    {
      path: '/crops',
      label: 'My Crops',
      labelHi: 'मेरी फसल',
      icon: Sprout
    },
    {
      path: '/community',
      label: 'Community',
      labelHi: 'समुदाय',
      icon: Users
    }
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
              className={`${mobile ? 'w-full justify-start' : ''} gap-2`}
            >
              <IconComponent className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden text-xs">{item.labelHi}</span>
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
          <div className="p-2 rounded-full bg-primary/10">
            <Sprout className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">कृषि मित्र</h1>
            <p className="text-xs text-muted-foreground">Smart Farming Assistant</p>
          </div>
        </div>
        
        <NavItems />
        
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-between p-4 bg-card border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-primary/10">
            <Sprout className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-base font-semibold">कृषि मित्र</h1>
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
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t p-2">
        <div className="flex justify-around">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path} className="flex-1">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="w-full flex-col h-12 text-xs gap-1"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.labelHi}</span>
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