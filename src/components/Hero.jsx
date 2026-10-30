'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useModal } from '@/context/ModalContext';

/**
 * Step dots representing key milestones across the scene:
 * 1. Warm Living Room (30°C)
 * 2. Carrier Split AC Ready
 * 3. AC Powers On (Display Lights Up)
 * 4. Cold Airflow & Room Cooling (30°C -> 24°C)
 * 5. Pure Cooling Refreshment & Happiness (24°C)
 */
const STEP_DOTS = [
  { name: 'Warm Living Room', p: 0.05 },
  { name: 'Carrier AC Ready', p: 0.25 },
  { name: 'AC Powers On', p: 0.45 },
  { name: 'Active Airflow & Cooling', p: 0.70 },
  { name: 'Pure Comfort Refreshment', p: 0.98 },
];

const PRELOAD_IMAGES = [
  '/hero/room-bg.webp',
  '/hero/ac-off.webp',
  '/hero/ac-on.webp',
  '/hero/girl-off.webp',
  '/hero/girl-happy.webp',
  '/hero/airflow.webp',
];

export default function Hero() {
  const { openAppointment } = useModal();

  // Component Refs
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const stageSceneRef = useRef(null);

  // Layer Refs for 60fps direct DOM animation (zero React re-render overhead)
  const roomWarmRef = useRef(null);
  const roomCoolRef = useRef(null);
  const airflowRef = useRef(null);
  const girlOffRef = useRef(null);
  const girlHappyRef = useRef(null);
  const acOffRef = useRef(null);
  const acOnRef = useRef(null);
  const ventPulseRef = useRef(null);
  const acBeepRef = useRef(null);
  const tempChipRef = useRef(null);
  const scrollHintRef = useRef(null);
  const progressBarRef = useRef(null);

  // Discrete state for temperature chip and active dot
  const [tempVal, setTempVal] = useState(30);
  const [tempLabel, setTempLabel] = useState('WARM');
  const [tempStatus, setTempStatus] = useState('warm');
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  // Ref cache to prevent duplicate state triggers
  const lastTempRef = useRef({ val: 30, label: 'WARM', status: 'warm' });
  const hasUserScrolledRef = useRef(false);

  // 1. Preload all hero photo assets on mount
  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /**
   * Helper: set temperature chip display
   */
  const setTempDisplay = useCallback((val, label, status) => {
    if (
      lastTempRef.current.val !== val ||
      lastTempRef.current.label !== label ||
      lastTempRef.current.status !== status
    ) {
      lastTempRef.current = { val, label, status };
      setTempVal(val);
      setTempLabel(label);
      setTempStatus(status);
    }
  }, []);

  /**
   * Set AC State (p: 0.20 to 0.50):
   * At p=0, AC is mounted and visible (ac-off).
   * Crossfade from ac-off to ac-on with cyan vent pulse and display beep.
   */
  const setAcOn = useCallback((p) => {
    if (!acOffRef.current || !acOnRef.current) return;

    if (p < 0.25) {
      // AC off, mounted on wall
      acOffRef.current.style.opacity = '1';
      acOffRef.current.style.transform = 'translate3d(0, 0, 0)';
      acOnRef.current.style.opacity = '0';
      if (ventPulseRef.current) ventPulseRef.current.style.opacity = '0';
      if (acBeepRef.current) acBeepRef.current.style.opacity = '0';
    } else if (p <= 0.45) {
      const pTurnOn = (p - 0.25) / 0.20;
      acOffRef.current.style.opacity = String(1 - pTurnOn);
      acOnRef.current.style.opacity = String(pTurnOn);

      // Soft cyan pulse ring at the vent
      if (ventPulseRef.current) {
        const pulseScale = 0.8 + 0.8 * pTurnOn;
        const pulseOpacity = Math.sin(pTurnOn * Math.PI);
        ventPulseRef.current.style.transform = `translate(-50%, -50%) scale(${pulseScale})`;
        ventPulseRef.current.style.opacity = String(pulseOpacity * 0.95);
      }

      // Display beep flash glow
      if (acBeepRef.current) {
        const beepOpacity =
          pTurnOn >= 0.2 && pTurnOn <= 0.8
            ? Math.sin(((pTurnOn - 0.2) / 0.6) * Math.PI)
            : 0;
        acBeepRef.current.style.opacity = String(beepOpacity);
      }
    } else {
      // AC on, display lit
      acOffRef.current.style.opacity = '0';
      acOnRef.current.style.opacity = '1';
      if (ventPulseRef.current) ventPulseRef.current.style.opacity = '0';
      if (acBeepRef.current) acBeepRef.current.style.opacity = '0';
    }
  }, []);

  /**
   * Set Airflow and Cool Room Reveal (p: 0.40 to 0.75):
   * Cold airflow expands from AC vent and room cools down.
   */
  const setCooling = useCallback(
    (p) => {
      // Airflow layer
      if (airflowRef.current) {
        if (p < 0.40) {
          airflowRef.current.style.opacity = '0';
          airflowRef.current.style.transform = 'scale(0.7) translate3d(0, 0, 0)';
        } else if (p <= 0.75) {
          const pCool = (p - 0.40) / 0.35;
          const scale = 0.7 + 0.3 * pCool;
          const ty = pCool * 10;
          airflowRef.current.style.opacity = String(pCool);
          airflowRef.current.style.transform = `scale(${scale}) translate3d(0, ${ty}px, 0)`;
        } else {
          airflowRef.current.style.opacity = '1';
          airflowRef.current.style.transform = 'scale(1) translate3d(0, 10px, 0)';
        }
      }

      // Cool Room mask reveal
      if (roomCoolRef.current) {
        if (p < 0.40) {
          roomCoolRef.current.style.opacity = '0';
          roomCoolRef.current.style.webkitMaskImage = 'none';
          roomCoolRef.current.style.maskImage = 'none';
        } else if (p <= 0.75) {
          const pCool = (p - 0.40) / 0.35;
          roomCoolRef.current.style.opacity = '1';
          const radius = Math.round(pCool * 130);
          const maskVal = `radial-gradient(circle at 50% 28%, #000 ${radius}%, transparent ${radius + 15}%)`;
          roomCoolRef.current.style.webkitMaskImage = maskVal;
          roomCoolRef.current.style.maskImage = maskVal;
        } else {
          roomCoolRef.current.style.opacity = '1';
          roomCoolRef.current.style.webkitMaskImage = 'none';
          roomCoolRef.current.style.maskImage = 'none';
        }
      }

      // Temperature chip count-down
      if (p < 0.45) {
        setTempDisplay(30, 'WARM', 'warm');
      } else if (p <= 0.75) {
        const pTemp = (p - 0.45) / 0.30;
        const currentTemp = Math.round(30 - 6 * pTemp);
        const label = pTemp < 0.5 ? 'COOLING DOWN' : 'COOLING';
        setTempDisplay(currentTemp, label, 'cooling');
      } else {
        setTempDisplay(24, 'COOLING', 'cool');
      }
    },
    [setTempDisplay]
  );

  /**
   * Set Girl State (p: 0.70 to 1.00):
   * At p=0, girl-off is standing comfortably in the room.
   * Crossfades to girl-happy (smiling, eyes closed) in refreshing cooling comfort.
   */
  const setGirlState = useCallback((p) => {
    if (!girlHappyRef.current || !girlOffRef.current) return;

    if (p < 0.70) {
      girlOffRef.current.style.opacity = '1';
      girlOffRef.current.style.transform = 'scale(1) translate3d(0, 0, 0)';
      girlHappyRef.current.style.opacity = '0';
      girlHappyRef.current.style.transform = 'scale(1) translate3d(0, 0, 0)';
    } else if (p <= 0.95) {
      const pHappy = (p - 0.70) / 0.25;
      girlOffRef.current.style.opacity = String(1 - pHappy);
      girlHappyRef.current.style.opacity = String(pHappy);
      const scale = 1 + 0.02 * pHappy;
      const ty = -8 * pHappy;
      girlOffRef.current.style.transform = `scale(${scale}) translate3d(0, ${ty}px, 0)`;
      girlHappyRef.current.style.transform = `scale(${scale}) translate3d(0, ${ty}px, 0)`;
    } else {
      girlOffRef.current.style.opacity = '0';
      girlHappyRef.current.style.opacity = '1';
      girlHappyRef.current.style.transform = 'scale(1.02) translate3d(0, -8px, 0)';
    }
  }, []);

  /**
   * Master progress coordinator
   */
  const updateProgress = useCallback(
    (p) => {
      const clamped = Math.max(0, Math.min(1, p));

      // CSS Variable
      if (stageSceneRef.current) {
        stageSceneRef.current.style.setProperty('--hero-progress', clamped.toFixed(4));
      }

      // Room warm is always 100% visible
      if (roomWarmRef.current) {
        roomWarmRef.current.style.opacity = '1';
      }

      setAcOn(clamped);
      setCooling(clamped);
      setGirlState(clamped);

      // Scroll hint fades out once user scrolls
      if (scrollHintRef.current) {
        const hintOpacity = clamped > 0.05 ? 0 : 1 - clamped / 0.05;
        scrollHintRef.current.style.opacity = String(hintOpacity);
        scrollHintRef.current.style.pointerEvents = clamped > 0.05 ? 'none' : 'auto';
      }

      // Progress bar fill
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${clamped * 100}%`;
      }

      // Active dot synchronization
      let dotIdx = 0;
      if (clamped >= 0.85) dotIdx = 4;
      else if (clamped >= 0.60) dotIdx = 3;
      else if (clamped >= 0.35) dotIdx = 2;
      else if (clamped >= 0.15) dotIdx = 1;
      setActiveStepIdx(dotIdx);
    },
    [setAcOn, setCooling, setGirlState]
  );

  /**
   * Pinned Scroll Engine:
   * Uses IntersectionObserver + requestAnimationFrame.
   * Auto-plays on mobile (<768px), respects prefers-reduced-motion.
   */
  const initHeroPin = useCallback(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    // Prefers-reduced-motion: jump straight to complete happy state
    const isReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
      updateProgress(1.0);
      return;
    }

    // Initialize with 100% visible initial scene
    updateProgress(0.0);

    // Mobile (<768px): No pinning. Play the sequence once over 3.5s when visible
    if (window.innerWidth < 768) {
      let hasPlayed = false;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasPlayed) {
            hasPlayed = true;
            const startTime = performance.now();
            const duration = 3500;
            const animate = (now) => {
              const elapsed = now - startTime;
              const p = Math.min(1, elapsed / duration);
              updateProgress(p);
              if (p < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(track);
      return () => observer.disconnect();
    }

    // Desktop & Tablet: Sticky Pinned Scroll Sequence
    let rafId = null;
    const handleScroll = () => {
      hasUserScrolledRef.current = true;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const trackRect = track.getBoundingClientRect();
        const stageHeight = stage.offsetHeight;
        const totalDist = track.offsetHeight - stageHeight;
        if (totalDist <= 0) return;

        const stickyTop = window.innerWidth >= 992 ? 64 : 54;
        const scrolled = stickyTop - trackRect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalDist));
        updateProgress(progress);
      });
    };

    // Only listen to scroll events when track intersects viewport (Zero CPU overhead)
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: true });
        } else {
          window.removeEventListener('scroll', handleScroll);
          if (track.getBoundingClientRect().top < 0) {
            updateProgress(1.0);
          } else {
            updateProgress(0.0);
          }
        }
      },
      { threshold: [0, 0.1, 1.0], rootMargin: '80px 0px 80px 0px' }
    );

    observer.observe(track);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateProgress]);

  useEffect(() => {
    const cleanup = initHeroPin();
    const handleResize = () => {
      if (cleanup) cleanup();
      initHeroPin();
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, [initHeroPin]);

  /**
   * Jump directly to step progress on dot click
   */
  const jumpToStep = (targetP) => {
    hasUserScrolledRef.current = true;
    if (window.innerWidth < 768) {
      updateProgress(targetP);
      return;
    }
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const stageHeight = stage.offsetHeight;
    const totalDist = track.offsetHeight - stageHeight;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const stickyTop = window.innerWidth >= 992 ? 64 : 54;
    const targetScroll = trackTop - stickyTop + targetP * totalDist;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div className="hero-scroll-track" ref={trackRef}>
      <section
        className="hero-section hero-sticky-stage position-relative overflow-hidden"
        ref={stageRef}
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
                <span>Authorized Carrier, Toshiba &amp; Midea AC Dealership</span>
              </div>

              <h1 className="hero-title fw-extrabold text-navy lh-sm mb-0">
                Complete Air <br />
                <span className="animated-gradient-text">Conditioning Solutions</span>
              </h1>

              {/* Subtitle / Company Introduction */}
              <p className="hero-subtitle text-secondary mb-0">
                Get professional AC installation, repair, and maintenance from our experienced team. We work with major AC brands to deliver reliable performance, efficient cooling, and customer satisfaction.
              </p>

              {/* Action Buttons */}
              <div className="hero-cta-group d-flex flex-wrap align-items-center gap-2 gap-sm-3">
                <button
                  type="button"
                  className="btn btn-hero-book rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                  onClick={() => openAppointment()}
                >
                  <i className="fa-regular fa-calendar-check fs-6"></i>
                  <span>Book a Service</span>
                </button>
                <a
                  href="#services"
                  className="btn btn-hero-explore rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <span>Explore Our Services</span>
                </a>
              </div>

              {/* Divider Line */}
              <hr className="hero-trust-divider" />

              {/* Trust Points */}
              <div className="hero-trust-row d-flex flex-wrap align-items-center gap-2 gap-md-3">
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

            {/* Right Column: Scroll-Driven Photo Layer Scene */}
            <div className="col-lg-6 col-xl-7 hero-img-container position-relative">
              {/* Soft Ambient Radial Glow Orb */}
              <div className="hero-img-glow" aria-hidden="true"></div>

              {/* Frosted Temperature Status Chip (Top-Left of Scene) - Always Visible */}
              <div
                className="hero-temp-chip"
                ref={tempChipRef}
                aria-live="polite"
                aria-atomic="true"
              >
                <i className="fa-solid fa-temperature-half temp-chip-icon"></i>
                <div className="temp-chip-info">
                  <div className="temp-chip-val-row">
                    <span className="temp-chip-num">{tempVal}°C</span>
                    <span
                      className={`temp-chip-status-dot dot-${tempStatus}`}
                      aria-hidden="true"
                    ></span>
                  </div>
                  <span className="temp-chip-tag">{tempLabel}</span>
                </div>
              </div>

              {/* Scroll To Experience Hint */}
              <div className="hero-scroll-hint" ref={scrollHintRef} aria-hidden="true">
                <span className="scroll-mouse-icon">
                  <span className="scroll-wheel-dot"></span>
                </span>
                <span className="scroll-hint-label">SCROLL TO EXPERIENCE</span>
              </div>

              {/* Photo Layers Stage with Radial Edge Fade Mask */}
              <div
                className="hero-scene-stage position-relative overflow-hidden"
                ref={stageSceneRef}
              >
                {/* Layer 1: Warm Living Room Background (Always 100% Visible) */}
                <img
                  ref={roomWarmRef}
                  src="/hero/room-bg.webp"
                  alt="Comfort Aircon Living Room Interior"
                  width={1200}
                  height={704}
                  className="hero-layer hero-layer-room-warm"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />

                {/* Layer 2: Cool Clean Living Room Reveal (Masked from AC Vent) */}
                <img
                  ref={roomCoolRef}
                  src="/hero/room-bg.webp"
                  alt=""
                  aria-hidden="true"
                  width={1200}
                  height={704}
                  className="hero-layer hero-layer-room-cool"
                  loading="eager"
                  decoding="async"
                />

                {/* Layer 3: Airflow Streaks and Snowflakes */}
                <img
                  ref={airflowRef}
                  src="/hero/airflow.webp"
                  alt=""
                  aria-hidden="true"
                  width={1200}
                  height={704}
                  className="hero-layer hero-layer-airflow"
                  loading="eager"
                  decoding="async"
                />

                {/* Layer 4: Girl Warm / Seeking Relief (Visible on Load) */}
                <img
                  ref={girlOffRef}
                  src="/hero/girl-off.webp"
                  alt="Homeowner seeking relief from indoor heat"
                  width={1200}
                  height={704}
                  className="hero-layer hero-layer-girl-off"
                  loading="eager"
                  decoding="async"
                />

                {/* Layer 5: Girl Happy / Comfort Refreshment */}
                <img
                  ref={girlHappyRef}
                  src="/hero/girl-happy.webp"
                  alt="Homeowner refreshed by Carrier AC cooling comfort"
                  width={1200}
                  height={704}
                  className="hero-layer hero-layer-girl-happy"
                  loading="eager"
                  decoding="async"
                />

                {/* Layer 6: Carrier Split AC (Mounted and Visible on Load) */}
                <img
                  ref={acOffRef}
                  src="/hero/ac-off.webp"
                  alt="Carrier Split AC Unit"
                  width={1200}
                  height={704}
                  className="hero-layer hero-layer-ac-off"
                  loading="eager"
                  decoding="async"
                />

                {/* Layer 7: Carrier Split AC (On State - Lit Display) */}
                <img
                  ref={acOnRef}
                  src="/hero/ac-on.webp"
                  alt=""
                  aria-hidden="true"
                  width={1200}
                  height={704}
                  className="hero-layer hero-layer-ac-on"
                  loading="eager"
                  decoding="async"
                />

                {/* Layer 8: Vent Cyan Pulse Ring Effect */}
                <div
                  ref={ventPulseRef}
                  className="hero-vent-pulse-ring"
                  aria-hidden="true"
                ></div>

                {/* Layer 9: Display Beep Glow Effect */}
                <div
                  ref={acBeepRef}
                  className="hero-ac-beep-glow"
                  aria-hidden="true"
                ></div>
              </div>

              {/* Phase Step Dots (Direct Interactive Jump) */}
              <div
                className="hero-carousel-indicators d-flex align-items-center justify-content-center"
                role="tablist"
                aria-label="Hero Scene Step Navigation"
              >
                {STEP_DOTS.map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={activeStepIdx === idx ? 'active' : ''}
                    onClick={() => jumpToStep(step.p)}
                    aria-label={step.name}
                    title={step.name}
                  />
                ))}
              </div>

              {/* Thin 3px Progress Bar at Bottom of Stage */}
              <div className="hero-stage-progress-track" aria-hidden="true">
                <div ref={progressBarRef} className="hero-stage-progress-fill" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
