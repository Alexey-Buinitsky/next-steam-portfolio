'use client'
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle} from '@/components/ui'
import { CreatePortfolioForm } from '@/components/shared';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreatePortfolio: (name: string) => void
}

export const CreatePortfolioModal:React.FC<Props> = ({ isOpen, onClose, onCreatePortfolio }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Portfolio</DialogTitle>
                    <DialogDescription>Set up your new portfolio here. Click create when ready.</DialogDescription>
                </DialogHeader>
                <CreatePortfolioForm onClose={onClose} onCreatePortfolio={onCreatePortfolio}/>
            </DialogContent>
        </Dialog>
    )
}