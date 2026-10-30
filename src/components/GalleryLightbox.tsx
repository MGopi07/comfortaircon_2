'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GalleryItem } from '@/types/gallery';

export interface GalleryLightboxProps {
  isOpen: boolean;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onEnquire?: (item: GalleryItem) => void;
}

/**
 * Fullscreen Accessible Gallery Lightbox.
 * Features:
 * - Backdrop fade-in with dark blur overlay.
 * - Keyboard navigation (Escape to close, ArrowLeft / ArrowRight to slide).
 * - Locks body scroll while modal is active.
 * - Image scale (0.95 -> 1) and subtle slide transitions.
 * - Current item counter, category tag, and caption.
 * - "Enquire for Similar" button integrating with site enquiry workflow.
 */
export default function GalleryLightbox({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNavigate,
  onEnquire,
}: GalleryLightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const currentItem = items && items[currentIndex] ? items[currentIndex] : null;

  // 1. Lock Body Scroll while Lightbox is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // 2. Keyboard Navigation (Escape, Left Arrow, Right Arrow)
  useEffect(() => {
    if (!isOpen || !items || items.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setSlideDirection(-1);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        onNavigate(prevIndex);
      } else if (e.key === 'ArrowRight') {
        setSlideDirection(1);
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        onNavigate(nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items, onClose, onNavigate]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!items || items.length === 0) return;
    setSlideDirection(-1);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    onNavigate(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!items || items.length === 0) return;
    setSlideDirection(1);
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    onNavigate(nextIndex);
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="gallery-lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
      >
        <motion.div
          className="gallery-lightbox-dialog position-relative"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.95, y: 15 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.95, y: 15 }
          }
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="d-flex justify-content-between align-items-center p-3 bg-dark-navy text-white border-bottom border-secondary">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-primary-blue text-white px-2.5 py-1.5 small fw-bold">
                {currentItem.category}
              </span>
              <span className="text-white-50 small ms-2">
                Photo {currentIndex + 1} of {items.length}
              </span>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close preview"
            />
          </div>

          {/* Main Photo Area with Navigation Arrows */}
          <div className="position-relative d-flex align-items-center justify-content-center bg-black overflow-hidden" style={{ minHeight: '380px', maxHeight: '65vh' }}>
            {/* Previous Button */}
            {items.length > 1 && (
              <button
                type="button"
                className="gallery-lightbox-arrow gallery-lightbox-arrow-left"
                onClick={handlePrev}
                aria-label="Previous photo"
                title="Previous photo (Left Arrow)"
              >
                <i className="fa-solid fa-chevron-left" aria-hidden="true" />
              </button>
            )}

            {/* Animated Photo */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={currentItem.id}
                src={currentItem.image}
                alt={currentItem.alt || currentItem.title || 'Comfort Aircon Project'}
                className="gallery-lightbox-img"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.96, x: slideDirection * 24 }
                }
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.96, x: -slideDirection * 24 }
                }
                transition={{ duration: 0.24, ease: 'easeOut' }}
              />
            </AnimatePresence>

            {/* Next Button */}
            {items.length > 1 && (
              <button
                type="button"
                className="gallery-lightbox-arrow gallery-lightbox-arrow-right"
                onClick={handleNext}
                aria-label="Next photo"
                title="Next photo (Right Arrow)"
              >
                <i className="fa-solid fa-chevron-right" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Footer Info & Enquiry CTA */}
          <div className="gallery-lightbox-info flex-wrap gap-3">
            <div className="me-auto" style={{ maxWidth: '600px' }}>
              <h5 className="fw-bold mb-1 fs-6 text-white">{currentItem.title || currentItem.alt}</h5>
              {currentItem.alt && currentItem.alt !== currentItem.title && (
                <p className="text-white-50 small mb-0">{currentItem.alt}</p>
              )}
            </div>

            {onEnquire && (
              <button
                type="button"
                className="btn btn-sm btn-custom-primary text-nowrap fw-bold px-3 py-2 rounded-pill shadow-xs"
                onClick={() => {
                  onClose();
                  onEnquire(currentItem);
                }}
              >
                <i className="fa-solid fa-clipboard-question me-1" aria-hidden="true" />
                <span>Enquire for Similar</span>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
