
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Globe, Mail, BookText, BookOpenCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/20 border-t mt-auto">
      <div className="container px-4 py-12 md:py-16">
        {/* Top section with primary navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-libra-teal" />
              <span className="font-bold text-lg bg-gradient-to-r from-libra-blue to-libra-teal bg-clip-text text-transparent">
                Libra
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              O bibliotecă digitală modernă cu recompense comunitare, alimentată de colecția vastă a Project Gutenberg.
            </p>
            
            <div className="flex items-center gap-3 pt-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:contact@libra-books.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://libra-books.com" target="_blank" rel="noopener noreferrer" aria-label="Website">
                  <Globe className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-base mb-4">Navigare</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-libra-teal" />
                  Acasă
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <BookText className="h-4 w-4 text-libra-teal" />
                  Explorează cărți
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <BookOpenCheck className="h-4 w-4 text-libra-teal" />
                  Despre Libra
                </Link>
              </li>
              <li>
                <Link to="/explore?search=classics" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Star className="h-4 w-4 text-libra-teal" />
                  Clasici universali
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-base mb-4">Categorii populare</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/explore?search=fiction" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Ficțiune clasică
                </Link>
              </li>
              <li>
                <Link to="/explore?search=poetry" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Poezie
                </Link>
              </li>
              <li>
                <Link to="/explore?search=philosophy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Filozofie
                </Link>
              </li>
              <li>
                <Link to="/explore?search=adventure" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Aventură
                </Link>
              </li>
              <li>
                <Link to="/explore?search=science+fiction" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Science Fiction
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-base mb-4">Resurse</h3>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="https://gutendex.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  API Gutendex
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gutenberg.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Project Gutenberg
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/garethbjohnson/gutendex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <Github className="h-3.5 w-3.5" />
                  Github Gutendex
                </a>
              </li>
              <li>
                <a 
                  href="https://www.perplexity.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Perplexity AI
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {currentYear} Libra. Toate drepturile rezervate. Bazat pe Gutendex și Project Gutenberg.
          </p>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Termeni și condiții
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Confidențialitate
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Accesibilitate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
