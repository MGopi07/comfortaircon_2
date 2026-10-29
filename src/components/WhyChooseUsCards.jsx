'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const defaultTrustPoints = [
  {
    icon: 'fa-solid fa-certificate',
    title: 'Quality AC Products',
    desc: 'Explore suitable air conditioning solutions from leading brands to meet your cooling requirements.',
    tag: 'LEADING BRANDS',
    check: 'Genuine Products and Warranty Support',
  },
  {
    icon: 'fa-solid fa-award',
    title: 'Over 25+ Years of Experience',
    desc: 'Benefit from our experience in AC sales, installation, repair, and maintenance.',
    tag: 'SINCE 1999',
    check: 'Decades of Industry Experience',
  },
  {
    icon: 'fa-solid fa-user-gear',
    title: 'Experienced Technicians',
    desc: 'Our technicians focus on professional installation, careful troubleshooting, and reliable servicing.',
    tag: 'EXPERT TEAM',
    check: 'Quality Workmanship',
  },
  {
    icon: 'fa-solid fa-receipt',
    title: 'Transparent Pricing',
    desc: 'Receive clear quotations and service estimates to help you make informed decisions.',
    tag: 'HONEST PRICING',
    check: 'Clear and Honest Pricing',
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Responsive Customer Support',
    desc: 'We aim to respond promptly to service requests and provide convenient support when you need assistance.',
    tag: 'QUICK SUPPORT',
    check: 'Reliable Service Assistance',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Dependable After-Sales Service',
    desc: 'From routine maintenance to repair support, we help you maintain your air conditioning system for lasting comfort.',
    tag: 'AFTER-SALES',
    check: 'Customer-Focused Support',
  },
];

/**
 * Individual Feature Card with scroll-triggered fade-up animation.
 * The Framer Motion animation is attached to an outer wrapper so that
 * the internal `.trust-pillar-card` hover transform (-8px) remains completely intact.
 */
export function WhyChooseUsCard({ item, index, columns = 3 }) {
  const shouldReduceMotion = useReducedMotion();

  // Compute row index and column index
  const rowIndex = Math.floor(index / columns);
  const columnIndex = columns === 1 ? 0 : index % columns;

  // Stagger 100ms per column; no stagger on mobile
  const delay = columns === 1 ? 0 : columnIndex * 0.1;

  // If user prefers reduced motion, skip transform and transition entirely
  const animationProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          delay,
        },
      };

  return (
    <div className="col-lg-4 col-md-6 d-flex flex-column">
      <motion.div
        className="h-100 d-flex flex-column"
        {...animationProps}
      >
        <div className="trust-pillar-card">
          <div className="trust-pillar-top">
            <div className="trust-pillar-icon">
              <i className={item.icon}></i>
            </div>
            <div className="trust-pillar-meta">
              <span className="trust-pillar-num">{`0${index + 1}`}</span>
              <span className="trust-pillar-tag">{item.tag}</span>
            </div>
          </div>
          <h3 className="trust-pillar-title">{item.title}</h3>
          <p className="trust-pillar-desc">{item.desc}</p>
          <div className="trust-pillar-footer">
            <span className="trust-pillar-check">
              <i className="fa-solid fa-circle-check"></i> {item.check}
            </span>
            <span className="trust-pillar-arrow" aria-hidden="true">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Responsive 3-column / 2-column / 1-column grid of Why Choose Us feature cards
 * with row-by-row scroll-triggered fade-up animation.
 */
export default function WhyChooseUsCards({ items = defaultTrustPoints }) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 768) {
        setColumns(1); // Mobile: 1 column
      } else if (window.innerWidth < 992) {
        setColumns(2); // Tablet: 2 columns
      } else {
        setColumns(3); // Desktop: 3 columns
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return (
    <div className="row g-4">
      {items.map((item, idx) => (
        <WhyChooseUsCard
          key={item.title}
          item={item}
          index={idx}
          columns={columns}
        />
      ))}
    </div>
  );
}
