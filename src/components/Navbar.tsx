
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X, BookOpen, BookText, User, Heart, ChevronDown, BookOpenCheck, BookmarkPlus } from 'lucide-react';
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
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <BookOpen className="h-6 w-6 text-libra-teal" />
            <span className="font-bold text-xl bg-gradient-to-r from-libra-blue to-libra-teal bg-clip-text text-transparent">
              Libra
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Enhanced with NavigationMenu */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent hover:bg-accent/50 transition-colors",
                    isActive('/') && "bg-accent/30 text-accent-foreground font-medium"
                  )}
                >
                  Acasă
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-accent/50 transition-colors",
                  (isActive('/explore') || location.pathname.includes('/book/')) && 
                  "bg-accent/30 text-accent-foreground font-medium"
                )}>
                  Explorează
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[450px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/explore"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md 
                          bg-gradient-to-br from-libra-blue/10 via-libra-teal/10 to-purple-400/10 p-6 no-underline 
                          outline-none focus:shadow-md transition-all hover:from-libra-blue/20 hover:via-libra-teal/20 
                          hover:to-purple-400/20 hover:scale-[1.02]"
                        >
                          <div className="mb-2 mt-4 flex items-center gap-2">
                            <BookOpenCheck className="h-6 w-6 text-libra-teal" />
                            <span className="text-lg font-medium">
                              Toate cărțile
                            </span>
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Descoperă întreaga bibliotecă de cărți din domeniului public.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/explore?search=classics"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline
                          outline-none transition-colors hover:bg-accent hover:text-accent-foreground
                          focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center gap-1.5">
                            <BookmarkPlus className="h-3.5 w-3.5" />
                            Clasici Universali
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Opere literare clasice ce au marcat literatura universală.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/explore?search=poezie+poetry"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline
                          outline-none transition-colors hover:bg-accent hover:text-accent-foreground
                          focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center gap-1.5">
                            <BookmarkPlus className="h-3.5 w-3.5" />
                            Poezie
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Versuri și creații poetice din întreaga lume.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/explore?search=aventura+adventure"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline
                          outline-none transition-colors hover:bg-accent hover:text-accent-foreground
                          focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center gap-1.5">
                            <BookmarkPlus className="h-3.5 w-3.5" />
                            Aventură
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Povești captivante de explorare și aventură.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/explore?search=literatura+romaneasca"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline
                          outline-none transition-colors hover:bg-accent hover:text-accent-foreground
                          focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center gap-1.5">
                            <BookmarkPlus className="h-3.5 w-3.5" />
                            Literatură românească
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Opere literare reprezentative pentru cultura românească.
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
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent hover:bg-accent/50 transition-colors",
                    isActive('/about') && "bg-accent/30 text-accent-foreground font-medium"
                  )}
                >
                  Despre Libra
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
            <Input
              type="search"
              placeholder="Caută cărți..."
              className="w-[200px] lg:w-[300px] pr-10 transition-all focus-within:w-[350px] bg-background/70"
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

      {/* Mobile Menu - Improved styling with animation */}
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
                  ? "bg-accent/50 text-foreground" 
                  : "hover:bg-accent/30"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              Acasă
            </Link>
            <Link
              to="/explore"
              className={cn(
                "flex items-center gap-2 text-base font-medium py-3 px-3 rounded-md transition-colors",
                isActive('/explore') 
                  ? "bg-accent/50 text-foreground" 
                  : "hover:bg-accent/30"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <BookText className="h-5 w-5" />
              Explorează
            </Link>
            <Link
              to="/about"
              className={cn(
                "flex items-center gap-2 text-base font-medium py-3 px-3 rounded-md transition-colors",
                isActive('/about') 
                  ? "bg-accent/50 text-foreground" 
                  : "hover:bg-accent/30"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              Despre Libra
            </Link>
            
            <div className="mt-2 pt-4 border-t">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 px-3">Categorii populare</h3>
              <div className="space-y-1">
                <Link
                  to="/explore?search=classics"
                  className="flex items-center gap-2 text-sm py-2.5 px-3 rounded-md hover:bg-accent/30 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clasici Universali
                </Link>
                <Link
                  to="/explore?search=poezie+poetry"
                  className="flex items-center gap-2 text-sm py-2.5 px-3 rounded-md hover:bg-accent/30 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Poezie
                </Link>
                <Link
                  to="/explore?search=aventura+adventure"
                  className="flex items-center gap-2 text-sm py-2.5 px-3 rounded-md hover:bg-accent/30 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Aventură
                </Link>
                <Link
                  to="/explore?search=literatura+romaneasca"
                  className="flex items-center gap-2 text-sm py-2.5 px-3 rounded-md hover:bg-accent/30 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Literatură românească
                </Link>
              </div>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="mt-4 pt-4 border-t">
              <div className="flex items-center relative">
                <Input
                  type="search"
                  placeholder="Caută cărți..."
                  className="w-full pr-10"
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
