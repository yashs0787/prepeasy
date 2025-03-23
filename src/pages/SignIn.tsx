
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { useAuth } from "@/contexts/AuthContext";
import { LoaderCircle } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
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
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await signIn(formData.email, formData.password);
      // Auth state change will handle redirection
    } catch (error: any) {
      console.error("Login error:", error);
      // Toast is handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await signUp(formData.email, formData.password, formData.name);
      toast.success("Account created! Please sign in now.");
      setActiveTab("login");
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      // Toast is handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Redirecting to ${provider} login...`);
  };

  if (isLoading) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center h-40">
          <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
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
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Sign up to get started with prepeasy.ai
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
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}
