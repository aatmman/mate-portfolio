'use client';
import AdminContentPage, { Column } from '@/components/admin/AdminContentPage';

interface Consultancy {
  id: string;
  title: string;
  subtitle?: string;
  client: string;
  clientLocation?: string;
  amount: string;
  year: string;
  description: string;
}

const columns: Column<Consultancy>[] = [
  { key: 'id', header: 'ID', width: '70px', editable: false },
  { key: 'title', header: 'Consultancy Project Title', width: '260px', formType: 'text', required: true },
  { key: 'subtitle', header: 'Subtitle / Focus Area', width: '220px', formType: 'text' },
  { key: 'client', header: 'Industry Client', width: '200px', formType: 'text', required: true },
  { key: 'clientLocation', header: 'Client Location', width: '180px', formType: 'text' },
  { key: 'amount', header: 'Project Value / Amount', width: '130px', formType: 'text', required: true },
  { key: 'year', header: 'Year / Period', width: '110px', sortable: true, formType: 'text', required: true },
  { key: 'description', header: 'Scope & Technical Impact', width: '300px', formType: 'textarea' },
];

export default function ConsultancyPage() {
  return (
    <AdminContentPage<Consultancy>
      collection="consultancy"
      title="Consultancy Projects"
      description="Manage industrial consulting work, evaluations, boiler optimization, and plant design contracts"
      columns={columns}
      getItemId={(item) => item.id}
      searchKeys={['title', 'client', 'year', 'description', 'subtitle']}
    />
  );
}
