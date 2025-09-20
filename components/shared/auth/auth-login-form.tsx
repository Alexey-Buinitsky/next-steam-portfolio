//app/components/shared/auth/auth-login-form.ts
import React from 'react';
import { useAuthForm, useAuthNotifications } from '@/hooks';
import { getFetchError, isEmailVerificationRequiredError } from '@/lib';
import { Input, Button, Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from '@/components/ui';

import type { AuthFormValues } from '@/form';

interface Props {
    onSwitchToRegister: () => void;
    onSwitchToForgotPassword: () => void;
    onVerificationRequired?: (email: string, userId: number) => void;
    onSuccess: () => void;
    onClose: () => void;
}

export const AuthLoginForm: React.FC<Props> = ({ onSwitchToRegister, onSwitchToForgotPassword, onVerificationRequired, onSuccess, onClose}) => {
    const { showError, showSuccess } = useAuthNotifications();

    const { form } = useAuthForm('login');
    const { handleSubmit, formState, control } = form;

    const onSubmit = async (data: AuthFormValues) => {
        try {
            const response = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
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

            showSuccess('Successfully signed in!');
            onSuccess();
            
        } catch (err) {
            showError(err, 'Authentication failed');
        }
    };

    return (
        <div>
            <h2 className="text-xl 2k:text-2xl 4k:text-4xl 8k:text-7xl font-bold mb-4 2k:mb-5 4k:mb-10 8k:mb-20">Sign In</h2>
            
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div className='flex flex-col gap-y-4 2k:gap-y-6 4k:gap-y-8 8k:gap-y-16'>
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
                                        }}
                                        autoComplete={'password'}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between 2k:mt-4 2k:mb-6 4k:mt-6 4k:mb-8 8k:mt-12 8k:mb-16">
                    <Button variant="link" type="button" onClick={onSwitchToRegister} className="p-0!">
                        Don't have an account? Register
                    </Button>
                    <Button variant="link" type="button" onClick={onSwitchToForgotPassword} className="p-0!">
                        Forgot your password?
                    </Button>
                </div>
                
                <div className="flex gap-2 2k:gap-3 4k:gap-4 8k:gap-8 pt-4 2k:pt-5 4k:pt-8 8k:pt-16">
                    <Button variant="outline" onClick={onClose} type="button" className="flex-1">
                        Cancel
                    </Button>

                    <Button type="submit" disabled={formState.isSubmitting} className="flex-1">
                        {formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>
                </div>
                </form>
            </Form>
        </div>
    );
};