'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

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

const columns: Column<Patent>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'title', header: 'Patent Title', width: '300px', formType: 'textarea', required: true },
  { key: 'referenceNumber', header: 'Reference / Patent No.', width: '170px', formType: 'text', required: true },
  { key: 'applicationType', header: 'Application Type', width: '180px', formType: 'text' },
  { key: 'diaryNumber', header: 'Diary / CBR No.', width: '160px', formType: 'text' },
  { 
    key: 'status', 
    header: 'Status', 
    width: '130px', 
    filterable: true,
    formType: 'select',
    formOptions: ['Published', 'Approved', 'Filed', 'Granted'],
    required: true,
  },
  { key: 'approved', header: 'Approved / Granted', width: '110px', formType: 'checkbox', render: (_item, val) => val ? '✓ Approved' : 'Pending' },
  { key: 'description', header: 'Description / Abstract', width: '280px', formType: 'textarea' },
];

const filterOptions = {
  status: ['Published', 'Approved', 'Filed', 'Granted'],
};

export default function AdminPatentsPage() {
  return (
    <AdminContentPage<Patent>
      collection="patents"
      title="Patents & IP"
      description="Manage published patents, copyrights, and intellectual property entries"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'referenceNumber', 'applicationType', 'description']}
      filterOptions={filterOptions}
    />
  );
}