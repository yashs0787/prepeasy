
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ColdMessageFormData } from "./types";

interface ColdMessageFormProps {
  formData: ColdMessageFormData;
  onInputChange: (field: string, value: string) => void;
  onSubmit: () => void;
  isGenerating: boolean;
  compact?: boolean;
}

export function ColdMessageForm({ 
  formData, 
  onInputChange, 
  onSubmit, 
  isGenerating, 
  compact 
}: ColdMessageFormProps) {
  if (compact) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="personalizedNote">Personalized Message or Connection Point</Label>
          <Textarea 
            id="personalizedNote" 
            placeholder="I was impressed by the recent project you shared about..."
            className="min-h-[100px]"
            value={formData.personalizedNote}
            onChange={(e) => onInputChange('personalizedNote', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select 
              value={formData.tone} 
              onValueChange={(value) => onInputChange('tone', value)}
            >
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select 
              value={formData.platform} 
              onValueChange={(value) => onInputChange('platform', value)}
            >
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">X/Twitter</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={onSubmit} 
          disabled={isGenerating} 
          className="neon-button w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate Cold DM with Claude"
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Recipient's Name</Label>
          <Input 
            id="name" 
            placeholder="Jane Smith"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input 
            id="company" 
            placeholder="Tech Company Inc."
            value={formData.companyName}
            onChange={(e) => onInputChange('companyName', e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role">Recipient's Role</Label>
          <Input 
            id="role" 
            placeholder="Engineering Manager"
            value={formData.role}
            onChange={(e) => onInputChange('role', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Select 
            value={formData.platform} 
            onValueChange={(value) => onInputChange('platform', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">X/Twitter</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tone">Tone</Label>
        <Select 
          value={formData.tone} 
          onValueChange={(value) => onInputChange('tone', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="friendly">Friendly</SelectItem>
            <SelectItem value="direct">Direct</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="personalizedNote">Personal Note or Connection Point</Label>
        <Textarea 
          id="personalizedNote" 
          placeholder="I was impressed by the recent project you shared about..."
          className="min-h-[100px]"
          value={formData.personalizedNote}
          onChange={(e) => onInputChange('personalizedNote', e.target.value)}
        />
      </div>

      <Button 
        onClick={onSubmit} 
        disabled={isGenerating} 
        className="neon-button w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Generating...
          </>
        ) : (
          "Generate Message with Claude"
        )}
      </Button>
    </div>
  );
}
