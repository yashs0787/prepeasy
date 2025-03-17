
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/App';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import ProfileForm from '@/components/onboarding/ProfileForm';
import CareerPathSelection from '@/components/onboarding/CareerPathSelection';
import OnboardingComplete from '@/components/onboarding/OnboardingComplete';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    careerPath: '',
    yearsOfExperience: '',
    education: [{ id: '1', degree: '', school: '', location: '', startDate: '', endDate: '', description: '' }],
    experience: [{ id: '1', title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' }],
    skills: [{ id: '1', name: '' }, { id: '2', name: '' }, { id: '3', name: '' }]
  });

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    // Check if user has already completed onboarding
    const checkProfileStatus = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setLoading(false);
      
      if (data && data.onboarding_completed) {
        navigate('/dashboard');
      } else if (data) {
        setProfile(prev => ({
          ...prev,
          fullName: data.full_name || '',
          email: user.email || '',
        }));
      }
    };

    checkProfileStatus();
  }, [user, navigate]);

  const handleNextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePreviousStep = () => {
    setStep(prev => Math.max(1, prev - 1));
    window.scrollTo(0, 0);
  };

  const calculateProgress = () => {
    return (step / 3) * 100;
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Save profile data to Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.fullName,
          location: profile.location,
          bio: profile.bio,
          career_path: profile.careerPath,
          years_of_experience: profile.yearsOfExperience,
          onboarding_completed: true,
          phone: profile.phone
        });
      
      if (error) throw error;
      
      // Save education data
      for (const edu of profile.education) {
        if (edu.school && edu.degree) {
          await supabase.from('education').insert({
            user_id: user.id,
            school: edu.school,
            degree: edu.degree,
            location: edu.location,
            start_date: edu.startDate,
            end_date: edu.endDate,
            description: edu.description
          });
        }
      }
      
      // Save experience data
      for (const exp of profile.experience) {
        if (exp.company && exp.title) {
          await supabase.from('experience').insert({
            user_id: user.id,
            title: exp.title,
            company: exp.company,
            location: exp.location,
            start_date: exp.startDate,
            end_date: exp.endDate,
            current: exp.current,
            description: exp.description
          });
        }
      }
      
      // Save skills data
      const skillsToSave = profile.skills.filter(skill => skill.name.trim() !== '');
      if (skillsToSave.length > 0) {
        await supabase.from('skills').insert(
          skillsToSave.map(skill => ({
            user_id: user.id,
            name: skill.name
          }))
        );
      }
      
      toast.success('Profile setup complete!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !step) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Let's set up your profile to personalize your experience</p>
          
          <div className="mt-6">
            <Progress value={calculateProgress()} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Step {step} of 3</span>
              <span>{Math.round(calculateProgress())}% Complete</span>
            </div>
          </div>
        </div>
        
        <Card>
          {step === 1 && (
            <ProfileForm 
              profile={profile} 
              setProfile={setProfile} 
              onNext={handleNextStep} 
            />
          )}
          
          {step === 2 && (
            <CareerPathSelection
              profile={profile}
              setProfile={setProfile}
              onNext={handleNextStep}
              onBack={handlePreviousStep}
            />
          )}
          
          {step === 3 && (
            <OnboardingComplete
              profile={profile}
              onComplete={handleComplete}
              onBack={handlePreviousStep}
              loading={loading}
            />
          )}
        </Card>
      </main>
    </div>
  );
}
