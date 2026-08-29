'use client';
import AdminContentPage from '@/components/admin/AdminContentPage';
import { FileText, Eye, Edit, Trash2, Download, Upload, Plus, Award, Users, GraduationCap, BookOpen, FlaskConical, Briefcase, PenTool, Shield, Database, Settings } from 'lucide-react';
import { publications, Publication } from '@/data/publications';

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { 
    key: 'title', 
    header: 'Title', 
    render: (item: Publication) => (
      <div className="cell-title">
        <span className={`type-badge ${item.type}`}>{item.type === 'scopus' ? 'Scopus' : item.type.includes('journal') ? 'Journal' : 'Conf.'}</span>
        <span>{item.title}</span>
      </div>
    ),
    width: '350px',
  },
  { key: 'authors', header: 'Authors', width: '200px' },
  { key: 'journal', header: 'Journal / Conference', width: '200px' },
  { key: 'year', header: 'Year', width: '80px', sortable: true },
  { key: 'area', header: 'Research Area', width: '150px' },
  { key: 'type', header: 'Type', width: '120px', filterable: true },
];

const filterOptions = {
  Type: ['scopus', 'journal-international', 'conference-international', 'conference-national'],
  'Research Area': ['Manufacturing & Machining', 'Surface Engineering', 'Heat Transfer', 'CFD & Simulation', 'Material Science', 'Mechanical Design', 'Renewable Energy', 'Thermal Engineering'],
};

export default function AdminPublicationsPage() {
  return (
    <AdminContentPage<Publication>
      collection="publications"
      title="Publications"
      description="Manage research publications and conference papers"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'authors', 'journal', 'year']}
      filterOptions={filterOptions}
      onCreate={() => alert('Create new publication - implement modal')}
      onEdit={(item) => alert(`Edit publication: ${item.id}`)}
      onView={(item) => alert(`View publication: ${item.title}`)}
      onDelete={async (item) => {
        const res = await fetch(`/api/admin/content/publications?id=${item.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
      }}
      onExport={() => {
        const headers = columns.map(c => c.header).join(',');
        const rows = publications.map(item => 
          columns.map(c => {
            const value = item[c.key as keyof Publication];
            return `"${String(c.render ? c.render(item, value) : value || '').replace(/"/g, '""')}"`;
          }).join(',')
        );
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `publications-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }}
      onBulkImport={() => alert('Bulk import - implement CSV upload')}
      defaultSort={{ key: 'year', direction: 'desc' }}
    />
  );
}