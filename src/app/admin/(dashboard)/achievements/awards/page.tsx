'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface Award {
  id: string;
  title: string;
  organization: string;
  location?: string;
  year: string;
  description: string;
  highlight: boolean;
}

const columns: Column<Award>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'title', header: 'Award / Honor Title', width: '260px', formType: 'text', required: true },
  { key: 'organization', header: 'Conferring Body / Organization', width: '240px', formType: 'text', required: true },
  { key: 'location', header: 'Location / Venue', width: '160px', formType: 'text' },
  { key: 'year', header: 'Year', width: '90px', sortable: true, formType: 'text', required: true },
  { key: 'highlight', header: 'Featured Award', width: '110px', formType: 'checkbox', render: (_item, val) => val ? '★ Featured' : 'Standard' },
  { key: 'description', header: 'Description / Citation', width: '280px', formType: 'textarea' },
];

export default function AdminAwardsPage() {
  return (
    <AdminContentPage<Award>
      collection="awards"
      title="Awards & Honors"
      description="Manage institutional honors, best researcher awards, and paper awards"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'organization', 'year', 'description', 'location']}
    />
  );
}