import Breadcrumbs from '../collection/Breadcrumbs';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-black text-center mb-4">{title}</h1>
        <Breadcrumbs 
          items={[
            { label: 'Početna', href: '/' },
            { label: 'Kontakt', href: '/kontakt' }
          ]} 
        />
      </div>
    </div>
  );
};

export default PageHeader; 