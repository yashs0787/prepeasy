
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Building, FileText, Search, Settings, Bell } from "lucide-react";

interface MobileTabsProps {
  activeTab: string;
  onValueChange: (value: string) => void;
}

export function MobileTabs({ activeTab, onValueChange }: MobileTabsProps) {
  return (
    <div className="md:hidden">
      <Tabs value={activeTab} onValueChange={onValueChange}>
        <TabsList className="grid grid-cols-6 h-auto">
          <TabsTrigger value="applications" className="flex flex-col py-2 px-1">
            <Building className="h-4 w-4 mb-1" />
            <span className="text-[10px]">Applications</span>
          </TabsTrigger>
          
          <TabsTrigger value="saved" className="flex flex-col py-2 px-1">
            <Bookmark className="h-4 w-4 mb-1" />
            <span className="text-[10px]">Saved</span>
          </TabsTrigger>
          
          <TabsTrigger value="scraper" className="flex flex-col py-2 px-1">
            <Search className="h-4 w-4 mb-1" />
            <span className="text-[10px]">Scraper</span>
          </TabsTrigger>
          
          <TabsTrigger value="resume" className="flex flex-col py-2 px-1">
            <FileText className="h-4 w-4 mb-1" />
            <span className="text-[10px]">Resume</span>
          </TabsTrigger>
          
          <TabsTrigger value="notifications" className="flex flex-col py-2 px-1">
            <Bell className="h-4 w-4 mb-1" />
            <span className="text-[10px]">Alerts</span>
          </TabsTrigger>
          
          <TabsTrigger value="settings" className="flex flex-col py-2 px-1">
            <Settings className="h-4 w-4 mb-1" />
            <span className="text-[10px]">Settings</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
