
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface JobCategoriesFilterProps {
  onCategoryChange: (category: string[]) => void;
  selectedCategories: string[];
}

export function JobCategoriesFilter({ onCategoryChange, selectedCategories }: JobCategoriesFilterProps) {
  const [activeTab, setActiveTab] = useState<string>("job-type");
  
  const categories = {
    "job-type": [
      "Internships (Paid)", "Internships (Unpaid)", "Internships (Virtual)", "Internships (In-office)",
      "Full-time", "Part-time", "Freelance/Contract", "Remote", "Hybrid"
    ],
    "experience": [
      "Entry-Level", "Mid-Level", "Senior-Level", "Executive/C-Level"
    ],
    "industry": [
      "Software & IT", "Finance & Accounting", "Marketing & Sales", "Operations & Logistics",
      "HR & Talent Acquisition", "Consulting & Strategy", "Creative & Design", "Legal & Compliance",
      "Healthcare & Biotech", "Data Science & Analytics", "Education & Research"
    ]
  };
  
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const clearCategories = () => {
    onCategoryChange([]);
  };
  
  return (
    <div className="space-y-4 animated-item">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Categories</h3>
          {selectedCategories.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCategories}
              className="text-xs h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>
        
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="job-type">Job Type</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="industry">Industry</TabsTrigger>
        </TabsList>
        
        {Object.entries(categories).map(([key, items]) => (
          <TabsContent key={key} value={key} className="mt-0">
            <div className="flex flex-wrap gap-2">
              {items.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <Badge 
                    key={category}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer py-1.5 px-3 ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'}`}
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {isSelected && <Check className="mr-1 h-3 w-3" />}
                    {category}
                  </Badge>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-sm text-muted-foreground py-1">Selected:</span>
          {selectedCategories.map((category) => (
            <Badge 
              key={category}
              variant="secondary"
              className="py-1"
            >
              {category}
              <button 
                className="ml-1 text-muted-foreground hover:text-foreground" 
                onClick={() => handleCategoryToggle(category)}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
