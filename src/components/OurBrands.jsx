'use client';

import React, { useRef, useEffect } from 'react';

export default function OurBrands() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.ob-col');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('ob-animate-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ob-animate-in');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const brands = [
    {
      name: 'Carrier',
      logo: '/images/carrier-logo.png',
      alt: 'Carrier logo',
      className: 'ob-logo-carrier',
    },
    {
      name: 'Midea',
      logo: '/images/midea-logo.png',
      alt: 'Midea logo',
      className: 'ob-logo-midea',
    },
    {
      name: 'Toshiba',
      logo: '/images/toshiba-logo.png',
      alt: 'Toshiba logo',
      className: 'ob-logo-toshiba',
    },
  ];

  return (
    <section ref={sectionRef} className="ob-section" id="our-brands" aria-labelledby="ob-heading">
      {/* Scoped styles prefixed with ob- */}
      <style>{`
        .ob-section {
          position: relative;
          overflow-x: hidden;
          background: linear-gradient(135deg, rgba(11, 22, 46, 0.98) 0%, rgba(15, 35, 72, 0.95) 55%, rgba(11, 22, 46, 0.98) 100%);
          padding: clamp(64px, 7vw, 92px) 0;
          color: #FFFFFF;
          font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
        }

        .ob-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .ob-glow-1 {
          top: -120px;
          right: -80px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%);
        }

        .ob-glow-2 {
          bottom: -140px;
          left: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 120, 191, 0.15) 0%, transparent 70%);
        }

        .ob-container {
          position: relative;
          z-index: 1;
        }

        .ob-header {
          text-align: center;
          margin-bottom: clamp(36px, 4.5vw, 52px);
        }

        .ob-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
          padding: 6px 16px;
          border-radius: 50px;
          background: rgba(56, 189, 248, 0.12);
          color: #38BDF8;
          border: 1px solid rgba(56, 189, 248, 0.3);
          backdrop-filter: blur(8px);
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .ob-title {
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(2rem, 1.4rem + 2.2vw, 2.85rem);
          font-weight: 800;
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0 0 16px 0;
        }

        .ob-gradient-word {
          background: linear-gradient(135deg, #38BDF8 0%, #67E8F9 55%, #E0F2FE 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          font-weight: 800;
        }

        .ob-subtext {
          color: rgba(226, 232, 240, 0.88);
          font-size: clamp(0.96rem, 0.92rem + 0.2vw, 1.05rem);
          line-height: 1.7;
          max-width: 62ch;
          margin: 0 auto;
        }

        .ob-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-left: -14px;
          margin-right: -14px;
          row-gap: 28px;
        }

        .ob-col {
          flex: 0 0 100%;
          max-width: 100%;
          padding-left: 14px;
          padding-right: 14px;
          opacity: 0;
          transform: translateY(24px);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
          will-change: transform, opacity;
        }

        .ob-col.ob-animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .ob-col:nth-child(1) {
          transition-delay: 0.05s;
        }

        .ob-col:nth-child(2) {
          transition-delay: 0.18s;
        }

        .ob-col:nth-child(3) {
          transition-delay: 0.31s;
        }

        @media (min-width: 576px) {
          .ob-col {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
          }
        }

        /* Solid pure-white brand cards */
        .ob-card {
          position: relative;
          width: 100%;
          height: 175px;
          background: #FFFFFF !important;
          opacity: 1 !important;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 24px;
          transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
          overflow: hidden;
        }

        .ob-card:hover {
          transform: translateY(-4px);
          border-color: #38BDF8 !important;
          box-shadow: 0 16px 36px rgba(56, 189, 248, 0.28), 0 0 20px rgba(56, 189, 248, 0.22) !important;
        }

        .ob-logo-box {
          width: 100%;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ob-logo {
          max-width: 100%;
          max-height: 56px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          margin: 0 auto;
          transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .ob-card:hover .ob-logo {
          transform: scale(1.05);
        }

        .ob-logo-carrier {
          max-height: 52px;
          max-width: 160px;
        }

        .ob-logo-midea {
          max-height: 54px;
          max-width: 155px;
        }

        .ob-logo-toshiba {
          max-height: 34px;
          max-width: 165px;
        }

        @media (max-width: 575.98px) {
          .ob-grid {
            flex-direction: column;
            align-items: center;
          }
          .ob-col {
            max-width: 320px;
            width: 100%;
          }
          .ob-card {
            height: 135px;
            padding: 20px 16px;
          }
          .ob-logo-box {
            height: 48px;
          }
          .ob-logo {
            max-height: 44px;
          }
          .ob-logo-carrier {
            max-height: 42px;
            max-width: 130px;
          }
          .ob-logo-midea {
            max-height: 44px;
            max-width: 125px;
          }
          .ob-logo-toshiba {
            max-height: 28px;
            max-width: 135px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ob-col {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .ob-card,
          .ob-logo {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="ob-glow ob-glow-1" aria-hidden="true" />
      <div className="ob-glow ob-glow-2" aria-hidden="true" />

      <div className="container-xxl ob-container">
        {/* Header Block */}
        <div className="ob-header">
          <span className="ob-pill">
            <i className="fa-solid fa-award me-1" aria-hidden="true" />
            OUR BRANDS
          </span>
          <h2 id="ob-heading" className="ob-title">
            Authorized  <span className="ob-gradient-word">Carrier, Toshiba & Midea AC Dealer</span>
          </h2>
          <p className="ob-subtext">
            Premium cooling solutions from Carrier, Toshiba, and Midea. As an authorized dealership, we bring you energy-efficient air conditioning systems, advanced technology, reliable performance, and expert installation to keep your spaces comfortable all year round.
          </p>
        </div>

        {/* 3 Brand Cards */}
        <div className="ob-grid">
          {brands.map((brand) => (
            <div className="ob-col" key={brand.name}>
              <div className="ob-card">
                <div className="ob-logo-box">
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    className={`ob-logo ${brand.className}`}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
