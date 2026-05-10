'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { navLinks } from '@/lib/data';
import { IconMenu, IconMoon, IconShoppingBag, IconSun, IconUser, IconX } from '@tabler/icons-react';
import { useCartStore } from '../store/card.store';
import { useUser } from '@/hooks/useUser'; // 👈 new hook

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const itemCount = useCartStore((state) => state.getItemCount());
  const { loading: userLoading, isAuthenticated } = useUser();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 border-border/50 border-b shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between lg:h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2'>
            <motion.span className='text-2xl font-bold tracking-tight' whileHover={{ scale: 1.02 }}>
              LUXE
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden items-center gap-8 md:flex'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='text-muted-foreground hover:text-foreground group relative text-sm font-medium transition-colors'
              >
                {link.name}
                <span className='bg-accent absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full' />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center gap-2'>
            {mounted && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className='rounded-full'
              >
                <IconSun className='h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                <IconMoon className='absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            )}

            <Link href={isAuthenticated ? '/account' : '/login'}>
              <Button variant='ghost' size='icon' className='relative hidden rounded-full sm:flex'>
                <IconUser className='h-5 w-5' />
                {mounted && isAuthenticated && !userLoading && (
                  <span className='bg-accent absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full' />
                )}
                <span className='sr-only'>Account</span>
              </Button>
            </Link>

            <Link href='/cart'>
              <Button variant='ghost' size='icon' className='relative rounded-full'>
                <IconShoppingBag className='h-5 w-5' />
                {mounted && itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='bg-accent text-accent-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs'
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
                <span className='sr-only'>Cart</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='icon'
              className='rounded-full md:hidden'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <IconX className='h-5 w-5' /> : <IconMenu className='h-5 w-5' />}
              <span className='sr-only'>Menu</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='bg-background/95 border-border border-b backdrop-blur-xl md:hidden'
          >
            <div className='space-y-4 px-4 py-6'>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-foreground block py-2 text-lg font-medium transition-colors'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
