
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordCardProps {
  passwordForm: PasswordForm;
  setPasswordForm: React.Dispatch<React.SetStateAction<PasswordForm>>;
  handleUpdatePassword: () => Promise<void>;
  isSaving: boolean;
}

export function PasswordCard({ 
  passwordForm, 
  setPasswordForm, 
  handleUpdatePassword, 
  isSaving 
}: PasswordCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your account password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input 
            id="currentPassword" 
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input 
              id="newPassword" 
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleUpdatePassword} 
          disabled={isSaving || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
          variant="outline"
          className="mt-2"
        >
          Update Password
        </Button>
      </CardContent>
    </Card>
  );
}
