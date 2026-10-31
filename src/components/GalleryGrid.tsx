'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GalleryItem } from '@/types/gallery';
import GalleryItemCard from './GalleryItemCard';
import GallerySkeleton from './GallerySkeleton';

export interface GalleryGridProps {
  items: GalleryItem[];
  isLoading?: boolean;
  skeletonCount?: number;
  isFiltered?: boolean;
  onResetFilter?: () => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

/**
 * Pure UI GalleryGrid component.
 * Features:
 * - Responsive 3-column desktop, 2-column tablet, 1-column mobile grid.
 * - Scroll entrance fade-up staggered by row index.
 * - Fluid layout transitions via AnimatePresence when filters change.
 * - Shimmer skeleton state for loading.
 * - Empty state with filter reset action.
 * - Optional "Load More" pagination trigger for large collections.
 * - Full prefers-reduced-motion accessibility support.
 */
export default function GalleryGrid({
  items,
  isLoading = false,
  skeletonCount = 6,
  isFiltered = false,
  onResetFilter,
  hasMore = false,
  onLoadMore,
}: GalleryGridProps) {
  const shouldReduceMotion = useReducedMotion();

  // 1. Loading State
  if (isLoading) {
    return <GallerySkeleton count={skeletonCount} />;
  }

  // 2. Empty State
  if (!items || items.length === 0) {
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
            className="fa-solid fa-images text-muted"
            style={{ fontSize: '3rem' }}
            aria-hidden="true"
          />
        </div>
        <h4 className="fw-bold text-dark-navy mb-2">
          {isFiltered ? 'No photos in this category yet' : 'No gallery photos available yet'}
        </h4>
        <p className="text-muted mb-4" style={{ maxWidth: '460px', margin: '0 auto' }}>
          {isFiltered
            ? 'We haven\u2019t added any projects under this specific category yet. Try selecting \u201cAll Photos\u201d to browse our full project portfolio.'
            : 'Our project installation and service photos are currently being updated. Please check back shortly.'}
        </p>
        {isFiltered && onResetFilter && (
          <button
            type="button"
            className="btn btn-custom-primary px-4 py-2.5 rounded-pill fw-bold shadow-xs"
            onClick={onResetFilter}
          >
            <i className="fa-solid fa-rotate-left me-2" aria-hidden="true" />
            Show All Photos
          </button>
        )}
      </motion.div>
    );
  }

  // 3. Grid of Cards with Scroll & Layout Animations
  return (
    <>
      <div className="row g-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const delay = shouldReduceMotion ? 0 : (index % 3) * 0.1;

            return (
              <motion.div
                layout={!shouldReduceMotion}
                key={item.id}
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
                <GalleryItemCard item={item} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Optional "Load More" Button Stub */}
      {hasMore && onLoadMore && (
        <div className="text-center mt-5">
          <button
            type="button"
            className="btn btn-outline-primary rounded-pill px-4 py-2.5 fw-bold shadow-xs"
            onClick={onLoadMore}
          >
            <i className="fa-solid fa-circle-plus me-2" aria-hidden="true" />
            Load More Photos
          </button>
        </div>
      )}
    </>
  );
}
