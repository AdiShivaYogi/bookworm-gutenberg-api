
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Github, Twitter, Globe, Mail, BookText, BookOpenCheck, 
  Star, Heart, MessageSquare, GraduationCap, ArrowRight, Youtube,
  Facebook, Instagram, MapPin, Phone, AtSign, Users, Laptop
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Newsletter form submission
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // În implementarea reală, aici ar fi cod pentru procesarea abonării la newsletter
    const input = e.currentTarget.querySelector('input');
    if (input) {
      alert(`Mulțumim pentru abonare! Vom trimite actualizări la ${input.value}`);
      input.value = '';
    }
  };

  return (
    <footer className="bg-gradient-to-br from-background to-muted/30 border-t mt-auto">
      <div className="container px-4 py-16 md:py-20">
        {/* Top section with newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-center">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-libra-blue to-libra-teal bg-clip-text text-transparent">
              Alătură-te comunității Libra
            </h3>
            <p className="text-muted-foreground mb-0 max-w-md">
              Abonează-te la newsletter pentru a primi recomandări de cărți personalizate și cele mai noi actualizări.
            </p>
          </div>
          <div className="w-full">
            <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-lg gap-2">
              <Input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-libra-blue to-libra-teal hover:from-libra-blue/90 hover:to-libra-teal/90 text-white">
                Abonează-te <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <Separator className="my-10" />
        
        {/* Main footer content with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-libra-teal" />
              <span className="font-bold text-xl bg-gradient-to-r from-libra-blue to-libra-teal bg-clip-text text-transparent">
                Libra
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              O bibliotecă digitală modernă cu recompense comunitare, alimentată de colecția vastă a 
              Project Gutenberg. Citește, explorează și câștigă token-uri READ participând activ în comunitate.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <SocialButton href="https://github.com" icon={Github} label="GitHub" />
              <SocialButton href="https://facebook.com" icon={Facebook} label="Facebook" />
              <SocialButton href="https://twitter.com" icon={Twitter} label="Twitter" />
              <SocialButton href="https://instagram.com" icon={Instagram} label="Instagram" />
              <SocialButton href="https://youtube.com" icon={Youtube} label="YouTube" />
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base mb-4 uppercase tracking-wide text-sm">Navigare</h3>
            <ul className="space-y-3">
              <NavItem to="/" icon={BookOpen} label="Acasă" />
              <NavItem to="/explore" icon={BookText} label="Explorează cărți" />
              <NavItem to="/about" icon={BookOpenCheck} label="Despre Libra" />
              <NavItem to="/explore?search=classics" icon={Star} label="Clasici universali" />
              <NavItem to="/explore?search=noi" icon={Star} label="Cărți adăugate recent" />
            </ul>
          </div>
          
          {/* Categorii populare */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base mb-4 uppercase tracking-wide text-sm">Categorii populare</h3>
            <ul className="space-y-3">
              <NavItem to="/explore?search=fiction" label="Ficțiune clasică" />
              <NavItem to="/explore?search=poezie+poetry" label="Poezie" />
              <NavItem to="/explore?search=philosophy" label="Filosofie" />
              <NavItem to="/explore?search=aventura+adventure" label="Aventură" />
              <NavItem to="/explore?search=science+fiction" label="Science Fiction" />
              <NavItem to="/explore?search=historia" label="Istorie" />
              <NavItem to="/explore?search=copii" label="Cărți pentru copii" />
            </ul>
          </div>
          
          {/* Resurse și Informații */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base mb-4 uppercase tracking-wide text-sm">Resurse</h3>
            <ul className="space-y-3">
              <ExternalNavItem 
                href="https://www.gutenberg.org" 
                label="Project Gutenberg"
              />
              <ExternalNavItem 
                href="https://gutendex.com" 
                label="API Gutendex"
              />
              <ExternalNavItem 
                href="https://github.com/garethbjohnson/gutendex" 
                label="GitHub Gutendex"
                icon={Github}
              />
              <ExternalNavItem 
                href="https://www.perplexity.ai" 
                label="Perplexity AI"
              />
              <Separator className="my-3" />
              <NavItem to="/help" icon={MessageSquare} label="Întrebări frecvente" />
              <NavItem to="/community" icon={Users} label="Comunitate" />
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-10 bg-accent/20 p-6 rounded-lg">
          <ContactItem 
            icon={MapPin} 
            title="Adresă" 
            detail="Strada Bibliotecii Nr. 42, București"
          />
          <ContactItem 
            icon={Phone} 
            title="Telefon" 
            detail="+40 721 234 567"
          />
          <ContactItem 
            icon={AtSign} 
            title="Email" 
            detail="contact@libra-books.com"
          />
        </div>
        
        <Separator className="my-8" />
        
        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {currentYear} Libra. Toate drepturile rezervate. Bazat pe Gutendex și Project Gutenberg.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
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

// Component pentru butoane de social media
const SocialButton: React.FC<{
  href: string;
  icon: React.ElementType;
  label: string;
}> = ({ href, icon: Icon, label }) => (
  <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-accent/50 hover:scale-105 transition-all">
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Icon className="h-4 w-4" />
    </a>
  </Button>
);

// Component pentru link-uri de navigare
const NavItem: React.FC<{
  to: string;
  icon?: React.ElementType;
  label: string;
}> = ({ to, icon: Icon, label }) => (
  <li>
    <Link 
      to={to} 
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:translate-x-0.5 duration-200",
        !Icon && "hover:underline underline-offset-4"
      )}
    >
      {Icon && <Icon className="h-4 w-4 text-libra-teal" />}
      {label}
    </Link>
  </li>
);

// Component pentru link-uri externe
const ExternalNavItem: React.FC<{
  href: string;
  icon?: React.ElementType;
  label: string;
}> = ({ href, icon: Icon, label }) => (
  <li>
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:translate-x-0.5 duration-200",
        !Icon && "hover:underline underline-offset-4"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </a>
  </li>
);

// Component pentru informații de contact
const ContactItem: React.FC<{
  icon: React.ElementType;
  title: string;
  detail: string;
}> = ({ icon: Icon, title, detail }) => (
  <div className="flex items-start gap-3">
    <div className="bg-background p-2.5 rounded-full">
      <Icon className="h-5 w-5 text-libra-teal" />
    </div>
    <div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
  </div>
);

export default Footer;
