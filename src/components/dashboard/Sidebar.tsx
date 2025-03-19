
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  BookmarkIcon,
  User2,
  Settings,
  LogOut,
  Video,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="w-full h-full border-r">
      <div className="p-4">
        <div className="mb-8">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Manage your job search
          </p>
        </div>

        <div className="space-y-1">
          <Button
            variant={activeTab === "applications" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange("applications")}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Applications
          </Button>
          <Button
            variant={activeTab === "saved_jobs" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange("saved_jobs")}
          >
            <BookmarkIcon className="mr-2 h-4 w-4" />
            Saved Jobs
          </Button>
          <Button
            variant={activeTab === "recommendations" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange("recommendations")}
          >
            <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
            Recommendations
          </Button>
          <Button
            variant={activeTab === "interviews" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange("interviews")}
          >
            <Video className="mr-2 h-4 w-4" />
            Interviews
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
