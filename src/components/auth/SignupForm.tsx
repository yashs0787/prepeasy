
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { LoaderCircle } from "lucide-react";

interface SignupFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSocialLogin: (provider: string) => void;
  isSubmitting?: boolean;
}

export function SignupForm({ 
  name, 
  email, 
  password, 
  confirmPassword, 
  onInputChange, 
  onSubmit, 
  onSocialLogin,
  isSubmitting = false
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
            disabled={isSubmitting}
            autoComplete="name"
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
            disabled={isSubmitting}
            autoComplete="email"
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
            disabled={isSubmitting}
            autoComplete="new-password"
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
            disabled={isSubmitting}
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <SocialLoginButtons onSocialLogin={onSocialLogin} disabled={isSubmitting} />

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
