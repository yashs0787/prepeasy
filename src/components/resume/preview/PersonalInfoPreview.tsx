
import React from 'react';

interface PersonalInfoProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export function PersonalInfoPreview({ 
  name, 
  title, 
  email, 
  phone, 
  location, 
  website,
  summary 
}: PersonalInfoProps) {
  return (
    <>
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">{name || 'Your Name'}</h1>
        <p className="text-gray-600">{title || 'Professional Title'}</p>
        <div className="flex flex-wrap gap-x-4 text-sm mt-2">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {location && <span>{location}</span>}
          {website && <span>{website}</span>}
        </div>
      </div>
      
      {summary && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </>
  );
}
