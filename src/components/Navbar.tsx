
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X, BookOpen, BookText, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import TokenDisplay from './TokenDisplay';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onSearchChange?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-libra-teal" />
            <span className="font-bold text-xl bg-gradient-to-r from-libra-blue to-libra-teal bg-clip-text text-transparent">
              Libra
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Improved with NavigationMenu */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                  Acasă
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Explorează</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/explore"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-libra-blue/20 to-libra-teal/20 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <BookText className="h-6 w-6 text-libra-teal" />
                          <div className="mt-4 mb-2 text-lg font-medium">
                            Toate cărțile
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
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Clasici Universali</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Opere literare clasice ce au marcat literatura universală.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/explore?search=poetry"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Poezie</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Versuri și creații poetice din întreaga lume.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/explore?search=adventure"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Aventură</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Povești captivante de explorare și aventură.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
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
              className="w-[200px] lg:w-[300px]"
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
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu - Improved styling */}
      {isMobile && isMenuOpen && (
        <div className="container px-4 pb-4 bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              Acasă
            </Link>
            <Link
              to="/explore"
              className="flex items-center gap-2 text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookText className="h-4 w-4" />
              Explorează
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              Despre Libra
            </Link>
            <form onSubmit={handleSearchSubmit} className="flex items-center relative">
              <Input
                type="search"
                placeholder="Caută cărți..."
                className="w-full"
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
