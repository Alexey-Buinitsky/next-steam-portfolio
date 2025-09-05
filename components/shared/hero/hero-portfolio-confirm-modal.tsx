// components/shared/hero/hero-portfolio-confirm-modal.tsx
'use client'

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Portfolio } from '@prisma/client';
import { FileText } from 'lucide-react';

interface PortfolioConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  portfolio: Portfolio | null;
  isLoading?: boolean;
}

export const HeroPortfolioConfirmModal: React.FC<PortfolioConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  portfolio,
  isLoading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Portfolio Selection</DialogTitle>
          <DialogDescription>
            Are you sure you want to select "{portfolio?.name}" as your current portfolio?
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium">{portfolio?.name}</p>
              <p className="text-sm text-muted-foreground">{portfolio?.currency}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? 'Selecting...' : 'Select Portfolio'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};