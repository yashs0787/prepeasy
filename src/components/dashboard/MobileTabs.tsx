
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Building, Video, Settings, Sparkles } from "lucide-react";

interface MobileTabsProps {
  activeTab: string;
  onValueChange: (value: string) => void;
}

export function MobileTabs({ activeTab, onValueChange }: MobileTabsProps) {
  return (
    <div className="md:hidden">
      <Tabs value={activeTab} onValueChange={onValueChange}>
        <TabsList className="grid grid-cols-5 h-auto">
          <TabsTrigger value="applications" className="flex flex-col py-2 px-1">
            <Building className="h-4 w-4 mb-1" />
            <span className="text-[10px]">Applications</span>
          </TabsTrigger>
          
          <TabsTrigger value="saved_jobs" className="flex flex-col py-2 px-1">
            <Bookmark className="h-4 w-4 mb-1" />
            <span className="text-[10px]">Saved Jobs</span>
          </TabsTrigger>
          
          <TabsTrigger value="recommendations" className="flex flex-col py-2 px-1">
            <Sparkles className="h-4 w-4 mb-1 text-amber-400" />
            <span className="text-[10px]">For You</span>
          </TabsTrigger>
          
          <TabsTrigger value="interviews" className="flex flex-col py-2 px-1">
            <Video className="h-4 w-4 mb-1" />
            <span className="text-[10px]">Interviews</span>
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
