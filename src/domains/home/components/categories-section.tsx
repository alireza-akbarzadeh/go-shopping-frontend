"use client";

import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";

export function CategoriesSection() {
  return (
    <section id="categories" className="py-24 lg:py-32 bg-secondary/50">
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
            Browse By Style
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Shop Categories
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-sm text-primary-foreground/70">
                    {category.productCount} Products
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-primary-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    {category.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ x: 5 }}
                    className="mt-4 flex items-center gap-2 text-primary-foreground font-medium text-sm group-hover:gap-3 transition-all"
                  >
                    Explore
                    <IconArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
