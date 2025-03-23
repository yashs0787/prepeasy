
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { LoaderCircle } from "lucide-react";

interface LoginFormProps {
  email: string;
  password: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSocialLogin: (provider: string) => void;
  isSubmitting?: boolean;
}

export function LoginForm({ 
  email, 
  password, 
  onInputChange, 
  onSubmit, 
  onSocialLogin,
  isSubmitting = false
}: LoginFormProps) {
  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={onInputChange}
            required
            disabled={isSubmitting}
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <SocialLoginButtons onSocialLogin={onSocialLogin} disabled={isSubmitting} />
    </div>
  );
}
