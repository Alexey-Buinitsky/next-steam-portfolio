'use client'

import React from 'react';
import { useState } from 'react';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { useForgotPasswordForm } from '@/hooks';
import type { ForgotPasswordFormValues } from '@/lib' 

interface ForgotPasswordProps {
  onSuccess?: (email: string, userId: number) => void;
  onBackToLogin?: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSuccess, onBackToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { form } = useForgotPasswordForm()
  const { handleSubmit, control } = form

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('If the email exists, a password reset code has been sent');
         // Если есть userId (в случае успешной отправки), передаем его
        if (data.userId) {
          onSuccess?.(values.email, data.userId);
        } else {
          onSuccess?.(values.email, 0); // Fallback
        }  
      } else {
        setMessage(data.error || 'An error occurred');
      }

    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Reset Password</h2>
      <p className="text-sm text-muted-foreground">
        Enter your email address and we'll send you a code to reset your password.
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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

          {message && (
            <p className={`text-sm ${message.includes('error') ? 'text-destructive' : 'text-foreground'}`}>
              {message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </Button>
        </form>
      </Form>

      {onBackToLogin && (
        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-primary text-sm hover:underline focus-visible:underline outline-none cursor-pointer"
          >
            Back to Sign In
          </button>
        </div>
      )}
    </div>
  );
};