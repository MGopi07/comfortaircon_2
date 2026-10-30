'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * =========================================================================
 * PRODUCT SPOTLIGHT DATA CATALOG
 * =========================================================================
 * You can easily edit product details, add, or update products in this single array.
 * Each item has:
 *  - id: Unique URL-safe slug used for deep linking (#id)
 *  - category: AC system category shown on the tab row
 *  - brand: Carrier / Toshiba / Midea
 *  - title: Official product marketing name
 *  - model: Model number & ton range
 *  - image: Web-optimized asset path
 *  - specs: 4 key specifications displayed in the 2x2 grid
 *  - features: 3 high-impact feature bullet points
 * =========================================================================
 */
export const SPOTLIGHT_PRODUCTS = [
  {
    id: 'carrier-ester-split',
    category: 'Split AC',
    brand: 'Carrier',
    title: 'Carrier Ester Neo 5-Star Inverter Split AC',
    model: 'CAI18EN5R34F0 (1.5 Ton)',
    image: '/images/carrier-split-ac.png',
    specs: [
      { label: 'Brand', value: 'Carrier' },
      { label: 'Cooling Capacity', value: '1.5 Ton (5000 W)' },
      { label: 'Energy Rating', value: '5-Star (ISEER 5.10)' },
      { label: 'Motor / Compressor', value: 'Dual Inverter Rotary' },
    ],
    features: [
      'Instacool rapid 60-second cooling mode for fast temperature drop',
      'PM 2.5 micro-air filtration for clean and healthy indoor breathing',
      'Hydrophilic Blue-Fin anti-corrosion protective coil coating',
    ],
  },
  {
    id: 'carrier-superia-cassette',
    category: 'Cassette AC',
    brand: 'Carrier',
    title: 'Carrier Superia 4-Way Inverter Cassette AC',
    model: '40KVC024 (2.0 / 3.0 Ton)',
    image: '/images/carrier-cassette.png',
    specs: [
      { label: 'Brand', value: 'Carrier' },
      { label: 'Body Profile', value: '245mm Ultra-Slim Depth' },
      { label: 'Capacity Options', value: '2.0 Ton / 3.0 Ton' },
      { label: 'Air Distribution', value: '360° Circular Flow Louvre' },
    ],
    features: [
      '360-Degree omnidirectional uniform airflow dispersion',
      'Built-in high-lift condensate drain pump (750mm lift head)',
      'Whisper-quiet turbo fan with aerodynamic blades',
    ],
  },
  {
    id: 'carrier-concealed-duct',
    category: 'Ductable AC',
    brand: 'Carrier',
    title: 'Carrier Concealed High-Static Ductable AC',
    model: '40VDC036 (3.0 / 4.0 / 5.5 Ton)',
    image: '/images/carrier-duct.png',
    specs: [
      { label: 'Brand', value: 'Carrier' },
      { label: 'Mounting Style', value: '100% Concealed In-Ceiling' },
      { label: 'Capacity Range', value: '3.0 Ton to 5.5 Ton' },
      { label: 'Static Pressure', value: 'High Static 150 Pa' },
    ],
    features: [
      '100% invisible false ceiling architectural concealment',
      'High static pressure supports long extended duct runs',
      'Central Building Management System (BMS) Modbus ready',
    ],
  },
  {
    id: 'carrier-xpower-vrf',
    category: 'VRF Systems',
    brand: 'Carrier',
    title: 'Carrier X-Power Commercial VRF System',
    model: '38VT060 Modular VRF (Up to 64 HP)',
    image: '/images/carrier-vrf-ac.png',
    specs: [
      { label: 'Brand', value: 'Carrier' },
      { label: 'Modular Scale', value: '8 HP to 64 HP Combos' },
      { label: 'Indoor Units', value: 'Up to 64 Units' },
      { label: 'Ambient Cooling', value: 'Guaranteed at 52°C' },
    ],
    features: [
      'Independent micro-climate multi-zone room climate control',
      'Extreme 52°C ambient coastal durability engineering',
      'Full DC Inverter intelligent load modulation',
    ],
  },
  {
    id: 'toshiba-daiseikai-split',
    category: 'Split AC',
    brand: 'Toshiba',
    title: 'Toshiba Daiseikai 5-Star Japanese Inverter Split AC',
    model: 'RAS-18N3KVR-IN (1.5 Ton)',
    image: '/images/toshiba-split.png',
    specs: [
      { label: 'Brand', value: 'Toshiba' },
      { label: 'Air Purification', value: 'Integrated Plasma Ionizer' },
      { label: 'Cooling Capacity', value: '1.5 Ton (5200 W)' },
      { label: 'Motor / Compressor', value: 'Japanese Twin-Rotary' },
    ],
    features: [
      'World-renowned Japanese Twin-Rotary Inverter compressor',
      'Magic Coil self-cleaning aqua-resin coated heat exchanger',
      'Integrated active Plasma ionizer neutralizing 94% PM 0.1',
    ],
  },
  {
    id: 'toshiba-smart-cassette',
    category: 'Cassette AC',
    brand: 'Toshiba',
    title: 'Toshiba 4-Way Smart Inverter Cassette AC',
    model: 'RAV-SM804UT-E (2.5 / 3.0 Ton)',
    image: '/images/toshiba-cassette.png',
    specs: [
      { label: 'Brand', value: 'Toshiba' },
      { label: 'Louver Regulation', value: '4-Way Independent Motors' },
      { label: 'Capacity Options', value: '2.5 Ton / 3.0 Ton' },
      { label: 'Drain Lift Pump', value: 'High-Lift 850mm Head' },
    ],
    features: [
      '4-way independent motorized louvers for customized room airflow',
      'Optional occupancy radar sensor adjusts temperature when empty',
      'Anti-bacterial silver ion drain pan prevents biofilm and sludge',
    ],
  },
  {
    id: 'toshiba-slim-duct',
    category: 'Ductable AC',
    brand: 'Toshiba',
    title: 'Toshiba Concealed Slim Inverter Ductable AC',
    model: 'RAV-SM564SDT-E (2.0 / 3.0 Ton)',
    image: '/images/carrier-ductable.png',
    specs: [
      { label: 'Brand', value: 'Toshiba' },
      { label: 'Body Profile', value: 'Ultra-Slim 210mm Height' },
      { label: 'Capacity Range', value: '2.0 Ton / 3.0 Ton' },
      { label: 'Static Pressure', value: 'Adjustable 30 - 120 Pa' },
    ],
    features: [
      'Ultra-slim 210mm body fits inside narrow false ceiling bulkheads',
      'Selectable rear or bottom return air entry for flexible duct layouts',
      'Variable speed DC blower motor operates whisper-quiet at 25 dB',
    ],
  },
  {
    id: 'toshiba-smms-vrf',
    category: 'VRF Systems',
    brand: 'Toshiba',
    title: 'Toshiba SMMS-u Next-Gen Japanese VRF System',
    model: 'MCY-MHP0804HT8 Series (Up to 120 HP)',
    image: '/images/toshiba-vrf.png',
    specs: [
      { label: 'Brand', value: 'Toshiba' },
      { label: 'Modular Capability', value: 'Up to 120 HP Combined' },
      { label: 'Max Piping Run', value: '1,200m Total Network' },
      { label: 'Compressor Tech', value: 'Triple Rotary DLC Inverter' },
    ],
    features: [
      'Triple Rotary DC Inverter with Diamond-Like Carbon coating',
      'Proprietary Triple Liquid Sub-cooling Circuit for long runs',
      'NFC Wave Tool enables wireless smartphone setup & diagnostics',
    ],
  },
];

/**
 * =========================================================================
 * TIMING & ANIMATION CONFIGURATION
 * =========================================================================
 * You can tweak autoplay duration here (in milliseconds).
 */
export const SPOTLIGHT_CONFIG = {
  AUTOPLAY_MS: 6000, // 6 seconds per product
  TRANSITION_MS: 600, // 0.6s transition duration
};

/**
 * Animated spec count-up component
 * Animates numbers in values (e.g., "120 Pa", "1.5 Ton", "850mm", "52°C")
 */
function SpecAnimatedValue({ text, triggerKey }) {
  const [displayValue, setDisplayValue] = useState(text);

  useEffect(() => {
    // If text has no numbers or user prefers reduced motion, show raw text
    if (
      typeof window === 'undefined' ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      setDisplayValue(text);
      return;
    }

    // Extract first number or decimal
    const match = text.match(/(\d+(?:\.\d+)?)/);
    if (!match) {
      setDisplayValue(text);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const prefix = text.slice(0, match.index);
    const suffix = text.slice(match.index + match[0].length);
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;

    let startTime = null;
    let animationFrameId;
    const duration = 480; // ms

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * ease;

      const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current);
      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(text);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [text, triggerKey]);

  return <span className="spotlight-spec-val">{displayValue}</span>;
}

export default function ProductSpotlight({ openSpec, openAppointment }) {
  const [products] = useState(SPOTLIGHT_PRODUCTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, left: 0, width: 0 });
  const [transitionKey, setTransitionKey] = useState(0);

  const sectionRef = useRef(null);
  const tabListRef = useRef(null);
  const tabRefs = useRef([]);
  const stageRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const activeProduct = useMemo(() => products[activeIndex] || products[0], [products, activeIndex]);

  // Deep linking: read initial hash on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (!hash) return;

    const matchedIdx = products.findIndex(
      (p) =>
        p.id.toLowerCase() === hash ||
        p.category.toLowerCase().replace(/\s+/g, '-') === hash ||
        p.brand.toLowerCase() === hash
    );
    if (matchedIdx !== -1) {
      setActiveIndex(matchedIdx);
    }
  }, [products]);

  // Deep linking: update URL hash when active product changes without jumping scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash.replace('#', '') !== activeProduct.id) {
      window.history.replaceState(null, '', `#${activeProduct.id}`);
    }
  }, [activeProduct.id]);

  // Section entrance animation via IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Update sliding indicator bar position
  const updateIndicator = useCallback(() => {
    const activeTab = tabRefs.current[activeIndex];
    const tabList = tabListRef.current;
    if (!activeTab || !tabList) return;

    const isDesktop = window.innerWidth >= 992;
    if (isDesktop) {
      const top = activeTab.offsetTop;
      const height = activeTab.offsetHeight;
      setIndicatorStyle({ top, height, left: 0, width: 4 });
    } else {
      const left = activeTab.offsetLeft;
      const width = activeTab.offsetWidth;
      setIndicatorStyle({ top: 'auto', height: 3, left, width });
      // Scroll tab into view horizontally on tablet/mobile
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  useEffect(() => {
    updateIndicator();
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicator]);

  // Change product handler
  const selectProduct = useCallback(
    (index, fromUser = false) => {
      if (index === activeIndex) return;
      if (fromUser) {
        setIsUserInteracted(true); // permanently stop autoplay
      }
      setActiveIndex(index);
      setTransitionKey((prev) => prev + 1);
    },
    [activeIndex]
  );

  const prevProduct = useCallback(() => {
    selectProduct((activeIndex - 1 + products.length) % products.length, true);
  }, [activeIndex, products.length, selectProduct]);

  const nextProduct = useCallback(() => {
    selectProduct((activeIndex + 1) % products.length, true);
  }, [activeIndex, products.length, selectProduct]);

  // Autoplay timer
  useEffect(() => {
    if (isUserInteracted || isPaused) return;

    // Check prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
      setTransitionKey((prev) => prev + 1);
    }, SPOTLIGHT_CONFIG.AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [isUserInteracted, isPaused, products.length]);

  // Keyboard navigation on tablist
  const handleKeyDown = useCallback(
    (e, index) => {
      let targetIdx = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        targetIdx = (index + 1) % products.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        targetIdx = (index - 1 + products.length) % products.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIdx = products.length - 1;
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectProduct(index, true);
      }

      if (targetIdx !== null) {
        selectProduct(targetIdx, true);
        if (tabRefs.current[targetIdx]) {
          tabRefs.current[targetIdx].focus();
        }
      }
    },
    [products.length, selectProduct]
  );

  // Touch Swipe Handlers for Stage Card
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartXRef.current;
    const diffY = touchEndY - touchStartYRef.current;

    // Verify it was primarily a horizontal swipe
    if (Math.abs(diffX) > 42 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // Swiped Left -> Next
        selectProduct((activeIndex + 1) % products.length, true);
      } else {
        // Swiped Right -> Prev
        selectProduct((activeIndex - 1 + products.length) % products.length, true);
      }
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`spotlight-container-wrapper ${isSectionVisible ? 'is-entrance-visible' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="spotlight-layout-grid">
        {/* =================================================================
            LEFT COLUMN (32%): VERTICAL TAB LIST (01 - 10)
            ================================================================= */}
        <div className="spotlight-tabs-col">
          <div
            ref={tabListRef}
            className="spotlight-tabs-list"
            role="tablist"
            aria-label="Technology Portfolio Categories"
            aria-orientation="vertical"
          >
            {/* Sliding Shared Active Accent Bar */}
            <div
              className="spotlight-active-indicator"
              style={{
                transform:
                  indicatorStyle.top === 'auto'
                    ? `translateX(${indicatorStyle.left}px)`
                    : `translateY(${indicatorStyle.top}px)`,
                height: indicatorStyle.height ? `${indicatorStyle.height}px` : undefined,
                width: indicatorStyle.width ? `${indicatorStyle.width}px` : undefined,
              }}
              aria-hidden="true"
            />

            {products.map((product, idx) => {
              const isActive = activeIndex === idx;
              const numStr = String(idx + 1).padStart(2, '0');

              return (
                <button
                  key={product.id}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  id={`spotlight-tab-${product.id}`}
                  type="button"
                  role="tab"
                  className={`spotlight-tab-row ${isActive ? 'is-active-tab' : ''}`}
                  aria-selected={isActive}
                  aria-controls={`spotlight-panel-${product.id}`}
                  tabIndex={isActive ? 0 : -1}
                  style={{ '--tab-index': idx }}
                  onClick={() => selectProduct(idx, true)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  <span className="spotlight-tab-num">{numStr}</span>
                  <div className="spotlight-tab-meta">
                    <span className="spotlight-tab-name">{product.category}</span>
                    <span className="spotlight-tab-brand">{product.brand}</span>
                  </div>
                  <span className="spotlight-tab-chevron" aria-hidden="true">
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================================
            RIGHT COLUMN (68%): PRODUCT STAGE CARD
            ================================================================= */}
        <div className="spotlight-stage-col">
          <div
            ref={stageRef}
            id={`spotlight-panel-${activeProduct.id}`}
            role="tabpanel"
            aria-labelledby={`spotlight-tab-${activeProduct.id}`}
            aria-live="polite"
            className="spotlight-stage-card"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Content Column inside Stage */}
            <div className="spotlight-stage-content" key={`content-${transitionKey}`}>
              {/* Brand Pill Badge */}
              <div className="spotlight-anim-item spotlight-anim-1">
                <span className={`spotlight-brand-pill brand-${activeProduct.brand.toLowerCase()}`}>
                  <span className="brand-dot"></span>
                  <span>{activeProduct.brand} Precision HVAC</span>
                </span>
              </div>

              {/* Product Title */}
              <h3 className="spotlight-title spotlight-anim-item spotlight-anim-2">
                {activeProduct.title}
              </h3>

              {/* Model Chip */}
              <div className="spotlight-model-chip spotlight-anim-item spotlight-anim-3">
                <i className="fa-solid fa-tag me-1.5 opacity-75"></i>
                <span className="fw-semibold">Model:</span>&nbsp;{activeProduct.model}
              </div>

              {/* 2x2 Technical Specifications Grid */}
              <div className="spotlight-specs-wrapper spotlight-anim-item spotlight-anim-4">
                <div className="spotlight-specs-eyebrow">
                  <i className="fa-solid fa-sliders me-1.5 text-primary"></i>
                  <span>Technical Specifications</span>
                </div>
                <div className="spotlight-specs-grid">
                  {activeProduct.specs.map((item, specIdx) => (
                    <div
                      key={specIdx}
                      className="spotlight-spec-cell"
                      style={{ '--spec-delay': `${specIdx * 60}ms` }}
                    >
                      <span className="spotlight-spec-lbl">{item.label}</span>
                      <SpecAnimatedValue text={item.value} triggerKey={transitionKey} />
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Key Feature Bullets with Checkmark Badges */}
              <div className="spotlight-features-wrapper spotlight-anim-item spotlight-anim-5">
                <div className="spotlight-features-eyebrow">
                  <i className="fa-solid fa-circle-check me-1.5 text-primary"></i>
                  <span>Key Features &amp; Engineering</span>
                </div>
                <ul className="spotlight-feature-list">
                  {activeProduct.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="spotlight-feature-bullet"
                      style={{ '--feature-delay': `${fIdx * 70}ms` }}
                    >
                      <span className="spotlight-check-circle" aria-hidden="true">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons Row: Get Quote & View Details */}
              <div className="spotlight-actions-row spotlight-anim-item spotlight-anim-6">
                <button
                  type="button"
                  className="btn btn-spotlight-quote"
                  onClick={() => {
                    if (openAppointment) {
                      openAppointment(activeProduct.title);
                    }
                  }}
                  title={`Request quotation for ${activeProduct.title}`}
                >
                  <i className="fa-solid fa-file-invoice-dollar me-2"></i>
                  <span>Get Quote</span>
                </button>

                <button
                  type="button"
                  className="btn-spotlight-details"
                  onClick={() => {
                    if (openSpec) {
                      openSpec({
                        name: activeProduct.title,
                        brand: activeProduct.brand,
                        desc: activeProduct.model,
                        specs: activeProduct.specs.map((s) => `${s.label}: ${s.value}`),
                        img: activeProduct.image,
                      });
                    }
                  }}
                  title={`View comprehensive engineering details for ${activeProduct.title}`}
                >
                  <span>View Details</span>
                  <i className="fa-solid fa-arrow-right ms-1.5"></i>
                </button>
              </div>
            </div>

            {/* Right Image Column inside Stage */}
            <div className="spotlight-stage-image-col">
              <div className="spotlight-image-halo-wrapper">
                {/* Dynamic Radial Ambient Spotlight Glow */}
                <div className="spotlight-radial-glow" aria-hidden="true"></div>

                {/* Animated Product Image */}
                <div className="spotlight-img-frame" key={`img-${transitionKey}`}>
                  <img
                    src={activeProduct.image}
                    alt={`${activeProduct.title} - ${activeProduct.model}`}
                    className="spotlight-product-img"
                    width={540}
                    height={400}
                    loading={activeIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  {/* Soft Blurred Elliptical Floor Shadow */}
                  <div className="spotlight-floor-shadow" aria-hidden="true"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
