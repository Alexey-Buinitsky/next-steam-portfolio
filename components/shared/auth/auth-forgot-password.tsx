//app/components/shared/auth/auth-forgot-password.tsx

'use client'

import React from 'react';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { useForgotPasswordForm, useAuthNotifications } from '@/hooks';
import { isEmailVerificationRequiredError, getFetchError } from '@/lib' 

import type { ForgotPasswordFormValues } from '@/form';

interface AuthForgotPasswordProps {
  onSuccess?: (email: string, userId: number) => void;
  onBackToLogin?: () => void;
  onVerificationRequired?: (email: string, userId: number) => void;
}

export const AuthForgotPassword: React.FC<AuthForgotPasswordProps> = ({ onSuccess, onBackToLogin, onVerificationRequired }) => {
  const { showError, showSuccess } = useAuthNotifications();

  const { form } = useForgotPasswordForm()
  const { handleSubmit, control, formState } = form

  const onSubmit = async (values: ForgotPasswordFormValues) => {

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const apiError = await getFetchError(response);

        // СПЕЦИФИЧНАЯ ОБРАБОТКА СЛУЧАЯ С НЕПОДТВЕРЖДЕННЫМ EMAIL
        if (isEmailVerificationRequiredError(apiError)) {
          onVerificationRequired?.(apiError.email, apiError.userId);
          return;
        }

        throw new Error(apiError.error);
      }

      const data = await response.json()

      showSuccess('If the email exists, a password reset code has been sent');

      if (data.userId && data.userId > 0) {
        onSuccess?.(values.email, data.userId);
      } else {
        onSuccess?.(values.email, 0)
      }  

    } catch (err) {
       showError(err, 'Failed to send reset code');
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl 2k:text-2xl 4k:text-4xl 8k:text-7xl font-bold mb-4 2k:mb-5 4k:mb-10 8k:mb-20">Reset Password</h2>
      <p className="text-sm text-muted-foreground 2k:text-lg 4k:text-3xl 8k:text-6xl 2k:mb-4 4k:mb-8 8k:mb-16">
        Enter your email address and we will send you a code to reset your password.
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className='2k:mb-6 4k:mb-8 8k:mb-16'>
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='2k:mb-1 4k:mb-2 8k:mb-6'>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@example.com"
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={formState.isLoading}
            className="w-full"
          >
            {formState.isLoading ? 'Sending...' : 'Send Reset Code'}
          </Button>
        </form>
      </Form>

      {onBackToLogin && (
        <div className="pt-1 text-center">
          <Button
            variant='link'
            type="button"
            onClick={onBackToLogin}
            className="p-0! 2k:mt-1 4k:mt-4 8k:mt-16"
          >
            Back to Sign In
          </Button>
        </div>
      )}
    </div>
  )
}