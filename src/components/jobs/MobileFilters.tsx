
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { JobCategoriesFilter } from "@/components/JobCategoriesFilter";

interface MobileFiltersProps {
  selectedCategories: string[];
  handleCategoryChange: (categories: string[]) => void;
}

export function MobileFilters({ selectedCategories, handleCategoryChange }: MobileFiltersProps) {
  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full flex gap-2">
            <ListFilter size={18} />
            <span>Categories & Filters</span>
            {selectedCategories.length > 0 && (
              <div className="ml-1 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {selectedCategories.length}
              </div>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md overflow-auto">
          <div className="py-6">
            <h2 className="text-xl font-bold mb-4">Job Filters</h2>
            <JobCategoriesFilter 
              onCategoryChange={handleCategoryChange}
              selectedCategories={selectedCategories}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
