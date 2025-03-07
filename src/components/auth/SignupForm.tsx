
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLoginButtons } from "./SocialLoginButtons";

interface SignupFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSocialLogin: (provider: string) => void;
}

export function SignupForm({ 
  name, 
  email, 
  password, 
  confirmPassword, 
  onInputChange, 
  onSubmit, 
  onSocialLogin 
}: SignupFormProps) {
  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={onInputChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <SocialLoginButtons onSocialLogin={onSocialLogin} />

      <div className="text-center text-sm text-muted-foreground pt-4">
        By signing up, you agree to our{" "}
        <Link to="/terms" className="text-primary hover:underline ml-1 mr-1">
          Terms of Service
        </Link>
        and{" "}
        <Link to="/privacy" className="text-primary hover:underline ml-1">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
