'use client';

/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';

// Contact details match the floating call/WhatsApp buttons and navbar
const PHONE_DISPLAY = '0413 224 2111';
const PHONE_HREF = 'tel:+914132242111';
const WHATSAPP_DISPLAY = '+91 98430 20486';
const WHATSAPP_HREF =
  'https://wa.me/919843020486?text=Hi%20Comfort%20Aircon%2C%20I%20would%20like%20to%20enquire%20about%20Carrier%20AC%20sales%20and%20service.';
const EMAIL = 'info@comfortaircon.com';
const ADDRESS = '295, Thiruvalluvar Salai, Puducherry 605005';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const services = [
  'AC Installation',
  'AC Repair & Service',
  'Maintenance',
  'Refrigeration Solutions',
  'Gas Filling',
  'Cleaning & Troubleshooting',
  'Replacement',
  'Annual Maintenance',
];

const serviceAreas = ['Pondicherry', 'Villupuram', 'Cuddalore', 'Nearby Locations'];

const trustBadges = [
  { icon: 'fa-solid fa-certificate', label: 'Authorized Carrier Dealer' },
  { icon: 'fa-solid fa-snowflake', label: 'Authorized Toshiba Dealer' },
  { icon: 'fa-solid fa-shield-halved', label: 'Genuine Parts & Warranty' },
];

const socialLinks = [
  { icon: 'fa-brands fa-facebook-f', label: 'Facebook' },
  { icon: 'fa-brands fa-x-twitter', label: 'Twitter' },
  { icon: 'fa-brands fa-instagram', label: 'Instagram' },
  { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
];

export default function Footer() {
  const { openAppointment } = useModal();

  return (
    <footer className="footer-section" id="contact">
      <div className="container-xxl">
        {/* Call-to-Action Band */}
        <div className="footer-cta">
          <div className="footer-cta-text">
            <span className="footer-cta-eyebrow">
              <i className="fa-solid fa-snowflake"></i>
              Authorized Carrier &amp; Toshiba Dealer
            </span>
            <h2 className="footer-cta-title">Need a new AC or quick service?</h2>
            <p className="footer-cta-desc">
              Sales, installation and same-day service response across Pondicherry,
              Villupuram and Cuddalore.
            </p>
          </div>
          <div className="footer-cta-actions">
            <button
              type="button"
              className="footer-cta-btn footer-cta-btn-primary"
              onClick={() => openAppointment()}
            >
              <i className="fa-regular fa-calendar-check"></i>
              <span>Book a Service</span>
            </button>
            <a href={PHONE_HREF} className="footer-cta-btn footer-cta-btn-outline">
              <i className="fa-solid fa-phone"></i>
              <span>Call {PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        <div className="row gy-5 footer-main">
          {/* Col 1: Brand Info */}
          <div className="col-lg-4 col-md-6">
            <Link className="d-inline-block mb-4 text-decoration-none" href="/">
              <div className="footer-logo-box">
                <img
                  src="/images/logo1.png"
                  alt="Comfort Aircon - Reach For The Sky"
                  className="footer-logo-img"
                />
              </div>
            </Link>
            <p className="footer-about">
              Puducherry&apos;s authorized sales dealer &amp; distributor for Carrier &amp;
              Toshiba Air Conditioning Systems. Explore Split ACs, VRF Systems,
              Cassette ACs, and Commercial Cooling Solutions.
            </p>
            <ul className="footer-trust-list">
              {trustBadges.map((badge) => (
                <li key={badge.label}>
                  <i className={badge.icon}></i>
                  <span>{badge.label}</span>
                </li>
              ))}
            </ul>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a key={social.label} href="#" aria-label={social.label}>
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <i className="fa-solid fa-angle-right"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div className="col-lg-3 col-md-6 col-6">
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/services">
                    <i className="fa-solid fa-angle-right"></i>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Details & Service Areas */}
          <div className="col-lg-3 col-md-6">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span>
                  <span className="footer-contact-label">Showroom</span>
                  <span className="footer-contact-value">{ADDRESS}</span>
                </span>
              </li>
              <li>
                <span className="footer-contact-icon">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <span>
                  <span className="footer-contact-label">Call Us</span>
                  <a href={PHONE_HREF} className="footer-contact-value">
                    {PHONE_DISPLAY}
                  </a>
                </span>
              </li>
              <li>
                <span className="footer-contact-icon footer-contact-icon-wa">
                  <i className="fa-brands fa-whatsapp"></i>
                </span>
                <span>
                  <span className="footer-contact-label">WhatsApp</span>
                  <a
                    href={WHATSAPP_HREF}
                    className="footer-contact-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </span>
              </li>
              <li>
                <span className="footer-contact-icon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <span>
                  <span className="footer-contact-label">Email</span>
                  <a href={`mailto:${EMAIL}`} className="footer-contact-value">
                    {EMAIL}
                  </a>
                </span>
              </li>
            </ul>

            <h4 className="footer-subtitle">Service Areas</h4>
            <div className="footer-area-chips">
              {serviceAreas.map((area) => (
                <Link key={area} href="/#areas" className="footer-area-chip">
                  <i className="fa-solid fa-location-dot"></i>
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-0">
            © 2026 Comfort Aircon Air Conditioning &amp; Cooling
            Specialist. All rights reserved.
          </p>
          <p className="mb-0 footer-bottom-areas">
            <i className="fa-solid fa-location-dot"></i>
            Serving Pondicherry · Villupuram · Cuddalore
          </p>
        </div>
      </div>
    </footer>
  );
}
