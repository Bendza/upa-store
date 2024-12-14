import type { Product } from '../../types/product';
import ProductCard from '../collection/ProductCard';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-medium mb-6">Slični proizvodi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            id={product.id}
            name={product.name}
            price={product.price}
            images={product.images}
            slug={product.slug}
            sizes={product.sizes.map(s => s.size)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts; 