'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth.store';
import { useAppForm } from '~/src/components/forms/useAppForm';
import { getPasswordStrength, passwordRequirements } from '../utils.auth';
import {
  IconArrowRight,
  IconCheck,
  IconLoader2,
  IconMail,
  IconUser,
  IconX
} from '@tabler/icons-react';

const registerFormSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.email('Invalid email address'),
    phone: z.string().email('Invalid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val, {
      message: 'You must accept terms'
    }),
    acceptMarketing: z.boolean()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export function RegisterDomain() {
  const router = useRouter();

  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      acceptMarketing: false
    },
    validators: {
      onChange: registerFormSchema,
      onBlur: registerFormSchema
    },
    onSubmit: async ({ value }) => {
      const success = await register({
        email: value.email,
        password: value.password,
        first_name: value.firstName,
        last_name: value.lastName,
        phone: value.phone
      });

      if (success) {
        router.push('/account');
      }
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) clearError();
  }, [error, clearError]);

  const password = form.getFieldValue('password');
  const passwordStrength = getPasswordStrength(password);

  return (
    <div className='bg-background flex min-h-screen'>
      {/* Left Side */}
      <div className='bg-accent/5 relative hidden flex-1 items-center justify-center overflow-hidden p-12 lg:flex'>
        <div className='from-accent/10 to-accent/5 absolute inset-0 bg-gradient-to-br via-transparent' />

        <div className='bg-accent/10 absolute top-1/3 right-1/4 h-72 w-72 rounded-full blur-3xl' />
        <div className='bg-accent/20 absolute bottom-1/3 left-1/4 h-56 w-56 rounded-full blur-3xl' />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='relative z-10 max-w-md text-center'
        >
          <div className='mb-8'>
            <span className='text-6xl font-bold tracking-tight'>LUXE</span>
          </div>

          <h2 className='mb-4 text-2xl font-semibold'>Join Our Community</h2>

          <p className='text-muted-foreground leading-relaxed'>
            Create an account to unlock exclusive benefits, early access to new collections, and
            personalized shopping experiences.
          </p>

          <div className='mt-12 space-y-4 text-left'>
            {[
              'Exclusive member-only discounts',
              'Early access to new arrivals',
              'Save items to your wishlist',
              'Faster checkout experience',
              'Order tracking & history'
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className='flex items-center gap-3'
              >
                <div className='bg-accent/20 flex size-6 items-center justify-center rounded-full'>
                  <IconCheck className='text-accent size-4' />
                </div>

                <span className='text-sm'>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side */}
      <div className='flex flex-1 items-center justify-center overflow-y-auto p-6 sm:p-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md py-8'
        >
          {/* Logo */}
          <Link href='/' className='mb-8 inline-block'>
            <span className='text-3xl font-bold tracking-tight'>LUXE</span>
          </Link>

          {/* Header */}
          <div className='mb-8'>
            <h1 className='mb-2 text-3xl font-bold'>Create your account</h1>

            <p className='text-muted-foreground'>Start your premium shopping journey today</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-destructive/10 border-destructive/20 text-destructive mb-6 rounded-xl border p-4 text-sm'
            >
              {error}
            </motion.div>
          )}

          <form.AppForm>
            <form.Root
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className='space-y-5'
            >
              {/* Names */}
              <div className='grid grid-cols-2 gap-4'>
                <form.AppField name='firstName'>
                  {(field) => (
                    <field.TextField
                      label='First name'
                      placeholder='John'
                      startIcon={IconUser}
                      className='h-12'
                    />
                  )}
                </form.AppField>

                <form.AppField name='lastName'>
                  {(field) => (
                    <field.TextField label='Last name' placeholder='Doe' className='h-12' />
                  )}
                </form.AppField>
              </div>

              {/* Email */}
              <form.AppField name='email'>
                {(field) => (
                  <field.TextField
                    label='Email address'
                    placeholder='name@example.com'
                    startIcon={IconMail}
                    className='h-12'
                  />
                )}
              </form.AppField>
              <form.AppField name='phone'>
                {(field) => (
                  <field.TextField
                    label='phone number'
                    placeholder='09121223880'
                    startIcon={IconMail}
                    className='h-12'
                  />
                )}
              </form.AppField>

              {/* Password */}
              <form.AppField name='password'>
                {(field) => (
                  <div className='space-y-3'>
                    <field.InputPassword label='Password' placeholder='Create a strong password' />

                    {password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className='space-y-3'
                      >
                        <div className='space-y-1'>
                          <div className='flex justify-between text-xs'>
                            <span className='text-muted-foreground'>Password strength</span>

                            <span
                              className={`font-medium ${
                                passwordStrength.score >= 3
                                  ? 'text-green-500'
                                  : passwordStrength.score >= 2
                                    ? 'text-yellow-500'
                                    : 'text-red-500'
                              }`}
                            >
                              {passwordStrength.label}
                            </span>
                          </div>

                          <div className='bg-muted h-1.5 overflow-hidden rounded-full'>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(passwordStrength.score / 5) * 100}%`
                              }}
                              transition={{ duration: 0.3 }}
                              className={passwordStrength.color}
                            />
                          </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                          {passwordRequirements.map((req) => {
                            const passed = req.test(password);

                            return (
                              <div
                                key={req.label}
                                className={`flex items-center gap-2 text-xs ${
                                  passed ? 'text-green-500' : 'text-muted-foreground'
                                }`}
                              >
                                {passed ? (
                                  <IconCheck className='size-3.5' />
                                ) : (
                                  <IconX className='size-3.5' />
                                )}

                                {req.label}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </form.AppField>

              {/* Confirm Password */}
              <form.AppField name='confirmPassword'>
                {(field) => (
                  <field.InputPassword
                    label='Confirm password'
                    placeholder='Confirm your password'
                  />
                )}
              </form.AppField>

              {/* Terms */}
              <div className='space-y-4'>
                <form.AppField name='acceptTerms'>
                  {(field) => (
                    <div className='flex flex-wrap items-start gap-3'>
                      <field.Checkbox label='' />
                      <Label
                        htmlFor={field.name}
                        className='cursor-pointer text-sm leading-relaxed font-normal'
                      >
                        I agree to the{' '}
                        <Link href='/terms' className='text-accent hover:underline'>
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href='/privacy' className='text-accent hover:underline'>
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  )}
                </form.AppField>

                <form.AppField name='acceptMarketing'>
                  {(field) => (
                    <div className='flex items-start gap-3'>
                      <field.Checkbox label='' />
                      <Label
                        htmlFor={field.name}
                        className='cursor-pointer text-sm leading-relaxed font-normal'
                      >
                        I want to receive exclusive offers, style tips, and updates
                      </Label>
                    </div>
                  )}
                </form.AppField>
              </div>

              {/* Submit */}
              <form.Submit
                disabled={isLoading}
                className='bg-accent hover:bg-accent/90 text-accent-foreground h-12'
              >
                {isLoading ? (
                  <>
                    <IconLoader2 className='size-5 animate-spin' />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <IconArrowRight className='size-5' />
                  </>
                )}
              </form.Submit>
            </form.Root>
          </form.AppForm>

          {/* Divider */}
          <div className='relative my-8'>
            <div className='absolute inset-0 flex items-center'>
              <div className='border-border w-full border-t' />
            </div>

            <div className='relative flex justify-center text-sm'>
              <span className='bg-background text-muted-foreground px-4'>Or sign up with</span>
            </div>
          </div>

          {/* Social */}
          <div className='grid grid-cols-2 gap-4'>
            <Button variant='outline' className='h-12'>
              Google
            </Button>

            <Button variant='outline' className='h-12'>
              GitHub
            </Button>
          </div>

          {/* Footer */}
          <p className='text-muted-foreground mt-8 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/login' className='text-accent font-medium hover:underline'>
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
