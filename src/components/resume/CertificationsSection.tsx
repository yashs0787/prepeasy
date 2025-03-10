
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2Icon, AwardIcon } from 'lucide-react';

interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  onArrayInputChange: (index: number, field: string, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export function CertificationsSection({ 
  certifications, 
  onArrayInputChange, 
  onAddItem, 
  onRemoveItem 
}: CertificationsSectionProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <AwardIcon className="h-5 w-5 mr-2" />
            <span>Certifications</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddItem}
          >
            <PlusIcon className="h-3.5 w-3.5 mr-1" /> Add Certification
          </Button>
        </CardTitle>
        <CardDescription>List your professional certifications and credentials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {certifications.map((cert, index) => (
          <div key={cert.id} className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Certification {index + 1}</h4>
              {index > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onRemoveItem(index)}
                  className="h-8 text-destructive hover:text-destructive"
                >
                  <Trash2Icon className="h-3.5 w-3.5 mr-1" /> Remove
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                <Input 
                  id={`cert-name-${index}`} 
                  value={cert.name} 
                  onChange={(e) => onArrayInputChange(index, 'name', e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-issuer-${index}`}>Issuing Organization</Label>
                <Input 
                  id={`cert-issuer-${index}`} 
                  value={cert.issuer} 
                  onChange={(e) => onArrayInputChange(index, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-date-${index}`}>Date Issued</Label>
                <Input 
                  id={`cert-date-${index}`} 
                  value={cert.date} 
                  onChange={(e) => onArrayInputChange(index, 'date', e.target.value)}
                  placeholder="June 2022"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`cert-desc-${index}`}>Description (Optional)</Label>
              <Textarea 
                id={`cert-desc-${index}`} 
                value={cert.description} 
                onChange={(e) => onArrayInputChange(index, 'description', e.target.value)}
                placeholder="Additional details about the certification"
                rows={2}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </>
  );
}
