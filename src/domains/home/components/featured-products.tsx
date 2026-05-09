"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import Image from "next/image";
import { IconHeart, IconShoppingCart, IconStar } from "@tabler/icons-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturedProducts() {
  return (
    <section id="products" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Curated Selection
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Featured Products
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked collection of premium items, each chosen for its exceptional quality and timeless design.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
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
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button variant="outline" size="lg" className="rounded-full px-8">
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
