'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { SERVICES_CATALOG, INITIAL_CONTACT } from '@/data/mockData';

export default function ServicesPage() {
  const { openAppointment } = useModal();
  const workflowSectionRef = useRef(null);
  const catalogSectionRef = useRef(null);
  const [expandedService, setExpandedService] = useState(null);
  const [activeWfSlide, setActiveWfSlide] = useState(0);
  const [isWfPaused, setIsWfPaused] = useState(false);

  const workflowSlides = [
    { img: '/images/1.png', alt: 'Precision HVAC installation and copper piping' },
    { img: '/images/2.png', alt: 'Diagnostic survey and microprocessor testing' },
    { img: '/images/3.png', alt: 'High pressure coil hydro wash and coil cleaning' },
    { img: '/images/4.png', alt: 'Digital micron gauge testing and vacuum execution' },
  ];

  const toggleScope = (id) => {
    setExpandedService((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (isWfPaused) return;
    const timer = setInterval(() => {
      setActiveWfSlide((prev) => (prev + 1) % workflowSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isWfPaused, workflowSlides.length]);

  useEffect(() => {
    const catalogEl = catalogSectionRef.current;
    if (!catalogEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          catalogEl.classList.add('in-view');
          observer.unobserve(catalogEl);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(catalogEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = workflowSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const serviceWorkflow = [
    {
      step: '01',
      title: 'Enquire & Book',
      desc: 'Submit your requirement online, via WhatsApp, or call our Pondicherry desk for an immediate response.',
      icon: 'fa-solid fa-clipboard-check',
    },
    {
      step: '02',
      title: 'Diagnostic Site Survey',
      desc: 'Certified engineers inspect your site, perform heat load or fault checks, and provide an itemized BOQ.',
      icon: 'fa-solid fa-magnifying-glass-chart',
    },
    {
      step: '03',
      title: 'Precision Execution',
      desc: 'Work carried out using calibrated tools, pure virgin refrigerants, and factory-certified Carrier & Toshiba procedures.',
      icon: 'fa-solid fa-wrench',
    },
    {
      step: '04',
      title: 'Quality Testing & Handover',
      desc: 'Digital delta-T airflow measurement, amperage audit, warranty certificate issuance, and complete site cleanup.',
      icon: 'fa-solid fa-shield-halved',
    },
  ];

  const servicePillars = [
    {
      icon: 'fa-solid fa-gauge-high',
      title: 'Digital Vacuum Gauge Testing',
      desc: 'Every installation is vacuumed to under 500 microns to prevent internal acid formation and compressor burnouts.',
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: '100% Genuine OEM Spares',
      desc: 'Authorized Carrier & Toshiba PCB controllers, fan motors, sensors, and virgin R32/R410A refrigerants.',
    },
    {
      icon: 'fa-solid fa-bolt',
      title: 'Same-Day Response Time',
      desc: 'Rapid emergency response across Pondicherry, Villupuram, and Cuddalore with fully-stocked service vans.',
    },
    {
      icon: 'fa-solid fa-hand-holding-dollar',
      title: 'Transparent Fixed Pricing',
      desc: 'Clear itemized billing for copper piping, brackets, and service with zero hidden surprises.',
    },
  ];

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
            <li className="active">Services</li>
          </ul>

          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="subpage-title">
                Reliable AC Services for <span className="text-primary-blue">Every Space</span>
              </h1>
              <p className="subpage-lead">
                From AC installation and repair to routine maintenance, Comfort Aircon delivers dependable cooling solutions for homes, offices, and commercial spaces across .
              </p>


            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPLETE AIR CONDITIONING SOLUTIONS (4x2 CATALOGUE GRID) */}
      <section
        className="catalog-section"
        ref={catalogSectionRef}
        aria-labelledby="catalog-main-heading"
      >
        <div className="catalog-container">
          {/* Section Header */}
          <div className="catalog-header">
            <span className="catalog-eyebrow">
              <i className="fa-solid fa-list-check me-1" aria-hidden="true"></i> SERVICE CATALOGUE
            </span>
            <h2 id="catalog-main-heading" className="catalog-title">
              Complete Air Conditioning <span className="catalog-title-accent">Solutions</span>
            </h2>
            <div className="catalog-underline-bar" aria-hidden="true"></div>
            <p className="catalog-subtitle">
              All 8 specialized services executed by factory-certified HVAC technicians supporting Carrier and Toshiba air conditioning systems.
            </p>
          </div>

          {/* 4x2 Responsive Cards Grid */}
          <ul className="catalog-grid">
            {SERVICES_CATALOG.map((service, index) => {
              const waMessage = encodeURIComponent(
                `Hi Comfort Aircon, I want to enquire about ${service.title} for my air conditioner in Pondicherry.`
              );
              const waUrl = `https://wa.me/919843020486?text=${waMessage}`;

              return (
                <li className="catalog-item" key={service.id}>
                  <article className="catalog-card">
                    {/* Top 4:3 Image Media Area */}
                    <div className="card-media">
                      <img
                        src={service.img}
                        alt={`${service.title} - Comfort Aircon Pondicherry`}
                        loading="lazy"
                        className="card-media-img"
                      />
                      <div className="card-media-gradient" aria-hidden="true"></div>

                      {/* Hover Slide-up Navy Checklist Overlay */}
                      <div className="card-scope-overlay" aria-label="Service Scope and Checklist">
                        <div className="card-scope-header">
                          <i className="fa-solid fa-clipboard-list" aria-hidden="true"></i>
                          <span>SERVICE SCOPE &amp; CHECKLIST</span>
                        </div>
                        <ul className="card-scope-list">
                          {service.features.map((feature, fIdx) => (
                            <li className="card-scope-item" key={fIdx}>
                              <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="card-body-content">
                      <h3 className="card-service-title">{service.title}</h3>
                      <p className="card-service-desc">{service.shortDesc}</p>

                      {/* Touch Scope Toggle for Mobile/Tablet */}
                      <button
                        type="button"
                        className="card-touch-scope-btn d-xl-none"
                        onClick={() => toggleScope(service.id)}
                        aria-expanded={expandedService === service.id}
                        aria-controls={`scope-tray-${service.id}`}
                      >
                        <span>{expandedService === service.id ? 'Hide Scope' : 'View Scope & Checklist'}</span>
                        <i className={`fa-solid fa-chevron-${expandedService === service.id ? 'up' : 'down'} ms-1`} aria-hidden="true"></i>
                      </button>

                      <div
                        id={`scope-tray-${service.id}`}
                        className={`card-touch-scope-tray d-xl-none ${expandedService === service.id ? 'is-expanded' : ''}`}
                      >
                        <h4 className="card-touch-scope-title">Service Scope &amp; Checklist:</h4>
                        <ul className="card-touch-scope-list">
                          {service.features.map((feature, fIdx) => (
                            <li key={fIdx}>
                              <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Reduced Motion Checklist Fallback */}
                      <div className="card-reduced-motion-checklist">
                        <h4 className="card-touch-scope-title">Service Scope &amp; Checklist:</h4>
                        <ul>
                          {service.features.map((feature, fIdx) => (
                            <li key={fIdx}>
                              <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer: Full-width Enquire Button + WhatsApp & Call Icon Buttons */}
                    <div className="card-footer-row">
                      <button
                        type="button"
                        className="btn-card-enquire"
                        onClick={() => openAppointment()}
                        aria-label={`Enquire now about ${service.title}`}
                      >
                        <span>Enquire Now</span>
                        <i className="fa-solid fa-arrow-right btn-enquire-arrow" aria-hidden="true"></i>
                      </button>

                      <div className="card-actions-icons">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-icon btn-card-icon-wa"
                          aria-label={`Chat about ${service.title} on WhatsApp`}
                          title="Chat on WhatsApp"
                        >
                          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                        </a>
                        <a
                          href={INITIAL_CONTACT.phoneHref}
                          className="btn-card-icon btn-card-icon-call"
                          aria-label={`Call about ${service.title}`}
                          title={`Call ${INITIAL_CONTACT.phone}`}
                        >
                          <i className="fa-solid fa-phone" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3. OUR 4-STEP SERVICE WORKFLOW SECTION */}
      <section className="wf-section" ref={workflowSectionRef} aria-labelledby="wf-main-heading">
        <div className="wf-container">
          <div className="wf-grid">
            {/* Left Column (about 1/3): Navy Card */}
            <aside className="wf-left-panel">
              <div className="wf-left-content">
                <div className="wf-eyebrow">
                  <span className="wf-eyebrow-line" aria-hidden="true"></span>
                  <span className="wf-eyebrow-text">HOW WE WORK</span>
                </div>
                <h2 id="wf-main-heading" className="wf-heading">
                  Our 4-Step Service <span className="wf-shimmer-word">Workflow</span>
                </h2>
                <p className="wf-lead">
                  Structured, transparent, and prompt air conditioning service delivery from initial contact to post-service warranty.
                </p>
              </div>

              {/* Auto-sliding Image Carousel Filling the Middle Space (Clean photos without text or badges) */}
              <div
                className="wf-slider-card"
                onMouseEnter={() => setIsWfPaused(true)}
                onMouseLeave={() => setIsWfPaused(false)}
                aria-label="Service execution slideshow"
              >
                <div className="wf-slider-slides">
                  {workflowSlides.map((slide, sIdx) => (
                    <div
                      key={sIdx}
                      className={`wf-slider-slide ${sIdx === activeWfSlide ? 'is-active' : ''}`}
                      aria-hidden={sIdx !== activeWfSlide}
                    >
                      <img
                        src={slide.img}
                        alt={slide.alt || 'Comfort Aircon Service Execution'}
                        loading="lazy"
                        className="wf-slider-img"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="wf-left-footer">
                <div className="wf-divider" aria-hidden="true"></div>
                <a
                  href={INITIAL_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wf-btn-enquire"
                  aria-label="Enquire & Book Air Conditioning Service on WhatsApp"
                >
                  <span>Enquire &amp; Book</span>
                  <i className="fa-solid fa-arrow-right wf-btn-arrow" aria-hidden="true"></i>
                </a>
              </div>
            </aside>

            {/* Right Column (about 2/3): Vertical Timeline of 4 Steps */}
            <div className="wf-right-column">
              <ol className="wf-timeline">
                {serviceWorkflow.map((item, idx) => (
                  <li className="wf-timeline-item" key={item.step}>
                    {/* Circle Tracker & Connector Line */}
                    <div className="wf-tracker">
                      <div
                        className={`wf-circle ${idx === 3 ? 'wf-circle-navy' : 'wf-circle-blue'}`}
                        aria-hidden="true"
                      >
                        <i className={item.icon}></i>
                      </div>
                      {idx < 3 && <div className="wf-connector" aria-hidden="true"></div>}
                    </div>

                    {/* White Card */}
                    <div className="wf-step-card">
                      <span className="wf-step-chip">STEP {item.step}</span>
                      <h3 className="wf-step-title">{item.title}</h3>
                      <p className="wf-step-desc">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY OUR SERVICE STANDARDS LEAD PONDICHERRY */}
      <section className="services-standards-section py-5 border-top border-bottom" style={{ backgroundColor: '#F4F8FA' }}>
        <div className="container-xxl py-4">
          <div className="row align-items-center gy-4">
            <div className="col-lg-5">
              <span
                className="section-tag mb-2"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  width: 'fit-content',
                  gap: '6px',
                  padding: '3px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  borderRadius: '50px',
                  border: '1px solid rgba(0, 120, 191, 0.28)',
                  background: 'rgba(0, 120, 191, 0.08)',
                  color: '#0078BF',
                }}
              >
                <i className="fa-solid fa-shield-halved" style={{ fontSize: '0.7rem' }}></i> SERVICE QUALITY ASSURANCE
              </span>
              <h2
                className="section-title text-start mb-3"
                style={{ color: '#162E5C', fontWeight: 800 }}
              >
                Precision Standards You Can Rely On
              </h2>
              <p className="text-lead mb-4">
                Pondicherry’s coastal humidity and salt-laden air demand rigorous service discipline. We use specialized equipment to maximize your cooling equipment’s operational life.
              </p>
              <div className="p-3 bg-white rounded-4 border shadow-xs d-flex align-items-center gap-3 mb-3">
                <i className="fa-solid fa-location-dot text-primary-blue fs-3"></i>
                <div>
                  <h6 className="fw-bold text-dark-navy mb-0">Covering All Key Service Areas</h6>
                  <small className="text-muted">
                    Pondicherry (White Town, Lawspet, Thattanchavady, Villianur), Villupuram, Cuddalore, Auroville.
                  </small>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {servicePillars.map((pillar) => (
                  <div className="col-sm-6" key={pillar.title}>
                    <div className="about-card-modern h-100 p-4">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <div className="text-primary-blue fs-4">
                          <i className={pillar.icon}></i>
                        </div>
                        <h5 className="fw-bold text-dark-navy fs-6 mb-0">{pillar.title}</h5>
                      </div>
                      <p className="text-muted small mb-0">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP */}
      <section className="py-5 bg-dark-navy text-white text-center">
        <div className="container-xxl py-3">
          <span className="text-primary-blue text-uppercase fw-bold letter-spacing-1 small d-block mb-2">
            PUDUCHERRY, VILLUPURAM &amp; CUDDALORE
          </span>
          <h2 className="text-white fw-bold fs-2 mb-3">
            Experiencing cooling issues or need a new installation?
          </h2>
          <p className="text-light opacity-75 mx-auto mb-4" style={{ maxWidth: '600px' }}>
            Book a service visit today. On mobile, tap Call to open your phone dialer directly with our business number.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-custom-primary px-4 py-3 fw-bold"
              onClick={() => openAppointment()}
            >
              <i className="fa-solid fa-calendar-check me-2"></i> Book Service Online
            </button>
            <a
              href={INITIAL_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2"
            >
              <i className="fa-brands fa-whatsapp fs-5"></i> WhatsApp Us
            </a>
            <a
              href={INITIAL_CONTACT.phoneHref}
              className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2"
            >
              <i className="fa-solid fa-phone"></i> Tap to Call {INITIAL_CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
