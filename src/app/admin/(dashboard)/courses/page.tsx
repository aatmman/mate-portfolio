'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';
import { Course } from '@/data/courses';

const columns: Column<Course>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'title', header: 'Course / Program Title', width: '320px', formType: 'text', required: true },
  { 
    key: 'category', 
    header: 'Category', 
    width: '140px', 
    filterable: true, 
    formType: 'select',
    formOptions: ['ATAL FDP', 'Coursera', 'STTP', 'FDP', 'Workshop', 'Online'],
    required: true,
  },
  { key: 'institution', header: 'Institution / Platform', width: '240px', formType: 'text' },
  { key: 'date', header: 'Dates / Period', width: '150px', formType: 'text' },
  { key: 'year', header: 'Year', width: '90px', sortable: true, formType: 'number' },
];

const filterOptions = {
  category: ['ATAL FDP', 'Coursera', 'STTP', 'FDP', 'Workshop', 'Online'],
};

export default function AdminCoursesPage() {
  return (
    <AdminContentPage<Course>
      collection="courses"
      title="Courses & FDPs"
      description="Manage STTPs, ATAL FDPs, professional development, and Coursera certifications"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'institution', 'category', 'date']}
      filterOptions={filterOptions}
      defaultSort={{ key: 'year', direction: 'desc' }}
    />
  );
}