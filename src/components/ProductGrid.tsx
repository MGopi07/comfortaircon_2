'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  onEnquire?: (product: Product) => void;
  onViewSpecs?: (product: Product) => void;
  onResetFilters?: () => void;
}

/**
 * Pure UI ProductGrid component.
 * Features:
 * - 3-column desktop, 2-column tablet, 1-column mobile responsive layout.
 * - Scroll-triggered fade-up entrance animation staggered by row.
 * - Fluid layout transitions via AnimatePresence when filters change.
 * - Shimmer skeleton state for backend loading.
 * - Dedicated empty state with quick filter reset.
 * - Full prefers-reduced-motion accessibility support.
 */
export default function ProductGrid({
  products,
  isLoading = false,
  skeletonCount = 6,
  onEnquire,
  onViewSpecs,
  onResetFilters,
}: ProductGridProps) {
  const shouldReduceMotion = useReducedMotion();

  // 1. Shimmer Loading State
  if (isLoading) {
    return (
      <div className="row g-4" aria-label="Loading products">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div className="col-lg-4 col-md-6 col-12 d-flex flex-column" key={`skeleton-${index}`}>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  // 2. Empty Filter State
  if (!products || products.length === 0) {
    return (
      <motion.div
        className="text-center py-5 bg-white rounded-4 border p-5 my-4 shadow-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        role="status"
        aria-live="polite"
      >
        <div className="mb-3">
          <i
            className="fa-solid fa-filter-circle-xmark text-muted"
            style={{ fontSize: '3rem' }}
            aria-hidden="true"
          ></i>
        </div>
        <h4 className="fw-bold text-dark-navy mb-2">No equipment found</h4>
        <p className="text-muted mb-4" style={{ maxWidth: '480px', margin: '0 auto' }}>
          We couldn&apos;t find any equipment matching your search query. Try clearing your search term to view our full equipment lineup.
        </p>
        {onResetFilters && (
          <button
            type="button"
            className="btn btn-custom-primary px-4 py-2.5 rounded-pill fw-bold shadow-xs"
            onClick={onResetFilters}
          >
            <i className="fa-solid fa-rotate-left me-2" aria-hidden="true"></i>
            View All Products
          </button>
        )}
      </motion.div>
    );
  }

  // 3. Product Cards Grid with Framer Motion Animation
  return (
    <div className="row g-4">
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => {
          // Stagger within each 3-column row
          const delay = shouldReduceMotion ? 0 : (index % 3) * 0.1;

          return (
            <motion.div
              layout={!shouldReduceMotion}
              key={product.id}
              className="col-lg-4 col-md-6 col-12 d-flex flex-column"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 40 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay,
                layout: { duration: 0.35, ease: 'easeInOut' },
              }}
            >
              <ProductCard
                product={product}
                onEnquire={onEnquire}
                onViewSpecs={onViewSpecs}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
