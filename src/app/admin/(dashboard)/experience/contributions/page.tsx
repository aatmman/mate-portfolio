'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface AcademicContribution {
  id: string;
  title: string;
  description: string;
}

const columns: Column<AcademicContribution>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'title', header: 'Contribution / Event Title', width: '280px', formType: 'text', required: true },
  { key: 'description', header: 'Description / Role Detail', width: '450px', formType: 'textarea', required: true },
];

export default function AcademicContributionsPage() {
  return (
    <AdminContentPage<AcademicContribution>
      collection="academicContributions"
      title="Academic Contributions"
      description="Manage institutional student conventions, MESA forum, expert lectures, and committee appointments"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'description']}
    />
  );
}
