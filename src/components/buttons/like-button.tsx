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

    startTransition(() => {
      setOptimisticLiked(newLikeState);
    });

    const queryKey = getGetProductsIdQueryKey(String(productId));
    const previousData = queryClient.getQueryData(queryKey) as GetProductsId200 | undefined;

    if (previousData?.data) {
      const optimisticData = {
        ...previousData,
        data: {
          ...previousData.data,
          is_liked: newLikeState
        }
      };
      queryClient.setQueryData(queryKey, optimisticData);
    }

    try {
      const response = await mutateAsync({
        id: productId,
        data: { like: newLikeState }
      });

      if (!response.success) {
        toast.error(response.message);
      }

      toast.success(`Saved ${productName} to your likes ✨`);

      await queryClient.invalidateQueries({ queryKey });
    } catch (error) {
      if (previousData) {
        queryClient.setQueryData(queryKey, previousData);
      }
      startTransition(() => {
        setOptimisticLiked(isLiked);
      });
      toast.error(error instanceof Error ? error.message : 'Failed to update like');
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
