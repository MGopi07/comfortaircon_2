'use client';

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [appointmentState, setAppointmentState] = useState({
    isOpen: false,
    productName: '',
  });

  const [specState, setSpecState] = useState({
    isOpen: false,
    data: {
      name: '',
      brand: '',
      desc: '',
      specs: '',
      img: '/images/carrier-split.png',
    },
  });

  const [toastMessage, setToastMessage] = useState(null);

  const openAppointment = (productName = '') => {
    setAppointmentState({
      isOpen: true,
      productName,
    });
  };

  const closeAppointment = () => {
    setAppointmentState({
      isOpen: false,
      productName: '',
    });
  };

  const openSpec = (data) => {
    setSpecState({
      isOpen: true,
      data: {
        name: data.name || '',
        brand: data.brand || '',
        desc: data.desc || '',
        specs: data.specs || '',
        img: data.img || '/images/carrier-split.png',
      },
    });
  };

  const closeSpec = () => {
    setSpecState((prev) => ({ ...prev, isOpen: false }));
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 5500);
  };

  return (
    <ModalContext.Provider
      value={{
        appointmentState,
        openAppointment,
        closeAppointment,
        specState,
        openSpec,
        closeSpec,
        toastMessage,
        showToast,
        closeToast,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
