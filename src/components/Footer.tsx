
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Github, Twitter, Facebook, Instagram, 
  Mail, MapPin, Phone, AtSign
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
    <footer className="bg-background border-t mt-auto">
      <div className="container px-4 py-12 md:py-16">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-libra-teal" />
              <div className="flex flex-col items-start">
                <span className="font-bold text-xl bg-gradient-to-r from-libra-blue to-libra-teal bg-clip-text text-transparent">
                  Libra
                </span>
                <span className="text-xs text-muted-foreground">Biblioteca digitală</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Bibliotecă digitală cu acces liber la cărți din domeniul public. Citește, explorează și participă în comunitatea noastră.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <SocialButton href="https://github.com" icon={Github} label="GitHub" />
              <SocialButton href="https://facebook.com" icon={Facebook} label="Facebook" />
              <SocialButton href="https://twitter.com" icon={Twitter} label="Twitter" />
              <SocialButton href="https://instagram.com" icon={Instagram} label="Instagram" />
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm mb-4">Navigare</h3>
            <ul className="space-y-2">
              <NavItem to="/" label="Acasă" />
              <NavItem to="/explore" label="Explorează cărți" />
              <NavItem to="/about" label="Despre Libra" />
              <NavItem to="/explore?search=classics" label="Clasici universali" />
              <NavItem to="/explore?search=noi" label="Cărți adăugate recent" />
            </ul>
          </div>
          
          {/* Categorii populare */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm mb-4">Categorii populare</h3>
            <ul className="space-y-2">
              <NavItem to="/explore?search=fiction" label="Ficțiune clasică" />
              <NavItem to="/explore?search=poezie+poetry" label="Poezie" />
              <NavItem to="/explore?search=philosophy" label="Filosofie" />
              <NavItem to="/explore?search=aventura+adventure" label="Aventură" />
              <NavItem to="/explore?search=science+fiction" label="Science Fiction" />
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-sm mb-4">Abonează-te la newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Primește recomandări de cărți și noutăți direct în inbox-ul tău.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-1 rounded-full"
                required
              />
              <Button type="submit" variant="default" className="bg-libra-teal hover:bg-libra-teal/90 text-white rounded-full">
                Abonează-te
              </Button>
            </form>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 border-t border-b py-8">
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
        
        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {currentYear} Libra. Toate drepturile rezervate.
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
  label: string;
}> = ({ to, label }) => (
  <li>
    <Link 
      to={to} 
      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:translate-x-0.5 duration-200"
    >
      {label}
    </Link>
  </li>
);

// Component pentru informații de contact
const ContactItem: React.FC<{
  icon: React.ElementType;
  title: string;
  detail: string;
}> = ({ icon: Icon, title, detail }) => (
  <div className="flex items-center gap-3">
    <div className="bg-background p-2 rounded-full border">
      <Icon className="h-4 w-4 text-libra-teal" />
    </div>
    <div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
  </div>
);

export default Footer;
