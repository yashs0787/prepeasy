
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useJobs } from '@/hooks/useJobs';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { NotificationsSettings } from '@/components/NotificationsSettings';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { ApplicationsTab } from '@/components/dashboard/ApplicationsTab';
import { SavedJobsTab } from '@/components/dashboard/SavedJobsTab';
import { SettingsTab } from '@/components/dashboard/SettingsTab';
import { MobileTabs } from '@/components/dashboard/MobileTabs';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("applications");
  const { jobs, toggleSaveJob, updateApplicationStatus } = useJobs();
  
  // Filter jobs for different sections
  const savedJobs = jobs.filter(job => job.isSaved);
  const appliedJobs = jobs.filter(job => job.applicationStatus === 'applied' || job.applicationStatus === 'interviewing');
  const rejectedJobs = jobs.filter(job => job.applicationStatus === 'rejected');
  const offeredJobs = jobs.filter(job => job.applicationStatus === 'offered');
  
  // Calculate interviewing jobs count for sidebar stats
  const interviewingJobs = jobs.filter(j => j.applicationStatus === 'interviewing').length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <Sidebar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            appliedJobs={appliedJobs.length}
            interviewingJobs={interviewingJobs}
            offeredJobs={offeredJobs.length}
            rejectedJobs={rejectedJobs.length}
            totalJobs={jobs.length}
          />
          
          {/* Main Content */}
          <div className="space-y-6">
            {/* Mobile Tabs */}
            <MobileTabs activeTab={activeTab} onValueChange={setActiveTab} />
            
            {/* Applications Tab */}
            {activeTab === "applications" && (
              <ApplicationsTab 
                appliedJobs={appliedJobs}
                offeredJobs={offeredJobs}
                rejectedJobs={rejectedJobs}
              />
            )}
            
            {/* Saved Jobs Tab */}
            {activeTab === "saved" && (
              <SavedJobsTab 
                savedJobs={savedJobs}
                toggleSaveJob={toggleSaveJob}
              />
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
              <SettingsTab />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
