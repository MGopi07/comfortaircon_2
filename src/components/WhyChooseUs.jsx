'use client';

import React from 'react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: 'fa-solid fa-certificate',
      title: 'Authorized AC Dealership',
      desc: 'Get genuine air conditioning products from authorized brands, with manufacturer warranty support and proper billing.',
    },
    {
      icon: 'fa-solid fa-award',
      title: '25+ Years of Experience',
      desc: 'Benefit from decades of industry experience in AC sales, installation, repair, and maintenance for residential and commercial spaces.',
    },
    {
      icon: 'fa-solid fa-id-card',
      title: 'Experienced HVAC Technicians',
      desc: 'Our skilled technicians provide professional installation, accurate system setup, and reliable servicing to ensure efficient cooling performance.',
    },
    {
      icon: 'fa-solid fa-hand-holding-dollar',
      title: 'Transparent Pricing',
      desc: 'Enjoy clear quotations, detailed service estimates, and honest pricing with no unexpected charges.',
    },
  ];

  return (
    <section className="why-choose-us-section" id="why-choose-us">
      <div className="container-xxl">
        <div className="row align-items-center gy-5">
          {/* Left Column (on Desktop): Overlapping Dual Image Showcase (Matching 1st Reference Image) */}
          <div className="col-lg-6 order-lg-1 order-2">
            <div className="why-images-wrapper position-relative">
              {/* Soft sky-blue glow behind the collage */}
              <div className="why-images-glow" aria-hidden="true"></div>

              {/* Main Primary Image: Certified Technician Servicing Ceiling AC */}
              <div className="why-main-img-box">
                <img
                  src="/images/why1.png"
                  alt="Certified Comfort Aircon HVAC Technician Servicing Ceiling AC"
                  className="img-fluid w-100 h-100 object-fit-cover why-main-img"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Secondary Image: Technical Maintenance Setup */}
              <div className="why-overlap-img-box">
                <img
                  src="/images/why2.png"
                  alt="Precision AC Technical Installation and Maintenance Setup"
                  className="img-fluid w-100 h-100 object-fit-cover why-overlap-img"
                  loading="lazy"
                />
              </div>

              {/* Floating Experience Badge */}
              <div className="why-exp-badge">
                <span className="why-exp-icon">
                  <i className="fa-solid fa-award"></i>
                </span>
                <span className="why-exp-text">
                  <strong>25+ Years</strong>
                  <span>Trusted cooling experts</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (on Desktop): Section Title, Description & 4 Feature Cards */}
          <div className="col-lg-6 order-lg-2 order-1">
            <span className="section-tag mb-2">
              <i className="fa-solid fa-medal me-1"></i> WHY CARRIER
            </span>
            <h2 className="text-white section-title why-title">
              Why Choose <span className="gradient-word">Comfort Aircon</span>?
            </h2>
            <p className="why-lead">
              With over 25 years of experience, Comfort Aircon delivers reliable
              air conditioning solutions across Puducherry, Villupuram, and
              Cuddalore. We focus on quality products, professional installation,
              transparent pricing, and dependable customer support to ensure
              lasting comfort.
            </p>
            <div className="row g-3 g-md-4">
              {reasons.map((reason) => (
                <div className="col-sm-6" key={reason.title}>
                  <div className="why-choose-card h-100">
                    <div className="why-icon">
                      <i className={reason.icon}></i>
                    </div>
                    <h3 className="why-card-title">{reason.title}</h3>
                    <p className="why-card-desc">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
