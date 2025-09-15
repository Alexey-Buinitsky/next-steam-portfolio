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
          "2k:px-4 2k:py-3 2k:text-lg",
          "4k:px-6 4k:py-5 4k:text-3xl", 
          "8k:px-12 8k:py-10 8k:text-6xl",
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
          "2k:h-5 2k:w-5",
          "4k:h-8 4k:w-8",
          "8k:h-16 8k:w-16",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute z-50 mt-2 w-full min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
          "2k:mt-3 2k:min-w-[11rem]",
          "4k:mt-4 4k:min-w-[16rem]",
          "8k:mt-6 8k:min-w-[32rem]"
        )}>
          <div className={cn(
            "p-1 max-h-60 overflow-y-auto",
            "2k:p-2 2k:max-h-80",
            "4k:p-3 4k:max-h-120",
            "8k:p-6 8k:max-h-240"
          )}>
            {options.length === 0 ? (
              <div className={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                "2k:py-2 2k:pl-10 2k:pr-3 2k:text-lg",
                "4k:py-3 4k:pl-16 4k:pr-4 4k:text-3xl",
                "8k:py-6 8k:pl-32 8k:pr-8 8k:text-6xl"
              )}>
                <span className="text-muted-foreground">No options available</span>
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                    "2k:py-2 2k:pl-10 2k:pr-3 2k:text-lg",
                    "4k:py-4 4k:pl-16 4k:pr-4 4k:text-3xl",
                    "8k:py-9 8k:pl-32 8k:pr-8 8k:text-6xl",
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
                    <span className={cn(
                      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                      "2k:left-3 2k:h-4 2k:w-4",
                      "4k:left-4 4k:h-6 4k:w-6",
                      "8k:left-8 8k:h-12 8k:w-12"
                    )}>
                      <Check className={cn(
                        "h-4 w-4",
                        "2k:h-5 2k:w-5",
                        "4k:h-8 4k:w-8",
                        "8k:h-16 8k:w-16"
                      )} />
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