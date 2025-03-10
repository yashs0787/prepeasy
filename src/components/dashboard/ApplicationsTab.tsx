
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Applications</h2>
        <Button variant="outline" size="sm">
          <CalendarIcon size={14} className="mr-1" /> 
          Calendar View
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BriefcaseIcon size={16} />
              <span>Active Applications</span>
            </CardTitle>
            <CardDescription>
              Track your active job applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {appliedJobs.length > 0 ? (
                appliedJobs.map(job => (
                  <div key={job.id} className="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="text-sm">
                      {job.applicationStatus === 'applied' ? (
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">Applied</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-100 text-amber-700">Interviewing</Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No active applications
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircleIcon size={16} />
              <span>Completed Applications</span>
            </CardTitle>
            <CardDescription>
              View your past applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...offeredJobs, ...rejectedJobs].length > 0 ? (
                [...offeredJobs, ...rejectedJobs].map(job => (
                  <div key={job.id} className="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="text-sm">
                      {job.applicationStatus === 'offered' ? (
                        <Badge variant="outline" className="bg-green-100 text-green-700">Offered</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-100 text-red-700">Rejected</Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No completed applications
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
