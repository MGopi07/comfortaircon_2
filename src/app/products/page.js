'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
// TODO: replace sampleProducts with API response
import { sampleProducts } from '@/data/sampleProducts';
import ProductGrid from '@/components/ProductGrid';

export default function ProductsPage() {
  const { openAppointment, openSpec } = useModal();

  // Integration placeholders ready for future backend API response
  const [productsData, setProductsData] = useState(sampleProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync with Admin Panel products
  useEffect(() => {
    const loadProducts = () => {
      if (typeof window === 'undefined') return;
      try {
        const stored = localStorage.getItem('comfort_aircon_products');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const published = parsed
              .filter((p) => p.published !== false)
              .map((p) => ({
                id: p.id,
                name: p.name,
                model: p.model,
                image: p.image || p.img || '/images/carrier-split-ac.png',
                specifications: Array.isArray(p.specsList) && p.specsList.length > 0
                  ? p.specsList
                  : Array.isArray(p.specifications) && p.specifications.length > 0
                  ? p.specifications
                  : typeof p.specifications === 'string'
                  ? p.specifications
                      .split(/[\n|]/)
                      .map((line) => {
                        const [l, ...v] = line.split(':');
                        return { label: l?.trim() || 'Spec', value: v.join(':').trim() || l?.trim() };
                      })
                      .filter((s) => s.label && s.value)
                  : [],
                features: Array.isArray(p.featuresList) && p.featuresList.length > 0
                  ? p.featuresList
                  : Array.isArray(p.features) && p.features.length > 0
                  ? p.features
                  : typeof p.features === 'string'
                  ? p.features.split('\n').map((f) => f.trim()).filter(Boolean)
                  : [],
              }));
            setProductsData(published);
            return;
          }
        }
      } catch (err) {
        console.error('Error loading products on products page:', err);
      }
    };
    loadProducts();
    window.addEventListener('storage', loadProducts);
    return () => window.removeEventListener('storage', loadProducts);
  }, []);

  // Client-side search filtering by product name or model
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return productsData;
    const query = searchQuery.toLowerCase().trim();
    return productsData.filter((item) => {
      const matchName = item.name ? item.name.toLowerCase().includes(query) : false;
      const matchModel = item.model ? item.model.toLowerCase().includes(query) : false;
      return matchName || matchModel;
    });
  }, [productsData, searchQuery]);

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
                Find the Right AC for <span className="text-primary-blue">Your Space</span>
              </h1>
              <p className="subpage-lead">
                Get professional assistance in choosing the right air conditioner based on your space, cooling requirements, and budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTS SECTION WITH DATA-DRIVEN FSD CARDS */}
      <section className="products-page-section">
        <div className="container-xxl">
          {/* Search Option */}
          <div className="mb-4 mb-md-5 d-flex justify-content-center">
            <div className="position-relative" style={{ maxWidth: '480px', width: '100%' }}>
              <i
                className="fa-solid fa-magnifying-glass position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                aria-hidden="true"
              ></i>
              <input
                type="text"
                className="form-control rounded-pill ps-5 pe-4 py-2.5 border shadow-xs bg-white"
                placeholder="Search by name or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search air conditioners by name or model"
                style={{ fontSize: '0.95rem' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted text-decoration-none"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          {/* Optional Error Alert State (ready for API integration) */}
          {error && (
            <div className="alert alert-danger rounded-4 my-4" role="alert">
              <i className="fa-solid fa-triangle-exclamation me-2"></i>
              {error}
            </div>
          )}

          {/* Data-Driven Product Grid with Scroll Entrance & Layout Animations */}
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            onEnquire={(product) => openAppointment(`${product.name} (${product.model})`)}
            onViewSpecs={(product) =>
              openSpec({
                name: product.name,
                desc: product.features.join(' • '),
                specs: product.specifications.map((s) => `${s.label}: ${s.value}`).join(' | '),
                img: product.image,
              })
            }
            onResetFilters={() => setSearchQuery('')}
          />
        </div>
      </section>
    </>
  );
}
