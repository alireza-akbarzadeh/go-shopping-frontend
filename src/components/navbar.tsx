'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useCartStore } from '../store/card.store';
import {
  IconHeart,
  IconMapPin,
  IconMenu,
  IconSearch,
  IconShoppingBag,
  IconUser
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const megaShop: { title: string; href: string; description: string }[] = [
  { title: 'All Products', href: '/', description: 'Browse the full collection.' },
  { title: 'Best Sellers', href: '/', description: 'What everyone is reaching for.' },
  { title: 'New Arrivals', href: '/', description: 'Just landed this week.' },
  { title: 'Last Chance', href: '/', description: 'Sizes running low.' }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const setCartOpen = useCartStore((s) => s.setOpen);
  const { push } = useRouter();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className='sticky top-0 z-50 w-full'>
      {/* Top utility bar */}
      <div className='bg-foreground text-background text-xs'>
        <div className='container mx-auto flex h-9 items-center justify-between px-4'>
          <p className='hidden sm:block'>Free shipping on orders over $150 · 30-day returns</p>
          <div className='flex items-center gap-4'>
            <span className='hidden items-center gap-1 sm:inline-flex'>
              <IconMapPin className='h-3 w-3' /> Deliver to US
            </span>
            <Link href='/' className='hover:text-accent transition-colors'>
              Help
            </Link>
            <Link href='/' className='hover:text-accent transition-colors'>
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          'border-border bg-background/85 border-b backdrop-blur-xl transition-shadow',
          scrolled && 'shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)]'
        )}
      >
        <div className='container mx-auto flex h-16 items-center gap-4 px-4 lg:gap-8'>
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='lg:hidden'>
                <IconMenu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-80'>
              <SheetHeader>
                <SheetTitle className='font-display text-2xl'>LUXE</SheetTitle>
              </SheetHeader>
              <nav className='mt-6 flex flex-col'>
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    href='/'
                    onClick={() => setMobileOpen(false)}
                    className='border-border hover:text-accent border-b py-3 text-base font-medium'
                  >
                    {c.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href='/' className='font-display text-2xl font-bold tracking-tight'>
            LUXE<span className='text-accent'>.</span>
          </Link>

          {/* Desktop nav */}
          <NavigationMenu className='hidden lg:flex'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className='grid w-160 grid-cols-[1fr_1.2fr] gap-0'>
                    <div className='bg-secondary p-6'>
                      <p className='text-muted-foreground mb-4 text-xs tracking-widest uppercase'>
                        Discover
                      </p>
                      <ul className='space-y-3'>
                        {megaShop.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link href={item.href} className='group block'>
                                <p className='group-hover:text-accent font-medium transition-colors'>
                                  {item.title}
                                </p>
                                <p className='text-muted-foreground text-xs'>{item.description}</p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className='p-6'>
                      <p className='text-muted-foreground mb-4 text-xs tracking-widest uppercase'>
                        Categories
                      </p>
                      <ul className='grid grid-cols-2 gap-3'>
                        {categories.map((c) => (
                          <li key={c.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={c.slug}
                                className='hover:bg-secondary hover:text-accent block rounded-md p-2 text-sm transition-colors'
                              >
                                {c.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className='grid w-105 gap-2 p-4'>
                    {['Autumn 25', 'Resort', 'Essentials', 'Archive'].map((c) => (
                      <NavigationMenuLink asChild key={c}>
                        <Link
                          href='/'
                          className='hover:bg-secondary rounded-md p-3 transition-colors'
                        >
                          <p className='font-medium'>{c}</p>
                          <p className='text-muted-foreground text-xs'>
                            Pieces curated for the season.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href='/' className='hover:text-accent px-3 py-2 text-sm font-medium'>
                    Journal
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href='/' className='text-accent px-3 py-2 text-sm font-medium'>
                    Sale
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search */}
          <div className='ml-auto hidden max-w-md flex-1 md:block'>
            <div className='relative'>
              <IconSearch className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
              <Input
                type='search'
                placeholder='Search coats, watches, denim…'
                className='border-border bg-secondary h-10 rounded-full pl-10'
              />
            </div>
          </div>

          {/* Actions */}
          <div className='ml-auto flex items-center gap-1 md:ml-0'>
            <Button variant='ghost' size='icon' className='md:hidden'>
              <IconSearch className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon' className='hidden sm:inline-flex'>
              <IconHeart className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon' className='hidden sm:inline-flex'>
              <IconUser className='h-5 w-5' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='relative'
              onClick={() => push('/checkout')}
              aria-label='Open cart'
            >
              <IconShoppingBag className='h-5 w-5' />
              {itemCount > 0 && (
                <Badge className='bg-accent text-accent-foreground hover:bg-accent absolute -top-1 -right-1 h-5 min-w-5 rounded-full p-0 text-[10px]'>
                  {itemCount > 9 ? '9+' : itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
