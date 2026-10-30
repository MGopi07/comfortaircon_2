'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
// TODO: replace sampleGallery with API response
import { sampleGallery } from '@/data/sampleGallery';
import { GALLERY_CATEGORIES } from '@/types/gallery';
import CategoryFilter from '@/components/CategoryFilter';
import GalleryGrid from '@/components/GalleryGrid';

export default function GalleryPage() {
  const { openAppointment } = useModal();

  // Integration placeholders ready for future backend API response
  const [galleryData, setGalleryData] = useState(sampleGallery);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(12);

  // Compute item counts per category from the current data
  const categoryCounts = useMemo(() => {
    const counts = {};
    GALLERY_CATEGORIES.forEach((cat) => {
      counts[cat] = galleryData.filter((item) => item.category === cat).length;
    });
    return counts;
  }, [galleryData]);

  // Client-side filtering on current items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return galleryData;
    return galleryData.filter((item) => item.category === activeCategory);
  }, [galleryData, activeCategory]);

  // Pagination / Visible slice
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    setVisibleCount(12); // reset pagination when switching categories
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
      {/* 1. SUBPAGE HERO / BANNER */}
      <section className="subpage-hero">
        <div className="container-xxl">
          <ul className="subpage-breadcrumbs mb-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <i className="fa-solid fa-chevron-right fs-xs" aria-hidden="true"></i>
            </li>
            <li className="active">Gallery</li>
          </ul>

          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="subpage-title">
                Explore Our Air Conditioning <span className="text-primary-blue">Projects</span>
              </h1>
              <p className="subpage-lead">
                Discover Comfort Aircon’s installation and service projects across residential and commercial spaces, showcasing our commitment to quality workmanship and reliable cooling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GALLERY SECTION WITH FILTERS & DATA-DRIVEN GRID */}
      <section className="gallery-page-section">
        <div className="container-xxl">
          {/* Category Filter Pills (Data-driven tabs with item count and layoutId pill) */}
          <CategoryFilter
            categories={GALLERY_CATEGORIES}
            activeCategory={activeCategory}
            categoryCounts={categoryCounts}
            totalCount={galleryData.length}
            onSelectCategory={handleSelectCategory}
          />

          {/* Optional Error Alert State (ready for API integration) */}
          {error && (
            <div className="alert alert-danger rounded-4 my-4" role="alert">
              <i className="fa-solid fa-triangle-exclamation me-2" aria-hidden="true"></i>
              {error}
            </div>
          )}

          {/* Responsive Animated Image Grid */}
          <GalleryGrid
            items={visibleItems}
            isLoading={isLoading}
            onResetFilter={() => handleSelectCategory('ALL')}
            hasMore={filteredItems.length > visibleCount}
            onLoadMore={handleLoadMore}
          />
        </div>
      </section>
    </>
  );
}
