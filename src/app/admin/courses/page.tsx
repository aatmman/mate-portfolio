'use client';
import AdminContentPage from '@/components/admin/AdminContentPage';
import { courses, Course } from '@/data/courses';

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: 'Title', width: '350px' },
  { key: 'category', header: 'Category', width: '120px' },
  { key: 'institution', header: 'Institution', width: '200px' },
  { key: 'date', header: 'Date', width: '150px', sortable: true },
  { key: 'year', header: 'Year', width: '80px', sortable: true },
];

const filterOptions = {
  Category: ['ATAL FDP', 'Coursera', 'STTP', 'FDP', 'Workshop', 'Online'],
};

export default function AdminCoursesPage() {
  return (
    <AdminContentPage<Course>
      collection="courses"
      title="Courses & FDPs"
      description="Manage professional development courses and FDPs"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'institution', 'category']}
      filterOptions={filterOptions}
      onCreate={() => alert('Create new course entry')}
      onEdit={(item) => alert(`Edit course: ${item.id}`)}
      onDelete={async (item) => {
        const res = await fetch(`/api/admin/content/courses?id=${item.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
      }}
      defaultSort={{ key: 'year', direction: 'desc' }}
    />
  );
}