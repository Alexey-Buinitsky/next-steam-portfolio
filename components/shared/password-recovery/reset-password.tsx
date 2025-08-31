'use client'

import React from 'react';
import { useState } from 'react';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { PasswordStrengthIndicator } from '@/components/shared';
import { useRouter } from 'next/navigation';
import { useResetPasswordForm } from '@/hooks';

import { getFetchError, type ResetPasswordFormValues } from '@/lib'

interface ResetPasswordProps {
  userId?: number;
  email?: string;
  onSuccess?: () => void;
  onBackToForgot?: () => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ userId, email, onBackToForgot, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const [passwordValue, setPasswordValue] = useState('')

  const { form } = useResetPasswordForm()
  const { handleSubmit, setError, control } = form
  
  const router = useRouter()

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: userId, 
          code: values.code, 
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      })
      
      if (!response.ok) {
        const error = await getFetchError(response)
      
        // Обрабатываем ошибки валидации кода
        if (error.code === 'INVALID_RESET_CODE') {
          setError('code', { message: error.error })
        } else {
            throw new Error(error.error)
        }
        return
      }

        const data = await response.json()
        setMessage('Password has been reset successfully')
        setTimeout(() => {
          if (onSuccess) {
            onSuccess()
          } else {
            router.push('/auth?mode=login')
          }
        }, 2000)

        } catch (error) {
          console.error('Full error details:', error)
          setMessage('An error occurred. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Set New Password</h2>
      {email && (
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to <span className="font-semibold">{email}</span> and your new password.
        </p>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter 6-digit code"
                    {...field}
                    maxLength={6}
                    className="text-center font-mono tracking-widest text-lg"
                    onChange={(e) => {
                      field.onChange(e);
                      setMessage(''); // Clear error when typing
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setPasswordValue(e.target.value);
                      setMessage(''); // Clear error when typing
                    }}
                    autoComplete="new-password"
                  />
                </FormControl>
                <PasswordStrengthIndicator password={passwordValue} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setMessage(''); // Clear error when typing
                    }}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {message && (
            <p className={`text-sm text-center ${message.includes('error') ? 'text-destructive' : 'text-foreground'}`}>
              {message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>

          {onBackToForgot && (
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={onBackToForgot}
                className="text-primary text-sm hover:underline focus-visible:underline outline-none cursor-pointer"
              >
                Back to Reset Request
              </button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}