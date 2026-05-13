import { CategoriesSection } from './components/categories-section';
import { FeaturedProducts } from './components/featured-products copy';
import { FeaturesSection } from './components/features-section';
import { HeroSection } from './components/hero-section';
import { NewsletterSection } from './components/newsletter-section';
import { PromoSection } from './components/promo-section';
import { TestimonialsSection } from './components/testimonials-section';

export function HomeDomains() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PromoSection />
      <NewsletterSection />
    </>
  );
}
