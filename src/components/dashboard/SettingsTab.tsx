
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Personal Information</h3>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <p className="text-muted-foreground">John Doe</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <p className="text-muted-foreground">john.doe@example.com</p>
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <p className="text-muted-foreground">New York, NY</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit Information</Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Change Password</h3>
            <Separator />
            <Button variant="outline" size="sm">Update Password</Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Delete Account</h3>
            <Separator />
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" size="sm">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
