'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface ConferenceOrganized {
  id: string;
  title: string;
  role: string;
  institution: string;
  dates: string;
  year?: number;
}

const columns: Column<ConferenceOrganized>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'title', header: 'Workshop / Conference Title', width: '320px', formType: 'text', required: true },
  { key: 'role', header: 'Organizing Role (e.g. Convener)', width: '180px', formType: 'text', required: true },
  { key: 'institution', header: 'Host Institution / Collaborators', width: '250px', formType: 'text', required: true },
  { key: 'dates', header: 'Dates / Duration', width: '160px', formType: 'text', required: true },
  { key: 'year', header: 'Year', width: '90px', sortable: true, formType: 'number' },
];

export default function ConferencesOrganizedPage() {
  return (
    <AdminContentPage<ConferenceOrganized>
      collection="conferencesOrganized"
      title="Conferences & Workshops Organized"
      description="Manage STTPs, faculty workshops, national conferences, and international seminars organized"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'role', 'institution', 'dates']}
    />
  );
}
