import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';

interface Props {
	className?: string;
	title: string;
	subtitle: string;
	icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
	image?: StaticImageData | string;
}

export const Logo: React.FC<Props> = ({ className, title, subtitle, icon: Icon, image }) => {
	return (
		<div className={cn('flex items-center gap-2', className)}>
			<span className="relative flex shrink-0 overflow-hidden h-8 w-8 rounded-lg">
				{image && <Image className="aspect-square h-full w-full" alt="" src={image} width={32} height={32} />}
				{Icon && <Icon size={32} />}
			</span>
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-semibold">{title}</span>
				<span className="truncate text-xs">{subtitle}</span>
			</div>
		</div>
	);
};