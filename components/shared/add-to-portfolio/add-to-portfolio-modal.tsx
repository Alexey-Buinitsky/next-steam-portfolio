  'use client'
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui'
  import { AddToPortfolio } from '@/components/shared';
  import type { Asset } from '@prisma/client';

  interface Props {
    item: Asset
    open: boolean
    onOpenChange: (open: boolean) => void
    disableClose: boolean
  }

  export const AddToPortfolioModal = ({ item, open, onOpenChange, disableClose }: Props) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
              <DialogTitle className="sr-only">Add to Portfolio</DialogTitle>
          </DialogHeader>
          <AddToPortfolio
            item={item} 
            onClose={() => onOpenChange(false)}
            disableClose={disableClose}
          />
        </DialogContent>
      </Dialog>
    )
  }
