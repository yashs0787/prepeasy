
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Job } from "@/lib/types";

interface NotesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedJob: Job | null;
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
  onSave: () => void;
}

export function NotesModal({
  isOpen,
  onOpenChange,
  selectedJob,
  notes,
  setNotes,
  onSave
}: NotesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Application Notes</DialogTitle>
          <DialogDescription>
            {selectedJob ? `${selectedJob.title} at ${selectedJob.company}` : ''}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Textarea 
            placeholder="Add notes about your application, interviews, or anything else you want to remember about this job..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={8}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Notes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
