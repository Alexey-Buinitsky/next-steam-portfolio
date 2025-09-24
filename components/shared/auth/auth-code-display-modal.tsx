// app/components/shared/auth/auth-code-display-modal.tsx
'use client'

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';
import { Button } from '@/components/ui/button';

interface CodeDisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  type: 'verification' | 'password-reset';
  email: string;
}

export const AuthCodeDisplayModal: React.FC<CodeDisplayModalProps> = ({isOpen, onClose, code, type, email}) => {
  const title = type === 'verification' ? 'Email Verification Code' : 'Password Reset Code';
  const description = type === 'verification' 
    ? 'Use this code to verify your email address and complete registration.'
    : 'Use this code to reset your password.';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          
          <p className="text-sm">
            Sent to: <span className="font-semibold">{email}</span>
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-2xl font-mono font-bold tracking-widest bg-background p-3 rounded">
              {code}
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            {type === 'verification' 
              ? 'The code will expire in 24 hours.'
              : 'The code will expire in 1 hour.'
            }
          </p>
          
          <Button 
            onClick={onClose} 
            className="w-full"
            variant="outline"
          >
            I've copied the code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};