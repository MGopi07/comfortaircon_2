'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('admin@comfortaircon.com');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState('Super Admin');
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please provide your staff username/email and password.');
      return;
    }

    // Determine role and user profile
    let loggedUser = {
      name: 'Rajesh Kannan (Super Admin)',
      email: username,
      role: 'Super Admin',
      permissions: ['Products', 'Gallery', 'Enquiries', 'Contact', 'Users'],
    };

    if (role === 'Admin' || username.includes('suresh')) {
      loggedUser = {
        name: 'Suresh Kumar (Admin)',
        email: username,
        role: 'Admin',
        permissions: ['Products', 'Gallery', 'Enquiries', 'Contact'],
      };
    } else if (role === 'Content Manager' || username.includes('content')) {
      loggedUser = {
        name: 'Ananya Devi (Content Manager)',
        email: username,
        role: 'Content Manager',
        permissions: ['Products', 'Gallery', 'Contact'],
      };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('comfort_aircon_admin_auth', JSON.stringify(loggedUser));
    }

    router.push('/admin');
  };

  const handleQuickRole = (selectedRole, defaultEmail) => {
    setRole(selectedRole);
    setUsername(defaultEmail);
    setPassword('admin123');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Top Header */}
        <div className="bg-dark-navy p-4 text-center text-white border-bottom border-secondary">
          <Link href="/" className="d-inline-block mb-2">
            <img
              src="/images/logo1.png"
              alt="Comfort Aircon - Authorized Carrier, Toshiba & Midea Dealer"
              style={{ maxHeight: '48px', width: 'auto' }}
            />
          </Link>
          <h2 className="fs-5 fw-bold mb-1 text-white">Staff Admin Login</h2>
          <p className="text-light opacity-75 small mb-0">
            Comfort Aircon Management &amp; Operational Portal
          </p>
        </div>

        {/* Body Form */}
        <div className="p-4 p-md-4">
          {error && (
            <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 rounded-3 mb-3">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Quick Role Tester Bar */}
          <div className="p-2 bg-light-bg rounded-3 border mb-3 text-center">
            <small className="text-muted d-block fw-bold text-uppercase fs-8 mb-1">
              Select Demo Role to Test:
            </small>
            <div className="btn-group btn-group-sm w-100" role="group">
              <button
                type="button"
                className={`btn btn-sm ${role === 'Super Admin' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => handleQuickRole('Super Admin', 'admin@comfortaircon.com')}
              >
                Super Admin
              </button>
              <button
                type="button"
                className={`btn btn-sm ${role === 'Admin' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => handleQuickRole('Admin', 'suresh@comfortaircon.com')}
              >
                Admin
              </button>
              <button
                type="button"
                className={`btn btn-sm ${role === 'Content Manager' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => handleQuickRole('Content Manager', 'content@comfortaircon.com')}
              >
                Content Mgr
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            {/* Field 1: Email / Username */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-dark-navy" htmlFor="adminUser">
                Email / Username <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="adminUser"
                  className="form-control"
                  placeholder="Enter staff email or username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Field 2: Password */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-bold text-dark-navy mb-0" htmlFor="adminPass">
                  Password <span className="text-danger">*</span>
                </label>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none small text-primary-blue fs-8"
                  onClick={() => setShowForgotModal(true)}
                >
                  Forgot password?
                </button>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="adminPass"
                  className="form-control"
                  placeholder="Enter staff password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Role Indicator */}
            <div className="mb-3 p-2 bg-light rounded border d-flex justify-content-between align-items-center">
              <span className="small text-muted">Assigned Access Level:</span>
              <span className="badge bg-primary-blue text-white px-2 py-1 small fw-bold">
                {role}
              </span>
            </div>

            {/* Field 3: Login Button */}
            <button
              type="submit"
              className="btn btn-custom-primary w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>Sign In to Admin Panel</span>
            </button>
          </form>

          <div className="text-center mt-3 pt-3 border-top">
            <Link href="/" className="small text-muted text-decoration-none hover-primary">
              <i className="fa-solid fa-arrow-left me-1"></i> Return to Public Website
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal (FSD Section 8.1 item 5) */}
      {showForgotModal && (
        <div
          className="modal-backdrop fade show d-flex align-items-center justify-content-center"
          style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setShowForgotModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered w-100"
            style={{ maxWidth: '420px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-dark-navy text-white py-3 px-4">
                <h5 className="modal-title fs-6 fw-bold mb-0">Reset Staff Password</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowForgotModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                {forgotSent ? (
                  <div className="alert alert-success p-3 rounded-3 text-center mb-0">
                    <i className="fa-solid fa-circle-check fs-2 text-success mb-2 d-block"></i>
                    <h6 className="fw-bold mb-1">Reset Link Sent!</h6>
                    <p className="small text-muted mb-0">
                      A password recovery link has been dispatched to <strong>{forgotEmail}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit}>
                    <p className="text-muted small mb-3">
                      Enter your authorized staff email. We will send a secure password reset link to your inbox.
                    </p>
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-dark-navy">Staff Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="admin@comfortaircon.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setShowForgotModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary btn-sm fw-bold">
                        Send Reset Link
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
