
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon, LockIcon } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { ResumeDocument } from './preview/ResumeDocument';
import { ResumePreviewProps } from './types';

export function ResumePreview({ 
  resumeData, 
  resumeRef, 
  onReturn, 
  onDownload 
}: ResumePreviewProps) {
  const { isSubscribed, setShowSubscribeModal } = useSubscription();

  const handleDownloadClick = () => {
    if (isSubscribed) {
      onDownload();
    } else {
      setShowSubscribeModal(true);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <CardDescription>
          This is how your resume will look when exported. You can return to the editor to make changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResumeDocument resumeData={resumeData} resumeRef={resumeRef} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReturn}>
          Return to Editor
        </Button>
        <Button onClick={handleDownloadClick}>
          {isSubscribed ? (
            <>
              <DownloadIcon className="mr-2 h-4 w-4" /> Download Resume
            </>
          ) : (
            <>
              <LockIcon className="mr-2 h-4 w-4" /> Upgrade to Download
            </>
          )}
        </Button>
      </CardFooter>
    </>
  );
}
