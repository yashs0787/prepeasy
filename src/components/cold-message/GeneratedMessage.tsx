
import { Button } from "@/components/ui/button";
import { Copy, Send, CheckCheck } from "lucide-react";
import { toast } from "sonner";

interface GeneratedMessageProps {
  message: string;
}

export function GeneratedMessage({ message }: GeneratedMessageProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    toast.success("Message copied to clipboard");
  };
  
  const sendMessage = () => {
    toast.success("Message ready to send");
    setTimeout(() => {
      toast.info("This is a demonstration. In the full version, you can send messages directly from here");
    }, 1500);
  };

  return (
    <div className="border border-neon-purple/30 rounded-md p-4 bg-black/40">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Your Personalized Message</div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={copyToClipboard} 
            className="h-8 w-8"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={sendMessage}
            className="h-8 w-8"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="bg-black/40 p-4 rounded-md whitespace-pre-line text-sm">
        {message}
      </div>
      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
        <CheckCheck className="h-3 w-3" />
        <span>AI optimized for higher response rates</span>
      </div>
    </div>
  );
}
