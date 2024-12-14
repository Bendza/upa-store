import { useState } from 'react';
import ProductCard, { ProductCardProps } from './ProductCard';

interface ProductGridProps {
  products: Array<ProductCardProps & { slug: string }>;
  totalProducts: number;
}

const ProductGrid = ({ products, totalProducts }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState<string>('price_asc');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const getSortedProducts = () => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case 'price_asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'name_asc':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sortedProducts;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <span className="text-gray-600">
          Prikazano {products.length} od {totalProducts} rezultata
        </span>
        <select 
          className="border p-2 rounded min-w-[200px]"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="price_asc">Cena: od niže ka višoj</option>
          <option value="price_desc">Cena: od više ka nižoj</option>
          <option value="name_asc">Naziv: A-Z</option>
          <option value="name_desc">Naziv: Z-A</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getSortedProducts().map(product => (
          <ProductCard 
            key={product.id} 
            {...product}
          />
        ))}
      </div>

      {products.length < totalProducts && (
        <div className="mt-8 text-center">
          <button className="bg-[#B39B8E] text-white px-8 py-3 rounded hover:bg-[#9A8275] transition-colors">
            UČITAJ JOŠ
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 