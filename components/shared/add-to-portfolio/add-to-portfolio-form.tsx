import React from 'react';
import Image from 'next/image';
import { Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { usePortfolios, useAddToPortfolioForm } from '@/hooks';

import type { AddToPortfolioFormData } from '@/hooks/use-add-to-portfolio-form';
import type { Asset } from '@prisma/client';

interface Props {
	item: Asset
	onClose: () => void
	className?: string;
	disableClose?: boolean;
}

export const AddToPortfolioForm: React.FC<Props> = ({ className, item, onClose, disableClose }) => {

	const { portfolios: portfolioList, createPortfolioAsset } = usePortfolios();

	const form = useAddToPortfolioForm(
		item.price ? item.price / 100 : undefined,
		!!disableClose // true для статичной панели, false для модалки
	);

	const { handleSubmit, formState, control } = form

	const onSubmit = (values: AddToPortfolioFormData) => {
		// отрабатывает только если все поля прошли проверку RHF через zod 
		createPortfolioAsset({
			portfolioId: Number(values.portfolioId),
			selectedAsset: item,
			quantity: values.quantity,
			buyPrice: values.buyPrice
		})
		onClose()
	}

	return (
		<div className={className}>
			<div className='bg-white dark:bg-[var(--background)] rounded-lg p-6 w-full max-w-md border-1'>
				<Image
					src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`}
					alt={item.name || ''}
					width={136}
					height={136}
					className="w-full h-32 object-contain mb-4"
					loading='lazy'
				/>
				<h2 className="text-xl text-center font-bold mb-4">Add <span className='text-green-600 dark:text-green-400'>{item.name}</span> to Portfolio</h2>

				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={control} // ← Передаём управление формой RHF вместо useState
							name="portfolioId" // ← Ключ для доступа к значению (вместо имя переменной)
							render={({ field }) => ( // ← Автоматически подставляет value/onChange
								<FormItem>
									<FormLabel>Portfolio</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Portfolio" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="select-content">
											{portfolioList?.map(portfolio => (
												<SelectItem key={portfolio.id} value={portfolio.id.toString()}>
													{portfolio.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-start gap-4">
							<FormField
								control={control}
								name="buyPrice"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Price</FormLabel>
										<FormControl>
											<div className="relative">
												<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
												<Input
													type="number"
													className="pl-8"
													{...field} // разворачивает value={field.value} и onChange={field.onChange} автоматически
													onChange={(e) => field.onChange(Number(e.target.value))}
													min={0.01}
													step={0.01}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="quantity"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Quantity</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
												min={1}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-end gap-2 pt-2">
							{!disableClose && (
								<Button
									type="button"
									variant="outline"
									onClick={onClose}
								>
									Cancel
								</Button>
							)}
							<Button
								type="submit"
								className="bg-green-600 hover:bg-green-700 text-white"
								disabled={formState.isSubmitting}
							>
								{formState.isSubmitting ? 'Adding...' : 'Add to Portfolio'}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};