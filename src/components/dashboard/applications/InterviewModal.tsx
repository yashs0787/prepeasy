
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Job } from "@/lib/types";

interface InterviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedJob: Job | null;
  interviewDetails: {
    title: string;
    notes: string;
    contactName: string;
    contactEmail: string;
    type: string;
    location: string;
  };
  setInterviewDetails: Dispatch<SetStateAction<{
    title: string;
    notes: string;
    contactName: string;
    contactEmail: string;
    type: string;
    location: string;
  }>>;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  onSave: () => void;
}

export function InterviewModal({
  isOpen,
  onOpenChange,
  selectedJob,
  interviewDetails,
  setInterviewDetails,
  date,
  setDate,
  onSave
}: InterviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            {selectedJob ? `${selectedJob.title} at ${selectedJob.company}` : ''}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="interviewTitle">Interview Type</Label>
            <Select
              value={interviewDetails.title}
              onValueChange={(value) => setInterviewDetails({...interviewDetails, title: value})}
            >
              <SelectTrigger id="interviewTitle">
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phone Interview">Phone Interview</SelectItem>
                <SelectItem value="Technical Interview">Technical Interview</SelectItem>
                <SelectItem value="Behavioral Interview">Behavioral Interview</SelectItem>
                <SelectItem value="Culture Fit Interview">Culture Fit Interview</SelectItem>
                <SelectItem value="Final Interview">Final Interview</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label>Interview Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="interviewType">Interview Format</Label>
              <Select
                value={interviewDetails.type}
                onValueChange={(value) => setInterviewDetails({...interviewDetails, type: value})}
              >
                <SelectTrigger id="interviewType">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="interviewLocation">Location</Label>
              <Input 
                id="interviewLocation"
                placeholder={interviewDetails.type === 'phone' ? 'Phone number' : 
                              interviewDetails.type === 'video' ? 'Meeting link' : 
                              'Office address'}
                value={interviewDetails.location}
                onChange={(e) => setInterviewDetails({...interviewDetails, location: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input 
                id="contactName"
                placeholder="Interviewer's name"
                value={interviewDetails.contactName}
                onChange={(e) => setInterviewDetails({...interviewDetails, contactName: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input 
                id="contactEmail"
                placeholder="Interviewer's email"
                value={interviewDetails.contactEmail}
                onChange={(e) => setInterviewDetails({...interviewDetails, contactEmail: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="interviewNotes">Notes</Label>
            <Textarea 
              id="interviewNotes"
              placeholder="Any additional details about the interview..."
              value={interviewDetails.notes}
              onChange={(e) => setInterviewDetails({...interviewDetails, notes: e.target.value})}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Interview</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
