'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface EditorialRole {
  id: string;
  journal: string;
  role: string;
  issn?: string;
  period?: string;
}

const columns: Column<EditorialRole>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'journal', header: 'Journal / Publisher Name', width: '350px', formType: 'text', required: true },
  { key: 'role', header: 'Board Role', width: '220px', formType: 'text', required: true },
  { key: 'issn', header: 'ISSN', width: '140px', formType: 'text' },
  { key: 'period', header: 'Period / Tenure', width: '140px', formType: 'text' },
];

export default function EditorialRolesPage() {
  return (
    <AdminContentPage<EditorialRole>
      collection="editorialRoles"
      title="Editorial & Reviewer Roles"
      description="Manage peer-reviewed journal editorial boards, international conference reviewer honors, and reviewer panels"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['journal', 'role', 'issn']}
    />
  );
}
