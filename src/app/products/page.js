'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { PRODUCTS_CATALOG, INITIAL_CONTACT } from '@/data/mockData';

export default function ProductsPage() {
  const { openAppointment, openSpec } = useModal();

  const [selectedBrand, setSelectedBrand] = useState('ALL'); // 'ALL' | 'Carrier' | 'Toshiba'
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // 'ALL' | 'Split AC' | 'Cassette AC' | 'Ductable AC' | 'VRF Systems'

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      const matchBrand = selectedBrand === 'ALL' || item.brand === selectedBrand;
      const matchCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      return matchBrand && matchCategory;
    });
  }, [selectedBrand, selectedCategory]);

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
              <i className="fa-solid fa-chevron-right fs-xs"></i>
            </li>
            <li className="active">Products</li>
          </ul>

          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="subpage-title">
                Carrier &amp; Toshiba <span className="text-primary-blue">Cooling Systems</span>
              </h1>
              <p className="subpage-lead">
                Explore our authorized cooling portfolio. As Puducherry’s premier dealer, we offer Carrier air conditioning systems alongside Toshiba Japanese inverter solutions. Information and technical enquiry only — no online cart or payment.
              </p>

              <div className="d-flex flex-wrap align-items-center gap-3 pt-2">
                <button
                  type="button"
                  className="btn btn-custom-primary shadow-sm px-4 py-2 fw-bold"
                  onClick={() => openAppointment()}
                >
                  <i className="fa-solid fa-clipboard-question me-2"></i> Enquire for Quote
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

      {/* 2. PRODUCTS SECTION WITH FILTERS & FSD CARDS */}
      <section className="products-page-section">
        <div className="container-xxl">
          {/* Brand Role Explainer Strip */}
          <div className="p-3 bg-white rounded-4 border shadow-xs mb-4">
            <div className="row align-items-center gy-2">
              <div className="col-md-7">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <span className="brand-pill-carrier">
                    <i className="fa-solid fa-certificate"></i> Carrier Air Conditioners
                  </span>
                  <span className="brand-pill-toshiba">
                    <i className="fa-solid fa-snowflake"></i> Toshiba Air Conditioners
                  </span>
                  <span className="text-muted small">
                    • 100% genuine factory warranty, itemized BOQ quotes, and certified installation.
                  </span>
                </div>
              </div>
              <div className="col-md-5 text-md-end">
                <span className="badge bg-light text-dark border px-3 py-2 small">
                  <i className="fa-solid fa-circle-info text-primary-blue me-1"></i> Information &amp; Enquiry Only (No Online Cart)
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <div className="filter-pills-bar">
            <div className="row align-items-center gy-3">
              {/* Brand Selector */}
              <div className="col-lg-6">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <span className="text-muted small fw-bold text-uppercase letter-spacing-1 me-1">
                    Brand:
                  </span>
                  <button
                    type="button"
                    className={`filter-pill-btn ${selectedBrand === 'ALL' ? 'active' : ''}`}
                    onClick={() => setSelectedBrand('ALL')}
                  >
                    All Brands ({PRODUCTS_CATALOG.length})
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${selectedBrand === 'Carrier' ? 'active' : ''}`}
                    onClick={() => setSelectedBrand('Carrier')}
                  >
                    <i className="fa-solid fa-certificate text-primary me-1"></i> Carrier
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${selectedBrand === 'Toshiba' ? 'active-toshiba' : ''}`}
                    onClick={() => setSelectedBrand('Toshiba')}
                  >
                    <i className="fa-solid fa-snowflake text-danger me-1"></i> Toshiba
                  </button>
                </div>
              </div>

              {/* Category Selector */}
              <div className="col-lg-6">
                <div className="d-flex align-items-center justify-content-lg-end gap-2 flex-wrap">
                  <span className="text-muted small fw-bold text-uppercase letter-spacing-1 me-1">
                    Type:
                  </span>
                  {['ALL', 'Split AC', 'Cassette AC', 'Ductable AC', 'VRF Systems'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat === 'ALL' ? 'All Types' : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Cards Grid (Matches Exact FSD Section 7.4 Fields) */}
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-lg-4 col-md-6" key={product.id}>
                <div className="product-fsd-card">
                  {/* Card Image Top */}
                  <div className="product-card-top">
                    <img
                      src={product.image}
                      alt={`${product.name} - ${product.model}`}
                      loading="lazy"
                    />

                    {/* Brand Badge */}
                    <div className="product-badge-corner">
                      {product.brand === 'Carrier' ? (
                        <span className="brand-pill-carrier">
                          <i className="fa-solid fa-certificate"></i> Carrier
                        </span>
                      ) : (
                        <span className="brand-pill-toshiba">
                          <i className="fa-solid fa-snowflake"></i> Toshiba
                        </span>
                      )}
                    </div>

                    {/* Category Tag */}
                    <span className="product-category-tag">{product.category}</span>
                  </div>

                  {/* Card Content (Exact FSD Fields: Name, Model, Specifications, Features, Enquire button) */}
                  <div className="product-card-content">
                    {/* Field 3: Model */}
                    <div className="product-model-text">{product.model}</div>

                    {/* Field 2: Name */}
                    <h3 className="product-title-fsd">{product.name}</h3>

                    {/* Field 4: Specifications */}
                    <div className="product-specs-box">
                      <div className="text-muted small fw-bold text-uppercase letter-spacing-1 mb-2">
                        Technical Specifications:
                      </div>
                      {product.specsList.slice(0, 4).map((spec, sIdx) => (
                        <div className="product-spec-row" key={sIdx}>
                          <span className="product-spec-name">{spec.label}</span>
                          <span className="product-spec-val">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Field 5: Features */}
                    <div className="mb-2">
                      <div className="text-muted small fw-bold text-uppercase letter-spacing-1 mb-2">
                        Key Features:
                      </div>
                      <ul className="product-features-checklist">
                        {product.featuresList.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx}>
                            <i className="fa-solid fa-circle-check"></i>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Field 6: Enquire Button (Opens Enquiry Modal with Product auto-filled) */}
                    <div className="product-card-actions">
                      <button
                        type="button"
                        className="btn btn-custom-primary flex-grow-1 shadow-xs fw-bold"
                        onClick={() => openAppointment(product.name)}
                      >
                        <i className="fa-solid fa-clipboard-question me-1"></i> Enquire Now
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary rounded-pill px-3 fw-semibold small"
                        onClick={() =>
                          openSpec({
                            name: product.name,
                            brand: product.brand,
                            desc: product.features,
                            specs: product.specifications,
                            img: product.image,
                          })
                        }
                        title="View Full Technical Datasheet"
                      >
                        <i className="fa-solid fa-file-lines me-1"></i> Specs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-5 bg-white rounded-4 border p-5 my-4">
              <i className="fa-solid fa-filter-circle-xmark text-muted fs-1 mb-3"></i>
              <h4 className="fw-bold text-dark-navy">No products match your filter</h4>
              <p className="text-muted">
                Try selecting &quot;All Brands&quot; or &quot;All Types&quot; to view our full cooling equipment range.
              </p>
              <button
                type="button"
                className="btn btn-custom-primary px-4 py-2 mt-2"
                onClick={() => {
                  setSelectedBrand('ALL');
                  setSelectedCategory('ALL');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Consultation / Sizing Banner */}
          <div className="brand-partner-showcase mt-5">
            <div className="row align-items-center gy-4">
              <div className="col-lg-8">
                <span className="section-tag mb-2">
                  <i className="fa-solid fa-calculator me-1"></i> NOT SURE WHICH AC IS RIGHT FOR YOUR SPACE?
                </span>
                <h3 className="section-title text-start fs-3 mb-2">
                  Free Heat Load Calculation &amp; Site Assessment
                </h3>
                <p className="text-muted mb-0">
                  Room dimensions, ceiling height, glass sun-exposure, and occupant count dictate the exact tonnage required. Sizing your AC accurately prevents high electric bills and early compressor wear. Schedule an on-site visit with our certified engineers across Pondicherry, Villupuram, and Cuddalore.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <button
                  type="button"
                  className="btn btn-custom-primary px-4 py-3 fw-bold w-100 w-lg-auto"
                  onClick={() => openAppointment()}
                >
                  <i className="fa-solid fa-ruler-combined me-2"></i> Book Free Site Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
