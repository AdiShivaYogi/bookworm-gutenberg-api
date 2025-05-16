
import React from 'react';
import { ArrowRight, BookText, BookOpen } from 'lucide-react';
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
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Discover the World of Knowledge
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Libra is a modern digital library that rewards your engagement. 
            Read, discover, and contribute to a growing community of book lovers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-libra-blue hover:bg-white/90"
            >
              <Link to="/explore">
                Explore Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/20"
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
