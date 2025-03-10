
import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { BookmarkIcon, BellIcon, ClipboardListIcon, FileEditIcon } from "lucide-react";

interface MobileTabsProps {
  activeTab: string;
  onValueChange: (value: string) => void;
}

export function MobileTabs({ activeTab, onValueChange }: MobileTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onValueChange} className="md:hidden">
      <TabsList className="w-full grid grid-cols-4">
        <TabsTrigger value="applications">
          <ClipboardListIcon size={16} />
        </TabsTrigger>
        <TabsTrigger value="saved">
          <BookmarkIcon size={16} />
        </TabsTrigger>
        <TabsTrigger value="resume">
          <FileEditIcon size={16} />
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <BellIcon size={16} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
