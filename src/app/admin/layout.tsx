import { Metadata } from 'next';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin Portal - Dr. Dnyaneshwar M. Mate',
  description: 'Admin dashboard for managing academic portfolio',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}