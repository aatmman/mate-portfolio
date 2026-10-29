'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';
import { Degree } from '@/data/education';

const columns: Column<Degree>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'degree', header: 'Degree', width: '220px', formType: 'text', required: true },
  { key: 'field', header: 'Field / Specialization', width: '180px', formType: 'text', required: true },
  { key: 'institution', header: 'Institution', width: '220px', formType: 'text', required: true },
  { key: 'university', header: 'University / Board', width: '220px', formType: 'text', required: true },
  { key: 'year', header: 'Year', width: '110px', sortable: true, formType: 'text', required: true },
  { key: 'percentage', header: 'Percentage', width: '100px', formType: 'text' },
  { key: 'division', header: 'Division', width: '130px', formType: 'text' },
  { key: 'thesis', header: 'Thesis Title', width: '240px', formType: 'textarea' },
  { key: 'advisor', header: 'Advisor', width: '160px', formType: 'text' },
  { key: 'highlight', header: 'Doctoral Highlight', width: '90px', formType: 'checkbox', render: (_item, val) => val ? '★ Yes' : 'No' },
];

const filterOptions = {
  degree: ['Doctor of Philosophy (Ph.D.)', 'Master of Business Administration (MBA)', 'Master of Engineering (M.E.)', 'Bachelor in Production Engineering (B.E.)', 'H.S.S.C.', 'S.S.C.'],
};

export default function AdminEducationPage() {
  return (
    <AdminContentPage<Degree>
      collection="education"
      title="Education"
      description="Manage academic qualifications, degrees, doctoral credentials, and thesis topics"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['degree', 'field', 'institution', 'university', 'year', 'thesis']}
      filterOptions={filterOptions}
    />
  );
}