import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login - Dr. Dnyaneshwar M. Mate',
  description: 'Sign in to manage the academic portfolio',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}