//app/components/shared/auth/auth-register-form.tsx

import React from 'react';
import { Button, Input, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui';
import { useAuthForm, useAuthNotifications } from '@/hooks';
import { getFetchError, isEmailVerificationRequiredError } from '@/lib';
import { PasswordStrengthIndicator } from '../password-strength-indicator';
import type { RegisterFormValues } from '@/form';

interface Props {
    onVerificationRequired?: (email: string, userId: number) => void;
    onClose: () => void;
    onSwitchToLogin: () => void;
    
    onShowVerificationCode?: (code: string, email: string) => void;
}

export const AuthRegisterForm: React.FC<Props> = ({ onVerificationRequired, onClose, onSwitchToLogin, onShowVerificationCode }) => {
    const [passwordValue, setPasswordValue] = React.useState('');
    
    const { showError } = useAuthNotifications();

    const { form } = useAuthForm('register');
    const { handleSubmit, formState, control } = form;

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const response = await fetch(`/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            
            
            if (!response.ok) {
                const apiError = await getFetchError(response);

                if (isEmailVerificationRequiredError(apiError)) {
                    onVerificationRequired?.(apiError.email, apiError.userId);
                    return;
                }
                
                throw new Error(apiError.error);
            }

            const responseData = await response.json();


            // if (responseData.success && responseData.userId) {
            //     onVerificationRequired?.(responseData.email, responseData.userId); - RESEND РЕАЛИЗАЦИЯ
            // }

            // ПОКАЗЫВАЕМ КОД В ИНТЕРФЕЙСЕ ВМЕСТО ОТПРАВКИ EMAIL - ВМЕСТО RESEND
            if (responseData.success && responseData.verificationCode) {
                onShowVerificationCode?.(responseData.verificationCode, responseData.email);
                onVerificationRequired?.(responseData.email, responseData.userId);
            } else if (responseData.success && responseData.userId) {
                onVerificationRequired?.(responseData.email, responseData.userId);
            }
            
        } catch (err) {
            showError(err,'Registration failed');
        } 
    };

    return (
        <div>
            <h2 className="text-xl 2k:text-2xl 4k:text-4xl 8k:text-7xl font-bold mb-4 2k:mb-5 4k:mb-10 8k:mb-20">Create Account</h2>
        
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className='flex flex-col gap-y-4 2k:gap-y-6 4k:gap-y-8 8k:gap-y-16'>
                            <FormField
                                control={control}
                                name="nickname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='2k:mb-1 4k:mb-2 8k:mb-6'>Nickname</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your display name" 
                                                {...field} 
                                                autoComplete="username"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        
                            <FormField
                                control={control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className='2k:mb-1 4k:mb-2 8k:mb-6'>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='email'
                                                placeholder="your@example.com" 
                                                {...field} 
                                                autoComplete='email'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
    
                            <FormField 
                                control={control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className='2k:mb-1 4k:mb-2 8k:mb-6'>Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="password" 
                                                placeholder="Enter your password" 
                                                {...field} 
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setPasswordValue(e.target.value);
                                                }}
                                                autoComplete={'new-password'}
                                            />
                                        </FormControl>
                                        <div className='mt-1 4k:mt-4 8k:mt-10 2k:mb-2 4k:mb-6 8k:mb-12'>
                                            <PasswordStrengthIndicator password={passwordValue} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    <Button
                        variant='link'
                        type="button"
                        onClick={onSwitchToLogin}
                        className="p-0! 2k:mb-6 4k:mb-8 8k:mb-16"
                    >
                        Already have an account? Sign in 
                    </Button>
                    
                    <div className="flex gap-2 pt-4 2k:gap-3 4k:gap-4 8k:gap-8 2k:pt-5 4k:pt-8 8k:pt-16">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            type="button"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        
                        <Button
                            type="submit"
                            disabled={formState.isSubmitting}
                            className="flex-1"
                        >
                            {formState.isSubmitting ? 'Creating...' : 'Register'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};