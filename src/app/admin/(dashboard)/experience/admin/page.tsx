'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface AdminRole {
  id: string;
  role: string;
  description: string;
  institution: string;
  period: string;
}

const columns: Column<AdminRole>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'role', header: 'Administrative Role / Title', width: '250px', formType: 'text', required: true },
  { key: 'institution', header: 'Institution / Department', width: '240px', formType: 'text', required: true },
  { key: 'period', header: 'Tenure / Period', width: '130px', formType: 'text', required: true },
  { key: 'description', header: 'Key Responsibilities', width: '350px', formType: 'textarea', required: true },
];

export default function AdminExperienceRolesPage() {
  return (
    <AdminContentPage<AdminRole>
      collection="adminExperience"
      title="Administrative Experience"
      description="Manage leadership responsibilities such as NBA/NAAC Coordinator, Dean Academics, HoD, and Exam Officer"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['role', 'institution', 'period', 'description']}
    />
  );
}
