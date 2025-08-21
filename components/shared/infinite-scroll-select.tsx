'use client'
import React, { useState } from 'react'
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

export const InfiniteScrollSelect: React.FC<Props> = React.memo(({
    value,
    onValueChange,
    options,
    disabled,
    placeholder,
    id,
    label,
    className
}) => {
    const [visibleCount, setVisibleCount] = useState(30)
    const { ref, inView } = useInView({
        threshold: 0.1, // Срабатывает когда 10% элемента видно
        rootMargin: '50px', // Запас вокруг viewport
    })

    React.useEffect(() => {
        setVisibleCount(30)
    }, [options]) // ← вот это важно!


    React.useEffect(() => {
        if (inView && visibleCount < options.length) {
            requestAnimationFrame(() => {
                setVisibleCount(prev => Math.min(prev + 20, options.length))
            })
        }
    }, [inView, options.length, visibleCount])

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-xl font-medium text-gray-700 dark:text-zinc-500 mb-1">
                {label}
            </label>
            <Select value={value} onValueChange={onValueChange} disabled={disabled}>
                <SelectTrigger className='text-2xl p-6 w-full cursor-pointer' id={id}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className="max-h-64 overflow-auto">
                        {options.slice(0, visibleCount).map((option) => (
                        <SelectItem key={option} value={option} className='text-xl cursor-pointer'>
                            {option}
                        </SelectItem>
                        ))}
                        
                        {visibleCount < options.length && (
                            <SelectItem 
                                ref={ref} 
                                value="load-more" 
                                className="justify-center pointer-events-none text-gray-500"
                                onSelect={() => {}}
                            >
                                {inView ? (
                                    <Loader2Icon className="animate-spin mx-auto" size={20} />
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

