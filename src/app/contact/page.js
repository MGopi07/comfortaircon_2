'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { INITIAL_CONTACT } from '@/data/mockData';

export default function ContactPage() {
  const { showToast } = useModal();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    productInterested: '',
    location: '',
    otherLocation: '',
    message: '',
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const publishedProducts = [
    'Carrier Ester Neo 5-Star Inverter Split AC',
    'Carrier Superia 4-Way Inverter Cassette AC',
    'Carrier Concealed High-Static Ductable AC',
    'Carrier X-Power Commercial VRF System',
    'Carrier Durafresh 3-Star Inverter Split AC',
    'Toshiba Daiseikai 5-Star Japanese Inverter Split AC',
    'Toshiba SMMS-u Next-Gen Japanese VRF System',
    'Toshiba 4-Way Smart Inverter Cassette AC',
    'Toshiba Concealed Slim Inverter Ductable AC',
    'Toshiba Shorai Edge High-Efficiency Split AC',
  ];

  const serviceOptions = [
    'AC Installation',
    'Repair',
    'Service & Maintenance',
    'Gas Filling',
    'Cleaning & Troubleshooting',
    'Replacement',
    'Annual Maintenance',
    'Commercial AC Services',
    'Other',
  ];

  const locationOptions = ['Pondicherry', 'Villupuram', 'Cuddalore', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation matching FSD Section 6
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.trim();
    if (!/^\d{10}$/.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!formData.service) {
      setErrorMessage('Please select a required service.');
      return;
    }

    if (!formData.location) {
      setErrorMessage('Please select your location.');
      return;
    }

    if (formData.location === 'Other' && !formData.otherLocation.trim()) {
      setErrorMessage('Please specify your other location name.');
      return;
    }

    const resolvedLocation =
      formData.location === 'Other'
        ? `Other (${formData.otherLocation.trim()})`
        : formData.location;

    // Save lead to localStorage for Admin Enquiry Management (FSD Section 6.1)
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('comfort_aircon_enquiries');
        const list = stored ? JSON.parse(stored) : [];
        const newEnquiry = {
          id: `ENQ-${Date.now().toString().slice(-4)}`,
          name: formData.name.trim(),
          mobile: cleanPhone,
          email: formData.email.trim() || 'N/A',
          service: formData.service,
          productInterested: formData.productInterested || 'N/A',
          location: resolvedLocation,
          message: formData.message.trim() || 'No additional message provided.',
          status: 'New',
          createdAt: new Date().toISOString(),
        };
        list.unshift(newEnquiry);
        localStorage.setItem('comfort_aircon_enquiries', JSON.stringify(list));
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.error('Error saving enquiry to localStorage:', err);
      }
    }

    setSubmittedSuccess(true);
    showToast(
      `Enquiry submitted successfully! Our Pondicherry team will call you on ${cleanPhone} shortly.`
    );

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      productInterested: '',
      location: '',
      otherLocation: '',
      message: '',
    });
  };

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
            <li className="active">Contact Us</li>
          </ul>

          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="subpage-title">
                Contact <span className="text-primary-blue">Comfort Aircon</span> for Expert Cooling Solutions
              </h1>
              <p className="subpage-lead">
                AC sales, installation, repair, and maintenance. Our experienced team is ready to help you choose the right air conditioning solution, request a quotation or schedule a service appointment for your home or business.
              </p>

              <div className="d-flex flex-wrap align-items-center gap-3 pt-2">
                <a
                  href={INITIAL_CONTACT.phoneHref}
                  className="btn btn-custom-primary shadow-sm px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-phone"></i> Tap to Call {INITIAL_CONTACT.phone}
                </a>
                <a
                  href={INITIAL_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-success bg-white rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 shadow-xs"
                >
                  <i className="fa-brands fa-whatsapp fs-5"></i> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1: REQUEST HVAC SERVICE OR ASK A QUESTION (1ST REF IMAGE) */}
      <section className="contact-ref-section" id="enquiry-form">
        <div className="container-xxl">
          <div className="row g-4 align-items-start">
            {/* Left Column: Form Card (~60%) */}
            <div className="col-lg-7">
              <div className="ref-form-card">
                <div className="ref-eyebrow-tag">
                  <span className="ref-tag-dot"></span>
                  <span>Send a Message</span>
                </div>
                <h2 className="ref-card-title">
                  Request AC Service
                </h2>
                <p className="ref-card-lead">
                  Fill out the enquiry form below, and our team will contact you to assist with AC sales, installation, repair, servicing, or maintenance.
                </p>

                {submittedSuccess && (
                  <div className="alert alert-success d-flex align-items-center gap-3 p-3 rounded-3 mb-4" role="alert">
                    <i className="fa-solid fa-circle-check fs-3 text-success"></i>
                    <div>
                      <h6 className="alert-heading fw-bold mb-1">Thank you for reaching out!</h6>
                      <p className="mb-0 small">
                        Your request has been logged successfully. Our Carrier &amp; Toshiba technical support desk will call your mobile number shortly.
                      </p>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="alert alert-danger d-flex align-items-center gap-2 p-3 rounded-3 mb-4" role="alert">
                    <i className="fa-solid fa-triangle-exclamation text-danger"></i>
                    <span className="small fw-semibold">{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Row 1: Full Name | Phone Number */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="refFullName">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="refFullName"
                        className="form-control"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="refPhone">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">+91</span>
                        <input
                          type="tel"
                          id="refPhone"
                          className="form-control"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email Address | Service Needed */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="refEmail">
                        Email Address <span className="text-muted fw-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        id="refEmail"
                        className="form-control"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="refService">
                        Service Needed <span className="text-danger">*</span>
                      </label>
                      <select
                        id="refService"
                        className="form-select"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        required
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Service Location | Product Interested In */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="refLocation">
                        Service Location <span className="text-danger">*</span>
                      </label>
                      <select
                        id="refLocation"
                        className="form-select"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      >
                        <option value="">Select location</option>
                        {locationOptions.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                      {formData.location === "Other" && (
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Specify town (e.g., Tindivanam, Auroville)"
                          value={formData.otherLocation}
                          onChange={(e) =>
                            setFormData({ ...formData, otherLocation: e.target.value })
                          }
                          required
                        />
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="refProduct">
                        Product Interested In <span className="text-muted fw-normal">(Optional)</span>
                      </label>
                      <select
                        id="refProduct"
                        className="form-select"
                        value={formData.productInterested}
                        onChange={(e) =>
                          setFormData({ ...formData, productInterested: e.target.value })
                        }
                      >
                        <option value="">Select product (Carrier / Toshiba)...</option>
                        {publishedProducts.map((prod) => (
                          <option key={prod} value={prod}>
                            {prod}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Service Details (Textarea) */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label mb-0" htmlFor="refMessage">
                        Service Details <span className="text-muted fw-normal">(Optional)</span>
                      </label>
                      <small className="text-muted">{formData.message.length}/500</small>
                    </div>
                    <textarea
                      id="refMessage"
                      className="form-control"
                      rows={4}
                      maxLength={500}
                      placeholder="Tell us what is happening with your heating, cooling, or airflow system..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button type="submit" className="ref-btn-submit">
                      <span>Send Request</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    <div className="ref-btn-helper">
                      For urgent heating or cooling issues, call our team directly for faster support:{" "}
                      <a href={INITIAL_CONTACT.phoneHref} className="fw-bold">
                        {INITIAL_CONTACT.phone}
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Contact Cards (~40%) */}
            <div className="col-lg-5">
              {/* Card 1: Visit Our Location */}
              <div className="ref-contact-card">
                <div className="ref-contact-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="ref-contact-title">Visit Our Location</div>
                <div className="ref-contact-highlight">Pudupalaiyam, Puducherry</div>
                <p className="ref-contact-desc">
                  No: 295, Thiruvalluvar Salai, Raja Nagar, Pudupalaiyam, Puducherry – 605013.
                </p>
              </div>

              {/* Card 2: Call Us */}
              <div className="ref-contact-card">
                <div className="ref-contact-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="ref-contact-title">Call Us</div>
                <a href={INITIAL_CONTACT.phoneHref} className="ref-contact-highlight">
                  Mobile: {INITIAL_CONTACT.phone}
                </a>
                <a href={INITIAL_CONTACT.secondaryPhoneHref} className="ref-contact-subtext text-decoration-none">
                  Landline: {INITIAL_CONTACT.secondaryPhone}
                </a>
                <p className="ref-contact-desc">
                  Talk with our team about scheduling repair, maintenance, or air conditioning service questions.
                </p>
              </div>

              {/* Card 3: Email Us */}
              <div className="ref-contact-card">
                <div className="ref-contact-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="ref-contact-title">Email Us</div>
                <a href={`mailto:${INITIAL_CONTACT.email}`} className="ref-contact-highlight">
                  {INITIAL_CONTACT.email}
                </a>
                <a href={`mailto:${INITIAL_CONTACT.secondaryEmail}`} className="ref-contact-subtext text-decoration-none">
                  {INITIAL_CONTACT.secondaryEmail}
                </a>
                <p className="ref-contact-desc">
                  Send your service request, project details, or general questions anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 2: INTERACTIVE GOOGLE MAP LOCATION */}
      <section className="contact-hours-section" id="location-hours">
        <div className="container-xxl">
          <div className="ref-map-card" style={{ minHeight: '460px', height: '460px' }}>
            {/* Floating Location Overlay Badge */}
            <div className="ref-map-floating-box">
              <div className="ref-map-title">Comfort Aircon Showroom</div>
              <div className="ref-map-address">
                No: 295, Thiruvalluvar Salai, Raja Nagar, Pudupalaiyam, Puducherry – 605013
              </div>
              <a
                href="https://www.google.com/maps/place/COMFORT+AIRCON+%7C+Hvac+Solutions+Provider+%7C+MEP+consultant/@11.9349443,79.8103655,19z"
                target="_blank"
                rel="noopener noreferrer"
                className="ref-map-btn"
              >
                <i className="fa-solid fa-map-location-dot"></i>
                <span>Open in Maps</span>
                <i className="fa-solid fa-arrow-up-right-from-square ms-1" style={{ fontSize: '0.72rem' }}></i>
              </a>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.587548858422!2d79.8106980735886!3d11.933765888294278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1106ae5f7185dcdb%3A0x8b19cc10065d019e!2sCOMFORT%20AIRCON%20%7C%20Hvac%20Solutions%20Provider%20%7C%20MEP%20consultant!5e0!3m2!1sen!2sin!4v1793258188167!5m2!1sen!2sin"
              className="ref-map-iframe"
              style={{ minHeight: '460px', height: '100%', width: '100%', border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Comfort Aircon Puducherry Google Map Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
