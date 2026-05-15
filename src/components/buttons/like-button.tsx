'use client';
import { IconHeart } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useOptimistic, useTransition } from 'react';
import { toast } from 'sonner';
import { getGetProductsIdQueryKey } from '~/src/services/-products-{id}-get';
import type { GetProductsId200 } from '~/src/services/-products-{id}-get.schemas';
import { usePostProductsIdLike } from '~/src/services/-products-{id}-like-post';
import { Button } from '../ui/button';

interface LikeButtonProps {
  isLiked: boolean;
  productId: number;
  productName: string;
}

export function LikeButton({ isLiked, productId, productName }: LikeButtonProps) {
  const queryClient = useQueryClient();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(isLiked);
  const [isPending, startTransition] = useTransition();
  const { mutateAsync } = usePostProductsIdLike();

  const handleLikeAction = async () => {
    const newLikeState = !optimisticLiked;

    startTransition(() => setOptimisticLiked(newLikeState));

    const queryKey = getGetProductsIdQueryKey(String(productId));
    const previousData = queryClient.getQueryData(queryKey) as GetProductsId200 | undefined;

    // Optimistic update
    if (previousData?.data) {
      queryClient.setQueryData(queryKey, {
        ...previousData,
        data: { ...previousData.data, is_liked: newLikeState }
      });
    }

    try {
      const response = await mutateAsync({
        id: productId,
        data: { like: newLikeState }
      });

      if (!response.success) {
        // Revert optimistic update
        if (previousData) queryClient.setQueryData(queryKey, previousData);
        startTransition(() => setOptimisticLiked(isLiked));
        return;
      }

      // Success: show different message based on action
      if (newLikeState) {
        toast.success(`${productName} added to your likes ✨`);
      } else {
        toast.success(`${productName} removed from your likes`);
      }

      // Invalidate to refetch fresh data from server
      await queryClient.invalidateQueries({ queryKey });
    } catch (error) {
      // Revert on network/other errors
      if (previousData) queryClient.setQueryData(queryKey, previousData);
      startTransition(() => setOptimisticLiked(isLiked));
    }
  };

  return (
    <Button
      size='lg'
      variant='outline'
      onClick={handleLikeAction}
      disabled={isPending}
      aria-label='Wishlist'
      className='transition-all duration-200 hover:scale-105 active:scale-95'
    >
      <IconHeart
        className={`h-4 w-4 transition-all duration-200 ${
          optimisticLiked ? 'fill-accent text-accent' : ''
        } ${isPending ? 'animate-pulse' : ''}`}
      />
    </Button>
  );
}
