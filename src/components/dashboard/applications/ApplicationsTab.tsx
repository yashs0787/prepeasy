
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FileTextIcon } from "lucide-react";
import { Job } from "@/lib/types";
import { JobApplicationCard } from "./JobApplicationCard";
import { EmptyState } from "./EmptyState";
import { InterviewModal } from "./InterviewModal";
import { NotesModal } from "./NotesModal";
import { toast } from "sonner";
import { format } from "date-fns";

interface ApplicationsTabProps {
  appliedJobs: Job[];
  offeredJobs: Job[];
  rejectedJobs: Job[];
}

export function ApplicationsTab({
  appliedJobs,
  offeredJobs,
  rejectedJobs
}: ApplicationsTabProps) {
  const [activeTab, setActiveTab] = useState("active");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [interviewDetails, setInterviewDetails] = useState({
    title: "Phone Interview",
    notes: "",
    contactName: "",
    contactEmail: "",
    type: "phone",
    location: "",
  });
  const [applicationNotes, setApplicationNotes] = useState("");

  const handleScheduleInterview = (job: Job) => {
    setSelectedJob(job);
    setIsInterviewModalOpen(true);
  };

  const handleAddNotes = (job: Job) => {
    setSelectedJob(job);
    setApplicationNotes(""); // Reset notes
    setIsNotesModalOpen(true);
  };

  const saveInterviewDetails = () => {
    if (!selectedJob) return;
    
    // In a real app, this would save to the database
    toast.success(`Interview scheduled for ${format(date!, "PPP")}`, {
      description: `${interviewDetails.title} for ${selectedJob.title} at ${selectedJob.company}`
    });
    
    setIsInterviewModalOpen(false);
  };

  const saveApplicationNotes = () => {
    if (!selectedJob) return;
    
    // In a real app, this would save to the database
    toast.success("Notes saved successfully", {
      description: `Notes updated for ${selectedJob.title} at ${selectedJob.company}`
    });
    
    setIsNotesModalOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Applications</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileTextIcon size={14} className="mr-1" /> 
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <CalendarIcon size={14} className="mr-1" /> 
            Calendar View
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="active">
            Active
            <Badge variant="secondary" className="ml-2">{appliedJobs.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="offered">
            Offered
            <Badge variant="secondary" className="ml-2">{offeredJobs.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            <Badge variant="secondary" className="ml-2">{rejectedJobs.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {appliedJobs.length > 0 ? (
            appliedJobs.map(job => (
              <JobApplicationCard 
                key={job.id}
                job={job}
                onScheduleInterview={() => handleScheduleInterview(job)}
                onAddNotes={() => handleAddNotes(job)}
                status="active"
              />
            ))
          ) : (
            <EmptyState 
              type="active" 
              title="No active applications"
              description="Start applying to jobs to track your applications"
            />
          )}
        </TabsContent>
        
        <TabsContent value="offered" className="space-y-4">
          {offeredJobs.length > 0 ? (
            offeredJobs.map(job => (
              <JobApplicationCard 
                key={job.id}
                job={job}
                onAddNotes={() => handleAddNotes(job)}
                status="offered"
              />
            ))
          ) : (
            <EmptyState 
              type="offered" 
              title="No offers yet"
              description="Keep applying and interviewing. Your offers will appear here."
            />
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-4">
          {rejectedJobs.length > 0 ? (
            rejectedJobs.map(job => (
              <JobApplicationCard 
                key={job.id}
                job={job}
                onAddNotes={() => handleAddNotes(job)}
                status="rejected"
              />
            ))
          ) : (
            <EmptyState 
              type="rejected" 
              title="No rejected applications"
              description="Rejections happen to everyone. Keep going!"
            />
          )}
        </TabsContent>
      </Tabs>
      
      {/* Interview Modal */}
      <InterviewModal
        isOpen={isInterviewModalOpen}
        onOpenChange={setIsInterviewModalOpen}
        selectedJob={selectedJob}
        interviewDetails={interviewDetails}
        setInterviewDetails={setInterviewDetails}
        date={date}
        setDate={setDate}
        onSave={saveInterviewDetails}
      />
      
      {/* Notes Modal */}
      <NotesModal
        isOpen={isNotesModalOpen}
        onOpenChange={setIsNotesModalOpen}
        selectedJob={selectedJob}
        notes={applicationNotes}
        setNotes={setApplicationNotes}
        onSave={saveApplicationNotes}
      />
    </div>
  );
}
