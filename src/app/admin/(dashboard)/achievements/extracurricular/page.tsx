'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface ExtraCurricular {
  id: string;
  activity: string;
  description: string;
}

const columns: Column<ExtraCurricular>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'activity', header: 'Activity / Event / Outreach', width: '280px', formType: 'text', required: true },
  { key: 'description', header: 'Description & Institutional Impact', width: '450px', formType: 'textarea', required: true },
];

export default function ExtraCurricularPage() {
  return (
    <AdminContentPage<ExtraCurricular>
      collection="extraCurricular"
      title="Extra-Curricular & Outreach"
      description="Manage community outreach, student mentoring programs, blood donation camps, and development seminars"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['activity', 'description']}
    />
  );
}
