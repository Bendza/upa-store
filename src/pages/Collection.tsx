import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs, { BreadcrumbItem } from '../components/collection/Breadcrumbs';
import FilterSidebar from '../components/collection/FilterSidebar';
import ProductGrid from '../components/collection/ProductGrid';
import { products } from '../data/mockData';

interface Filters {
  priceRange: [number, number];
  sizes: string[];
}

const Collection = () => {
  const { category } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 50000],
    sizes: [],
  });

  // Memoize the filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Apply size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => filters.sizes.includes(size.size))
      );
    }

    return filtered;
  }, [category, filters.priceRange, filters.sizes]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const baseBreadcrumbs: BreadcrumbItem[] = [
      { label: 'Početna', href: '/' }
    ];

    if (!category) {
      return [...baseBreadcrumbs, { label: 'Kolekcije', href: '/kolekcije' }];
    }

    const categoryMap: Record<string, string> = {
      'muska-obuca': 'Muška obuća',
      'zenska-obuca': 'Ženska obuća'
    };

    return [
      ...baseBreadcrumbs,
      { label: categoryMap[category] || category, href: `/kolekcije/${category}` }
    ];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={getBreadcrumbs()} />
      
      {/* Mobile Filter Toggle */}
      <button
        className="lg:hidden mb-4 flex items-center text-gray-600"
        onClick={() => setIsFilterOpen(true)}
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Filter
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3">
          <FilterSidebar 
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onFilterChange={handleFilterChange}
          />
        </aside>
        <main className="lg:col-span-9">
          <ProductGrid 
            products={filteredProducts.map(product => ({
              id: product.id,
              name: product.name,
              price: product.price,
              images: product.images,
              sizes: product.sizes,
              slug: product.slug
            }))}
            totalProducts={products.length}
          />
        </main>
      </div>
    </div>
  );
};

export default Collection; 