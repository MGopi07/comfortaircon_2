'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
// TODO: replace sampleProducts with API response
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/services/api';

export default function ProductsPage() {
  const { openAppointment, openSpec } = useModal();

  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products strictly from backend REST API
  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getProducts();
        if (isMounted) {
          if (response?.data && Array.isArray(response.data)) {
            const mapped = response.data.map((item, idx) => {
              // Parse specifications whether provided as array, JSON string, or text
              let specs = [];
              if (Array.isArray(item.specifications) && item.specifications.length > 0) {
                specs = item.specifications;
              } else if (typeof item.specifications === 'string' && item.specifications.trim()) {
                try {
                  const parsed = JSON.parse(item.specifications);
                  if (typeof parsed === 'object' && parsed !== null) {
                    specs = Object.entries(parsed).map(([key, val]) => ({
                      label: key,
                      value: String(val),
                    }));
                  }
                } catch {
                  specs = item.specifications
                    .split(/[\n|]/)
                    .map((line) => {
                      const [l, ...v] = line.split(':');
                      return {
                        label: l?.trim() || 'Specification',
                        value: v.join(':').trim() || l?.trim(),
                      };
                    })
                    .filter((s) => s.label && s.value);
                }
              }

              // Parse features whether provided as array, JSON string, or text
              let feats = [];
              if (Array.isArray(item.features) && item.features.length > 0) {
                feats = item.features;
              } else if (typeof item.features === 'string' && item.features.trim()) {
                try {
                  const parsed = JSON.parse(item.features);
                  if (Array.isArray(parsed)) {
                    feats = parsed.map(String);
                  } else if (typeof parsed === 'object' && parsed !== null) {
                    feats = Object.entries(parsed).map(([k, v]) => `${k}: ${v}`);
                  } else {
                    feats = [String(parsed)];
                  }
                } catch {
                  feats = item.features.split('\n').map((f) => f.trim()).filter(Boolean);
                }
              }

              return {
                id: String(item.id || item.slug || `prod-${idx}`),
                name: item.name || '',
                model: item.model || '',
                image: item.image_url || item.image || '/images/carrier-split-ac.png',
                specifications: specs,
                features: feats,
              };
            });
            setProductsData(mapped);
          } else {
            setProductsData([]);
          }
        }
      } catch (err) {
        console.warn('Backend API error loading products:', err);
        if (isMounted) {
          setError(err?.message || 'Failed to load products from server.');
          setProductsData([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
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
            isFiltered={Boolean(searchQuery.trim())}
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
