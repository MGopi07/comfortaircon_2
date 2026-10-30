'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';
import ProductSpotlight from './ProductSpotlight';

/**
 * ProductsSection:
 * "Our Range" section redesigned as a premium Product Spotlight showcase.
 * Features a 10-category vertical tab list with sliding accent indicator (left 32%)
 * and an interactive stage card with floating product image & specs (right 68%).
 */
export default function ProductsSection() {
  const { openAppointment, openSpec } = useModal();

  return (
    <section className="products-section section-padding" id="products">
      <div className="container-xxl">
        {/* Section Heading */}
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <span className="section-tag">
            <i className="fa-solid fa-snowflake me-1"></i> OUR RANGE
          </span>
          <h2 className="section-title">
            Carrier, Toshiba &amp; Midea Technology <span className="gradient-word">Portfolio</span>
          </h2>
          <p className="section-desc">
            Explore our official range of high-efficiency Carrier, Toshiba and Midea systems engineered for residential, commercial, and enterprise applications.
          </p>
        </div>

        {/* Product Spotlight Showcase Component */}
        <ProductSpotlight openSpec={openSpec} openAppointment={openAppointment} />
      </div>
    </section>
  );
}
