"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IconArrowRight, IconStar } from "@tabler/icons-react";

const floatingProducts = [
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    name: "Premium Watch",
    price: "$299",
  },
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    name: "Headphones",
    price: "$249",
  },
  {
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop",
    name: "Leather Bag",
    price: "$189",
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              New Collection 2026
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-balance">
              Discover
              <br />
              <span className="text-muted-foreground">Timeless</span>
              <br />
              Elegance
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Curated collection of premium products designed for those who appreciate the finer things in life.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 text-base font-medium group"
              >
                Shop Collection
                <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 text-base font-medium"
              >
                View Lookbook
              </Button>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center gap-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  4.9/5 (2,847 reviews)
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Product Cards */}
          <div className="relative h-[500px] lg:h-[600px] hidden md:block">
            {floatingProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.15,
                  ease: "easeOut",
                }}
                className={`absolute ${
                  index === 0
                    ? "top-0 right-0 lg:right-12"
                    : index === 1
                    ? "top-1/3 left-0"
                    : "bottom-0 right-1/4"
                }`}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-card rounded-3xl p-4 shadow-xl border border-border/50 backdrop-blur-sm">
                    <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden bg-secondary">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="mt-3 px-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-accent font-semibold">{product.price}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-border/30 rounded-full -z-10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-border/20 rounded-full -z-10"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
        >
          <motion.div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
