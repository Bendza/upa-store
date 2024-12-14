import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/collection/Breadcrumbs';
import ProductGallery from '../components/product/ProductGallery';
import ProductDetails from '../components/product/ProductDetails';
import RelatedProducts from '../components/product/RelatedProducts';
import { products } from '../data/mockData';

const ProductPage = () => {
  const { slug } = useParams();
  
  // Find the product based on the slug
  const product = products.find(p => p.slug === slug) || products[0];
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: 'Početna', href: '/' },
          { label: product.category === 'muska-obuca' ? 'Muška obuća' : 'Ženska obuća', 
            href: `/${product.category}` },
          { label: product.name, href: `/proizvod/${product.slug}` },
        ]} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <ProductGallery images={product.images} />
        <ProductDetails product={product} />
      </div>
      
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductPage; 