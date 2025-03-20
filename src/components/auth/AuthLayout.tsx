
import { BriefcaseIcon } from "lucide-react";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <BriefcaseIcon className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">prepeasy.ai</h1>
          <p className="text-muted-foreground">Find your dream job today</p>
        </div>
        {children}
      </div>
    </div>
  );
}
