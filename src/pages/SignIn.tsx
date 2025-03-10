
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { auth } from "@/lib/supabase";

export default function SignIn() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

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
      const { error } = await auth.signIn(formData.email, formData.password);
      if (error) throw error;
      toast.success("Login successful!");
      navigate("/dashboard");
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
      const { error } = await auth.signUp(formData.email, formData.password, formData.name);
      if (error) throw error;
      toast.success("Account created successfully! Please check your email to verify your account.");
      setActiveTab("login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login coming soon`);
  };

  return (
    <AuthLayout>
      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
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
