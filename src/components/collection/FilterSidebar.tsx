import { useState } from 'react';
import { Link } from 'react-router-dom';
import PriceRangeSlider from './PriceRangeSlider';
import { latestModels } from '../../data/mockData';

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

interface FilterOptions {
  priceRange?: [number, number];
  sizes?: string[];
}

const FilterSidebar = ({ onFilterChange, isOpen = true, onClose }: FilterSidebarProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  
  const sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  const handlePriceChange = (range: [number, number]) => {
    onFilterChange({ priceRange: range });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    setSelectedSize(size);
    onFilterChange({ sizes: size ? [size] : [] });
  };

  const LatestModelCard = ({ name, price, image, href }: typeof latestModels[0]) => (
    <Link to={href} className="group block">
      <div className="flex space-x-4">
        <div className="w-20 h-20 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div>
          <h4 className="text-sm font-medium group-hover:text-[#B39B8E]">{name}</h4>
          <p className="text-sm text-gray-600">{price.toLocaleString()} RSD</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className={`
      space-y-6 bg-white
      lg:block
      ${isOpen ? 'block fixed inset-y-0 left-0 z-50 w-80 p-6 shadow-lg overflow-y-auto' : 'hidden'}
      lg:static lg:p-0 lg:shadow-none lg:w-auto
    `}>
      {isOpen && (
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Price Range Filter */}
      <div className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4">FILTER PO CENI</h3>
        <PriceRangeSlider
          min={9990}
          max={15990}
          currency="RSD"
          onChange={handlePriceChange}
        />
      </div>

      {/* Size Filter */}
      <div className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4">VELIČINA</h3>
        <select 
          className="w-full p-2 border rounded"
          value={selectedSize}
          onChange={handleSizeChange}
        >
          <option value="">Izaberite veličinu</option>
          {sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Latest Models */}
      <div className="pb-6">
        <h3 className="text-lg font-medium mb-4">NAJNOVIJI MODELI</h3>
        <div className="space-y-4">
          {latestModels.map(model => (
            <LatestModelCard key={model.id} {...model} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar; 