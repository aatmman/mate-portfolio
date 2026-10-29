import { redirect } from 'next/navigation';

export default function ProfileThemesPage() {
  redirect('/admin/profile?tab=themes');
}
