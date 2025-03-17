
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MobileTabs } from '@/components/dashboard/MobileTabs';
import { ApplicationsTab } from '@/components/dashboard/applications';
import { SavedJobsTab } from '@/components/dashboard/SavedJobsTab';
import { InterviewTab } from '@/components/dashboard/InterviewTab';
import { useAuth } from '@/App';
import { useJobs } from '@/hooks/useJobs';
import { Loader2 } from 'lucide-react';

// Import the SettingsTab directly instead of from an index file
import { SettingsTab } from '@/components/dashboard/SettingsTab';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('applications');
  const { user } = useAuth();
  const { 
    jobs,
    isLoading,
    updateApplicationStatus,
    toggleSaveJob
  } = useJobs();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Filter jobs based on application status
  const appliedJobs = jobs.filter(job => job.applicationStatus === 'applied' || job.applicationStatus === 'interviewing');
  const offeredJobs = jobs.filter(job => job.applicationStatus === 'offered');
  const rejectedJobs = jobs.filter(job => job.applicationStatus === 'rejected');
  
  // Filter saved jobs
  const savedJobs = jobs.filter(job => job.isSaved);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex container mx-auto px-4 py-8 gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-64 shrink-0">
          <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <MobileTabs activeTab={activeTab} onValueChange={handleTabChange} />
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'applications' && 
              <ApplicationsTab 
                appliedJobs={appliedJobs} 
                offeredJobs={offeredJobs} 
                rejectedJobs={rejectedJobs} 
              />
            }
            {activeTab === 'saved_jobs' && 
              <SavedJobsTab 
                savedJobs={savedJobs} 
                toggleSaveJob={toggleSaveJob} 
              />
            }
            {activeTab === 'interviews' && <InterviewTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
