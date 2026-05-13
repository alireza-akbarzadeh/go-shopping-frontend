// app/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-clinet';
import { HomeDomains } from '@/domains/home/home.domain';
import type { GetProductsParams } from '@/services/models';
import type { Metadata } from 'next';
import { useGetProductsQueryOptions } from '@/services/endpoints/products';

export const metadata: Metadata = {
  title: 'LUXE | Premium Fashion & Lifestyle Ecommerce',
  description:
    'Discover luxury fashion, accessories, and lifestyle products at LUXE. Shop premium brands with fast shipping, easy returns, and exceptional customer service.',
  keywords:
    'luxury fashion, premium ecommerce, designer clothing, luxury accessories, lifestyle products, online shopping, LUXE',
  openGraph: {
    title: 'LUXE | Premium Fashion & Lifestyle',
    description:
      'Discover curated luxury fashion and lifestyle products. Shop premium brands with confidence.',
    url: 'https://luxe-fashion.vercel.app',
    siteName: 'LUXE',
    images: [
      {
        url: 'https://luxe-fashion.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LUXE - Premium Fashion & Lifestyle Ecommerce'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXE | Premium Fashion & Lifestyle',
    description:
      'Discover curated luxury fashion and lifestyle products. Shop premium brands with confidence.',
    images: ['https://luxe-fashion.vercel.app/og-image.png'],
    creator: '@luxefashion'
  },
  authors: [
    {
      name: 'LUXE Team',
      url: 'https://luxe-fashion.vercel.app/about'
    }
  ],
  creator: 'LUXE',
  publisher: 'LUXE Fashion',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://luxe-fashion.vercel.app'
  },
  metadataBase: new URL('https://luxe-fashion.vercel.app'),
  category: 'Ecommerce'
};

export default async function HomePage() {
  const queryClient = getQueryClient();

  const params: GetProductsParams = {
    status: 'active',
    limit: 8,
    offset: 1
  };

  const queryOptions = useGetProductsQueryOptions(params);
  await queryClient.prefetchQuery(queryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeDomains />
    </HydrationBoundary>
  );
}
