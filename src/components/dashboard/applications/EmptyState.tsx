
import { Button } from "@/components/ui/button";
import { BookmarkIcon, BriefcaseIcon, CheckCircleIcon, Clock } from "lucide-react";

interface EmptyStateProps {
  type: "active" | "offered" | "rejected";
  title: string;
  description: string;
}

export function EmptyState({ type, title, description }: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case "active":
        return <BriefcaseIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />;
      case "offered":
        return <CheckCircleIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />;
      case "rejected":
        return <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-4" />;
      default:
        return <BookmarkIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />;
    }
  };

  return (
    <div className="text-center py-10">
      {getIcon()}
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button>Browse Jobs</Button>
    </div>
  );
}
