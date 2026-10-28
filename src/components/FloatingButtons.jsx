'use client';

import React from 'react';

export default function FloatingButtons() {
  return (
    <>
      {/* Floating Call Button (Mobile only via CSS) */}
      <a
        href="tel:+917708650535"
        className="floating-call-btn"
        title="Call Comfort Aircon (+91 7708 650 535)"
      >
        <i className="fa-solid fa-phone-volume"></i>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919843020486?text=Hi%2C%20I%20want%20to%20enquire%20about%20your%20AC%20products%20%2F%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        title="Chat with Comfort Aircon on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </>
  );
}
