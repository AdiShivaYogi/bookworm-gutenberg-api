
import React from 'react';
import { BookOpen, BookText, Star, Sparkles, Layers, BookOpenCheck, Library, Grid2x2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface CategoryItem {
  name: string;
  icon: React.ReactNode;
  query: string;
  color: string;
}

const categories: CategoryItem[] = [
  {
    name: "Clasici Universali",
    icon: <BookOpen className="h-6 w-6" />,
    query: "classics",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    name: "Poezie",
    icon: <Star className="h-6 w-6" />,
    query: "poetry",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    name: "Filozofie",
    icon: <Sparkles className="h-6 w-6" />,
    query: "philosophy",
    color: "from-amber-500/20 to-amber-600/20"
  },
  {
    name: "Aventură",
    icon: <Layers className="h-6 w-6" />,
    query: "adventure",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    name: "Science Fiction",
    icon: <BookOpenCheck className="h-6 w-6" />,
    query: "science fiction",
    color: "from-cyan-500/20 to-cyan-600/20"
  },
  {
    name: "Teatru",
    icon: <Grid2x2 className="h-6 w-6" />,
    query: "drama",
    color: "from-red-500/20 to-red-600/20"
  },
  {
    name: "Biografii",
    icon: <BookText className="h-6 w-6" />,
    query: "biography",
    color: "from-pink-500/20 to-pink-600/20"
  },
  {
    name: "Copii",
    icon: <Library className="h-6 w-6" />,
    query: "children",
    color: "from-indigo-500/20 to-indigo-600/20"
  }
];

const PopularCategories: React.FC = () => {
  return (
    <section className="container px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Categorii Populare</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category, index) => (
          <Link 
            key={index} 
            to={`/explore?search=${encodeURIComponent(category.query)}`}
            className="block group"
          >
            <Card className={`h-full bg-gradient-to-br ${category.color} border-transparent hover:border-primary/20 transition-all duration-300 hover:scale-105`}>
              <div className="flex flex-col items-center justify-center p-4 h-full">
                <div className="bg-white/80 rounded-full p-3 mb-3 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
