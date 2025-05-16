
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Coins,
  BookOpen,
  Heart,
  MessageSquare,
  Share,
  Award,
  Globe,
  FileText,
  Users
} from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-libra-blue to-accent py-16 md:py-24 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                About Libra
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                A modern digital library with community rewards, powered by 
                Project Gutenberg's vast collection of free ebooks.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg mb-6">
                Libra aims to democratize knowledge by providing free access to thousands of books 
                while rewarding user engagement and contributions. We're building a community-driven
                platform where readers can discover, share, and contribute to a growing library.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <BookOpen className="h-10 w-10 text-libra-teal mb-4" />
                  <h3 className="text-xl font-medium mb-2">Free Access to Books</h3>
                  <p className="text-muted-foreground">
                    All books on our platform are freely available, thanks to Project Gutenberg's 
                    public domain collection.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <Globe className="h-10 w-10 text-libra-teal mb-4" />
                  <h3 className="text-xl font-medium mb-2">Multilingual Content</h3>
                  <p className="text-muted-foreground">
                    Books in many languages, making knowledge accessible across cultural and 
                    linguistic boundaries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Token System Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Coins className="h-8 w-8 text-libra-amber" />
                <h2 className="text-2xl md:text-3xl font-bold">The READ Token System</h2>
              </div>
              
              <p className="text-lg mb-6">
                Our platform uses READ tokens to reward community participation and engagement.
                These tokens are a symbolic representation of your contribution to the Libra ecosystem.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                <div className="border rounded-lg p-4">
                  <Heart className="h-5 w-5 text-libra-teal mb-2" />
                  <h3 className="font-medium mb-1">Like Books</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your appreciation for books you enjoy
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <MessageSquare className="h-5 w-5 text-libra-teal mb-2" />
                  <h3 className="font-medium mb-1">Write Reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your insights and earn tokens
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <Share className="h-5 w-5 text-libra-teal mb-2" />
                  <h3 className="font-medium mb-1">Share Books</h3>
                  <p className="text-sm text-muted-foreground">
                    Help others discover great reads
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <FileText className="h-5 w-5 text-libra-teal mb-2" />
                  <h3 className="font-medium mb-1">Add Metadata</h3>
                  <p className="text-sm text-muted-foreground">
                    Help improve book information
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <Globe className="h-5 w-5 text-libra-teal mb-2" />
                  <h3 className="font-medium mb-1">Translate</h3>
                  <p className="text-sm text-muted-foreground">
                    Help translate book details
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <Award className="h-5 w-5 text-libra-teal mb-2" />
                  <h3 className="font-medium mb-1">Earn Badges</h3>
                  <p className="text-sm text-muted-foreground">
                    Get recognized for your contributions
                  </p>
                </div>
              </div>
              
              <div className="mt-8 bg-muted/40 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Future features of the READ token ecosystem:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-libra-teal" />
                    <span>Community voting on new features and book collections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="h-4 w-4 mt-0.5 text-libra-teal" />
                    <span>Special badges and achievements for active contributors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 mt-0.5 text-libra-teal" />
                    <span>Premium content access through token staking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Gutendex */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Powered by Gutendex</h2>
              <p className="mb-6">
                Libra is built on top of Gutendex, a simple, self-hosted web API that serves book catalog 
                information from Project Gutenberg, an online library of free ebooks.
              </p>
              
              <p className="mb-6">
                Project Gutenberg offers over 60,000 free ebooks in various formats - books that have 
                previously been published by bona fide publishers and whose U.S. copyright has expired.
              </p>
              
              <p>
                <a 
                  href="https://github.com/garethbjohnson/gutendex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit the Gutendex GitHub repository
                </a>
                {' '}or{' '}
                <a 
                  href="https://www.gutenberg.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  learn more about Project Gutenberg
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
