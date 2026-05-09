"use client";

import { motion} from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IconHeart, IconShoppingCart, IconStar } from "@tabler/icons-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isNew?: boolean;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const itemVariants  = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    }
  }
};;

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative bg-card rounded-2xl overflow-hidden border border-border/50 transition-all duration-500 hover:shadow-xl hover:border-border">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Badges */}
            {product.isNew && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                New
              </span>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <IconHeart className="h-4 w-4" />
            </motion.button>

            {/* Quick Add Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Button
                size="sm"
                className="w-full rounded-full gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <IconShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.category}
            </span>
            <h3 className="mt-1 font-medium text-sm line-clamp-1">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-1">
              <IconStar className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="mt-2 flex items-center gap-2">
              <span className="font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
