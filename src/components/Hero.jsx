'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

export default function Hero() {
  const { openAppointment } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      src: '/images/ban2.png',
      alt: 'Comfort Aircon Carrier Living Room AC Cooling',
    },
    {
      src: '/images/ban1.png',
      alt: 'Comfort Aircon High-Efficiency Inverter AC Cooling',
    },
    {
      src: '/images/ban4.png',
      alt: 'Comfort Aircon Floating Serenity Bedroom Cooling',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [slides.length, currentSlide]);

  return (
    <section
      className="hero-section position-relative overflow-hidden"
      id="home"
    >
      {/* Live Ambient Animated Waves & Background Glows */}
      <div className="hero-animated-bg">
        <div className="air-wave air-wave-1"></div>
        <div className="air-wave air-wave-2"></div>
      </div>

      <div className="container-xxl position-relative z-2">
        <div className="row align-items-center gy-4 gy-lg-0 hero-main-row">
          {/* Left Column: Content & Interactive Controls */}
          <div className="col-lg-6 col-xl-5 hero-content d-flex flex-column justify-content-center">
            {/* Status Badge */}
            <div className="hero-status-badge">
              <span className="pulse-dot"></span>
              <span>Authorized Carrier &amp; Toshiba AC Dealership</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title fw-extrabold text-navy lh-sm mb-3">
              Stay Cool <br />
              <span className="animated-gradient-text">All Year Round</span>
            </h1>

            {/* Subtitle / Company Introduction */}
            <p className="hero-subtitle text-secondary">
              Get professional AC installation, repair, and maintenance from our experienced team. We work with major AC brands to deliver reliable performance, efficient cooling, and customer satisfaction.
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-group d-flex flex-wrap align-items-center gap-3">
              <button
                type="button"
                className="btn btn-hero-book rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                onClick={() => openAppointment()}
              >
                <i className="fa-regular fa-calendar-check fs-6"></i>
                <span>Book a Service</span>
              </button>
              <a
                href="#services"
                className="btn btn-hero-explore rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2"
              >
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* Divider Line */}
            <hr className="hero-trust-divider" />

            {/* Trust Points */}
            <div className="hero-trust-row d-flex flex-wrap align-items-center gap-3 gap-md-4 pt-1">
              {/* Feature 1: 100% Genuine Carrier Units */}
              <div className="hero-trust-item d-flex align-items-center gap-2">
                <span className="hero-trust-check-icon">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span className="hero-trust-text">
                  <span className="d-block tabular-nums">100% Genuine</span>
                  <span>Carrier Units</span>
                </span>
              </div>

              {/* Feature 2: Certified Expert Technicians */}
              <div className="hero-trust-item d-flex align-items-center gap-2">
                <span className="hero-trust-check-icon">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span className="hero-trust-text">
                  <span className="d-block">Certified Expert</span>
                  <span>Technicians</span>
                </span>
              </div>

              {/* Feature 3: Same-Day Service Response */}
              <div className="hero-trust-item d-flex align-items-center gap-2">
                <span className="hero-trust-check-icon">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span className="hero-trust-text">
                  <span className="d-block">Same-Day Service</span>
                  <span>Response</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Interactive Banner Carousel */}
          <div className="col-lg-6 col-xl-7 hero-img-container">
            {/* Soft Ambient Radial Glow Orb */}
            <div className="hero-img-glow"></div>

            {/* Hero Section 3-Banner Slider Carousel */}
            <div
              id="heroBannerCarousel"
              className="carousel slide carousel-fade hero-banner-carousel position-relative z-2"
            >
              {/* Carousel Slides */}
              <div className="carousel-inner">
                {slides.map((slide, idx) => (
                  <div
                    key={slide.src}
                    className={`carousel-item ${idx === currentSlide ? 'active' : ''}`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="hero-main-img img-fluid"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      fetchPriority={idx === 0 ? 'high' : 'auto'}
                      draggable="false"
                    />
                  </div>
                ))}
              </div>

              {/* Slide Indicators */}
              <div className="hero-carousel-indicators">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.src}
                    type="button"
                    className={idx === currentSlide ? 'active' : ''}
                    aria-label={`Show banner ${idx + 1}`}
                    aria-current={idx === currentSlide ? 'true' : undefined}
                    onClick={() => setCurrentSlide(idx)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
