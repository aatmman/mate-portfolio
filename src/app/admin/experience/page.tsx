'use client';
import AdminContentPage from '@/components/admin/AdminContentPage';
import { experience, Position } from '@/data/experience';

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'designation', header: 'Designation', width: '200px' },
  { key: 'organization', header: 'Organization', width: '300px' },
  { key: 'from', header: 'From', width: '120px' },
  { key: 'to', header: 'To', width: '120px' },
  { key: 'duration', header: 'Duration', width: '120px' },
  { key: 'current', header: 'Current', width: '80px', render: (item: Position) => item.current ? '✓ Yes' : 'No' },
];

export default function AdminExperiencePage() {
  return (
    <AdminContentPage<Position>
      collection="experience"
      title="Academic Career"
      description="Manage professional experience and positions"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['designation', 'organization', 'from', 'to']}
      filterOptions={{
        Current: ['true', 'false'],
      }}
      onCreate={() => alert('Create new experience entry')}
      onEdit={(item) => alert(`Edit experience: ${item.id}`)}
      onDelete={async (item) => {
        const res = await fetch(`/api/admin/content/experience?id=${item.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
      }}
    />
  );
}