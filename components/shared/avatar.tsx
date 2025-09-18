import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
	name?: string;
	email?: string;
	className?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<Props> = ({ name, email, className, size = 'md' }) => {

	const getInitials = () => {
		if (name && name.trim().length > 0) {
			return name.trim().split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)
		}

		if (email) {
			return email[0].toUpperCase()
		}

		return 'U'
	}

	const sizeClasses = {
		sm: 'w-5 h-5 text-xs 2k:w-7 2k:h-7 2k:text-sm 4k:w-10 4k:h-10 4k:text-base 8k:w-20 8k:h-20 8k:text-3xl',
		md: 'w-7 h-7 text-sm 2k:w-9 2k:h-9 2k:text-base 4k:w-14 4k:h-14 4k:text-xl 8k:w-28 8k:h-28 8k:text-4xl',
		lg: 'w-10 h-10 text-base 2k:w-13 2k:h-13 2k:text-lg 4k:w-20 4k:h-20 4k:text-2xl 8k:w-40 8k:h-40 8k:text-5xl',
		xl: 'w-12 h-12 text-lg 2k:w-16 2k:h-16 2k:text-xl 4k:w-24 4k:h-24 4k:text-3xl 8k:w-48 8k:h-48 8k:text-6xl'
	}

	const initials = getInitials()

	return (
		<div className={cn('flex items-center justify-center rounded-xs bg-primary/80 text-primary-foreground/80 font-medium', sizeClasses[size], className)}>
			{initials}
		</div>
	)
}