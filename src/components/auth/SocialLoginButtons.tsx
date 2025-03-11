
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Custom Google icon since it's not available in lucide-react
const CustomGoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
    />
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
          className="flex items-center justify-center gap-2"
        >
          <CustomGoogleIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:inline-block">Google</span>
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => handleSocialLogin('linkedin_oidc')}
          className="flex items-center justify-center gap-2"
        >
          <LinkedinIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:inline-block">LinkedIn</span>
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => handleSocialLogin('github')}
          className="flex items-center justify-center gap-2"
        >
          <GithubIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:inline-block">GitHub</span>
        </Button>
      </div>
    </>
  );
}
