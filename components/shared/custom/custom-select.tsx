//components/shared/custom/custom-select.tsx
'use client'

import React from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CustomSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
  disabled?: boolean
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  className,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectRef = React.useRef<HTMLDivElement>(null)

  // Закрытие при клике вне компонента
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Закрытие при нажатии Escape
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        event.stopPropagation() // Предотвращаем всплытие, чтобы не закрыть родительскую модалку
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200",
          isOpen && "ring-2 ring-ring ring-offset-2"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={cn("truncate", !value && 'text-muted-foreground')}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 opacity-50 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="p-1 max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none">
                <span className="text-muted-foreground">No options available</span>
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                    "focus:bg-accent focus:text-accent-foreground",
                    "transition-colors duration-200",
                    value === option.value && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => {
                    onValueChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {value === option.value && (
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}