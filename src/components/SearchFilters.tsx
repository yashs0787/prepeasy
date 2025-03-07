
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, X, MapPin, Briefcase, Clock, Tag } from 'lucide-react';

interface SearchFiltersProps {
  query: string;
  onQueryChange: (query: string) => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export function SearchFilters({ query, onQueryChange, filters, onFiltersChange }: SearchFiltersProps) {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setTempFilters(prev => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      categories: [],
      jobTypes: [],
      workTypes: [],
      locations: []
    };
    setTempFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const removeFilter = (filterType: string, value: string) => {
    onFiltersChange({
      ...filters,
      [filterType]: filters[filterType].filter((v: string) => v !== value)
    });
  };

  const activeFilterCount = Object.values(filters).flat().length;

  return (
    <div className="w-full space-y-4 animated-item">
      <form onSubmit={handleSearchSubmit} className="relative flex w-full max-w-3xl mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="search"
            placeholder="Search jobs, companies, or keywords..."
            className="w-full pl-10 pr-20 h-12 rounded-full border-muted bg-background"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          {query && (
            <button 
              type="button"
              onClick={() => onQueryChange('')}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="absolute right-0 rounded-l-none rounded-r-full h-12 border-l-0 border-muted">
              <SlidersHorizontal size={18} />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-xs text-muted-foreground"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
              
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium flex items-center gap-1.5"><Tag size={14} /> Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Tech', 'Finance', 'Marketing', 'Consulting', 'Startups'].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={(tempFilters.categories || []).includes(category)}
                        onCheckedChange={() => handleFilterChange('categories', category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium flex items-center gap-1.5"><Briefcase size={14} /> Job Type</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`jobType-${type}`} 
                        checked={(tempFilters.jobTypes || []).includes(type)}
                        onCheckedChange={() => handleFilterChange('jobTypes', type)}
                      />
                      <Label htmlFor={`jobType-${type}`} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium flex items-center gap-1.5"><MapPin size={14} /> Work Location</h4>
                <div className="grid grid-cols-1 gap-2">
                  {['Remote', 'On-site', 'Hybrid'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`workType-${type}`} 
                        checked={(tempFilters.workTypes || []).includes(type)}
                        onCheckedChange={() => handleFilterChange('workTypes', type)}
                      />
                      <Label htmlFor={`workType-${type}`} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
            </div>
          </PopoverContent>
        </Popover>
      </form>
      
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 max-w-3xl mx-auto">
          {Object.entries(filters).map(([filterType, values]: [string, any]) =>
            values.length > 0 && values.map((value: string) => (
              <Badge key={`${filterType}-${value}`} variant="outline" className="bg-accent/50 text-xs py-1">
                {value}
                <button
                  className="ml-1 p-0.5 rounded-full hover:bg-muted"
                  onClick={() => removeFilter(filterType, value)}
                >
                  <X size={12} />
                </button>
              </Badge>
            ))
          )}
          {activeFilterCount > 0 && (
            <button
              className="text-xs text-muted-foreground hover:text-foreground ml-2 flex items-center"
              onClick={clearFilters}
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
