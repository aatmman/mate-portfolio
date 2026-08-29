'use client';
import AdminContentPage from '@/components/admin/AdminContentPage';
import { awards } from '@/data/achievements';

interface Award {
  id: string;
  title: string;
  organization: string;
  location?: string;
  year: string;
  description: string;
  highlight: boolean;
}

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: 'Title', width: '250px' },
  { key: 'organization', header: 'Organization', width: '200px' },
  { key: 'location', header: 'Location', width: '150px' },
  { key: 'year', header: 'Year', width: '100px', sortable: true },
  { key: 'highlight', header: 'Featured', width: '80px', render: (item: Award) => item.highlight ? '✓ Yes' : 'No' },
];

export default function AdminAwardsPage() {
  return (
    <AdminContentPage<Award>
      collection="awards"
      title="Awards & Recognition"
      description="Manage awards and recognitions"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'organization', 'year']}
      filterOptions={{
        Featured: ['true', 'false'],
      }}
      onCreate={() => alert('Create new award entry')}
      onEdit={(item) => alert(`Edit award: ${item.id}`)}
      onDelete={async (item) => {
        const res = await fetch(`/api/admin/content/awards?id=${item.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
      }}
    />
  );
}