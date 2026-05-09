'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/store/auth.store';
import { getPasswordStrength, passwordRequirements } from '../utils.auth';
import {
  IconArrowRight,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconLock,
  IconMail,
  IconUser,
  IconX
} from '@tabler/icons-react';

export function RegisterDomain() {
  const router = useRouter();
  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword && confirmPassword !== '';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  // Clear error when inputs change
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, password, firstName, lastName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch) return;
    if (!acceptTerms) return;

    const success = await register({
      email,
      password,
      firstName,
      lastName
    });

    if (success) {
      router.push('/account');
    }
  };

  return (
    <div className='bg-background flex min-h-screen'>
      {/* Left Side - Image/Branding */}
      <div className='bg-accent/5 relative hidden flex-1 items-center justify-center overflow-hidden p-12 lg:flex'>
        <div className='from-accent/10 to-accent/5 absolute inset-0 bg-gradient-to-br via-transparent' />

        {/* Decorative Elements */}
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

          {/* Benefits */}
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
                <div className='bg-accent/20 flex h-6 w-6 items-center justify-center rounded-full'>
                  <IconCheck className='text-accent h-4 w-4' />
                </div>
                <span className='text-sm'>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
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

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-destructive/10 border-destructive/20 text-destructive mb-6 rounded-xl border p-4 text-sm'
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Name Fields */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>First name</Label>
                <div className='relative'>
                  <IconUser className='text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
                  <Input
                    id='firstName'
                    type='text'
                    placeholder='John'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='h-12 pl-10'
                    required
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lastName'>Last name</Label>
                <Input
                  id='lastName'
                  type='text'
                  placeholder='Doe'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='h-12'
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className='space-y-2'>
              <Label htmlFor='email'>Email address</Label>
              <div className='relative'>
                <IconMail className='text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
                <Input
                  id='email'
                  type='email'
                  placeholder='name@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='h-12 pl-10'
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <IconLock className='text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Create a strong password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='h-12 pr-10 pl-10'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors'
                >
                  {showPassword ? (
                    <IconEyeOff className='h-5 w-5' />
                  ) : (
                    <IconEye className='h-5 w-5' />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className='space-y-3 pt-2'
                >
                  {/* Strength Bar */}
                  <div className='space-y-1'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-muted-foreground'>Password strength</span>
                      <span
                        className={`font-medium ${passwordStrength.score >= 3 ? 'text-green-600' : passwordStrength.score >= 2 ? 'text-yellow-600' : 'text-red-600'}`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className='bg-muted h-1.5 overflow-hidden rounded-full'>
                      <motion.div
                        className={`h-full ${passwordStrength.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className='grid grid-cols-2 gap-2'>
                    {passwordRequirements.map((req) => {
                      const passed = req.test(password);
                      return (
                        <div
                          key={req.label}
                          className={`flex items-center gap-2 text-xs ${
                            passed ? 'text-green-600' : 'text-muted-foreground'
                          }`}
                        >
                          {passed ? (
                            <IconCheck className='h-3.5 w-3.5' />
                          ) : (
                            <IconX className='h-3.5 w-3.5' />
                          )}
                          {req.label}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm password</Label>
              <div className='relative'>
                <IconLock className='text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
                <Input
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm your password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`h-12 pr-10 pl-10 ${
                    confirmPassword && !passwordsMatch
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : confirmPassword && passwordsMatch
                        ? 'border-green-500 focus-visible:ring-green-500'
                        : ''
                  }`}
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors'
                >
                  {showConfirmPassword ? (
                    <IconEyeOff className='h-5 w-5' />
                  ) : (
                    <IconEye className='h-5 w-5' />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className='text-xs text-red-500'>Passwords do not match</p>
              )}
            </div>

            {/* Terms & Marketing */}
            <div className='space-y-3'>
              <div className='flex items-start gap-2'>
                <Checkbox
                  id='terms'
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className='mt-1'
                />
                <Label
                  htmlFor='terms'
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
              <div className='flex items-start gap-2'>
                <Checkbox
                  id='marketing'
                  checked={acceptMarketing}
                  onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
                  className='mt-1'
                />
                <Label
                  htmlFor='marketing'
                  className='cursor-pointer text-sm leading-relaxed font-normal'
                >
                  I want to receive exclusive offers, style tips, and new arrival updates
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              size='lg'
              className='bg-accent hover:bg-accent/90 text-accent-foreground h-12 w-full'
              disabled={isLoading || !acceptTerms || !passwordsMatch}
            >
              {isLoading ? (
                <>
                  <IconLoader2 className='mr-2 h-5 w-5 animate-spin' />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <IconArrowRight className='ml-2 h-5 w-5' />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className='relative my-8'>
            <div className='absolute inset-0 flex items-center'>
              <div className='border-border w-full border-t' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-background text-muted-foreground px-4'>Or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up */}
          <div className='grid grid-cols-2 gap-4'>
            <Button variant='outline' className='h-12'>
              <svg className='mr-2 h-5 w-5' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='currentColor'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='currentColor'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='currentColor'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              Google
            </Button>
            <Button variant='outline' className='h-12'>
              <svg className='mr-2 h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
              GitHub
            </Button>
          </div>

          {/* Sign In Link */}
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
