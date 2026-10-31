'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';

export default function Toast() {
  const { toastMessage, closeToast } = useModal();

  if (!toastMessage) return null;

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x px-2 pt-2 pt-sm-3"
      style={{
        zIndex: 99999,
        maxWidth: '520px',
        width: 'calc(100% - 16px)',
        pointerEvents: 'none',
      }}
    >
      <div
        className="toast-top-banner border-0 rounded-4 shadow-lg overflow-hidden d-flex align-items-center gap-2.5 gap-sm-3 p-2.5 px-3 p-sm-3"
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 14px 36px rgba(15, 23, 42, 0.18), 0 2px 8px rgba(16, 185, 129, 0.12)',
          borderLeft: '4px solid #10B981',
          pointerEvents: 'auto',
          animation: 'slideDownTopPopup 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        role="alert"
        aria-live="assertive"
      >
        {/* Success Icon Badge */}
        <div
          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#ECFDF5',
            color: '#10B981',
            fontSize: '1.15rem',
          }}
        >
          <i className="fa-solid fa-circle-check"></i>
        </div>

        {/* Message Content */}
        <div className="flex-grow-1 min-w-0">
          <div
            className="fw-bold text-dark-navy lh-sm"
            style={{ fontSize: '0.925rem', color: '#0F172A', letterSpacing: '-0.01em' }}
          >
            Enquiry Received!
          </div>
          <div
            className="text-secondary lh-sm mt-0.5"
            style={{
              fontSize: '0.8rem',
              color: '#475569',
            }}
          >
            {toastMessage}
          </div>
        </div>

        {/* Dismiss Close Button */}
        <button
          type="button"
          className="btn-close flex-shrink-0 ms-1"
          aria-label="Close"
          onClick={() => closeToast && closeToast()}
          style={{ fontSize: '0.75rem', padding: '0.35rem' }}
        ></button>
      </div>

      <style jsx>{`
        @keyframes slideDownTopPopup {
          from {
            opacity: 0;
            transform: translateY(-24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}


