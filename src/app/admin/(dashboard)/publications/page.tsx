'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';
import { Publication } from '@/data/publications';

const columns: Column<Publication>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { 
    key: 'title', 
    header: 'Title', 
    render: (item: Publication) => (
      <div className="cell-title" style={{ maxWidth: '340px' }}>
        <span className={`type-badge ${item.type}`} style={{ marginRight: '0.4rem', fontSize: '0.65rem' }}>
          {item.type === 'scopus' ? 'Scopus' : item.type.includes('journal') ? 'Journal' : 'Conf.'}
        </span>
        <span style={{ fontWeight: 500 }}>{item.title}</span>
      </div>
    ),
    width: '320px',
    formType: 'textarea',
    required: true,
  },
  { key: 'authors', header: 'Authors', width: '200px', formType: 'text', required: true },
  { key: 'journal', header: 'Journal / Conference Name', width: '220px', formType: 'text', required: true },
  { key: 'year', header: 'Year', width: '90px', sortable: true, formType: 'number', required: true },
  { 
    key: 'type', 
    header: 'Type', 
    width: '140px', 
    filterable: true,
    formType: 'select',
    formOptions: ['scopus', 'journal-international', 'journal-national', 'conference-international', 'conference-national'],
    required: true,
  },
  { 
    key: 'area', 
    header: 'Research Area', 
    width: '170px', 
    filterable: true,
    formType: 'select',
    formOptions: [
      'Manufacturing & Machining', 'Surface Engineering', 'Heat Transfer', 
      'CFD & Simulation', 'Material Science', 'Mechanical Design', 
      'Renewable Energy', 'Thermal Engineering'
    ],
  },
  { key: 'volume', header: 'Volume', width: '90px', formType: 'text' },
  { key: 'issue', header: 'Issue', width: '90px', formType: 'text' },
  { key: 'pages', header: 'Pages', width: '100px', formType: 'text' },
  { key: 'issn', header: 'ISSN', width: '120px', formType: 'text' },
  { key: 'doi', header: 'DOI / Link', width: '140px', formType: 'text' },
];

const filterOptions = {
  type: ['scopus', 'journal-international', 'journal-national', 'conference-international', 'conference-national'],
  area: [
    'Manufacturing & Machining', 'Surface Engineering', 'Heat Transfer', 
    'CFD & Simulation', 'Material Science', 'Mechanical Design', 
    'Renewable Energy', 'Thermal Engineering'
  ],
};

export default function AdminPublicationsPage() {
  return (
    <AdminContentPage<Publication>
      collection="publications"
      title="Publications"
      description="Manage Scopus-indexed and peer-reviewed journal papers, DOIs, and citations"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'authors', 'journal', 'area', 'issn', 'doi']}
      filterOptions={filterOptions}
    />
  );
}