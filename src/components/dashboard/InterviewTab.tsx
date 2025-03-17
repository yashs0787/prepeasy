
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InterviewAssistant } from '@/components/interview/InterviewAssistant';
import { Calendar, Clock, Award, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // Fixed import
import { toast } from 'sonner';

export function InterviewTab() {
  const { user } = useAuth();
  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: '1',
      company: 'Tech Innovations Inc.',
      role: 'Senior Software Engineer',
      date: '2023-07-15T14:00:00',
      type: 'Technical Interview',
      prepared: true
    },
    {
      id: '2',
      company: 'Global Finance Group',
      role: 'Data Analyst',
      date: '2023-07-18T10:30:00',
      type: 'Case Study',
      prepared: false
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      id: '1',
      type: 'Practice Session',
      description: 'Completed technical interview practice',
      date: '2023-07-10T15:45:00'
    },
    {
      id: '2',
      type: 'Question Answered',
      description: 'Behavioral question: Leadership style',
      date: '2023-07-09T11:20:00'
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSchedulePrep = (id: string) => {
    toast.success('Interview preparation scheduled');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Interview Preparation</h2>
        <Button>Schedule Mock Interview</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InterviewAssistant 
            profile={{
              careerPath: 'tech',
              yearsOfExperience: '5'
            }}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.length > 0 ? (
                  upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{interview.company}</p>
                          <p className="text-sm text-muted-foreground">{interview.role}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {formatDate(interview.date)} at {formatTime(interview.date)}
                            </span>
                          </div>
                          <div className="mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                            {interview.type}
                          </div>
                        </div>
                        {interview.prepared ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Button size="sm" onClick={() => handleSchedulePrep(interview.id)}>
                            Prepare
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No upcoming interviews</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Study Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded mr-3">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Technical Interview Guide</p>
                      <p className="text-xs text-muted-foreground">15 pages</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded mr-3">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Behavioral Questions Cheat Sheet</p>
                      <p className="text-xs text-muted-foreground">8 pages</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
