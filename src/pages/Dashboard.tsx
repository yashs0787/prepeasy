
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useJobs } from '@/hooks/useJobs';
import { JobCard } from '@/components/JobCard';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { NotificationsSettings } from '@/components/NotificationsSettings';
import { 
  BookmarkIcon, 
  CheckCircleIcon, 
  FileEditIcon, 
  BellIcon, 
  UserIcon, 
  SettingsIcon,
  ClipboardListIcon,
  BriefcaseIcon,
  CalendarIcon
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("applications");
  const { jobs, toggleSaveJob, updateApplicationStatus } = useJobs();
  
  // Filter jobs for different sections
  const savedJobs = jobs.filter(job => job.isSaved);
  const appliedJobs = jobs.filter(job => job.applicationStatus === 'Applied' || job.applicationStatus === 'In Progress');
  const rejectedJobs = jobs.filter(job => job.applicationStatus === 'Rejected');
  const offeredJobs = jobs.filter(job => job.applicationStatus === 'Offered');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
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
                      <span className="font-medium">{appliedJobs.length}</span>
                    </div>
                    <Progress value={(appliedJobs.length / jobs.length) * 100} className="h-1" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interviews</span>
                      <span className="font-medium">{jobs.filter(j => j.applicationStatus === 'In Progress').length}</span>
                    </div>
                    <Progress value={(jobs.filter(j => j.applicationStatus === 'In Progress').length / jobs.length) * 100} className="h-1" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Offers</span>
                      <span className="font-medium">{offeredJobs.length}</span>
                    </div>
                    <Progress value={(offeredJobs.length / jobs.length) * 100} className="h-1" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rejected</span>
                      <span className="font-medium">{rejectedJobs.length}</span>
                    </div>
                    <Progress value={(rejectedJobs.length / jobs.length) * 100} className="h-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="space-y-6">
            {/* Mobile Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="md:hidden">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="applications">
                  <ClipboardListIcon size={16} />
                </TabsTrigger>
                <TabsTrigger value="saved">
                  <BookmarkIcon size={16} />
                </TabsTrigger>
                <TabsTrigger value="resume">
                  <FileEditIcon size={16} />
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <BellIcon size={16} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Applications Tab */}
            {activeTab === "applications" && (
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
                                {job.applicationStatus === 'Applied' ? (
                                  <Badge variant="outline" className="bg-blue-100 text-blue-700">Applied</Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-100 text-amber-700">In Progress</Badge>
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
                                {job.applicationStatus === 'Offered' ? (
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
            )}
            
            {/* Saved Jobs Tab */}
            {activeTab === "saved" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Saved Jobs</h2>
                {savedJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {savedJobs.map(job => (
                      <JobCard 
                        key={job.id}
                        job={job}
                        onSave={() => toggleSaveJob(job.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <BookmarkIcon size={40} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No saved jobs</h3>
                      <p className="text-muted-foreground mb-4">
                        Start saving jobs you're interested in to revisit them later
                      </p>
                      <Button>Browse Jobs</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            
            {/* Resume Builder Tab */}
            {activeTab === "resume" && (
              <ResumeBuilder />
            )}
            
            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <NotificationsSettings />
            )}
            
            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Settings</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Personal Information</h3>
                      <Separator />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Full Name</label>
                          <p className="text-muted-foreground">John Doe</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email Address</label>
                          <p className="text-muted-foreground">john.doe@example.com</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Phone Number</label>
                          <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Location</label>
                          <p className="text-muted-foreground">New York, NY</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit Information</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Change Password</h3>
                      <Separator />
                      <Button variant="outline" size="sm">Update Password</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Delete Account</h3>
                      <Separator />
                      <p className="text-sm text-muted-foreground">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive" size="sm">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
