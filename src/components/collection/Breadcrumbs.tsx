import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-8">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <span className="text-gray-400 mx-2">/</span>}
          {index === items.length - 1 ? (
            <span className="text-gray-600">{item.label}</span>
          ) : (
            <Link 
              to={item.href}
              className="text-gray-900 hover:text-[#B39B8E]"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs; 