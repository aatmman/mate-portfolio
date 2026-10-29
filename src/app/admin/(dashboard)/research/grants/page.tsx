'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface ResearchGrant {
  id: string;
  title: string;
  amount: string;
  amountFormatted?: string;
  sponsor: string;
  fileNo?: string;
  date?: string;
  description: string;
}

const columns: Column<ResearchGrant>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'title', header: 'Grant / STTP Title', width: '260px', formType: 'text', required: true },
  { key: 'amount', header: 'Sanctioned Amount', width: '150px', formType: 'text', required: true },
  { key: 'amountFormatted', header: 'Display Amount (e.g. ₹5 Lakhs)', width: '150px', formType: 'text' },
  { key: 'sponsor', header: 'Sponsoring Agency', width: '220px', formType: 'text', required: true },
  { key: 'fileNo', header: 'File / Sanction Reference', width: '180px', formType: 'text' },
  { key: 'date', header: 'Sanction Date', width: '140px', formType: 'text' },
  { key: 'description', header: 'Grant Purpose / Scheme', width: '320px', formType: 'textarea', required: true },
];

export default function ResearchGrantsPage() {
  return (
    <AdminContentPage<ResearchGrant>
      collection="researchGrant"
      title="Research Grants"
      description="Manage AICTE, government, and university sponsored research grants and schemes"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'sponsor', 'fileNo', 'description']}
    />
  );
}
