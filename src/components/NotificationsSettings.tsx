
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  BellIcon, 
  MailIcon, 
  SmartphoneIcon, 
  SaveIcon,
  ClockIcon,
  SparklesIcon
} from 'lucide-react';

export function NotificationsSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      enabled: true,
      jobAlerts: true,
      applicationUpdates: true,
      promotions: false,
      frequency: 'daily'
    },
    mobile: {
      enabled: true,
      phone: '+1 (555) 123-4567',
      verifiedPhone: true,
      jobAlerts: true,
      applicationUpdates: true,
      frequency: 'instant'
    },
    ai: {
      enabled: true,
      jobSuggestions: true,
      resumeSuggestions: false,
      interviewPreparation: true
    }
  });

  const handleEmailToggle = (field) => {
    setNotifications({
      ...notifications,
      email: {
        ...notifications.email,
        [field]: !notifications.email[field]
      }
    });
  };

  const handleMobileToggle = (field) => {
    setNotifications({
      ...notifications,
      mobile: {
        ...notifications.mobile,
        [field]: !notifications.mobile[field]
      }
    });
  };

  const handleAiToggle = (field) => {
    setNotifications({
      ...notifications,
      ai: {
        ...notifications.ai,
        [field]: !notifications.ai[field]
      }
    });
  };

  const handlePhoneChange = (e) => {
    setNotifications({
      ...notifications,
      mobile: {
        ...notifications.mobile,
        phone: e.target.value,
        verifiedPhone: false
      }
    });
  };

  const handleFrequencyChange = (type, value) => {
    setNotifications({
      ...notifications,
      [type]: {
        ...notifications[type],
        frequency: value
      }
    });
  };

  const verifyPhone = () => {
    toast.success("Verification code sent to your phone");
    // In a real app, this would send a verification code
  };

  const saveSettings = () => {
    toast.success("Notification settings saved");
    // In a real app, this would save to the backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Notification Settings</h2>
        <Button onClick={saveSettings}>
          <SaveIcon size={14} className="mr-1" />
          Save Settings
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MailIcon size={18} />
            <span>Email Notifications</span>
          </CardTitle>
          <CardDescription>
            Manage how and when you receive email notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive job updates via email</p>
            </div>
            <Switch 
              checked={notifications.email.enabled} 
              onCheckedChange={() => handleEmailToggle('enabled')}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Job Alerts</Label>
              <Switch 
                checked={notifications.email.jobAlerts} 
                onCheckedChange={() => handleEmailToggle('jobAlerts')}
                disabled={!notifications.email.enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Application Updates</Label>
              <Switch 
                checked={notifications.email.applicationUpdates} 
                onCheckedChange={() => handleEmailToggle('applicationUpdates')}
                disabled={!notifications.email.enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Promotions & Tips</Label>
              <Switch 
                checked={notifications.email.promotions} 
                onCheckedChange={() => handleEmailToggle('promotions')}
                disabled={!notifications.email.enabled}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Notification Frequency</Label>
              <Select 
                value={notifications.email.frequency}
                onValueChange={(value) => handleFrequencyChange('email', value)}
                disabled={!notifications.email.enabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SmartphoneIcon size={18} />
            <span>Mobile Notifications</span>
          </CardTitle>
          <CardDescription>
            Get job alerts via WhatsApp or SMS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Enable Mobile Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive job updates via WhatsApp/SMS</p>
            </div>
            <Switch 
              checked={notifications.mobile.enabled} 
              onCheckedChange={() => handleMobileToggle('enabled')}
            />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="flex gap-2">
                <Input 
                  value={notifications.mobile.phone} 
                  onChange={handlePhoneChange}
                  disabled={!notifications.mobile.enabled}
                />
                {!notifications.mobile.verifiedPhone && (
                  <Button 
                    variant="outline" 
                    onClick={verifyPhone}
                    disabled={!notifications.mobile.enabled}
                  >
                    Verify
                  </Button>
                )}
              </div>
              {notifications.mobile.verifiedPhone ? (
                <p className="text-xs text-green-600">Verified</p>
              ) : (
                <p className="text-xs text-muted-foreground">Verification required</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Notification Frequency</Label>
              <Select 
                value={notifications.mobile.frequency}
                onValueChange={(value) => handleFrequencyChange('mobile', value)}
                disabled={!notifications.mobile.enabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="important-only">Important Updates Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Job Alerts</Label>
              <Switch 
                checked={notifications.mobile.jobAlerts} 
                onCheckedChange={() => handleMobileToggle('jobAlerts')}
                disabled={!notifications.mobile.enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Application Updates</Label>
              <Switch 
                checked={notifications.mobile.applicationUpdates} 
                onCheckedChange={() => handleMobileToggle('applicationUpdates')}
                disabled={!notifications.mobile.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SparklesIcon size={18} />
            <span>AI Recommendations</span>
          </CardTitle>
          <CardDescription>
            Personalized recommendations powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Enable AI Recommendations</Label>
              <p className="text-sm text-muted-foreground">Get personalized job and career suggestions</p>
            </div>
            <Switch 
              checked={notifications.ai.enabled} 
              onCheckedChange={() => handleAiToggle('enabled')}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Job Suggestions</Label>
                <p className="text-xs text-muted-foreground">Get daily job recommendations based on your profile</p>
              </div>
              <Switch 
                checked={notifications.ai.jobSuggestions} 
                onCheckedChange={() => handleAiToggle('jobSuggestions')}
                disabled={!notifications.ai.enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Resume Improvement Tips</Label>
                <p className="text-xs text-muted-foreground">Receive suggestions to enhance your resume</p>
              </div>
              <Switch 
                checked={notifications.ai.resumeSuggestions} 
                onCheckedChange={() => handleAiToggle('resumeSuggestions')}
                disabled={!notifications.ai.enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Interview Preparation</Label>
                <p className="text-xs text-muted-foreground">Get company-specific interview questions and tips</p>
              </div>
              <Switch 
                checked={notifications.ai.interviewPreparation} 
                onCheckedChange={() => handleAiToggle('interviewPreparation')}
                disabled={!notifications.ai.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
