
import React from 'react';
import { Book, Users, FileText, ArrowUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    label: "Cărți Disponibile",
    value: "70,000+",
    icon: Book,
    change: "+2,500 luna aceasta",
    trend: "up"
  },
  {
    label: "Cititori Activi",
    value: "12,450",
    icon: Users,
    change: "+8% față de luna trecută",
    trend: "up"
  },
  {
    label: "Recenzii Publicate",
    value: "45,320",
    icon: FileText,
    change: "+1,250 luna aceasta",
    trend: "up"
  },
  {
    label: "Token-uri READ Acordate",
    value: "1.2M",
    icon: ArrowUp,
    change: "325,000 luna aceasta",
    trend: "up"
  }
];

const LibraStats: React.FC = () => {
  return (
    <section className="container px-4 py-12">
      <h2 className="text-2xl font-bold mb-8 text-center">Libra în Cifre</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-transparent shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LibraStats;
