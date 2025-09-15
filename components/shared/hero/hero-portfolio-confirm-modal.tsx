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
      <DialogContent className="sm:max-w-md 2k:max-w-lg 4k:max-w-xl 8k:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg 2k:text-xl 4k:text-[30px] 8k:text-[60px]">Confirm Portfolio Selection</DialogTitle>
          <DialogDescription className="text-base 2k:text-lg 4k:text-[24px] 8k:text-[48px]">
            Are you sure you want to select "{portfolio?.name}" as your current portfolio?
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted p-4 2k:p-5 4k:p-8 8k:p-16 rounded-lg">
          <div className="flex items-center space-x-3 2k:space-x-4 4k:space-x-6 8k:space-x-12">
            <div className="w-10 2k:w-13 4k:w-20 8k:w-40 h-10 2k:h-13 4k:h-20 8k:h-40 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <FileText className="w-5 2k:w-7 4k:w-10 8k:w-20 h-5 2k:h-7 4k:h-10 8k:h-20 text-white" />
            </div>
            <div>
              <p className="font-medium text-base 2k:text-lg 4k:text-[24px] 8k:text-[48px]">{portfolio?.name}</p>
              <p className="text-sm 2k:text-base 4k:text-[20px] 8k:text-[40px] text-muted-foreground">{portfolio?.currency}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-3 2k:space-x-4 4k:space-x-6 8k:space-x-12">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="text-sm 2k:text-base 4k:text-[20px] 8k:text-[40px] px-4 2k:px-5 4k:px-8 8k:px-16 py-2 2k:py-3 4k:py-4 8k:py-8"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white text-sm 2k:text-base 4k:text-[20px] 8k:text-[40px] px-4 2k:px-5 4k:px-8 8k:px-16 py-2 2k:py-3 4k:py-4 8k:py-8"
          >
            {isLoading ? 'Selecting...' : 'Select Portfolio'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};