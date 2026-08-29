import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession, requireAdmin } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin Portal - Dr. Dnyaneshwar M. Mate',
  description: 'Admin dashboard for managing academic portfolio',
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}