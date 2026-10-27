'use client';

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import ProductPanel from './ProductPanel';

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
  const products = [
    {
      id: 1,
      indexStr: '01',
      category: 'Split AC',
      name: 'Carrier Split Room AC',
      model: 'Ester Neo 5-Star Inverter',
      specs: [
        { label: 'Capacity', value: '1.5 Ton (5-Star)' },
        { label: 'Compressor', value: 'Dual Inverter Rotary' },
        { label: 'Filtration', value: 'PM 2.5 Micro Filter' },
        { label: 'Noise Level', value: '21 dB Ultra Quiet' },
      ],
      features: [
        'Rapid Cool Inverter Energy Saver',
        'PM 2.5 Micro-Air Filtration System',
        '10-Year Compressor Warranty',
      ],
      img: '/images/carrier-split-ac.png',
      bgTint: '#F0F8FF', // Soft icy blue tint 1
      borderColor: 'rgba(0, 120, 191, 0.16)',
    },
    {
      id: 2,
      indexStr: '02',
      category: 'Cassette AC',
      name: 'Carrier 4-Way Cassette AC',
      model: 'Superia 40KV 4-Way Series',
      specs: [
        { label: 'Airflow', value: '360° Uniform Flow' },
        { label: 'Drain Pump', value: 'Built-in High Lift' },
        { label: 'Profile', value: 'Slim Depth Design' },
        { label: 'Control', value: 'Wireless Remote Included' },
      ],
      features: [
        '360° Uniform Airflow Dispersion',
        'Built-in High Lift Condensate Pump',
        'Slim Architectural Ceiling Profile',
      ],
      img: '/images/carrier-cassette.png',
      bgTint: '#EAF4FC', // Soft icy blue tint 2
      borderColor: 'rgba(0, 120, 191, 0.18)',
    },
    {
      id: 3,
      indexStr: '03',
      category: 'Ductable AC',
      name: 'Carrier Concealed Ductable AC',
      model: 'Concealed 40VD High-Static',
      specs: [
        { label: 'Installation', value: '100% In-Ceiling' },
        { label: 'Blower', value: 'High Static Pressure' },
        { label: 'Diffusers', value: 'Linear Grill Integration' },
        { label: 'Control', value: 'Central Automation Ready' },
      ],
      features: [
        '100% Invisible Ceiling Concealment',
        'High Static Pressure Performance',
        'Central Automation & BMS Ready',
      ],
      img: '/images/carrier-duct.png',
      bgTint: '#E1EFFB', // Soft icy blue tint 3
      borderColor: 'rgba(0, 120, 191, 0.20)',
    },
    {
      id: 4,
      indexStr: '04',
      category: 'VRF Systems',
      name: 'Carrier Commercial VRF System',
      model: 'X-Power Commercial VRF',
      specs: [
        { label: 'Capacity', value: 'Up to 64 Indoor Units' },
        { label: 'Compressor', value: 'Variable DC Inverter' },
        { label: 'Ambient Temp', value: '52°C Cooling Durability' },
        { label: 'Operation', value: 'Multi-Zone Independent' },
      ],
      features: [
        'Multi-Zone Independent Room Control',
        'Extreme 52°C Ambient Cooling Durability',
        'Full Inverter Energy Efficiency COP',
      ],
      img: '/images/carrier-vrf-ac.png',
      bgTint: '#D9EBF9', // Soft icy blue tint 4
      borderColor: 'rgba(0, 120, 191, 0.22)',
    },
    {
      id: 5,
      indexStr: '05',
      category: 'Toshiba Range',
      name: 'Toshiba SMMS-u Japanese VRF',
      model: 'SMMS-u Next-Gen MCY-MHP',
      specs: [
        { label: 'Engineering', value: 'Japanese SMMS-u Tech' },
        { label: 'Compressor', value: 'Twin Rotary Inverter' },
        { label: 'Heat Exchanger', value: 'Magic Coil Self-Clean' },
        { label: 'Efficiency', value: 'Industry-Leading COP' },
      ],
      features: [
        'Twin Rotary DC Inverter Compressor',
        'Magic Coil Self-Cleaning Heat Exchanger',
        'Advanced Triple Liquid Sub-cooling',
      ],
      img: '/images/toshiba-vrf.png',
      bgTint: '#E6F2FC', // Soft icy blue (NO RED)
      borderColor: 'rgba(0, 120, 191, 0.20)',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
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
