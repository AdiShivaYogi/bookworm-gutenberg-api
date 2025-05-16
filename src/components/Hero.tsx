
import React from 'react';
import { ArrowRight, BookText, BookOpen, Library } from 'lucide-react';
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
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-2 px-4 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/10">
            <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
              <Library className="h-4 w-4" />
              <span>Digital Library Platform</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Discover the World of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Knowledge</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Libra is a modern digital library that rewards your engagement. 
            Read, discover, and contribute to a growing community of book lovers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-libra-blue hover:bg-white/90 shadow-lg shadow-black/10 font-medium"
            >
              <Link to="/explore" className="gap-2">
                Explore Books
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
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
