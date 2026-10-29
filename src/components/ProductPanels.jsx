'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, useSyncExternalStore } from 'react';
import ProductPanel from './ProductPanel';
import { PRODUCTS_CATALOG } from '@/data/mockData';

const BG_TINTS = [
  '#F0F8FF', // Soft icy blue tint 1
  '#EAF4FC', // Soft icy blue tint 2
  '#E1EFFB', // Soft icy blue tint 3
  '#D9EBF9', // Soft icy blue tint 4
  '#E6F2FC', // Soft icy blue tint 5
  '#EDF6FD', // Soft icy blue tint 6
];

function subscribeReducedMotion(callback) {
  if (typeof window === 'undefined') return () => { };
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function ProductPanels({ openSpec, openAppointment }) {
  const [rawProducts, setRawProducts] = useState(PRODUCTS_CATALOG);

  // Sync with Admin Panel products from localStorage
  useEffect(() => {
    const loadStoredProducts = () => {
      if (typeof window === 'undefined') return;
      try {
        const stored = localStorage.getItem('comfort_aircon_products');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRawProducts(parsed);
            return;
          }
        }
      } catch (err) {
        console.error('Error reading comfort_aircon_products from localStorage:', err);
      }
      setRawProducts(PRODUCTS_CATALOG);
    };

    loadStoredProducts();
    window.addEventListener('storage', loadStoredProducts);
    return () => window.removeEventListener('storage', loadStoredProducts);
  }, []);

  // Filter ONLY published products from the admin panel
  const products = useMemo(() => {
    return rawProducts
      .filter((p) => p.published !== false)
      .map((p, idx) => {
        const specs =
          Array.isArray(p.specsList) && p.specsList.length > 0
            ? p.specsList
            : Array.isArray(p.specs) && p.specs.length > 0
            ? p.specs
            : typeof p.specifications === 'string'
            ? p.specifications
                .split(/[\n|]/)
                .map((part) => {
                  const [lbl, ...val] = part.split(':');
                  return {
                    label: lbl ? lbl.trim() : 'Spec',
                    value: val.join(':').trim() || lbl.trim(),
                  };
                })
                .filter((s) => s.label && s.value)
            : [];

        const features =
          Array.isArray(p.featuresList) && p.featuresList.length > 0
            ? p.featuresList
            : Array.isArray(p.features) && p.features.length > 0
            ? p.features
            : typeof p.features === 'string'
            ? p.features.split('\n').map((f) => f.trim()).filter(Boolean)
            : [];

        return {
          id: p.id || `prod-${idx}`,
          indexStr: String(idx + 1).padStart(2, '0'),
          category: p.category || (p.brand ? `${p.brand} Range` : 'AC System'),
          name: p.name,
          model: p.model || 'Standard',
          specs: specs.slice(0, 4),
          features: features.slice(0, 3),
          img: p.image || p.img || '/images/carrier-split-ac.png',
          bgTint: BG_TINTS[idx % BG_TINTS.length],
          borderColor: 'rgba(0, 120, 191, 0.18)',
        };
      });
  }, [rawProducts]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Keep activeIndex within bounds if products list changes
  useEffect(() => {
    if (products.length > 0 && activeIndex >= products.length) {
      setActiveIndex(0);
    }
  }, [products.length, activeIndex]);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(true);

  const containerRef = useRef(null);
  const panelRefs = useRef([]);

  // Check prefers-reduced-motion using useSyncExternalStore (eliminates cascading renders)
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // IntersectionObserver: Fade up panels in sequence when scrolling into view
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.02, rootMargin: '200px 0px' }
    );

    observer.observe(containerRef.current);

    // Fallback timer ensures visibility in all environments including headless capture
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Auto-play: 4.5s interval, pauses on hover or focus, stops permanently after manual interaction
  useEffect(() => {
    if (hasInteracted || isHovered || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [hasInteracted, isHovered, prefersReducedMotion, products.length]);

  // Handle desktop hover (below 992px panels stack as an accordion) on collapsed panel
  const handlePanelHover = useCallback((idx) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 992) {
      setActiveIndex(idx);
    }
  }, []);

  // Handle manual selection (click/tap) - stops auto-play permanently
  const handleSelect = useCallback((idx) => {
    setHasInteracted(true);
    setActiveIndex(idx);
  }, []);

  // Keyboard arrow navigation
  const handleKeyDown = useCallback(
    (e, idx) => {
      let nextIdx = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIdx = (idx + 1) % products.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIdx = (idx - 1 + products.length) % products.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIdx = products.length - 1;
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect(idx);
      }

      if (nextIdx !== null) {
        handleSelect(nextIdx);
        if (panelRefs.current[nextIdx]) {
          const btn = panelRefs.current[nextIdx].querySelector('.panel-collapsed-btn');
          if (btn) btn.focus();
        }
      }
    },
    [handleSelect, products.length]
  );

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="p-4 rounded-4 bg-light d-inline-block border">
          <i className="fa-solid fa-box-open fs-2 text-muted mb-2 d-block"></i>
          <p className="text-muted fw-semibold mb-0">
            No products are currently published. Please publish products in the Admin Panel to display them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="product-panels-showcase-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
    >
      {/* 5 Full-Width Tall Expanding Panels */}
      <div
        className="product-panels-container"
        ref={containerRef}
        role="region"
        aria-label="Our Range - Product Showcase"
      >
        {products.map((product, idx) => (
          <ProductPanel
            key={product.id}
            product={product}
            isActive={activeIndex === idx}
            onSelect={() => handleSelect(idx)}
            onHover={() => handlePanelHover(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            openSpec={openSpec}
            openAppointment={openAppointment}
            panelRef={(el) => (panelRefs.current[idx] = el)}
            isRevealed={isRevealed}
            revealDelay={idx * 80}
          />
        ))}
      </div>

      {/* Pagination Dots Below: The active dot stretches into a pill */}
      <div
        className="product-panels-dots d-flex justify-content-center align-items-center gap-2 mt-4"
        role="navigation"
        aria-label="Product Showcase Navigation"
      >
        {products.map((product, idx) => (
          <button
            key={product.id}
            type="button"
            className={`panel-dot ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => handleSelect(idx)}
            aria-label={`Switch to panel ${product.indexStr}: ${product.category}`}
            aria-current={activeIndex === idx ? 'true' : 'false'}
            title={`${product.indexStr} - ${product.category}`}
          />
        ))}
      </div>
    </div>
  );
}
