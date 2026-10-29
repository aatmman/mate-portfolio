'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';
import { StudentProject } from '@/data/achievements';

const columns: Column<StudentProject>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'student', header: 'Student Name', width: '220px', formType: 'text', required: true },
  { key: 'title', header: 'Dissertation / Project Title', width: '380px', formType: 'textarea', required: true },
  { key: 'year', header: 'Year', width: '90px', sortable: true, formType: 'number', required: true },
  { 
    key: 'level', 
    header: 'Degree Level', 
    width: '120px', 
    filterable: true, 
    formType: 'select',
    formOptions: ['PG', 'Ph.D.', 'UG'],
    required: true,
  },
];

const filterOptions = {
  level: ['PG', 'Ph.D.', 'UG'],
};

export default function AdminStudentsPage() {
  return (
    <AdminContentPage<StudentProject>
      collection="students"
      title="Students Guided"
      description="Manage M.E. / Post-Graduate dissertations, student research projects, and guidance records"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['student', 'title', 'year', 'level']}
      filterOptions={filterOptions}
      defaultSort={{ key: 'year', direction: 'desc' }}
    />
  );
}