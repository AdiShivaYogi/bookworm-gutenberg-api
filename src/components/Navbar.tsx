
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X, BookOpen, ChevronDown } from 'lucide-react';
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

  // Menu items for categories dropdown
  const categories = [
    { name: 'Ficțiune', href: '/explore?category=fiction' },
    { name: 'Știință și Educație', href: '/explore?category=science' },
    { name: 'Istorie', href: '/explore?category=history' },
    { name: 'Biografie', href: '/explore?category=biography' },
    { name: 'Poezie', href: '/explore?category=poetry' },
    { name: 'Dramă', href: '/explore?category=drama' },
  ];

  const navbarClasses = cn(
    "sticky top-0 z-50 w-full transition-all duration-300 border-b",
    isScrolled 
      ? "bg-background/95 backdrop-blur-lg shadow-sm" 
      : "bg-background/80 backdrop-blur-md"
  );
  
  const navLinkClasses = (active: boolean) => cn(
    "relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300",
    active ? 
      "text-libra-teal after:content-[''] after:absolute after:h-1 after:w-1 after:bg-libra-teal after:rounded-full after:-bottom-1 after:left-1/2 after:-translate-x-1/2" : 
      "text-foreground/80 hover:text-foreground hover:bg-accent/50"
  );

  return (
    <header className={navbarClasses}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo and tagline */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <BookOpen className="h-6 w-6 text-libra-teal" />
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl bg-gradient-to-r from-libra-blue to-libra-teal bg-clip-text text-transparent">
              Libra
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline-block">Biblioteca digitală</span>
          </div>
        </Link>

        {/* Desktop Navigation - Enhanced */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-auto">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-2">
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={navLinkClasses(isActive('/'))}
                >
                  Acasă
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navLinkClasses(isActive('/explore') || location.pathname.includes('/book/'))}>
                  Explorează
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.name} className="row-span-1">
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{category.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/explore"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-libra-teal/50 to-libra-blue/50 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            Toate categoriile
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Descoperă întreaga noastră colecție de cărți digitale gratuite
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link 
                  to="/about" 
                  className={navLinkClasses(isActive('/about'))}
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

      {/* Mobile Menu - Enhanced with animations */}
      {isMobile && (
        <motion.div 
          className={cn(
            "fixed inset-0 z-40 bg-background/95 backdrop-blur-md",
            isMenuOpen ? "flex flex-col" : "hidden"
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="h-16" /> {/* Spacer for navbar */}
          <div className="flex flex-col gap-4 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="space-y-4"
            >
              <Link
                to="/"
                className={cn(
                  "flex items-center gap-2 text-base font-medium py-3 px-3 rounded-full transition-all",
                  isActive('/') 
                    ? "bg-accent/50 text-libra-teal" 
                    : "text-foreground/80 hover:text-foreground hover:bg-accent/30"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Acasă
              </Link>

              {/* Categories dropdown */}
              <div className="space-y-2">
                <Link
                  to="/explore"
                  className={cn(
                    "flex items-center justify-between gap-2 text-base font-medium py-3 px-3 rounded-full transition-all",
                    (isActive('/explore') || location.pathname.includes('/book/')) 
                      ? "bg-accent/50 text-libra-teal" 
                      : "text-foreground/80 hover:text-foreground hover:bg-accent/30"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Explorează</span>
                  <ChevronDown className="h-4 w-4" />
                </Link>

                <div className="pl-4 space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="flex items-center gap-2 text-sm py-2 px-3 rounded-full text-foreground/70 hover:text-foreground hover:bg-accent/20 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/about"
                className={cn(
                  "flex items-center gap-2 text-base font-medium py-3 px-3 rounded-full transition-all",
                  isActive('/about') 
                    ? "bg-accent/50 text-libra-teal" 
                    : "text-foreground/80 hover:text-foreground hover:bg-accent/30"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Despre Libra
              </Link>
            </motion.div>
            
            <motion.form 
              onSubmit={handleSearchSubmit} 
              className="mt-6 pt-4 border-t"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
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
            </motion.form>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
