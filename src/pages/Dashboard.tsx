
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MobileTabs } from '@/components/dashboard/MobileTabs';
import { ApplicationsTab } from '@/components/dashboard/applications';
import { SavedJobsTab } from '@/components/dashboard/SavedJobsTab';
import { SettingsTab } from '@/components/dashboard/settings';
import { useAuth } from '@/App';
import { InterviewTab } from '@/components/dashboard/InterviewTab';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('applications');
  const { user } = useAuth();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (!user) {
    return <div>Loading...</div>;
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
            <MobileTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'applications' && <ApplicationsTab />}
            {activeTab === 'saved_jobs' && <SavedJobsTab />}
            {activeTab === 'interviews' && <InterviewTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
