'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Product } from '@/types/product';

const NEUTRAL_PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23F8FAFC'/%3E%3Crect x='140' y='100' width='120' height='80' rx='8' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='4 4' fill='%23FFFFFF'/%3E%3Cpath d='M170 140h60M170 152h40' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round'/%3E%3Ctext x='50%25' y='210' text-anchor='middle' font-family='sans-serif' font-size='12' font-weight='600' fill='%2394A3B8'%3ENo Image Available%3C/text%3E%3C/svg%3E";

export interface ProductCardProps {
  product: Product;
  onEnquire?: (product: Product) => void;
  onViewSpecs?: (product: Product) => void;
}

/**
 * Pure presentational ProductCard component.
 * Driven entirely by the `product` prop without hardcoded product content,
 * ready for seamless backend API integration.
 */
export default function ProductCard({
  product,
  onEnquire,
  onViewSpecs,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const displayImage = imgError || !product.image ? NEUTRAL_PLACEHOLDER_IMG : product.image;

  return (
    <article className="product-fsd-card h-100 d-flex flex-column">
      {/* 1. Image Media Container Top (Overflow Hidden for Clean Zoom) */}
      <div className="product-card-top">
        <img
          src={displayImage}
          alt={`${product.name} - ${product.model}`}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>

      {/* 2. Card Content Body */}
      <div className="product-card-content d-flex flex-column flex-grow-1">
        {/* Field 3: Model Code */}
        {product.model && (
          <div className="product-model-text" title={product.model}>
            {product.model}
          </div>
        )}

        {/* Field 2: Product Name (Clamped to 2 lines) */}
        <h3 className="product-title-fsd" title={product.name}>
          {product.name}
        </h3>

        {/* Field 4: Technical Specifications Rows */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="product-specs-box">
            <div className="text-muted small fw-bold text-uppercase letter-spacing-1 mb-2">
              Technical Specifications:
            </div>
            {product.specifications.slice(0, 4).map((spec, sIdx) => (
              <div className="product-spec-row" key={`${spec.label}-${sIdx}`}>
                <span className="product-spec-name" title={spec.label}>
                  {spec.label}
                </span>
                <span className="product-spec-val" title={spec.value}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Field 5: Key Features Checklist */}
        {product.features && product.features.length > 0 && (
          <div className="mb-3">
            <div className="text-muted small fw-bold text-uppercase letter-spacing-1 mb-2">
              Key Features:
            </div>
            <ul className="product-features-checklist">
              {product.features.slice(0, 3).map((feature, fIdx) => (
                <li key={fIdx}>
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Field 6: Action Buttons Pinned to Bottom */}
        <div className="product-card-actions mt-auto d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-custom-primary shadow-xs fw-bold d-inline-flex align-items-center justify-content-center gap-2 px-4 py-2"
            onClick={() => onEnquire?.(product)}
            aria-label={`Enquire about ${product.name}`}
            style={{ width: '100%', maxWidth: '240px' }}
          >
            <i className="fa-solid fa-clipboard-question me-1" aria-hidden="true"></i>
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </article>
  );
}
