'use client'

import React from 'react';
import { cn } from '@/lib/utils';

type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong'

export const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const calculateStrength = (): PasswordStrength => {
    if (!password) return 'weak'
    
    const hasMinLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
    
    const strengthPoints = [
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar
    ].filter(Boolean).length

    if (strengthPoints <= 2) return 'weak'
    if (strengthPoints === 3) return 'medium'
    if (strengthPoints === 4) return 'strong'
    return 'very-strong'
  }

  const strength = calculateStrength()
  const strengthPercent = {
    'weak': 25,
    'medium': 50,
    'strong': 75,
    'very-strong': 100
  }[strength]

  return (
    <div className="  mt-1 space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Password strength:</span>
        <span className="capitalize">{strength.replace('-', ' ')}</span>
      </div>
      
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            'h-full transition-all duration-300 ease-out',
            strength === 'weak' && 'bg-red-400',
            strength === 'medium' && 'bg-yellow-300',
            strength === 'strong' && 'bg-blue-400',
            strength === 'very-strong' && 'bg-green-500'
          )}
          style={{ width: `${strengthPercent}%` }}
        />
      </div>
    </div>
  )
}