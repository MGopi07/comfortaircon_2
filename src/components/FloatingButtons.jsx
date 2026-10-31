'use client';

import React, { useState, useEffect } from 'react';
import { getContact } from '@/services/api';

export default function FloatingButtons() {
  const [callHref, setCallHref] = useState('tel:+917708650535');
  const [waHref, setWaHref] = useState(
    'https://wa.me/919843020486?text=Hi%2C%20I%20want%20to%20enquire%20about%20your%20AC%20products%20%2F%20services.'
  );

  useEffect(() => {
    let isMounted = true;
    getContact()
      .then((res) => {
        if (!isMounted || !res?.data) return;
        if (res.data.phone) {
          setCallHref(`tel:${res.data.phone.replace(/[^0-9+]/g, '')}`);
        }
        if (res.data.whatsapp) {
          const cleanWa = res.data.whatsapp.replace(/\D/g, '');
          setWaHref(
            `https://wa.me/${cleanWa}?text=Hi%2C%20I%20want%20to%20enquire%20about%20your%20AC%20products%20%2F%20services.`
          );
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* Floating Call Button (Mobile only via CSS) */}
      <a
        href={callHref}
        className="floating-call-btn"
        title="Call Comfort Aircon"
      >
        <i className="fa-solid fa-phone-volume"></i>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={waHref}
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

