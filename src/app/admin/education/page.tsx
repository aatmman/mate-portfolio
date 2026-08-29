'use client';
import AdminContentPage from '@/components/admin/AdminContentPage';
import { education, Degree } from '@/data/education';

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'degree', header: 'Degree', width: '250px' },
  { key: 'field', header: 'Field', width: '200px' },
  { key: 'institution', header: 'Institution', width: '250px' },
  { key: 'university', header: 'University', width: '250px' },
  { key: 'year', header: 'Year', width: '120px', sortable: true },
  { key: 'percentage', header: 'Percentage', width: '100px' },
  { key: 'division', header: 'Division', width: '100px' },
  { key: 'thesis', header: 'Thesis', width: '300px' },
];

const filterOptions = {
  Degree: ['Doctor of Philosophy (Ph.D.)', 'Master of Business Administration (MBA)', 'Master of Engineering (M.E.)', 'Bachelor in Production Engineering (B.E.)', 'H.S.S.C.', 'S.S.C.'],
};

export default function AdminEducationPage() {
  return (
    <AdminContentPage<Degree>
      collection="education"
      title="Education"
      description="Manage academic qualifications and degrees"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['degree', 'field', 'institution', 'university', 'year']}
      filterOptions={filterOptions}
      onCreate={() => alert('Create new education entry')}
      onEdit={(item) => alert(`Edit education: ${item.id}`)}
      onDelete={async (item) => {
        const res = await fetch(`/api/admin/content/education?id=${item.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
      }}
    />
  );
}