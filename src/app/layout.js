import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { ModalProvider } from '@/context/ModalContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/AppointmentModal';
import ProductSpecModal from '@/components/ProductSpecModal';
import Toast from '@/components/Toast';
import FloatingButtons from '@/components/FloatingButtons';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'Comfort Aircon | Carrier, Toshiba & Midea HVAC Solutions',
  description:
    'Official Carrier, Toshiba & Midea HVAC partner in Puducherry. Technical expertise in VRF systems, cassette ACs, and turnkey commercial cooling solutions.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Noto+Sans+Tamil:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <ModalProvider>
          <SmoothScroll />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AppointmentModal />
          <ProductSpecModal />
          <Toast />
          <FloatingButtons />
        </ModalProvider>
      </body>
    </html>
  );
}
