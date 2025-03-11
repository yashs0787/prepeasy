
import { Link } from "react-router-dom";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { Job } from "@/lib/types";

interface SignInPromptProps {
  job: Job;
  onClose: () => void;
}

export function SignInPrompt({ job, onClose }: SignInPromptProps) {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Sign in required</DialogTitle>
        <DialogDescription>
          You need to sign in to apply for jobs and access all features.
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex flex-col items-center justify-center py-6 space-y-4">
        <UserIcon className="h-12 w-12 text-muted-foreground" />
        <p className="text-center">
          Sign in to apply for <span className="font-medium">{job.title}</span> at <span className="font-medium">{job.company}</span>
        </p>
      </div>
      
      <DialogFooter className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" onClick={onClose} className="sm:flex-1">
          Cancel
        </Button>
        <Link to="/signin" className="sm:flex-1 w-full">
          <Button className="w-full neon-button">
            Sign In
          </Button>
        </Link>
        <Link to="/signup" className="sm:flex-1 w-full">
          <Button variant="outline" className="w-full">
            Sign Up
          </Button>
        </Link>
      </DialogFooter>
    </DialogContent>
  );
}
