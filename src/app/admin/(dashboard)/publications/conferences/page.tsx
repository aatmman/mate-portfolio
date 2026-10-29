'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';
import { ConferencePaper } from '@/data/publications';

const columns: Column<ConferencePaper>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'title', header: 'Paper Title', width: '320px', formType: 'textarea', required: true },
  { key: 'authors', header: 'Authors', width: '220px', formType: 'text', required: true },
  { key: 'conference', header: 'Conference Name', width: '240px', formType: 'text', required: true },
  { key: 'location', header: 'Location / Venue', width: '160px', formType: 'text' },
  { key: 'date', header: 'Date', width: '120px', formType: 'text' },
  { key: 'year', header: 'Year', width: '90px', sortable: true, formType: 'number', required: true },
  { 
    key: 'type', 
    header: 'Conference Type', 
    width: '150px', 
    filterable: true,
    formType: 'select',
    formOptions: ['conference-international', 'conference-national'],
    required: true,
  },
  { key: 'pages', header: 'Pages / Proc. No', width: '110px', formType: 'text' },
  { key: 'area', header: 'Subject Area', width: '150px', formType: 'text' },
];

const filterOptions = {
  type: ['conference-international', 'conference-national'],
};

export default function ConferencePapersPage() {
  return (
    <AdminContentPage<ConferencePaper>
      collection="conferencePapers"
      title="Conference Papers"
      description="Manage international and national conference proceedings and presentations"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'authors', 'conference', 'location', 'year']}
      filterOptions={filterOptions}
      defaultSort={{ key: 'year', direction: 'desc' }}
    />
  );
}
