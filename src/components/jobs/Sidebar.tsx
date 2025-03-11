
import { JobCategoriesFilter } from "@/components/JobCategoriesFilter";

interface SidebarProps {
  selectedCategories: string[];
  handleCategoryChange: (categories: string[]) => void;
}

export function Sidebar({ selectedCategories, handleCategoryChange }: SidebarProps) {
  return (
    <aside className="hidden lg:block space-y-6">
      <h1 className="text-2xl font-bold">Job Board</h1>
      <JobCategoriesFilter 
        onCategoryChange={handleCategoryChange}
        selectedCategories={selectedCategories}
      />
    </aside>
  );
}
