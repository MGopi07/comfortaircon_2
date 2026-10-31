'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { GALLERY_CATEGORIES } from '@/types/gallery';
import CategoryFilter from '@/components/CategoryFilter';
import GalleryGrid from '@/components/GalleryGrid';
import { getGallery } from '@/services/api';

export default function GalleryPage() {
  const { openAppointment } = useModal();

  const [galleryData, setGalleryData] = useState([]);
  const [categoriesList, setCategoriesList] = useState(GALLERY_CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(12);

  // Normalize API category string to matching GALLERY_CATEGORIES label
  const normalizeCategory = (cat) => {
    if (!cat) return 'Service Work';
    const match = GALLERY_CATEGORIES.find(
      (c) => c.toLowerCase() === String(cat).trim().toLowerCase()
    );
    return match || cat;
  };

  // Fetch gallery items strictly from backend REST API
  useEffect(() => {
    let isMounted = true;

    async function loadGallery() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getGallery();
        if (isMounted) {
          if (response?.categories && Array.isArray(response.categories) && response.categories.length > 0) {
            const cleanCategories = response.categories.map((c) => {
              const match = GALLERY_CATEGORIES.find(
                (gc) => gc.toLowerCase() === String(c).trim().toLowerCase()
              );
              return match || c.trim();
            });
            setCategoriesList(cleanCategories);
          }

          if (response?.data && Array.isArray(response.data)) {
            const mapped = response.data.map((item, idx) => ({
              id: String(item.id || `gal-${idx}`),
              image: item.image_url || item.image || '/images/carrier-vrf.png',
              alt: item.caption || item.alt || 'Comfort Aircon Installation Project',
              title: item.caption || item.title || '',
              category: normalizeCategory(item.category),
            }));
            setGalleryData(mapped);
          } else {
            setGalleryData([]);
          }
        }
      } catch (err) {
        console.warn('Backend API error loading gallery:', err);
        if (isMounted) {
          setError(err?.message || 'Failed to load gallery from server.');
          setGalleryData([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute item counts per category from the current data
  const categoryCounts = useMemo(() => {
    const counts = {};
    categoriesList.forEach((cat) => {
      counts[cat] = galleryData.filter((item) => item.category === cat).length;
    });
    return counts;
  }, [galleryData, categoriesList]);

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
            categories={categoriesList}
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
            isFiltered={activeCategory !== 'ALL'}
            onResetFilter={() => handleSelectCategory('ALL')}
            hasMore={filteredItems.length > visibleCount}
            onLoadMore={handleLoadMore}
          />
        </div>
      </section>
    </>
  );
}
