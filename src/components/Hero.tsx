
import React from 'react';
import { ArrowRight, BookText, BookOpen, Library, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-libra-blue to-accent py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <BookText className="h-32 w-32 text-white" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <BookOpen className="h-24 w-24 text-white" />
      </div>
      
      {/* Animated background shapes */}
      <div className="absolute top-1/4 -left-12 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-12 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-block p-2 px-4 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/10">
              <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                <Library className="h-4 w-4" />
                <span>Biblioteca Digitală</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Descoperă Lumea <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Cunoașterii</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Libra este o bibliotecă digitală modernă care recompensează implicarea ta.
              Citește, descoperă și contribuie la o comunitate în creștere de iubitori de cărți.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-libra-blue hover:bg-white/90 shadow-lg shadow-black/10 font-medium"
              >
                <Link to="/explore" className="gap-2">
                  Explorează Cărți
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-medium"
              >
                <Link to="/about">
                  Află Mai Multe
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block w-full md:w-1/2 mt-8 md:mt-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-lg"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden shadow-xl">
                <div className="grid grid-cols-2 gap-1 p-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="aspect-[3/4] rounded-md overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10"
                    >
                      <div className="w-full h-full bg-white/5 flex items-center justify-center p-2">
                        <BookOpen className="w-8 h-8 text-white/30" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 flex items-center justify-between bg-white/5 border-t border-white/10">
                  <div>
                    <div className="w-20 h-2 bg-white/20 rounded-full"></div>
                    <div className="w-12 h-2 bg-white/10 rounded-full mt-2"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Search className="w-4 h-4 text-white/30" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <BookText className="w-4 h-4 text-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
