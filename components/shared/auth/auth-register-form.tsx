//app/components/shared/auth/auth-register-form.tsx

import React from 'react';
import { Button, Input, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui';
import { useAuthForm } from '@/hooks';
import { getFetchError, isEmailVerificationRequiredError, RegisterFormValues } from '@/lib';
import { PasswordStrengthIndicator } from '../password-strength-indicator';

interface Props {
    onVerificationRequired?: (email: string, userId: number) => void;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export const AuthRegisterForm: React.FC<Props> = ({ onVerificationRequired, onClose, onSwitchToLogin }) => {
    const [serverError, setServerError] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

    const { form } = useAuthForm('register');
    const { handleSubmit, formState, control } = form;

    const onSubmit = async (data: RegisterFormValues) => {
        setServerError('');

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


            if (responseData.success && responseData.userId) {
                // setNeedsVerification(true);
                // setVerificationEmail(responseData.email);
                // setVerificationUserId(responseData.userId);
                onVerificationRequired?.(responseData.email, responseData.userId);
            }
            
        } catch (err) {
            setServerError(err instanceof Error ? err.message : 'Registration failed');
        } 
    };

    return (
        <div>
            <h2 className="text-x font-bold mb-4">Create Account</h2>
        
            {serverError && (
                <p className="text-destructive mb-4 text-center text-sm">
                    {serverError}
                </p>
            )}
        
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={control}
                        name="nickname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nickname</FormLabel>
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
                                <FormLabel>Email</FormLabel>
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
                                <FormLabel>Password</FormLabel>
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
                                <PasswordStrengthIndicator password={passwordValue} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-primary text-sm hover:underline focus-visible:underline outline-none cursor-pointer"
                        >
                            Already have an account? Sign in 
                        </button>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
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