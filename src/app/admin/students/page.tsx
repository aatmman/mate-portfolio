'use client';
import AdminContentPage from '@/components/admin/AdminContentPage';
import { students, StudentProject } from '@/data/achievements';

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'student', header: 'Student', width: '200px' },
  { key: 'title', header: 'Project Title', width: '400px' },
  { key: 'year', header: 'Year', width: '80px', sortable: true },
  { key: 'level', header: 'Level', width: '80px' },
];

const filterOptions = {
  Level: ['UG', 'PG'],
};

export default function AdminStudentsPage() {
  return (
    <AdminContentPage<StudentProject>
      collection="students"
      title="Students & Projects Guided"
      description="Manage guided student projects"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['student', 'title', 'year']}
      filterOptions={filterOptions}
      onCreate={() => alert('Create new student project entry')}
      onEdit={(item) => alert(`Edit student project: ${item.id}`)}
      onDelete={async (item) => {
        const res = await fetch(`/api/admin/content/students?id=${item.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
      }}
      defaultSort={{ key: 'year', direction: 'desc' }}
    />
  );
}