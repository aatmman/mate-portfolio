'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';
import { Position } from '@/data/experience';

const columns: Column<Position>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'designation', header: 'Designation / Rank', width: '220px', formType: 'text', required: true },
  { key: 'organization', header: 'Institution / Organization', width: '300px', formType: 'text', required: true },
  { key: 'from', header: 'From Date', width: '130px', formType: 'text', required: true },
  { key: 'to', header: 'To Date', width: '130px', formType: 'text', required: true },
  { key: 'duration', header: 'Duration Text', width: '140px', formType: 'text', required: true },
  { key: 'current', header: 'Current Position', width: '110px', formType: 'checkbox', render: (_item, val) => val ? '✓ Current' : 'Past' },
];

export default function AdminExperiencePage() {
  return (
    <AdminContentPage<Position>
      collection="experience"
      title="Academic Career"
      description="Manage teaching positions, professorships, institutions, and tenure periods"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['designation', 'organization', 'from', 'to', 'duration']}
    />
  );
}