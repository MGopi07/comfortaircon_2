'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';

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

function AppointmentModalDialog({ productName, onClose, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    productInterested: productName || '',
    location: '',
    otherLocation: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const resolvedLocation =
      formData.location === 'Other' && formData.otherLocation
        ? `Other (${formData.otherLocation})`
        : formData.location;

    // Save lead to localStorage for Admin Enquiry Management (FSD Section 6.1)
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('comfort_aircon_enquiries');
        const list = stored ? JSON.parse(stored) : [];
        const newEnquiry = {
          id: `ENQ-${Date.now().toString().slice(-4)}`,
          name: formData.name.trim(),
          mobile: formData.phone.trim(),
          email: formData.email.trim() || 'N/A',
          service: formData.service || 'General Enquiry',
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

    showToast(
      `Thank you, ${formData.name}! Your enquiry for ${formData.service || 'AC Service'}${
        formData.productInterested ? ` (${formData.productInterested})` : ''
      } in ${resolvedLocation} has been received. Our team will contact you on ${formData.phone} shortly.`
    );

    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="modal-header bg-dark-navy text-white rounded-top-4 py-3 px-4">
              <div>
                <h5 className="modal-title fw-bold fs-5 mb-0 d-flex align-items-center">
                  <i className="fa-solid fa-clipboard-question me-2 text-primary-blue"></i>
                  {productName
                    ? `Enquire: ${productName}`
                    : 'Comfort Aircon - Enquire Now'}
                </h5>
                <small className="text-light opacity-75">
                  Authorized Carrier &amp; Toshiba Sales &amp; Service • Rapid 15-Min Response
                </small>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body */}
            <div
              className="modal-body p-4 p-md-4"
              style={{ maxHeight: 'calc(100vh - 130px)', overflowY: 'auto' }}
            >
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* 1. Name: Customer full name (letters and spaces) - Required */}
                  <div className="col-md-6">
                    <label
                      htmlFor="enquiryName"
                      className="form-label small fw-bold text-dark-navy mb-1"
                    >
                      Customer Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="enquiryName"
                      type="text"
                      className="form-control form-control-custom"
                      required
                      pattern="^[A-Za-z\s.'-]+$"
                      title="Customer full name (letters and spaces only)"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <div className="form-text small text-muted">
                      Customer full name (letters and spaces)
                    </div>
                  </div>

                  {/* 2. Mobile Number: 10-digit Indian mobile - Required */}
                  <div className="col-md-6">
                    <label
                      htmlFor="enquiryMobile"
                      className="form-label small fw-bold text-dark-navy mb-1"
                    >
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 fw-semibold text-secondary">
                        +91
                      </span>
                      <input
                        id="enquiryMobile"
                        type="tel"
                        className="form-control form-control-custom border-start-0"
                        required
                        pattern="^[6-9]\d{9}$"
                        maxLength={10}
                        title="10-digit Indian mobile number"
                        placeholder="98430 12345"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                          })
                        }
                      />
                    </div>
                    <div className="form-text small text-muted">
                      10-digit Indian mobile — for call / WhatsApp follow-up
                    </div>
                  </div>

                  {/* 3. Email: Optional reply email - Optional */}
                  <div className="col-md-6">
                    <label
                      htmlFor="enquiryEmail"
                      className="form-label small fw-bold text-dark-navy mb-1"
                    >
                      Email Address <span className="text-muted fw-normal">(Optional)</span>
                    </label>
                    <input
                      id="enquiryEmail"
                      type="email"
                      className="form-control form-control-custom"
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <div className="form-text small text-muted">
                      Optional reply email
                    </div>
                  </div>

                  {/* 4. Service Required: Dropdown - Required */}
                  <div className="col-md-6">
                    <label
                      htmlFor="enquiryService"
                      className="form-label small fw-bold text-dark-navy mb-1"
                    >
                      Service Required <span className="text-danger">*</span>
                    </label>
                    <select
                      id="enquiryService"
                      className="form-select form-control-custom"
                      required
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                    >
                      <option value="">-- Select Service Required --</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="form-text small text-muted">
                      Select the service needed
                    </div>
                  </div>

                  {/* 5. Product Interested In: Dropdown (auto-filled on Enquire) - Optional */}
                  <div className="col-md-6">
                    <label
                      htmlFor="enquiryProduct"
                      className="form-label small fw-bold text-dark-navy mb-1"
                    >
                      Product Interested In <span className="text-muted fw-normal">(Optional)</span>
                    </label>
                    <select
                      id="enquiryProduct"
                      className="form-select form-control-custom"
                      value={formData.productInterested}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productInterested: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Select Product (Optional) --</option>
                      {formData.productInterested &&
                        !publishedProducts.includes(formData.productInterested) && (
                          <option value={formData.productInterested}>
                            {formData.productInterested}
                          </option>
                        )}
                      {publishedProducts.map((prod) => (
                        <option key={prod} value={prod}>
                          {prod}
                        </option>
                      ))}
                    </select>
                    <div className="form-text small text-muted">
                      {formData.productInterested
                        ? 'Auto-filled from selected product'
                        : 'Published products; auto-filled when Enquire is clicked on a product'}
                    </div>
                  </div>

                  {/* 6. Location: Dropdown with Pondicherry, Villupuram, Cuddalore, Other (+ text box) - Required */}
                  <div className="col-md-6">
                    <label
                      htmlFor="enquiryLocation"
                      className="form-label small fw-bold text-dark-navy mb-1"
                    >
                      Location <span className="text-danger">*</span>
                    </label>
                    <select
                      id="enquiryLocation"
                      className="form-select form-control-custom"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    >
                      <option value="">-- Select Location --</option>
                      {locationOptions.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>

                    {/* Location "+ text box" when Other is selected */}
                    {formData.location === 'Other' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          className="form-control form-control-custom"
                          required
                          placeholder="Please enter your town / locality"
                          value={formData.otherLocation}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              otherLocation: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                    <div className="form-text small text-muted">
                      Pondicherry; Villupuram; Cuddalore; Other (+ text box)
                    </div>
                  </div>

                  {/* 7. Message: Text area, max 500 chars - Optional */}
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label
                        htmlFor="enquiryMessage"
                        className="form-label small fw-bold text-dark-navy mb-0"
                      >
                        Message <span className="text-muted fw-normal">(Optional)</span>
                      </label>
                      <span
                        className={`small ${
                          formData.message.length >= 500
                            ? 'text-danger fw-bold'
                            : 'text-muted'
                        }`}
                      >
                        {formData.message.length} / 500 characters
                      </span>
                    </div>
                    <textarea
                      id="enquiryMessage"
                      rows={3}
                      maxLength={500}
                      className="form-control form-control-custom"
                      placeholder="Extra details regarding room size, tonnage requirements, issues faced, or preferred visit time..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                    <div className="form-text small text-muted">
                      Extra details — maximum 500 characters
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3 mt-3 border-top d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                  <div className="small text-muted d-flex align-items-center">
                    <i className="fa-solid fa-shield-halved text-success me-2 fs-5"></i>
                    <span>Zero spam. Direct engineer callback.</span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-custom-accent px-5 py-3 fw-bold rounded-pill shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Submit Enquiry</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AppointmentModal() {
  const { appointmentState, closeAppointment, showToast } = useModal();

  if (!appointmentState.isOpen) return null;

  return (
    <AppointmentModalDialog
      key={appointmentState.productName || 'general-enquiry'}
      productName={appointmentState.productName}
      onClose={closeAppointment}
      showToast={showToast}
    />
  );
}
