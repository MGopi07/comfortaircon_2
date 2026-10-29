'use client';

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';

function subscribe(callback) {
  if (typeof window === 'undefined') return () => { };
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getWindowItemsPerView() {
  if (typeof window === 'undefined') return 2;
  if (window.innerWidth < 768) return 1;
  return 2;
}

function getServerItemsPerView() {
  return 2;
}

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote:
        'Comfort Aircon provided excellent service when we purchased our new AC. The installation was smooth, the team was professional, and everything was completed on time.',
      name: 'R. Kumar',
      role: 'Homeowner, Pondicherry',
      tag: 'Reliable AC Installation',
      avatar: '/images/avatar_1.jpg',
    },
    {
      id: 2,
      quote:
        'Very happy with their AC servicing and maintenance. The technicians were knowledgeable, explained the issue clearly, and ensured our air conditioner worked efficiently.',
      name: 'S. Priya',
      role: 'Residential Customer, Pondicherry',
      tag: 'Professional AC Servicing',
      avatar: '/images/avatar_2.jpg',
    },
    {
      id: 3,
      quote:
        'We contacted Comfort Aircon for our office AC installation and received excellent support throughout the process. Their team delivered quality work with great attention to detail.',
      name: 'V. Suresh',
      role: 'Business Owner, Pondicherry',
      tag: 'Quality Cooling Solutions',
      avatar: '/images/avatar_3.jpg',
    },
    {
      id: 4,
      quote:
        'Great experience with Comfort Aircon! Their staff were friendly, responsive, and helpful in choosing the right AC for our needs. Highly recommended for AC sales and service.',
      name: 'M. Lakshmi',
      role: 'Customer, Pondicherry',
      tag: 'Excellent Customer Support',
      avatar: '/images/avatar_4.jpg',
    },
  ];

  // Clone first 2 items at the end so cards roll continuously without showing blank page
  const extendedTestimonials = [
    ...testimonials.map((t, i) => ({ ...t, _key: `orig-${t.id}-${i}` })),
    ...testimonials.slice(0, 2).map((t, i) => ({ ...t, _key: `post-${t.id}-${i}` })),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const itemsPerView = useSyncExternalStore(
    subscribe,
    getWindowItemsPerView,
    getServerItemsPerView
  );

  const isSlidingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const handleNext = useCallback(() => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev === 0) return testimonials.length - 1;
      return prev - 1;
    });
  }, [testimonials.length]);

  const goToSlide = useCallback((idx) => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex(idx);
  }, []);

  const handleTransitionEnd = () => {
    isSlidingRef.current = false;
    if (currentIndex >= testimonials.length) {
      // Cloned cards are visible in place. Reset to index 0 silently with no transition.
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  // Safety unlock if transitionend does not trigger
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      isSlidingRef.current = false;
    }, 700);
    return () => clearTimeout(safetyTimer);
  }, [currentIndex]);

  // Auto Slider Timer: 3.8s interval, paused on hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch Swipe Handlers for mobile & tablets
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const activeDot = currentIndex % testimonials.length;
  const gapPart = (20 / itemsPerView) * currentIndex;
  const transformStyle = `translateX(calc(-1 * (${currentIndex} * 100% / ${itemsPerView} + ${gapPart}px)))`;
  const cardWidthStyle = `calc((100% - ${(itemsPerView - 1) * 20}px) / ${itemsPerView})`;

  return (
    <section
      className="testimonial-ref-section py-6 overflow-hidden position-relative"
      id="testimonials"
    >
      <div className="container-xxl position-relative z-2">
        {/* Centered Section Header */}
        <div className="text-center max-w-750 mx-auto mb-5">
          <span className="section-tag mb-2 d-inline-flex align-items-center">
            <i className="fa-solid fa-comments me-1"></i> TESTIMONIALS
          </span>
          <h2 className="testimonial-heading text-center">
            What Our <span className="gradient-word">Customers Say</span>
          </h2>
          <p className="testimonial-lead text-center mx-auto mb-3">
            We take pride in delivering reliable air conditioning solutions, professional installation, and excellent customer service to homes and businesses across Pondicherry.
          </p>
          <div className="d-inline-flex align-items-center gap-2 bg-white px-3 py-1.5 rounded-pill shadow-xs border">
            <span className="fw-bold text-dark-navy fs-6">4.7</span>
            <span className="text-warning small d-inline-flex gap-1">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </span>
            <span className="text-muted small fw-medium">
              (120+ Reviews on Google Business)
            </span>
          </div>
        </div>

        {/* Centered Continuous Auto Slider Card Container */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <div
              className="testimonial-slider-container position-relative mx-auto"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="testimonial-slider-overflow">
                <div
                  className="testimonial-slider-track"
                  style={{
                    transform: transformStyle,
                    transition: isTransitioning
                      ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
                      : 'none',
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {extendedTestimonials.map((t) => (
                    <div
                      className="testimonial-slide-card"
                      key={t._key}
                      style={{
                        flex: `0 0 ${cardWidthStyle}`,
                        minWidth: cardWidthStyle,
                      }}
                    >
                      <div className="t-card-inner">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <div className="text-warning small d-inline-flex gap-1">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
                          <span className="badge bg-light text-primary-blue border fw-semibold small">
                            {t.tag}
                          </span>
                        </div>
                        <p className="t-card-quote">&ldquo;{t.quote}&rdquo;</p>
                        <div className="t-card-author d-flex align-items-center gap-3 mt-auto">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="t-card-avatar"
                            loading="lazy"
                          />
                          <div>
                            <h6 className="t-author-name mb-0">{t.name}</h6>
                            <span className="t-author-role">{t.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
