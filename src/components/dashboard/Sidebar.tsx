
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BookmarkIcon, 
  ClipboardListIcon, 
  FileEditIcon, 
  BellIcon, 
  UserIcon, 
  SettingsIcon 
} from "lucide-react";

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
  return (
    <div className="hidden md:block space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            <div className="flex items-center gap-2">
              <UserIcon size={16} />
              <span>My Profile</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserIcon size={32} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-1">
        <Button 
          variant={activeTab === "applications" ? "default" : "ghost"} 
          className="w-full justify-start" 
          onClick={() => setActiveTab("applications")}
        >
          <ClipboardListIcon size={16} className="mr-2" />
          Applications
        </Button>
        <Button 
          variant={activeTab === "saved" ? "default" : "ghost"} 
          className="w-full justify-start" 
          onClick={() => setActiveTab("saved")}
        >
          <BookmarkIcon size={16} className="mr-2" />
          Saved Jobs
        </Button>
        <Button 
          variant={activeTab === "resume" ? "default" : "ghost"} 
          className="w-full justify-start" 
          onClick={() => setActiveTab("resume")}
        >
          <FileEditIcon size={16} className="mr-2" />
          Resume Builder
        </Button>
        <Button 
          variant={activeTab === "notifications" ? "default" : "ghost"} 
          className="w-full justify-start" 
          onClick={() => setActiveTab("notifications")}
        >
          <BellIcon size={16} className="mr-2" />
          Notifications
        </Button>
        <Button 
          variant={activeTab === "settings" ? "default" : "ghost"} 
          className="w-full justify-start" 
          onClick={() => setActiveTab("settings")}
        >
          <SettingsIcon size={16} className="mr-2" />
          Settings
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Application Statistics</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Applied</span>
                <span className="font-medium">{appliedJobs}</span>
              </div>
              <Progress value={(appliedJobs / totalJobs) * 100} className="h-1" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interviews</span>
                <span className="font-medium">{interviewingJobs}</span>
              </div>
              <Progress value={(interviewingJobs / totalJobs) * 100} className="h-1" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Offers</span>
                <span className="font-medium">{offeredJobs}</span>
              </div>
              <Progress value={(offeredJobs / totalJobs) * 100} className="h-1" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rejected</span>
                <span className="font-medium">{rejectedJobs}</span>
              </div>
              <Progress value={(rejectedJobs / totalJobs) * 100} className="h-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
