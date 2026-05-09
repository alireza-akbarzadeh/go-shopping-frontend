"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowLeft, IconHome, IconPackageExport } from "@tabler/icons-react";

export default function ProductNotFound() {
  return (
      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6">
            <IconPackageExport className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn&apos;t find the product you&apos;re looking for. It
            may have been removed or the link might be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/shop">
                <IconArrowLeft className="h-4 w-4" />
                Back to Shop
              </Link>
            </Button>
            <Button asChild className="gap-2">
              <Link href="/">
                <IconHome className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
  );
}
