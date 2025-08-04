import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';

interface Props {
  user?: {
    login: string;
    nickname?: string;
  };
}

export const HeroMessage: React.FC<Props> = ({ user }) => {
  const { logout } = useAuth();
  
  const displayName = user?.nickname || user?.login || 'Гость';

  return (
    <div className="mt-8 flex flex-col items-center sm:items-start gap-4">
        <div className="text-2xl font-semibold">
            Добро пожаловать, <span className="text-green-600 dark:text-green-400">{displayName}</span>!
        </div>
        <p className="text-gray-600 dark:text-gray-400">
            Теперь вы можете создать свое первое портфолио
        </p>
        <div className="flex gap-4">
            <Button variant="outline" onClick={logout}>Выйти</Button>
        </div>
    </div>
  );
};