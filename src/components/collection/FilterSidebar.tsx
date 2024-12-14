import React, { useEffect, useState } from 'react';
import { Filters } from '../../pages/Collection';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  products: Array<{ sizes: string[]; price: number }>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, onFilterChange, products }) => {
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  useEffect(() => {
    const sizesSet = new Set<string>();
    products.forEach(product => {
      product.sizes.forEach(size => sizesSet.add(size));
    });
    setAvailableSizes(Array.from(sizesSet));

    const prices = products.map(product => product.price);
    if (prices.length > 0) {
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [products]);

  const handleSizeChange = (size: string) => {
    onFilterChange((prev: Partial<Filters>) => ({
      ...prev,
      sizes: prev.sizes?.includes(size) ? prev.sizes.filter(s => s !== size) : [...(prev.sizes || []), size]
    }));
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange((prev: Partial<Filters>) => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2>Filter by Size</h2>
      {availableSizes.map(size => (
        <div key={size}>
          <label>
            <input
              type="checkbox"
              checked={availableSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
            />
            {size}
          </label>
        </div>
      ))}

      <h2>Filter by Price</h2>
      <input
        type="number"
        value={priceRange[0]}
        onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
      />
      <input
        type="number"
        value={priceRange[1]}
        onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
      />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FilterSidebar; 