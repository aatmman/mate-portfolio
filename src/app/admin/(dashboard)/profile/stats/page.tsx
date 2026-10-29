import { redirect } from 'next/navigation';

export default function ProfileStatsPage() {
  redirect('/admin/profile?tab=stats');
}
