'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '@/context/ModalContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;
const getFramePath = (index) => {
  const num = String(index + 1).padStart(4, '0');
  return `/frames/frame_${num}.jpg`;
};

// 3 Dynamic stages synced with the 3D scroll explosion
const STAGES = [
  {
    badge: 'Authorized Carrier, Toshiba & Midea AC Dealership',
    dotColor: '#10b981',
    stepName: 'Overview',
    titleLight: 'Complete Air',
    titleGradient: 'Conditioning Solutions',
    desc: 'Get professional AC installation, repair, and maintenance from our experienced team. We work with major AC brands to deliver reliable performance, efficient cooling, and customer satisfaction.',
    ctaPrimary: 'Book a Service',
    ctaSecondary: 'Explore Our Services',
    trust: [
      { highlight: '100% Genuine', muted: 'Carrier Units' },
      { highlight: 'Certified Expert', muted: 'Technicians' },
      { highlight: 'Same-Day Service', muted: 'Response' },
    ],
  },
  {
    badge: 'Precision Engineering & Copper Condenser',
    dotColor: '#38bdf8',
    stepName: 'Components',
    titleLight: 'Heavy-Duty Copper',
    titleGradient: '& Inverter Power',
    desc: '100% inner-grooved copper coils, intelligent dual-inverter compressor, and high-efficiency heat exchangers engineered to deliver relentless cooling even in 52°C extreme summer heat.',
    ctaPrimary: 'Book a Service',
    ctaSecondary: 'Explore Inverter Tech',
    trust: [
      { highlight: '100% Copper', muted: 'Condenser Coils' },
      { highlight: 'Dual Inverter', muted: 'Compressor' },
      { highlight: 'Up to 55%', muted: 'Energy Savings' },
    ],
  },
  {
    badge: 'Intelligent Airflow & Advanced Filtration',
    dotColor: '#00f0ff',
    stepName: 'Airflow',
    titleLight: '3D Surround Airflow',
    titleGradient: '& Pure Filtration',
    desc: 'Advanced micro-dust filters, PM2.5 purification, and whisper-quiet cross-flow blowers delivering instant room chilling in under 60 seconds with 19dB silent night operation.',
    ctaPrimary: 'Book a Service',
    ctaSecondary: 'Explore Pure Airflow',
    trust: [
      { highlight: 'Instant Chill', muted: 'Under 60 Sec' },
      { highlight: 'PM2.5 Pure Air', muted: 'Protection' },
      { highlight: 'Whisper Quiet', muted: '19dB Operation' },
    ],
  },
];

export default function Hero() {
  const { openAppointment } = useModal();
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);

  // Smoothly scroll to a specific stage if user clicks the indicator
  const goToStage = (targetStage) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const trackTop = rect.top + scrollTop;
    const trackHeight = track.offsetHeight - window.innerHeight;

    const targetPct = targetStage === 0 ? 0.05 : targetStage === 1 ? 0.48 : 0.85;
    const destY = trackTop + trackHeight * targetPct;
    window.scrollTo({ top: destY, behavior: 'smooth' });
  };

  // Render a given frame to the canvas with crisp high-DPI resolution & cover scaling
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pick target image or gracefully find the closest loaded frame to avoid any black screen
    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = index - 1; i >= 0; i--) {
        const fallback = imagesRef.current[i];
        if (fallback && fallback.complete && fallback.naturalWidth > 0) {
          img = fallback;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Scale to fill the canvas area crisply and prominently
    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const baseRatio = Math.min(hRatio, vRatio);
    const ratio = baseRatio;

    const drawWidth = img.naturalWidth * ratio;
    const drawHeight = img.naturalHeight * ratio;
    const shiftX = (width - drawWidth) / 2;
    const shiftY = (height - drawHeight) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      shiftX,
      shiftY,
      drawWidth,
      drawHeight
    );

    // Seamless edge feathering: smoothly dissolves the canvas boundary into the background
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';

    // 1. Horizontal boundary fade: smooth 14% dissolution on left and right
    const hGrad = ctx.createLinearGradient(0, 0, width, 0);
    hGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    hGrad.addColorStop(0.14, 'rgba(0, 0, 0, 1)');
    hGrad.addColorStop(0.86, 'rgba(0, 0, 0, 1)');
    hGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = hGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Vertical boundary fade: smooth 6% dissolution on top and 8% on bottom
    const vGrad = ctx.createLinearGradient(0, 0, 0, height);
    vGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vGrad.addColorStop(0.06, 'rgba(0, 0, 0, 1)');
    vGrad.addColorStop(0.92, 'rgba(0, 0, 0, 1)');
    vGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = vGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Top-right corner dissolution: softly dissolves the baked-in studio light ray
    // so it melts seamlessly into the background without any visible corner boundary
    const trGrad = ctx.createRadialGradient(
      width, 0, 0,
      width, 0, Math.max(width * 0.32, height * 0.55)
    );
    trGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    trGrad.addColorStop(0.55, 'rgba(0, 0, 0, 0.35)');
    trGrad.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.fillStyle = trGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  };

  // Sync canvas pixel resolution with CSS layout size and devicePixelRatio
  const updateCanvasResolution = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
    drawFrame(currentFrameRef.current);
  };

  // Preload frames progressively
  useEffect(() => {
    let isMounted = true;
    const images = [];

    // Load initial frame immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      if (!isMounted) return;
      setIsLoaded(true);
      updateCanvasResolution();
      drawFrame(0);
    };
    images[0] = firstImg;

    // Load remaining frames asynchronously
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // Set up ResizeObserver to maintain sharp canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    updateCanvasResolution();

    const ro = new ResizeObserver(() => {
      updateCanvasResolution();
    });
    ro.observe(canvas);

    window.addEventListener('resize', updateCanvasResolution);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateCanvasResolution);
    };
  }, []);

  // GSAP ScrollTrigger sequence animation
  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const ctx = gsap.context(() => {
      // Both desktop and mobile: scrub all 120 frames across the full scroll track
      // The hero stays pinned until the 3D scroll animation is fully finished, then smoothly proceeds to the next section
      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(self.progress * (TOTAL_FRAMES - 1))
          );
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
          }

          // Dynamic stage calculation with 4% hysteresis buffer to prevent any edge jitter
          const progress = self.progress;
          let stageIndex = activeStageRef.current;
          if (progress < 0.28) {
            stageIndex = 0;
          } else if (progress >= 0.34 && progress < 0.64) {
            stageIndex = 1;
          } else if (progress >= 0.70) {
            stageIndex = 2;
          }

          if (stageIndex !== activeStageRef.current) {
            activeStageRef.current = stageIndex;
            setActiveStage(stageIndex);
          }
        },
      });
    }, track);

    return () => ctx.revert();
  }, []);

  // Interactive mouse/touch drag scrub handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDragging = false;
    let startX = 0;
    let startFrame = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      startX = e.clientX || e.touches?.[0]?.clientX || 0;
      startFrame = currentFrameRef.current;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
      const diffX = currentX - startX;
      // 3px drag = 1 frame movement
      const deltaFrames = Math.round(diffX / 3);
      let target = (startFrame + deltaFrames) % TOTAL_FRAMES;
      if (target < 0) target += TOTAL_FRAMES;

      currentFrameRef.current = target;
      drawFrame(target);

      const dragProgress = target / (TOTAL_FRAMES - 1);
      let stageIndex = activeStageRef.current;
      if (dragProgress < 0.28) {
        stageIndex = 0;
      } else if (dragProgress >= 0.34 && dragProgress < 0.64) {
        stageIndex = 1;
      } else if (dragProgress >= 0.70) {
        stageIndex = 2;
      }

      if (stageIndex !== activeStageRef.current) {
        activeStageRef.current = stageIndex;
        setActiveStage(stageIndex);
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    return () => {
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, []);

  return (
    <div ref={trackRef} className="hero-scroll-track position-relative">
      <section
        ref={sectionRef}
        className="hero-section overflow-hidden"
        id="home"
      >
      {/* Live Ambient Animated Waves & Background Glows */}
      <div className="hero-animated-bg">
        <div className="air-wave air-wave-1"></div>
        <div className="air-wave air-wave-2"></div>
      </div>

      <div className="container-xxl position-relative z-2">
        <div className="row align-items-center gy-4 gy-lg-0 hero-main-row">
          {/* Left Column: Stacked Cinematic Dynamic Engineering Content */}
          <div className="col-lg-6 col-xl-5 hero-content d-flex flex-column justify-content-center">
            {/* Status Badge with Interactive 3D Stage Stepper */}
            <div className="hero-status-badge">
              <span
                className="pulse-dot"
                style={{
                  backgroundColor: STAGES[activeStage].dotColor,
                  boxShadow: `0 0 10px ${STAGES[activeStage].dotColor}`,
                  transition: 'background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
              <div className="hero-stage-badge-stack">
                {STAGES.map((s, idx) => (
                  <span
                    key={idx}
                    className={`hero-stage-badge-text ${
                      activeStage === idx ? 'active' : activeStage > idx ? 'prev' : 'next'
                    }`}
                  >
                    {s.badge}
                  </span>
                ))}
              </div>
              <div className="hero-stage-stepper" aria-label="Interactive 3D Stages">
                {STAGES.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToStage(idx)}
                    className={`hero-stage-step-dot ${activeStage === idx ? 'active' : ''}`}
                    title={s.stepName}
                    aria-label={`Go to ${s.stepName}`}
                  />
                ))}
              </div>
            </div>

            {/* Unified Stage Text Stack (Heading + Description) for natural, zero-dead-space spacing */}
            <div className="hero-stage-text-stack">
              {STAGES.map((s, idx) => (
                <div
                  key={idx}
                  className={`hero-stage-text-block ${
                    activeStage === idx ? 'active' : activeStage > idx ? 'prev' : 'next'
                  }`}
                >
                  <h1 className="hero-title fw-extrabold lh-sm mb-0">
                    <span className="hero-title-light">{s.titleLight}</span> <br />
                    <span className="animated-gradient-text">{s.titleGradient}</span>
                  </h1>
                  <p className="hero-subtitle mb-0">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons Stack with Fade-Up Transition across Stages */}
            <div className="hero-stage-stack hero-cta-stack">
              {STAGES.map((s, idx) => (
                <div
                  key={idx}
                  className={`hero-cta-group d-flex flex-wrap align-items-center gap-2 gap-sm-3 hero-stage-layer ${
                    activeStage === idx ? 'active' : activeStage > idx ? 'prev' : 'next'
                  }`}
                >
                  <button
                    type="button"
                    className="btn btn-hero-book rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                    onClick={() => openAppointment()}
                    style={{
                      borderColor: `${s.dotColor}88`,
                      boxShadow: `0 8px 24px -4px rgba(2, 132, 199, 0.55), 0 0 20px ${s.dotColor}44, inset 0 1px 0 rgba(255, 255, 255, 0.35)`,
                    }}
                  >
                    <i className="fa-regular fa-calendar-check fs-6 btn-icon-calendar"></i>
                    <span>{s.ctaPrimary}</span>
                  </button>
                  <a
                    href="#services"
                    className="btn btn-hero-explore rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                  >
                    <span>{s.ctaSecondary}</span>
                    <i className="fa-solid fa-arrow-right btn-arrow-icon"></i>
                  </a>
                </div>
              ))}
            </div>

            {/* Divider Line */}
            <hr className="hero-trust-divider" />

            {/* Dynamic Stage Trust Points Stack */}
            <div className="hero-stage-stack hero-trust-stack">
              {STAGES.map((s, idx) => (
                <div
                  key={idx}
                  className={`hero-trust-row d-flex flex-wrap align-items-center gap-2 gap-md-3 hero-stage-layer ${
                    activeStage === idx ? 'active' : activeStage > idx ? 'prev' : 'next'
                  }`}
                >
                  {s.trust.map((item, tIdx) => (
                    <div key={tIdx} className="hero-trust-item d-flex align-items-center gap-2">
                      <span className="hero-trust-check-icon">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <span className="hero-trust-text">
                        <span className="d-block text-highlight tabular-nums">{item.highlight}</span>
                        <span className="text-muted-light">{item.muted}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual & Interactive Canvas ScrollTrigger Animation */}
          <div className="col-lg-6 col-xl-7 hero-img-container" ref={containerRef}>
            {/* Interactive GSAP Canvas Showcase Seamlessly Blended */}
            <div className="hero-canvas-showcase position-relative z-2">
              <div className="hero-canvas-wrapper">
                <canvas
                  ref={canvasRef}
                  aria-label="Carrier Air Conditioner 3D cooling and airflow interactive sequence"
                  className="hero-scroll-canvas"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
