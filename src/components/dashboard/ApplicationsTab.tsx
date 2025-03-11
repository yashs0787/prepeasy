
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { toast } from "sonner";
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon, Clock, ClockIcon, FileTextIcon, PencilIcon, PlusCircleIcon } from "lucide-react";
import { Job } from "@/lib/types";

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
              <Card key={job.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                      </div>
                      <Badge variant="outline" className={job.applicationStatus === 'interviewing' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}>
                        {job.applicationStatus === 'interviewing' ? 'Interviewing' : 'Applied'}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary">{job.jobType}</Badge>
                      <Badge variant="secondary">{job.workType}</Badge>
                      {job.salary && <Badge variant="secondary">{job.salary}</Badge>}
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col justify-end gap-2 p-4 bg-muted/30">
                    <Button size="sm" variant="outline" onClick={() => handleScheduleInterview(job)}>
                      <CalendarIcon size={14} className="mr-1" /> Schedule
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAddNotes(job)}>
                      <PencilIcon size={14} className="mr-1" /> Add Notes
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <BriefcaseIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">No active applications</h3>
              <p className="text-muted-foreground mb-4">Start applying to jobs to track your applications</p>
              <Button>Browse Jobs</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="offered" className="space-y-4">
          {offeredJobs.length > 0 ? (
            offeredJobs.map(job => (
              <Card key={job.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-700">
                        Offered
                      </Badge>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary">{job.jobType}</Badge>
                      <Badge variant="secondary">{job.workType}</Badge>
                      {job.salary && <Badge variant="secondary">{job.salary}</Badge>}
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col justify-end gap-2 p-4 bg-muted/30">
                    <Button size="sm" variant="outline" onClick={() => handleAddNotes(job)}>
                      <PencilIcon size={14} className="mr-1" /> Add Notes
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <CheckCircleIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">No offers yet</h3>
              <p className="text-muted-foreground">Keep applying and interviewing. Your offers will appear here.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-4">
          {rejectedJobs.length > 0 ? (
            rejectedJobs.map(job => (
              <Card key={job.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                      </div>
                      <Badge variant="outline" className="bg-red-100 text-red-700">
                        Rejected
                      </Badge>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary">{job.jobType}</Badge>
                      <Badge variant="secondary">{job.workType}</Badge>
                      {job.salary && <Badge variant="secondary">{job.salary}</Badge>}
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col justify-end gap-2 p-4 bg-muted/30">
                    <Button size="sm" variant="outline" onClick={() => handleAddNotes(job)}>
                      <PencilIcon size={14} className="mr-1" /> Add Notes
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">No rejected applications</h3>
              <p className="text-muted-foreground">Rejections happen to everyone. Keep going!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Interview Scheduling Modal */}
      <Dialog open={isInterviewModalOpen} onOpenChange={setIsInterviewModalOpen}>
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
            <Button variant="outline" onClick={() => setIsInterviewModalOpen(false)}>Cancel</Button>
            <Button onClick={saveInterviewDetails}>Save Interview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Application Notes Modal */}
      <Dialog open={isNotesModalOpen} onOpenChange={setIsNotesModalOpen}>
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
              value={applicationNotes}
              onChange={(e) => setApplicationNotes(e.target.value)}
              rows={8}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotesModalOpen(false)}>Cancel</Button>
            <Button onClick={saveApplicationNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
