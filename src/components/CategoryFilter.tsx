'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { GalleryCategory, GALLERY_CATEGORIES } from '@/types/gallery';

export interface CategoryFilterProps {
  categories?: readonly GalleryCategory[];
  activeCategory: string;
  categoryCounts: Record<string, number>;
  totalCount: number;
  onSelectCategory: (category: string) => void;
}

/**
 * Pure UI CategoryFilter component with animated active pill indicator.
 * Displays category tabs with real-time item counts.
 */
export default function CategoryFilter({
  categories = GALLERY_CATEGORIES,
  activeCategory,
  categoryCounts,
  totalCount,
  onSelectCategory,
}: CategoryFilterProps) {
  const shouldReduceMotion = useReducedMotion();

  const allTabs = [
    { key: 'ALL', label: 'All Photos', count: totalCount },
    ...categories.map((cat) => ({
      key: cat,
      label: cat,
      count: categoryCounts[cat] || 0,
    })),
  ];

  return (
    <nav className="filter-pills-bar text-center mb-5" aria-label="Gallery category filters">
      <div className="d-inline-flex flex-wrap justify-content-center gap-2">
        {allTabs.map((tab) => {
          const isActive = activeCategory === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              className={`filter-pill-btn position-relative ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(tab.key)}
              aria-pressed={isActive}
            >
              {/* Animated Active Pill Indicator */}
              {isActive && (
                <motion.span
                  layoutId={shouldReduceMotion ? undefined : 'activeCategoryTab'}
                  className="active-pill-background"
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 35,
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Tab Label & Count */}
              <span className="position-relative" style={{ zIndex: 2 }}>
                {tab.label} <span className="opacity-75">({tab.count})</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
