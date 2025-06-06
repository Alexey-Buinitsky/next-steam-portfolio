import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';

interface Props {
	className?: string;
	title: string;
	subtitle: string;
	icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
	image?: StaticImageData;
}

export const Logo: React.FC<Props> = ({ className, title, subtitle, icon: Icon, image }) => {
	return (
		<div className={cn('flex items-center gap-2 2k:gap-2.5 4k:gap-4 8k:gap-8', className)}>
			<span className="relative flex shrink-0 overflow-hidden rounded-lg">
				{image && <Image alt="" src={image} priority={true} width={48} height={48} className='2k:size-16 4k:size-24 8k:size-48' />}
				{Icon && <Icon size={48} className='2k:size-16 4k:size-24 8k:size-48' />}
			</span>
			<div className="grid flex-1 text-left leading-tight">
				<span className="truncate text-lg 2k:text-2xl 4k:text-4xl 8k:text-7xl font-medium">{title}</span>
				<span className="truncate text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl">{subtitle}</span>
			</div>
		</div>
	)
}