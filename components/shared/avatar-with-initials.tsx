'use client'

import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarWithInitialsProps {
  name?: string;
  email?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AvatarWithInitials: React.FC<AvatarWithInitialsProps> = ({ name, email, className, size = 'md' }) => {
  // Функция для получения инициалов
  const getInitials = () => {
    if (name && name.trim().length > 0) {
      return name
        .trim()
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    
    if (email) {
      return email[0].toUpperCase();
    }
    
    return 'U'; // Fallback для пользователя без данных
  };

  const sizeClasses = {
    sm: 'w-5 h-5 text-xs',       
    md: 'w-7 h-7 text-sm',       
    lg: 'w-10 h-10 text-base',   
    xl: 'w-12 h-12 text-lg'
  };

  const initials = getInitials();

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-xs bg-primary/80 text-primary-foreground/80 font-medium',
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
};