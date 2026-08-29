'use client';
import AdminContentPage from '@/components/admin/AdminContentPage';
import { patents, researchGrant, consultancy } from '@/data/patents';

interface Patent {
  id: string;
  title: string;
  referenceNumber?: string;
  applicationType?: string;
  diaryNumber?: string;
  status: string;
  approved: boolean;
  description: string;
}

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: 'Title', width: '300px' },
  { key: 'referenceNumber', header: 'Reference No.', width: '150px' },
  { key: 'applicationType', header: 'Application Type', width: '150px' },
  { key: 'status', header: 'Status', width: '120px' },
  { key: 'approved', header: 'Approved', width: '80px', render: (item: Patent) => item.approved ? '✓ Yes' : 'No' },
];

export default function AdminPatentsPage() {
  return (
    <AdminContentPage<Patent>
      collection="patents"
      title="Patents"
      description="Manage patents and intellectual property"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'referenceNumber', 'applicationType']}
      filterOptions={{
        Status: ['Filed', 'Published', 'Approved', 'Granted'],
        Approved: ['true', 'false'],
      }}
      onCreate={() => alert('Create new patent entry')}
      onEdit={(item) => alert(`Edit patent: ${item.id}`)}
      onDelete={async (item) => {
        const res = await fetch(`/api/admin/content/patents?id=${item.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
      }}
    />
  );
}