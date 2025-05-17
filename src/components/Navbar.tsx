
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import TokenDisplay from './TokenDisplay';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { motion } from 'framer-motion';

interface NavbarProps {
  onSearchChange?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if a nav link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navbarClasses = cn(
    "sticky top-0 z-50 w-full transition-all duration-300 border-b",
    isScrolled 
      ? "bg-background/95 backdrop-blur-lg shadow-sm" 
      : "bg-background/80 backdrop-blur-md"
  );

  return (
    <header className={navbarClasses}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo and tagline */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <BookOpen className="h-6 w-6 text-libra-teal" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl bg-gradient-to-r from-libra-blue to-libra-teal bg-clip-text text-transparent">
                Libra
              </span>
              <span className="text-xs text-muted-foreground hidden sm:inline-block">Biblioteca digitală</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Simplified */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-auto">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-2">
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive('/') ? "text-libra-teal" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  Acasă
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link 
                  to="/explore"
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive('/explore') || location.pathname.includes('/book/') ? 
                      "text-libra-teal" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  Explorează
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link 
                  to="/about" 
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive('/about') ? "text-libra-teal" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  Despre Libra
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
            <Input
              type="search"
              placeholder="Caută cărți, autori sau subiecte..."
              className="w-[240px] lg:w-[300px] pr-10 transition-all focus-within:w-[350px] bg-background/70 rounded-full border-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <TokenDisplay />

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu - Simplified */}
      {isMobile && (
        <motion.div 
          className={cn(
            "fixed inset-0 z-40 bg-background/95 backdrop-blur-md",
            isMenuOpen ? "flex flex-col" : "hidden"
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-16" /> {/* Spacer for navbar */}
          <nav className="flex flex-col gap-4 p-6">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2 text-base font-medium py-3 px-3 rounded-md transition-colors",
                isActive('/') 
                  ? "text-libra-teal" 
                  : "text-foreground/80 hover:text-foreground"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Acasă
            </Link>
            <Link
              to="/explore"
              className={cn(
                "flex items-center gap-2 text-base font-medium py-3 px-3 rounded-md transition-colors",
                isActive('/explore') 
                  ? "text-libra-teal" 
                  : "text-foreground/80 hover:text-foreground"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Explorează
            </Link>
            <Link
              to="/about"
              className={cn(
                "flex items-center gap-2 text-base font-medium py-3 px-3 rounded-md transition-colors",
                isActive('/about') 
                  ? "text-libra-teal" 
                  : "text-foreground/80 hover:text-foreground"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Despre Libra
            </Link>
            
            <form onSubmit={handleSearchSubmit} className="mt-4 pt-4 border-t">
              <div className="flex items-center relative">
                <Input
                  type="search"
                  placeholder="Caută cărți, autori sau subiecte..."
                  className="w-full pr-10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
