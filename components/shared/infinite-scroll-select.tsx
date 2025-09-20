'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { Loader2Icon } from 'lucide-react'

interface Props {
	value: string
	onValueChange: (value: string) => void
	options: string[]
	disabled?: boolean
	placeholder?: string
	id: string
	label: string
	className?: string
}

export const InfiniteScrollSelect: React.FC<Props> = React.memo(({ value, onValueChange, options, disabled, placeholder, id, label, className }) => {
	const [visibleCount, setVisibleCount] = React.useState(30)

	const { ref, inView } = useInView({
		threshold: 0.1, // Срабатывает когда 10% элемента видно
		rootMargin: '50px', // Запас вокруг viewport
	})

	// Создаем массив с приоритетным отображением выбранной валюты
	const getDisplayedOptions = React.useCallback(() => {
		const baseOptions = options.slice(0, visibleCount)

		// Если выбранная валюта уже в списке или не выбрана, возвращаем обычный список
		if (!value || baseOptions.includes(value)) {
			return baseOptions
		}

		// Иначе добавляем выбранную валюту в начало списка
		return [value, ...baseOptions.filter(opt => opt !== value)]
	}, [options, visibleCount, value])

	const displayedOptions = getDisplayedOptions()

	// Сбрасываем счетчик при изменении options
	React.useEffect(() => { setVisibleCount(30) }, [options])

	React.useEffect(() => {
		if (inView && visibleCount < options.length) { requestAnimationFrame(() => { setVisibleCount(prev => Math.min(prev + 20, options.length)) }) }
	}, [inView, options.length, visibleCount])

	return (
		<div className={className}>
			<label htmlFor={id} className="block text-xl font-medium text-gray-700 dark:text-zinc-500 mb-1 2k:text-2xl 4k:text-4xl 8k:text-7xl 2k:mb-2 4k:mb-4 8k:mb-8">
				{label}
			</label>
			<Select value={value} onValueChange={onValueChange} disabled={disabled}>
				<SelectTrigger className="text-2xl p-6 w-full cursor-pointer 2k:text-3xl 2k:p-8 4k:text-5xl 4k:p-12 8k:text-8xl 8k:p-24 2k:h-20 4k:h-32 8k:h-64" id={id}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent className="2k:text-2xl 4k:text-4xl 8k:text-8xl">
					<SelectGroup className="max-h-64 overflow-auto 2k:max-h-96 4k:max-h-144 8k:max-h-288">
						{displayedOptions.map((option) => (
							<SelectItem
								key={option}
								value={option}
								className="text-xl cursor-pointer 2k:text-3xl 2k:p-3 4k:text-4xl 4k:p-6 8k:text-7xl 8k:p-13"
							>
								{option}
							</SelectItem>
						))}

						{visibleCount < options.length && (
							<SelectItem
								ref={ref}
								value="load-more"
								className="justify-center pointer-events-none text-gray-500 text-xl 2k:text-2xl 2k:p-4 4k:text-4xl 4k:p-6 8k:text-8xl 8k:p-12"
								onSelect={() => { }}
							>
								{inView ? (
									<Loader2Icon className="animate-spin mx-auto w-5 h-5 2k:w-8 2k:h-8 4k:w-12 4k:h-12 8k:w-24 8k:h-24" />
								) : (
									'Scroll to load more...'
								)}
							</SelectItem>
						)}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
})

InfiniteScrollSelect.displayName = 'InfiniteScrollSelect'