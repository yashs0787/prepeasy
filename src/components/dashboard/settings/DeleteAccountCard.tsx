
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DeleteAccountCardProps {
  handleDeleteAccount: () => Promise<void>;
  isSaving: boolean;
}

export function DeleteAccountCard({ handleDeleteAccount, isSaving }: DeleteAccountCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Permanently delete your account and all data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="destructive" onClick={handleDeleteAccount} disabled={isSaving}>
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
}
