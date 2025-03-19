
import React from 'react';
import { Button } from '@/components/ui/button';

export function JarvisFooter() {
  return (
    <footer className="mt-12 border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © 2023 Friday AI. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="link" size="sm" className="text-slate-400">
              Privacy Policy
            </Button>
            <Button variant="link" size="sm" className="text-slate-400">
              Terms of Service
            </Button>
            <Button variant="link" size="sm" className="text-slate-400">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
