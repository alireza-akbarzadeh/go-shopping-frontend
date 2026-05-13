'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconMapPin,
  IconCreditCard,
  IconPackage,
  IconChevronRight,
  IconCheck,
  IconChevronLeft,
  IconLock,
  IconTruck,
  IconShieldCheck
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useCartStore } from '~/src/store/card.store';

const steps = [
  { id: 1, name: 'Shipping', icon: IconMapPin },
  { id: 2, name: 'Payment', icon: IconCreditCard },
  { id: 3, name: 'Review', icon: IconPackage }
];

const shippingMethods = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 0
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 15
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 30
  }
];

export default function CheckoutDomain() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    shippingMethod: 'standard',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
    saveInfo: false,
    newsletter: false
  });

  const subtotal = getTotal();
  const selectedShipping = shippingMethods.find((m) => m.id === formData.shippingMethod);
  const shippingCost = selectedShipping?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    router.push('/order-confirmation');
  };

  if (items.length === 0) {
    return (
      <div className='bg-background min-h-screen'>
        <main className='pt-24 pb-16'>
          <div className='mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8'>
            <h1 className='mb-4 text-2xl font-bold'>Your cart is empty</h1>
            <p className='text-muted-foreground mb-8'>
              Add some items to your cart before checking out.
            </p>
            <Link href='/shop'>
              <Button size='lg' className='rounded-full'>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='bg-background min-h-screen'>
      <main className='pt-24 pb-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Breadcrumb */}
          <nav className='text-muted-foreground mb-8 flex items-center gap-2 text-sm'>
            <Link href='/' className='hover:text-foreground transition-colors'>
              Home
            </Link>
            <IconChevronRight className='h-4 w-4' />
            <Link href='/cart' className='hover:text-foreground transition-colors'>
              Cart
            </Link>
            <IconChevronRight className='h-4 w-4' />
            <span className='text-foreground'>Checkout</span>
          </nav>

          {/* Progress Steps */}
          <div className='mb-12'>
            <div className='flex items-center justify-center'>
              {steps.map((step, index) => (
                <div key={step.id} className='flex items-center'>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 ${
                      currentStep === step.id
                        ? 'bg-accent text-accent-foreground'
                        : currentStep > step.id
                          ? 'bg-green-500/10 text-green-600'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <IconCheck className='h-4 w-4' />
                    ) : (
                      <step.icon className='h-4 w-4' />
                    )}
                    <span className='hidden text-sm font-medium sm:block'>{step.name}</span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-12 sm:w-24 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='grid gap-8 lg:grid-cols-5 lg:gap-12'>
            {/* Form Section */}
            <div className='lg:col-span-3'>
              <AnimatePresence mode='wait'>
                {/* Step 1: Shipping */}
                {currentStep === 1 && (
                  <motion.div
                    key='shipping'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <div>
                      <h2 className='mb-6 text-2xl font-bold'>Shipping Information</h2>

                      {/* Contact */}
                      <div className='mb-8 space-y-4'>
                        <h3 className='font-medium'>Contact</h3>
                        <div>
                          <Label htmlFor='email'>Email</Label>
                          <Input
                            id='email'
                            type='email'
                            placeholder='your@email.com'
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className='mt-1'
                          />
                        </div>
                        <div className='flex items-center gap-2'>
                          <Checkbox
                            id='newsletter'
                            checked={formData.newsletter}
                            onCheckedChange={(checked) =>
                              updateField('newsletter', checked as boolean)
                            }
                          />
                          <Label htmlFor='newsletter' className='text-sm font-normal'>
                            Email me with news and offers
                          </Label>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className='space-y-4'>
                        <h3 className='font-medium'>Shipping Address</h3>
                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <Label htmlFor='firstName'>First Name</Label>
                            <Input
                              id='firstName'
                              placeholder='John'
                              value={formData.firstName}
                              onChange={(e) => updateField('firstName', e.target.value)}
                              className='mt-1'
                            />
                          </div>
                          <div>
                            <Label htmlFor='lastName'>Last Name</Label>
                            <Input
                              id='lastName'
                              placeholder='Doe'
                              value={formData.lastName}
                              onChange={(e) => updateField('lastName', e.target.value)}
                              className='mt-1'
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor='address'>Address</Label>
                          <Input
                            id='address'
                            placeholder='123 Main St'
                            value={formData.address}
                            onChange={(e) => updateField('address', e.target.value)}
                            className='mt-1'
                          />
                        </div>
                        <div>
                          <Label htmlFor='apartment'>Apartment, suite, etc. (optional)</Label>
                          <Input
                            id='apartment'
                            placeholder='Apt 4B'
                            value={formData.apartment}
                            onChange={(e) => updateField('apartment', e.target.value)}
                            className='mt-1'
                          />
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                          <div>
                            <Label htmlFor='city'>City</Label>
                            <Input
                              id='city'
                              placeholder='New York'
                              value={formData.city}
                              onChange={(e) => updateField('city', e.target.value)}
                              className='mt-1'
                            />
                          </div>
                          <div>
                            <Label htmlFor='state'>State</Label>
                            <Input
                              id='state'
                              placeholder='NY'
                              value={formData.state}
                              onChange={(e) => updateField('state', e.target.value)}
                              className='mt-1'
                            />
                          </div>
                          <div>
                            <Label htmlFor='zip'>ZIP Code</Label>
                            <Input
                              id='zip'
                              placeholder='10001'
                              value={formData.zip}
                              onChange={(e) => updateField('zip', e.target.value)}
                              className='mt-1'
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor='phone'>Phone</Label>
                          <Input
                            id='phone'
                            type='tel'
                            placeholder='(555) 123-4567'
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className='mt-1'
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className='pt-6'>
                      <h3 className='mb-4 font-medium'>Shipping Method</h3>
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={(value) => updateField('shippingMethod', value)}
                        className='space-y-3'
                      >
                        {shippingMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                              formData.shippingMethod === method.id
                                ? 'border-accent bg-accent/5'
                                : 'border-border hover:border-accent/50'
                            }`}
                            onClick={() => updateField('shippingMethod', method.id)}
                          >
                            <div className='flex items-center gap-3'>
                              <RadioGroupItem value={method.id} id={method.id} />
                              <div>
                                <Label htmlFor={method.id} className='cursor-pointer font-medium'>
                                  {method.name}
                                </Label>
                                <p className='text-muted-foreground text-sm'>
                                  {method.description}
                                </p>
                              </div>
                            </div>
                            <span className='font-medium'>
                              {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
                            </span>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className='flex justify-between pt-6'>
                      <Link href='/cart'>
                        <Button variant='ghost' className='rounded-full'>
                          <IconChevronLeft className='mr-2 h-4 w-4' />
                          Back to Cart
                        </Button>
                      </Link>
                      <Button onClick={handleNext} className='rounded-full'>
                        Continue to Payment
                        <IconChevronRight className='ml-2 h-4 w-4' />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {currentStep === 2 && (
                  <motion.div
                    key='payment'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <div>
                      <h2 className='mb-6 text-2xl font-bold'>Payment Details</h2>

                      <div className='bg-muted/50 border-border mb-6 flex items-center gap-3 rounded-xl border p-4'>
                        <IconLock className='text-muted-foreground h-5 w-5' />
                        <p className='text-muted-foreground text-sm'>
                          Your payment information is encrypted and secure
                        </p>
                      </div>

                      <div className='space-y-4'>
                        <div>
                          <Label htmlFor='cardNumber'>Card Number</Label>
                          <div className='relative mt-1'>
                            <Input
                              id='cardNumber'
                              placeholder='1234 5678 9012 3456'
                              value={formData.cardNumber}
                              onChange={(e) => updateField('cardNumber', e.target.value)}
                              className='pl-10'
                            />
                            <IconCreditCard className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor='cardName'>Name on Card</Label>
                          <Input
                            id='cardName'
                            placeholder='John Doe'
                            value={formData.cardName}
                            onChange={(e) => updateField('cardName', e.target.value)}
                            className='mt-1'
                          />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <Label htmlFor='expiry'>Expiry Date</Label>
                            <Input
                              id='expiry'
                              placeholder='MM/YY'
                              value={formData.expiry}
                              onChange={(e) => updateField('expiry', e.target.value)}
                              className='mt-1'
                            />
                          </div>
                          <div>
                            <Label htmlFor='cvc'>CVC</Label>
                            <Input
                              id='cvc'
                              placeholder='123'
                              value={formData.cvc}
                              onChange={(e) => updateField('cvc', e.target.value)}
                              className='mt-1'
                            />
                          </div>
                        </div>
                        <div className='flex items-center gap-2 pt-2'>
                          <Checkbox
                            id='saveInfo'
                            checked={formData.saveInfo}
                            onCheckedChange={(checked) =>
                              updateField('saveInfo', checked as boolean)
                            }
                          />
                          <Label htmlFor='saveInfo' className='text-sm font-normal'>
                            Save this information for next time
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-between pt-6'>
                      <Button variant='ghost' onClick={handleBack} className='rounded-full'>
                        <IconChevronLeft className='mr-2 h-4 w-4' />
                        Back
                      </Button>
                      <Button onClick={handleNext} className='rounded-full'>
                        Review Order
                        <IconChevronRight className='ml-2 h-4 w-4' />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <motion.div
                    key='review'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <h2 className='mb-6 text-2xl font-bold'>Review Your Order</h2>

                    {/* Shipping Address Summary */}
                    <div className='bg-card border-border/50 rounded-xl border p-4'>
                      <div className='mb-2 flex items-center justify-between'>
                        <h3 className='flex items-center gap-2 font-medium'>
                          <IconTruck className='h-4 w-4' />
                          Shipping Address
                        </h3>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => setCurrentStep(1)}
                          className='text-accent'
                        >
                          Edit
                        </Button>
                      </div>
                      <p className='text-muted-foreground text-sm'>
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        {formData.apartment && `, ${formData.apartment}`}
                        <br />
                        {formData.city}, {formData.state} {formData.zip}
                        <br />
                        {formData.phone}
                      </p>
                      <p className='mt-2 text-sm'>
                        <span className='text-muted-foreground'>Shipping Method:</span>{' '}
                        {selectedShipping?.name}
                      </p>
                    </div>

                    {/* Payment Summary */}
                    <div className='bg-card border-border/50 rounded-xl border p-4'>
                      <div className='mb-2 flex items-center justify-between'>
                        <h3 className='flex items-center gap-2 font-medium'>
                          <IconCreditCard className='h-4 w-4' />
                          Payment Method
                        </h3>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => setCurrentStep(2)}
                          className='text-accent'
                        >
                          Edit
                        </Button>
                      </div>
                      <p className='text-muted-foreground text-sm'>
                        Card ending in {formData.cardNumber.slice(-4) || '****'}
                        <br />
                        {formData.cardName || 'Name on card'}
                      </p>
                    </div>

                    {/* Items Summary */}
                    <div className='bg-card border-border/50 rounded-xl border p-4'>
                      <h3 className='mb-4 flex items-center gap-2 font-medium'>
                        <IconPackage className='h-4 w-4' />
                        Items ({items.length})
                      </h3>
                      <div className='space-y-3'>
                        {items.map((item) => (
                          <div
                            key={`${item.id}-${item.color}-${item.size}`}
                            className='flex items-center gap-3'
                          >
                            <div className='bg-muted relative h-12 w-12 shrink-0 overflow-hidden rounded-lg'>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className='object-cover'
                              />
                              <span className='bg-accent text-accent-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                                {item.quantity}
                              </span>
                            </div>
                            <div className='min-w-0 flex-1'>
                              <p className='truncate text-sm font-medium'>{item.name}</p>
                              {(item.color || item.size) && (
                                <p className='text-muted-foreground text-xs'>
                                  {item.color && `${item.color}`}
                                  {item.color && item.size && ' / '}
                                  {item.size && `${item.size}`}
                                </p>
                              )}
                            </div>
                            <p className='text-sm font-medium'>
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='flex justify-between pt-6'>
                      <Button variant='ghost' onClick={handleBack} className='rounded-full'>
                        <IconChevronLeft className='mr-2 h-4 w-4' />
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        className='min-w-[200px] rounded-full'
                      >
                        {isProcessing ? (
                          <span className='flex items-center gap-2'>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'linear'
                              }}
                              className='h-4 w-4 rounded-full border-2 border-current border-t-transparent'
                            />
                            Processing...
                          </span>
                        ) : (
                          <>
                            <IconLock className='mr-2 h-4 w-4' />
                            Place Order - ${total.toFixed(2)}
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className='lg:col-span-2'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='bg-card border-border/50 sticky top-24 rounded-2xl border p-6'
              >
                <h2 className='mb-4 text-lg font-semibold'>Order Summary</h2>

                {/* Items */}
                <div className='mb-4 max-h-64 space-y-3 overflow-y-auto'>
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className='flex items-center gap-3'
                    >
                      <div className='bg-muted relative h-14 w-14 shrink-0 overflow-hidden rounded-xl'>
                        <Image src={item.image} alt={item.name} fill className='object-cover' />
                        <span className='bg-accent text-accent-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                          {item.quantity}
                        </span>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium'>{item.name}</p>
                        {(item.color || item.size) && (
                          <p className='text-muted-foreground text-xs'>
                            {item.color && `${item.color}`}
                            {item.color && item.size && ' / '}
                            {item.size && `${item.size}`}
                          </p>
                        )}
                      </div>
                      <p className='text-sm font-medium'>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className='my-4' />

                {/* Totals */}
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className='text-green-600'>Free</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className='my-4' />

                <div className='flex items-center justify-between'>
                  <span className='font-semibold'>Total</span>
                  <span className='text-2xl font-bold'>${total.toFixed(2)}</span>
                </div>

                {/* Trust Badges */}
                <div className='border-border mt-6 flex items-center justify-center gap-4 border-t pt-4'>
                  <div className='text-muted-foreground flex items-center gap-1 text-xs'>
                    <IconShieldCheck className='h-4 w-4' />
                    Secure Checkout
                  </div>
                  <div className='text-muted-foreground flex items-center gap-1 text-xs'>
                    <IconLock className='h-4 w-4' />
                    Encrypted
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
