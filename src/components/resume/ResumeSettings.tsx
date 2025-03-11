
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileTextIcon, CheckIcon, SparklesIcon, Loader2, DownloadIcon, LockIcon } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface ResumeFormat {
  id: string;
  name: string;
  description: string;
}

interface ResumeSettingsProps {
  formats: ResumeFormat[];
  selectedFormat: string;
  isOptimizing: boolean;
  onFormatChange: (format: string) => void;
  onOptimize: () => void;
  onPreview: () => void;
  onDownload: () => void;
}

export function ResumeSettings({
  formats,
  selectedFormat,
  isOptimizing,
  onFormatChange,
  onOptimize,
  onPreview,
  onDownload
}: ResumeSettingsProps) {
  const { isSubscribed, setShowSubscribeModal } = useSubscription();

  const handleOptimize = () => {
    if (isSubscribed) {
      onOptimize();
    } else {
      setShowSubscribeModal(true);
    }
  };

  const handleDownload = () => {
    if (isSubscribed) {
      onDownload();
    } else {
      setShowSubscribeModal(true);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Resume Format</CardTitle>
          <CardDescription>Choose a format that best suits your career and industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formats.map(format => (
              <Card 
                key={format.id} 
                className={`cursor-pointer transition ${selectedFormat === format.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`} 
                onClick={() => onFormatChange(format.id)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <FileTextIcon className="h-10 w-10 mb-2 text-primary" />
                  <h3 className="font-medium">{format.name}</h3>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                  {selectedFormat === format.id && (
                    <div className="mt-2 text-primary">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Optimization</CardTitle>
          <CardDescription>Use Claude AI to enhance your resume content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full" 
            onClick={handleOptimize}
            disabled={isOptimizing}
          >
            {isOptimizing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                Optimizing...
              </>
            ) : isSubscribed ? (
              <>
                <SparklesIcon className="h-4 w-4 mr-2" /> 
                Optimize Entire Resume
              </>
            ) : (
              <>
                <LockIcon className="h-4 w-4 mr-2" /> 
                Upgrade to Use AI Optimization
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Our AI will improve language, highlight achievements, and make your resume more impactful</p>
        </CardFooter>
      </Card>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onPreview}>
          Preview Resume
        </Button>
        <Button onClick={handleDownload}>
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
      </div>
    </>
  );
}
