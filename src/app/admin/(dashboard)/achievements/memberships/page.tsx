'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface Membership {
  id: string;
  organization: string;
  grade?: string;
  memberId?: string;
  year?: string;
}

const columns: Column<Membership>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'organization', header: 'Professional Body / Society', width: '360px', formType: 'text', required: true },
  { key: 'grade', header: 'Membership Grade (e.g. Life Member)', width: '180px', formType: 'text' },
  { key: 'memberId', header: 'Membership Number / ID', width: '160px', formType: 'text' },
  { key: 'year', header: 'Induction Year', width: '110px', sortable: true, formType: 'text' },
];

export default function MembershipsPage() {
  return (
    <AdminContentPage<Membership>
      collection="memberships"
      title="Professional Memberships"
      description="Manage professional society memberships (ISTE, IIIE, etc.) and affiliations"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['organization', 'grade', 'memberId', 'year']}
    />
  );
}
