'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

export default function ServiceAreasSection() {
  const { openAppointment } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const areas = [
    {
      id: 'pondicherry',
      name: 'Pondicherry',
      badge: 'Main Hub & Showroom',
      badgeBg: '#E0F2FE',
      badgeColor: '#0369A1',
      icon: 'fa-solid fa-city',
      iconBg: 'rgba(0, 120, 191, 0.1)',
      iconColor: 'var(--primary-blue)',
      tagline: 'Carrier Flagship Hub & Direct Showroom',
      desc: 'Complete Carrier, Toshiba & Midea sales showroom, extensive warehouse inventory, genuine spare parts, and dedicated certified technician dispatch across Puducherry.',
      tags: ['White Town', 'Lawspet', 'Muthialpet', 'Saram', 'Villianur', 'Kalapet', 'Reddiarpalayam', 'Gorimedu'],
      features: [
        'Authorized Carrier, Toshiba & Midea Hub',
        'Same-Day Delivery & Installation',
        '2-Hour Rapid Technician Assistance',
        '100% Genuine Spare Parts & Warranty',
      ],
      whatsappPhone: '919843020486',
      whatsappText: 'Hi Comfort Aircon, I need AC service / enquiry in Pondicherry.',
    },
    {
      id: 'villupuram',
      name: 'Villupuram',
      badge: 'Full District Reach',
      badgeBg: '#E0F2FE',
      badgeColor: '#0369A1',
      icon: 'fa-solid fa-truck-ramp-box',
      iconBg: 'rgba(0, 120, 191, 0.1)',
      iconColor: 'var(--primary-blue)',
      tagline: 'Doorstep Sales & Commercial HVAC Hub',
      desc: 'Doorstep Carrier sales consultation, residential split AC setups, commercial VRF execution, and authorized warranty support throughout the Villupuram district.',
      tags: ['Villupuram Town', 'Tindivanam', 'Vikravandi', 'Valavanur', 'Gingee', 'Mailam', 'Kandachipuram'],
      features: [
        'Doorstep Site Survey & Consultation',
        'Express District Dispatch Fleet',
        'Certified Field Service Technicians',
        'Residential & Commercial VRF Experts',
      ],
      whatsappPhone: '919843020486',
      whatsappText: 'Hi Comfort Aircon, I need AC service / enquiry in Villupuram.',
    },
    {
      id: 'cuddalore',
      name: 'Cuddalore',
      badge: 'Coastal & Industrial',
      badgeBg: '#D1FAE5',
      badgeColor: '#047857',
      icon: 'fa-solid fa-industry',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10B981',
      tagline: 'Heavy-Duty & Coastal Corrosion-Resistant ACs',
      desc: 'Specialized coastal anti-corrosion blue-fin cooling units, turnkey industrial VRF plants, commercial cassette installations, and comprehensive AMC contracts for Cuddalore & SIPCOT.',
      tags: ['Cuddalore Port', 'Old Town (OT)', 'Manjakuppam', 'Panruti', 'Neyveli', 'Chidambaram', 'SIPCOT Belt'],
      features: [
        'Anti-Corrosion Coastal Heavy-Duty ACs',
        'Industrial & Commercial HVAC Engineering',
        'On-Site Preventive Maintenance & AMC',
        'Rapid Chemical Jet Washing Service',
      ],
      whatsappPhone: '919843020458',
      whatsappText: 'Hi Comfort Aircon, I need AC service / enquiry in Cuddalore.',
    },
    {
      id: 'nearby',
      name: 'Nearby Areas',
      badge: 'Nearby Regional Corridors',
      badgeBg: '#FEF3C7',
      badgeColor: '#B45309',
      icon: 'fa-solid fa-compass',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: '#F59E0B',
      tagline: 'Eco Villa Climate Control & Highway Corridors',
      desc: 'Premium villa VRF climate control, resort cooling solutions, highway commercial complexes, and priority mobile van service for regional connecting zones.',
      tags: ['Auroville', 'Marakkanam', 'ECR Coastal Belt', 'NH-45 Corridor', 'Sedarapet Industrial', 'JIPMER Area'],
      features: [
        'Eco Ultra-Quiet Inverter AC Systems',
        'Luxury Villa & Heritage Resort VRF Specialists',
        'Mobile Service Van with Precision Tools',
        'Prompt On-Call Preventive Servicing',
      ],
      whatsappPhone: '919843020486',
      whatsappText: 'Hi Comfort Aircon, I need AC service / enquiry in Auroville or nearby areas.',
    },
  ];

  const totalSlides = areas.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(timer);
  }, [totalSlides, isPaused]);

  return (
    <section className="service-areas-section" id="areas">
      <div className="container-xxl">
        <div className="row align-items-center gy-5">
          {/* Left Column: Eyebrow, Heading, Lead & One-by-One Area Slider */}
          <div className="col-lg-6 col-xl-6">
            <div className="pe-xl-2 mb-4 mb-lg-0">
              <span className="section-tag mb-2 d-inline-flex align-items-center">
                <i className="fa-solid fa-map-location-dot me-1"></i> SERVICE AREAS
              </span>
              <h2 className="section-title display-6 fw-bold mb-3">
                Our Regional Service <span className="gradient-word">Areas</span>
              </h2>
              <p className="text-muted fs-6 mb-3" style={{ maxWidth: '540px' }}>
                Delivering authorized Carrier AC sales, precision installation, and
                prompt on-site maintenance across Pondicherry, Villupuram,
                Cuddalore, and nearby regional belts.
              </p>

              {/* Interactive Area Selector Tabs */}
              <div className="area-tabs-nav d-flex flex-wrap gap-2 mb-3">
                {areas.map((area, idx) => (
                  <button
                    key={area.id}
                    type="button"
                    className={`btn btn-sm rounded-pill area-tab-btn ${currentSlide === idx ? 'active' : ''
                      }`}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`View ${area.name} coverage`}
                  >
                    <i className={`${area.icon} me-1`}></i>
                    {area.name}
                  </button>
                ))}
              </div>

              {/* Area Slider Container (One-by-one slide) */}
              <div
                className="area-slider-container position-relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="area-slider-overflow">
                  <div
                    className="area-slider-track d-flex"
                    id="areaSliderTrack"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                      transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                  >
                    {areas.map((area) => (
                      <div className="area-slide-single" key={area.id}>
                        <div className="area-card w-100 shadow-sm border">
                          {/* Card Header */}
                          <div className="area-card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="area-icon-box"
                                style={{ background: area.iconBg, color: area.iconColor }}
                              >
                                <i className={area.icon}></i>
                              </div>
                              <div>
                                <span
                                  className="area-badge-primary"
                                  style={{ background: area.badgeBg, color: area.badgeColor }}
                                >
                                  {area.badge}
                                </span>
                                <h3 className="fw-bold fs-4 mb-0 text-dark-navy">
                                  {area.name}
                                </h3>
                              </div>
                            </div>
                            <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill small">
                              <i className="fa-regular fa-clock text-primary me-1"></i> Rapid Dispatch Hub
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-secondary small mb-3 lh-base">
                            {area.desc}
                          </p>

                          {/* Key Locations / Service Corridors */}
                          <div className="mb-3">
                            <div className="small fw-bold text-dark-navy mb-2 d-flex align-items-center gap-1">
                              <i className="fa-solid fa-location-dot text-primary"></i>
                              <span>Key Coverage Zones &amp; Localities:</span>
                            </div>
                            <div className="area-locations-tags">
                              {area.tags.map((tag) => (
                                <span className="location-tag" key={tag}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Features Grid */}
                          <div className="area-features-box p-3 rounded-3 mb-4">
                            <div className="row g-2">
                              {area.features.map((feat) => (
                                <div className="col-sm-6 col-12" key={feat}>
                                  <div className="d-flex align-items-center gap-2">
                                    <i className="fa-solid fa-circle-check text-success fs-6 flex-shrink-0"></i>
                                    <span className="small text-dark-navy fw-medium">
                                      {feat}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="area-action-btns d-flex justify-content-center align-items-center w-100">
                            <button
                              type="button"
                              className="btn btn-custom-primary rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center justify-content-center gap-2 shadow-sm"
                              onClick={() => openAppointment()}
                            >
                              <i className="fa-solid fa-clipboard-check fs-6"></i>
                              <span>Book Service</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Area Slider Controls */}

              </div>
            </div>
          </div>

          {/* Right Column: Dedicated HVAC Excellence Graphic */}
          <div className="col-lg-6 col-xl-6">
            <div className="area-hero-graphic-wrap position-relative mx-auto text-center">
              {/* Big Circular Graphic Backdrop */}
              <div className="area-circle-backdrop">
                <div className="area-circle-inner-warm"></div>
              </div>

              {/* Large 3 HVAC Technicians Image */}
              <img
                src="/images/Group-315-1.png"
                alt="Comfort Aircon Dedicated HVAC Excellence Technical Team"
                className="img-fluid area-technicians-img position-relative z-2"
              />

              {/* Floating Certified Field Team Trust Badge */}
              <div className="area-floating-trust-badge shadow-lg d-inline-flex align-items-center gap-3 position-absolute">
                <div className="badge-icon-circle bg-primary-blue text-white shadow-xs">
                  <i className="fa-solid fa-award fs-4"></i>
                </div>
                <div className="text-start">
                  <span className="d-block fw-bold text-dark-navy small leading-tight">
                    Certified Field Team
                  </span>
                  <small className="text-muted" style={{ fontSize: '0.74rem' }}>
                    Carrier, Toshiba &amp; Midea Authorized
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
