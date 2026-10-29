'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { INITIAL_CONTACT } from '@/data/mockData';
import WhyChooseUsCards from '@/components/WhyChooseUsCards';

// Reusable animated count-up component with cubic ease-out
function AnimatedCounter({ end, duration = 1600, decimals = 0, prefix = '', suffix = '' }) {
  const [display, setDisplay] = useState(decimals > 0 ? Number(end).toFixed(decimals) : end);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If user prefers reduced motion or IntersectionObserver is not supported, show target immediately
    if (
      typeof window === 'undefined' ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      !('IntersectionObserver' in window)
    ) {
      setDisplay(decimals > 0 ? Number(end).toFixed(decimals) : end);
      return;
    }

    const el = elementRef.current;
    if (!el) return;

    const target = Number(end);

    const startCountAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = performance.now();
      // Reset to 0 when animation actually starts
      setDisplay(decimals > 0 ? (0).toFixed(decimals) : 0);

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out: 1 - (1 - progress)^3
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = ease * target;

        if (decimals > 0) {
          setDisplay(current.toFixed(decimals));
        } else {
          setDisplay(Math.floor(current));
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplay(decimals > 0 ? target.toFixed(decimals) : target);
        }
      };

      requestAnimationFrame(step);
    };

    // Check if element is already in the viewport right now
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startCountAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          startCountAnimation();
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    );

    observer.observe(el);

    // Safety fallback: if not animated after 2.5s, guarantee target value is displayed
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated.current) {
        setDisplay(decimals > 0 ? target.toFixed(decimals) : target);
      }
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [end, duration, decimals]);

  return (
    <span ref={elementRef} className="animated-counter-value" style={{ display: 'inline-block' }}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const { openAppointment } = useModal();

  // Scroll reveal IntersectionObserver: triggers elements as user scrolls down
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('reveal-from-left')) {
              entry.target.classList.add('reveal-from-left-active');
            }
            if (entry.target.classList.contains('reveal-from-right')) {
              entry.target.classList.add('reveal-from-right-active');
            }
            if (entry.target.classList.contains('reveal-from-bottom')) {
              entry.target.classList.add('reveal-from-bottom-active');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(
      '.reveal-from-left, .reveal-from-right, .reveal-from-bottom'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const trustPoints = [
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

  return (
    <>
      {/* Preload hero WebP image */}
      <link
        rel="preload"
        as="image"
        href="/images/about-us-hero-original.webp"
        type="image/webp"
      />

      {/* 1. SUBPAGE HERO / BANNER */}
      <section className="subpage-hero subpage-hero-about">
        <div className="container-xxl">
          <ul className="subpage-breadcrumbs mb-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <i className="fa-solid fa-chevron-right fs-xs"></i>
            </li>
            <li className="active">About Us</li>
          </ul>

          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="subpage-title">
                Your Trusted Air Conditioning Partner <span className="text-primary-blue">Partner</span>
              </h1>
              <p className="subpage-lead">
                Comfort Aircon delivers reliable air conditioning solutions for homes, offices, and commercial spaces. With expertise in AC sales, installation, repair, and maintenance.
              </p>


            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE SECTION (IMAGE SLIDES FROM LEFT, NUMBER COUNTS UP) */}
      <section className="who-we-are-section">
        <div className="container-xxl">
          <div className="row align-items-center gy-5">
            {/* Left Column: Image with Dot Matrix Grid & Overlapping Experience Badge - comes in from left */}
            <div className="col-lg-6">
              <div className="who-img-container reveal-from-left">
                {/* Decorative Dot Matrix in top-left */}
                <div className="who-dots-pattern" aria-hidden="true"></div>

                {/* Main Technician Image */}
                <div className="who-img-frame">
                  <img
                    src="/images/why1.png"
                    alt="Comfort Aircon HVAC Engineering Specialists at Work"
                  />
                </div>

                {/* Overlapping Badge on bottom-left with Animated Counter */}
                <div className="who-exp-badge">
                  <div className="who-exp-number">
                    <AnimatedCounter end={25} suffix="+" />
                  </div>
                  <div className="who-exp-text">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Right Column: Exact typography, checklist, divider line, and theme-colored button from reference */}
            <div className="col-lg-6">
              <div className="who-content-col reveal-from-right">
                <span className="who-label">WHO WE ARE</span>
                <h2 className="who-title">
                  Bringing Innovation and Comfort to Every Space

                </h2>
                <p className="who-description">
                  Established in 1999, Comfort Aircon specializes in air conditioning sales, installation, servicing, and maintenance. Our experienced team helps customers choose suitable cooling solutions based on their needs, space, and budget.
                </p>

                {/* Bullet Checklist with filled circular checkmarks */}
                <ul className="who-checklist">
                  <li>
                    <span className="who-check-circle">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span>Exceeding Customer Expectations</span>
                  </li>
                  <li>
                    <span className="who-check-circle">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span>Commitment to Quality Service</span>
                  </li>
                  <li>
                    <span className="who-check-circle">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span>Experienced Technical Professionals</span>
                  </li>
                  <li>
                    <span className="who-check-circle">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span>Reliable After-Sales Support</span>
                  </li>
                </ul>

                {/* Horizontal Divider Line */}
                <div className="who-divider"></div>

                {/* Action Button */}
                <Link
                  href="/contact"
                  className="who-btn-discover"
                >
                  Contact Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEASONAL PROMO BANNER & OVERLAPPING STATS CARD (NUMBERS COUNT UP ON SCROLL) */}
      <section className="promo-banner-section">
        <div className="container-xxl">
          <div className="row justify-content-center">
            <div className="col-lg-10 reveal-from-bottom">
              <h2 className="promo-banner-title">
                Professional AC Maintenance &amp; Reliable Cooling Solutions
              </h2>
              <p className="promo-banner-desc">
                Keep your air conditioner running efficiently with professional servicing from Comfort Aircon. Our services include system inspection, filter and coil cleaning, performance checks, and maintenance recommendations.</p>
              <button
                type="button"
                className="promo-banner-btn"
                onClick={() => openAppointment()}
              >
                <i className="fa-regular fa-calendar-check fs-5 me-2"></i> Book Your Service
              </button>
            </div>
          </div>
        </div>

        {/* Floating 4-Stat Metric Card Overlapping the Banner with Scroll-Triggered Animated Counters */}
        <div className="promo-stats-wrapper reveal-from-bottom delay-1">
          <div className="promo-stats-card">
            <div className="row g-0 align-items-center">
              <div className="col-6 col-md-3 promo-stat-col">
                <div className="promo-stat-number">
                  <AnimatedCounter end={15} suffix="K+" />
                </div>
                <div className="promo-stat-label">Happy Customer</div>
              </div>
              <div className="col-6 col-md-3 promo-stat-col">
                <div className="promo-stat-number">
                  <AnimatedCounter end={4.8} decimals={1} />
                </div>
                <div className="promo-stat-label">Rating Customer</div>
              </div>
              <div className="col-6 col-md-3 promo-stat-col">
                <div className="promo-stat-number">
                  <AnimatedCounter end={51} suffix="+" />
                </div>
                <div className="promo-stat-label">Pro Experts</div>
              </div>
              <div className="col-6 col-md-3 promo-stat-col">
                <div className="promo-stat-number">
                  <AnimatedCounter end={25} suffix="+" />
                </div>
                <div className="promo-stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 4: MISSION & CORE VALUES (ARCHITECTURAL BENTO SHOWCASE) */}
      <section className="about-values-section border-bottom" style={{ backgroundColor: '#FFFFFF', paddingTop: '100px', paddingBottom: '70px' }}>
        <div className="container-xxl py-3">
          <div className="row g-4 align-items-stretch">
            {/* Left Column: Guiding Principles & Executive Hero Mission Card - Slides in from left */}
            <div className="col-lg-5 d-flex flex-column reveal-from-left">
              <span
                className="section-tag mb-2"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  width: 'fit-content',
                  gap: '6px',
                  padding: '4px 12px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  borderRadius: '50px',
                  border: '1px solid rgba(0, 120, 191, 0.28)',
                  background: 'rgba(0, 120, 191, 0.08)',
                  color: '#0078BF',
                }}
              >
                <i className="fa-solid fa-bullseye" style={{ fontSize: '0.72rem' }}></i> GUIDING PRINCIPLES
              </span>
              <h2
                className="section-title text-start mb-4"
                style={{ color: '#162E5C', fontWeight: 800 }}
              >
                Our Mission &amp; Core Values
              </h2>

              {/* Executive Hero Mission Card */}
              <div className="mission-card-hero flex-grow-1">
                <i className="fa-solid fa-compass mission-card-watermark" aria-hidden="true"></i>
                <div>
                  <span className="mission-card-badge">
                    <i className="fa-solid fa-crosshairs"></i> CORE PURPOSE
                  </span>
                  <h3 className="mission-card-title">
                    <i className="fa-solid fa-compass"></i> Mission Statement
                  </h3>
                  <p className="mission-card-desc">
                    To provide dependable, energy-efficient air conditioning solutions to residential and commercial customers across Pondicherry, Villupuram, and Cuddalore. We strive to deliver professional installation, quality workmanship, transparent pricing, and responsive customer support.</p>
                </div>

                <div>
                  <div className="mission-card-divider"></div>
                  <div className="mission-card-footer">
                    <div className="mission-footer-icon">
                      <i className="fa-solid fa-award"></i>
                    </div>
                    <div className="mission-footer-text">
                      <h6>Comfort Aircon Engineering Pledge</h6>
                      <span>25+ Years of Certified HVAC Mastery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2x2 Bento Grid of the 4 Core Values with Cascading Reveal */}
            <div className="col-lg-7">
              <div className="row g-3 h-100">
                <div className="col-sm-6 reveal-from-bottom delay-1">
                  <div className="value-card-premium">
                    <div className="value-card-header">
                      <div className="value-icon-box">
                        <i className="fa-solid fa-wrench"></i>
                      </div>
                      <span className="value-card-num">01</span>
                    </div>
                    <h4 className="value-card-title">Engineering Excellence</h4>
                    <p className="value-card-desc">
                      We focus on proper installation practices, suitable materials, electrical safety, and reliable system performance.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6 reveal-from-bottom delay-2">
                  <div className="value-card-premium">
                    <div className="value-card-header">
                      <div className="value-icon-box">
                        <i className="fa-solid fa-handshake-angle"></i>
                      </div>
                      <span className="value-card-num">02</span>
                    </div>
                    <h4 className="value-card-title">Customer Trust</h4>
                    <p className="value-card-desc">
                      We believe in honest communication, clear quotations, transparent pricing, and dependable service.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6 reveal-from-bottom delay-3">
                  <div className="value-card-premium">
                    <div className="value-card-header">
                      <div className="value-icon-box">
                        <i className="fa-solid fa-leaf"></i>
                      </div>
                      <span className="value-card-num">03</span>
                    </div>
                    <h4 className="value-card-title">Energy Efficiency</h4>
                    <p className="value-card-desc">
                      We help customers explore energy-efficient air conditioning options that support comfortable indoor environments and responsible energy consumption.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6 reveal-from-bottom delay-4">
                  <div className="value-card-premium">
                    <div className="value-card-header">
                      <div className="value-icon-box">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                      </div>
                      <span className="value-card-num">04</span>
                    </div>
                    <h4 className="value-card-title">Reliable Local Service</h4>
                    <p className="value-card-desc">
                      Our team is committed to providing responsive AC repair, maintenance, and installation services across our service areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 5: WHY CUSTOMERS CHOOSE US (ANIMATED TRUST PILLARS) */}
      <section className="about-trust-section">
        {/* Ambient floating glow orbs */}
        <div className="about-trust-glow-1" aria-hidden="true"></div>
        <div className="about-trust-glow-2" aria-hidden="true"></div>

        <div className="container-xxl py-4 position-relative" style={{ zIndex: 1 }}>
          <div className="section-header text-center mb-5 reveal-from-bottom">
            <span
              className="section-tag mb-2"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
                margin: '0 auto',
                gap: '6px',
                padding: '4px 14px',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                borderRadius: '50px',
                border: '1px solid rgba(0, 120, 191, 0.28)',
                background: 'rgba(0, 120, 191, 0.08)',
                color: '#0078BF',
              }}
            >
              <i className="fa-solid fa-shield-halved" style={{ fontSize: '0.72rem' }}></i> WHY COMFORT AIRCON
            </span>
            <h2 className="section-title text-center mb-3">
              Why Customers Choose Us
            </h2>
            <p className="section-desc mx-auto" style={{ maxWidth: '680px' }}>
              Since 1999, Comfort Aircon has been committed to delivering reliable air conditioning products and services for homes, offices, and commercial establishments.</p>
          </div>

          <WhyChooseUsCards items={trustPoints} />
        </div>
      </section>

      {/* 6. CALL TO ACTION STRIP */}
      <section className="py-5 bg-dark-navy text-white text-center reveal-from-bottom">
        <div className="container-xxl py-3">
          <span className="text-primary-blue text-uppercase fw-bold letter-spacing-1 small d-block mb-2">
            EXPERIENCE OFFICIAL CARRIER &amp; TOSHIBA QUALITY
          </span>
          <h2 className="text-white fw-bold fs-2 mb-3">
            Ready to upgrade your home or commercial cooling?
          </h2>
          <p className="text-light opacity-75 mx-auto mb-4" style={{ maxWidth: '600px' }}>
            Book a free site consultation with our certified HVAC engineers or chat directly on WhatsApp for prompt quotations.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-custom-primary px-4 py-3 fw-bold"
              onClick={() => openAppointment()}
            >
              <i className="fa-solid fa-clipboard-check me-2"></i> Enquire Now
            </button>
            <a
              href={INITIAL_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2"
            >
              <i className="fa-brands fa-whatsapp fs-5"></i> WhatsApp Enquiry
            </a>
            <a
              href={INITIAL_CONTACT.phoneHref}
              className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2"
            >
              <i className="fa-solid fa-phone"></i> Call {INITIAL_CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

