
import React from 'react';

interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

interface CertificationsPreviewProps {
  certifications: CertificationItem[];
}

export function CertificationsPreview({ certifications }: CertificationsPreviewProps) {
  const hasContent = certifications.some(cert => cert.name);
  
  if (!hasContent) return null;
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Certifications</h2>
      {certifications.map((cert) => (
        cert.name ? (
          <div key={cert.id} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{cert.name}</h3>
                {cert.issuer && <p className="text-gray-600">{cert.issuer}</p>}
              </div>
              {cert.date && <p className="text-sm">{cert.date}</p>}
            </div>
            {cert.description && <p className="mt-1 text-sm">{cert.description}</p>}
          </div>
        ) : null
      ))}
    </div>
  );
}
