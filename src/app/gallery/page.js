'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { GALLERY_ITEMS, INITIAL_CONTACT } from '@/data/mockData';

export default function GalleryPage() {
  const { openAppointment } = useModal();

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = [
    'ALL',
    'Installation photos',
    'Completed projects',
    'Service work',
    'Product images',
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      {/* Preload hero WebP image */}
      <link
        rel="preload"
        as="image"
        href="/images/about-us-hero-original.webp"
        type="image/webp"
      />

      {/* 1. SUBPAGE HERO / BANNER */}
      <section className="subpage-hero">
        <div className="container-xxl">
          <ul className="subpage-breadcrumbs mb-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <i className="fa-solid fa-chevron-right fs-xs"></i>
            </li>
            <li className="active">Gallery</li>
          </ul>

          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="subpage-title">
                Project &amp; Installation <span className="text-primary-blue">Gallery</span>
              </h1>
              <p className="subpage-lead">
                Explore our portfolio of completed Carrier &amp; Toshiba air conditioning projects across Pondicherry, Villupuram, and Cuddalore. Featuring residential villas, corporate offices, healthcare facilities, and specialized HVAC servicing.
              </p>

              <div className="d-flex flex-wrap align-items-center gap-3 pt-2">
                <button
                  type="button"
                  className="btn btn-custom-primary shadow-sm px-4 py-2 fw-bold"
                  onClick={() => openAppointment()}
                >
                  <i className="fa-solid fa-calendar-check me-2"></i> Book Free Consultation
                </button>

                <a
                  href={INITIAL_CONTACT.phoneHref}
                  className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-phone"></i> Call {INITIAL_CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GALLERY SECTION WITH FSD APPROVED CATEGORIES */}
      <section className="gallery-page-section">
        <div className="container-xxl">
          {/* Category Filter Pills (Section 7.5 Exact Categories) */}
          <div className="filter-pills-bar text-center mb-5">
            <div className="d-inline-flex flex-wrap justify-content-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'ALL' ? `All Works (${GALLERY_ITEMS.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div
                className="gallery-card"
                key={item.id}
                onClick={() => setLightboxItem(item)}
                title="Click to view full photo"
              >
                <div className="gallery-image-box">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="gallery-category-badge">{item.category}</span>
                  <div className="gallery-zoom-icon">
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                  </div>
                </div>

                <div className="gallery-meta">
                  <h4 className="gallery-title">{item.title}</h4>
                  <p className="gallery-caption">{item.caption}</p>
                  <div className="gallery-location-tag">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation / Portfolio CTA */}
          <div className="brand-partner-showcase mt-5">
            <div className="row align-items-center gy-4">
              <div className="col-lg-8">
                <span className="section-tag mb-2">
                  <i className="fa-solid fa-wand-magic-sparkles me-1"></i> TAILORED ARCHITECTURAL INTEGRATION
                </span>
                <h3 className="section-title text-start fs-3 mb-2">
                  Planning a residential or commercial HVAC installation?
                </h3>
                <p className="text-muted mb-0">
                  Whether you require concealed ceiling ducting, sleek 4-way cassettes, or large-capacity Carrier X-Power and Toshiba SMMS-u VRF systems, our certified engineers handle everything from architectural drawings to final air balancing.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <button
                  type="button"
                  className="btn btn-custom-primary px-4 py-3 fw-bold w-100 w-lg-auto"
                  onClick={() => openAppointment()}
                >
                  <i className="fa-solid fa-clipboard-check me-2"></i> Request Project Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIGHTBOX MODAL */}
      {lightboxItem && (
        <div
          className="gallery-lightbox-backdrop"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="gallery-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center p-3 bg-dark-navy text-white border-bottom border-secondary">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-primary-blue text-white px-2 py-1 small fw-bold">
                  {lightboxItem.category}
                </span>
                <span className="text-light small">
                  <i className="fa-solid fa-location-dot text-primary-blue me-1"></i>
                  {lightboxItem.location}
                </span>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setLightboxItem(null)}
                aria-label="Close"
              ></button>
            </div>

            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="gallery-lightbox-img"
            />

            <div className="gallery-lightbox-info">
              <div>
                <h5 className="fw-bold mb-1 fs-6">{lightboxItem.title}</h5>
                <p className="text-muted small mb-0">{lightboxItem.caption}</p>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-custom-primary text-nowrap fw-bold"
                onClick={() => {
                  setLightboxItem(null);
                  openAppointment(lightboxItem.title);
                }}
              >
                <i className="fa-solid fa-clipboard-question me-1"></i> Enquire for Similar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
