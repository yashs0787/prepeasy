
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Custom Google icon since it's not available in lucide-react
const CustomGoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M17.5 12c0-2.8-2.2-5-5-5-2.8 0-5 2.2-5 5 0 2.8 2.2 5 5 5M12 7v10"></path>
    <path d="M7 12h10"></path>
  </svg>
);

interface SocialLoginButtonsProps {
  onSocialLogin: (provider: string) => void;
}

export function SocialLoginButtons({ onSocialLogin }: SocialLoginButtonsProps) {
  const handleSocialLogin = async (provider: 'google' | 'github' | 'linkedin_oidc') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        throw error;
      }
      
      // This is just for the callback since the actual redirect is handled by Supabase
      onSocialLogin(provider);
    } catch (error: any) {
      toast.error(`Error signing in with ${provider}: ${error.message}`);
    }
  };

  return (
    <>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={() => handleSocialLogin('google')}
        >
          <CustomGoogleIcon className="h-4 w-4 mr-2" />
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => handleSocialLogin('linkedin_oidc')}
        >
          <LinkedinIcon className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => handleSocialLogin('github')}
        >
          <GithubIcon className="h-4 w-4 mr-2" />
          GitHub
        </Button>
      </div>
    </>
  );
}
