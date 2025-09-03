import Link from 'next/link';
import { Button } from '@/components/ui';

interface Props {
  user?: {
    email: string;
    nickname?: string;
  };
}

export const HeroMessage: React.FC<Props> = ({ user }) => {
  const displayName = user?.nickname || user?.email || 'Guest';

  return (
    <div className="mt-8 flex flex-col items-center sm:items-start gap-4">
        <div className="text-2xl font-semibold">
            Welcome, <span className="text-green-600 dark:text-green-400">{displayName}</span>!
        </div>
        <p className="text-gray-600 dark:text-gray-400">
            You can now create your first portfolio
        </p>
        <div className="flex gap-4">
          <Button 
            size="lg"
            variant='outline'
            className='py-6 sm:text-lg'
          >
            <Link href="/portfolio">Go to Portfolio</Link>
          </Button>
        </div>
    </div>  
  );
};