
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BriefcaseIcon, BriefcaseBusinessIcon, BarChartBigIcon, 
  TrendingUpIcon, HeartHandshakeIcon, MoveRightIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  count: number;
}

interface JobCategoriesProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null;
}

export function JobCategories({ onSelectCategory, selectedCategory }: JobCategoriesProps) {
  const categories: Category[] = [
    { id: 'Tech', name: 'Technology', icon: BriefcaseIcon, count: 427 },
    { id: 'Finance', name: 'Finance', icon: BarChartBigIcon, count: 238 },
    { id: 'Marketing', name: 'Marketing', icon: TrendingUpIcon, count: 175 },
    { id: 'Consulting', name: 'Consulting', icon: HeartHandshakeIcon, count: 124 },
    { id: 'Startups', name: 'Startups', icon: BriefcaseBusinessIcon, count: 86 },
  ];

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium">Popular Categories</h2>
        <button className="text-sm text-primary flex items-center gap-1 hover:underline">
          View all <MoveRightIcon size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id === selectedCategory ? '' : category.id)}
            className={cn(
              "animated-item flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300",
              "hover:bg-primary/5 border border-transparent hover:border-primary/10",
              selectedCategory === category.id ? "bg-primary/5 border-primary/20" : "bg-card"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-3",
              selectedCategory === category.id ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
            )}>
              <category.icon size={22} />
            </div>
            <span className="font-medium text-sm">{category.name}</span>
            <span className="text-xs text-muted-foreground mt-1">{category.count} jobs</span>
          </button>
        ))}
      </div>
    </div>
  );
}
