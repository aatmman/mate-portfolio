import { redirect } from 'next/navigation';

export default function ProfileBasicPage() {
  redirect('/admin/profile?tab=basic');
}
