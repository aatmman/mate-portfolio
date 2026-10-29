'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface Book {
  id: string;
  title: string;
  isbn: string;
  description: string;
  color?: string;
  colorLight?: string;
}

const columns: Column<Book>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'title', header: 'Book Title', width: '320px', formType: 'text', required: true },
  { key: 'isbn', header: 'ISBN Number', width: '180px', formType: 'text', required: true },
  { key: 'description', header: 'Synopsis & Syllabus Coverage', width: '350px', formType: 'textarea', required: true },
  { key: 'color', header: 'Accent Color Hex (e.g. #C96A45)', width: '150px', formType: 'text' },
  { key: 'colorLight', header: 'Light Background Hex (e.g. #FBE9E2)', width: '150px', formType: 'text' },
];

export default function BooksPage() {
  return (
    <AdminContentPage<Book>
      collection="books"
      title="Books Published"
      description="Manage textbooks and research monographs authored in robotics, mechatronics, and material science"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'isbn', 'description']}
    />
  );
}
