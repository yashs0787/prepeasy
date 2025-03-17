import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { useAuth } from "@/App";
import { supabase } from "@/lib/supabase";

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { user, isLoading, signIn, signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    
    // Set up auth state listener for social logins
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          toast.success("Login successful!");
          navigate("/dashboard");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(formData.email, formData.password);
      // Toast and redirect handled by auth context
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await signUp(formData.email, formData.password, formData.name);
      toast.success("Account created successfully!");
      // Redirect to dashboard - authentication state will be handled by the auth context
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // This just shows a toast, the actual redirect is handled in SocialLoginButtons
    toast.info(`Redirecting to ${provider} login...`);
  };

  if (isLoading) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Login to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm
                email={formData.email}
                password={formData.password}
                onInputChange={handleInputChange}
                onSubmit={handleLogin}
                onSocialLogin={handleSocialLogin}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Sign up to get started with ApplyGo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm
                name={formData.name}
                email={formData.email}
                password={formData.password}
                confirmPassword={formData.confirmPassword}
                onInputChange={handleInputChange}
                onSubmit={handleSignup}
                onSocialLogin={handleSocialLogin}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}
