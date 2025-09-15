'use client'

import { Button, Input } from '@/components/ui';
import { InfiniteScrollSelect } from '@/components/shared';

interface Props {
	amount: string;
	fromCurrency: string;
	toCurrency: string;
	convertedAmount: string;
	exchangeRate: number;
	currentCurrencies: string[];
	showAllCurrencies: boolean;
	handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleFromCurrencyChange: (currency: string) => void;
	handleToCurrencyChange: (currency: string) => void;
	toggleCurrenciesView: () => void;
	swapCurrencies: () => void;
	isLoading: boolean;
	error: Error | null;
}

export const CurrencyConverter: React.FC<Props> = ({
	showAllCurrencies, toggleCurrenciesView, currentCurrencies,
	amount, fromCurrency, toCurrency, convertedAmount, exchangeRate,
	handleAmountChange, handleFromCurrencyChange, handleToCurrencyChange, swapCurrencies,
	isLoading, error
}) => {
	return (
		<div className="w-full max-w-[780px] 2k:max-w-[1037px] 4k:max-w-[1560px] 8k:max-w-[3120px] mx-auto p-6 2k:p-8 4k:p-12 8k:p-24 grid grid-cols-1 lg:grid-cols-[max-content_1fr] items-start justify-center gap-x-6 2k:gap-x-8 4k:gap-x-12 8k:gap-x-24 gap-y-6 2k:gap-y-8 4k:gap-y-12 8k:gap-y-24">
			<Button
				className={`order-1 lg:order-none p-4 lg:p-6 2k:p-8 4k:p-12 8k:p-24 text-lg lg:mt-[198px] 2k:mt-[244px] 4k:mt-[350px] 8k:mt-[660px] mb-6 md:mb-0
				${showAllCurrencies
						? "text-gray-500 dark:text-zinc-500"
						: "border-green-600 hover:border-green-700 text-black dark:text-white dark:border-green-600"
					}
				`}
				variant='outline'
				onClick={toggleCurrenciesView}
			>
				Popular
			</Button>

			<div className="w-full order-2 lg:order-none">
				<h2 className="text-3xl 2k:text-4xl 4k:text-[60px] 8k:text-[120px] font-bold mb-6 2k:mb-8 4k:mb-12 8k:mb-24 text-center">Currency Converter</h2>
				<div className='flex flex-col items-center mb-6'>
					<label htmlFor="amount" className="block text-xl 2k:text-2xl 4k:text-4xl 8k:text-7xl font-medium text-gray-700 dark:text-zinc-500 mb-1 2k:mb-2 4k:mb-3 8k:mb-6">
						Amount
					</label>
					<div className="[&_input]:text-2xl 2k:[&_input]:text-3xl 4k:[&_input]:text-4xl 8k:[&_input]:text-8xl [&_input]:text-center [&_input]:placeholder:text-center">
						<Input
							type="number"
							id="amount"
							value={amount}
							onChange={handleAmountChange}
							placeholder="Enter amount"
							className=" py-6 2k:py-8 4k:py-12 8k:py-24"
							min={1}
						/>
					</div>
				</div>

				<div className="flex items-center gap-x-2 2k:gap-x-3 4k:gap-x-4 8k:gap-x-8 md:gap-x-6 mb-10 2k:mb-13 4k:mb-20 8k:mb-40">
					<InfiniteScrollSelect
						value={fromCurrency}
						onValueChange={handleFromCurrencyChange}
						options={currentCurrencies}
						disabled={isLoading}
						placeholder="Select currency"
						id="fromCurrency"
						label="From"
						className="flex-1"
					/>

					<Button
						onClick={swapCurrencies}
						className="mt-8 2k:mt-11 4k:mt-16 8k:mt-32 p-6 2k:p-8 4k:p-12 8k:p-24 text-xl 2k:text-2xl 4k:text-3xl 8k:text-6xl"
						disabled={isLoading}
						size={'icon'}
						variant={'ghost'}
						aria-label="Swap currencies"
					>
						↔
					</Button>

					<InfiniteScrollSelect
						value={toCurrency}
						onValueChange={handleToCurrencyChange}
						options={currentCurrencies}
						disabled={isLoading}
						placeholder="Select currency"
						id="toCurrency"
						label="To"
						className="flex-1"
					/>
				</div>

				<div className="flex justify-between items-start p-4 2k:p-5 4k:p-8 8k:p-16 bg-gray-50 dark:bg-[var(--card)] rounded-md min-h-auto lg:min-h-[100px] 2k:lg:min-h-[133px] 4k:lg:min-h-[200px] 8k:lg:min-h-[400px]">
					<div className=''>
						<div className="text-2xl 2k:text-3xl 4k:text-5xl 8k:text-8xl font-bold text-green-600 dark:text-green-400">
							{convertedAmount} {toCurrency}
						</div>
						{exchangeRate > 0 && !isLoading && (
							<div className="mt-2 2k:mt-4 4k:mt-6 8k:mt-12 text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl text-gray-500 dark:text-zinc-500">
								1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
							</div>
						)}
					</div>
					<div className="text-lg 2k:text-2xl 4k:text-4xl 8k:text-7xl text-gray-500 dark:text-zinc-500 text-right">Converted Amount</div>
				</div>
			</div>
		</div>
	);
}


