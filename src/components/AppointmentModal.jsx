'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { submitEnquiry } from '@/services/api';
import CustomSelect from '@/components/CustomSelect';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setGeneralError('');

    const newErrors = {};

    // 1. Client-side validation: Name
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    // 2. Client-side validation: 10-digit mobile number
    const cleanPhone = formData.phone.trim();
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.mobile_number = 'Please enter a valid 10-digit Indian mobile number.';
    }

    // 3. Client-side validation: Email (if provided)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 4. Client-side validation: Service
    if (!formData.service) {
      newErrors.service_required = 'Please select a required service.';
    }

    // 5. Client-side validation: Location
    if (!formData.location) {
      newErrors.location = 'Please select your location.';
    } else if (formData.location === 'Other' && !formData.otherLocation.trim()) {
      newErrors.location = 'Please specify your town / locality.';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    const resolvedLocation =
      formData.location === 'Other' && formData.otherLocation
        ? `Other (${formData.otherLocation.trim()})`
        : formData.location;

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      mobile_number: cleanPhone,
      email: formData.email.trim() || undefined,
      service_required: formData.service,
      product_interested_in: formData.productInterested.trim() || undefined,
      location: resolvedLocation,
      message: formData.message.trim() || undefined,
    };

    try {
      const response = await submitEnquiry(payload);

      // Save lead to localStorage as fallback
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('comfort_aircon_enquiries');
          const list = stored ? JSON.parse(stored) : [];
          const newEnquiry = {
            id: `ENQ-${Date.now().toString().slice(-4)}`,
            name: formData.name.trim(),
            mobile: cleanPhone,
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
        } catch {
          // Ignore localStorage errors
        }
      }

      showToast(
        response?.message ||
          `Thank you, ${formData.name}! Your enquiry for ${formData.service || 'AC Service'}${
            formData.productInterested ? ` (${formData.productInterested})` : ''
          } in ${resolvedLocation} has been received. Our team will contact you on ${cleanPhone} shortly.`
      );

      onClose();
    } catch (err) {
      if (err?.errors && typeof err.errors === 'object') {
        const serverErrors = {};
        Object.entries(err.errors).forEach(([field, msgs]) => {
          serverErrors[field] = Array.isArray(msgs) ? msgs.join(' ') : String(msgs);
        });
        setFormErrors(serverErrors);
        setGeneralError(err.message || 'Please correct the validation errors below.');
      } else {
        setGeneralError(err?.message || 'Failed to submit enquiry. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="d-flex align-items-center">
                <h5
                  className="modal-title fw-bold fs-5 mb-0 text-white d-flex align-items-center"
                  style={{ color: '#ffffff' }}
                >
                  <i className="fa-solid fa-clipboard-question me-2 text-primary-blue"></i>
                  <span>
                    {productName
                      ? `Enquire: ${productName}`
                      : 'Comfort Aircon - Enquire Now'}
                  </span>
                </h5>
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
              {generalError && (
                <div className="alert alert-danger d-flex align-items-center gap-2 p-3 rounded-3 mb-3" role="alert">
                  <i className="fa-solid fa-triangle-exclamation text-danger flex-shrink-0"></i>
                  <span className="small fw-semibold">{generalError}</span>
                </div>
              )}

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
                      className={`form-control form-control-custom ${formErrors.name ? 'is-invalid' : ''}`}
                      required
                      pattern="^[A-Za-z\s.'-]+$"
                      title="Customer full name (letters and spaces only)"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                    />
                    {formErrors.name ? (
                      <div className="text-danger small mt-1 fw-semibold">{formErrors.name}</div>
                    ) : (
                      <div className="form-text small text-muted">
                        Customer full name (letters and spaces)
                      </div>
                    )}
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
                        className={`form-control form-control-custom border-start-0 ${formErrors.mobile_number ? 'is-invalid' : ''}`}
                        required
                        pattern="^[6-9]\d{9}$"
                        maxLength={10}
                        title="10-digit Indian mobile number"
                        placeholder="98430 12345"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                          });
                          if (formErrors.mobile_number) setFormErrors({ ...formErrors, mobile_number: '' });
                        }}
                      />
                    </div>
                    {formErrors.mobile_number ? (
                      <div className="text-danger small mt-1 fw-semibold">{formErrors.mobile_number}</div>
                    ) : (
                      <div className="form-text small text-muted">
                        10-digit Indian mobile — for call / WhatsApp follow-up
                      </div>
                    )}
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
                      className={`form-control form-control-custom ${formErrors.email ? 'is-invalid' : ''}`}
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                    />
                    {formErrors.email ? (
                      <div className="text-danger small mt-1 fw-semibold">{formErrors.email}</div>
                    ) : (
                      <div className="form-text small text-muted">
                        Optional reply email
                      </div>
                    )}
                  </div>

                  {/* 4. Service Required: Dropdown - Required */}
                  <div className="col-md-6">
                    <label
                      htmlFor="enquiryService"
                      className="form-label small fw-bold text-dark-navy mb-1"
                    >
                      Service Required <span className="text-danger">*</span>
                    </label>
                    <CustomSelect
                      id="enquiryService"
                      className="form-control-custom"
                      error={!!formErrors.service_required}
                      required
                      value={formData.service}
                      onChange={(val) => {
                        setFormData({ ...formData, service: val });
                        if (formErrors.service_required) setFormErrors({ ...formErrors, service_required: '' });
                      }}
                      options={serviceOptions}
                      placeholder="-- Select Service Required --"
                    />
                    {formErrors.service_required ? (
                      <div className="text-danger small mt-1 fw-semibold">{formErrors.service_required}</div>
                    ) : (
                      <div className="form-text small text-muted">
                        Select the service needed
                      </div>
                    )}
                  </div>

                  {/* 5. Product Interested In: Dropdown (auto-filled on Enquire) - Optional */}
                  <div className="col-md-6">
                    <label
                      htmlFor="enquiryProduct"
                      className="form-label small fw-bold text-dark-navy mb-1"
                    >
                      Product Interested In <span className="text-muted fw-normal">(Optional)</span>
                    </label>
                    <CustomSelect
                      id="enquiryProduct"
                      className="form-control-custom"
                      value={formData.productInterested}
                      onChange={(val) =>
                        setFormData({
                          ...formData,
                          productInterested: val,
                        })
                      }
                      options={
                        formData.productInterested &&
                        !publishedProducts.includes(formData.productInterested)
                          ? [formData.productInterested, ...publishedProducts]
                          : publishedProducts
                      }
                      placeholder="-- Select Product (Optional) --"
                    />
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
                    <CustomSelect
                      id="enquiryLocation"
                      className="form-control-custom"
                      error={!!formErrors.location}
                      required
                      value={formData.location}
                      onChange={(val) => {
                        setFormData({ ...formData, location: val });
                        if (formErrors.location) setFormErrors({ ...formErrors, location: '' });
                      }}
                      options={locationOptions}
                      placeholder="-- Select Location --"
                    />

                    {/* Location "+ text box" when Other is selected */}
                    {formData.location === 'Other' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          className="form-control form-control-custom"
                          required
                          placeholder="Please enter your town / locality"
                          value={formData.otherLocation}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              otherLocation: e.target.value,
                            });
                            if (formErrors.location) setFormErrors({ ...formErrors, location: '' });
                          }}
                        />
                      </div>
                    )}
                    {formErrors.location ? (
                      <div className="text-danger small mt-1 fw-semibold">{formErrors.location}</div>
                    ) : (
                      <div className="form-text small text-muted">
                        Pondicherry; Villupuram; Cuddalore; Other (+ text box)
                      </div>
                    )}
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
                    {formErrors.message && (
                      <div className="text-danger small mt-1 fw-semibold">{formErrors.message}</div>
                    )}
                    <div className="form-text small text-muted">
                      Extra details — maximum 500 characters
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3 mt-3 border-top d-flex align-items-center justify-content-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-custom-accent px-5 py-3 fw-bold rounded-pill shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane"></i>
                        <span>Submit Enquiry</span>
                      </>
                    )}
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
