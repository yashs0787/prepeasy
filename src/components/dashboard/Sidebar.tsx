
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart2, Bell, Bookmark, Building, FileText, Rocket, Settings, Users } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appliedJobs: number;
  interviewingJobs: number;
  offeredJobs: number;
  rejectedJobs: number;
  totalJobs: number;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  appliedJobs,
  interviewingJobs,
  offeredJobs,
  rejectedJobs,
  totalJobs
}: SidebarProps) {
  const tabs = [
    {
      id: "applications",
      label: "Applications",
      icon: <Building className="h-4 w-4 mr-2" />,
      count: appliedJobs
    },
    {
      id: "saved",
      label: "Saved Jobs",
      icon: <Bookmark className="h-4 w-4 mr-2" />,
      count: totalJobs
    },
    {
      id: "resume",
      label: "Resume Builder",
      icon: <FileText className="h-4 w-4 mr-2" />
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-4 w-4 mr-2" />
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />
    }
  ];

  return (
    <div className="hidden md:flex flex-col gap-1">
      <div className="pb-6">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Manage your job applications</p>
      </div>
      
      <div className="space-y-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              activeTab === tab.id ? "bg-secondary text-secondary-foreground" : ""
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "ml-auto bg-primary/20 text-xs px-1.5 py-0.5 rounded-md",
                activeTab === tab.id ? "bg-secondary-foreground/20 text-secondary-foreground" : "text-primary-foreground"
              )}>
                {tab.count}
              </span>
            )}
          </Button>
        ))}
      </div>
      
      <div className="mt-auto pt-6 space-y-4">
        <div className="space-y-2">
          <div className="text-xs font-medium">Application Status</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-purple-500/10 rounded-md p-2">
              <div className="text-xs text-muted-foreground">Interviewing</div>
              <div className="text-xl font-semibold">{interviewingJobs}</div>
            </div>
            <div className="bg-green-500/10 rounded-md p-2">
              <div className="text-xs text-muted-foreground">Offered</div>
              <div className="text-xl font-semibold">{offeredJobs}</div>
            </div>
            <div className="bg-blue-500/10 rounded-md p-2">
              <div className="text-xs text-muted-foreground">Applied</div>
              <div className="text-xl font-semibold">{appliedJobs}</div>
            </div>
            <div className="bg-red-500/10 rounded-md p-2">
              <div className="text-xs text-muted-foreground">Rejected</div>
              <div className="text-xl font-semibold">{rejectedJobs}</div>
            </div>
          </div>
        </div>
        
        <Button className="w-full neon-button">
          <Rocket className="h-4 w-4 mr-2" />
          Find New Jobs
        </Button>
      </div>
    </div>
  );
}
