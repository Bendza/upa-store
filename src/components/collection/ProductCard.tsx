import { Link } from 'react-router-dom';
import useCartStore from '../../stores/cartStore';
import type { Product } from '../../types/product';

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  images: string[];
  isNew?: boolean;
  sizes: Array<{ size: string; inStock: boolean }>;
}

const ProductCard = ({ id, name, price, images, isNew, sizes }: ProductCardProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: id.toString(),
      name,
      price,
      size: sizes[0].size,
      quantity: 1,
      image: images[0],
      maxQuantity: 10
    });
  };

  return (
    <div className="group relative">
      {isNew && (
        <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-sm z-10">
          NOVO
        </span>
      )}
      
      <Link to={`/proizvod/${id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100">
          <img 
            src={images[0]} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-medium group-hover:text-[#B39B8E] transition-colors">
            {name}
          </h3>
          <p className="text-gray-900 font-semibold">
            {price.toLocaleString()} RSD
          </p>
        </div>
      </Link>

      <button 
        className="w-full bg-black text-white py-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#B39B8E]"
        onClick={handleAddToCart}
      >
        IZABERI OPCIJE
      </button>
    </div>
  );
};

export default ProductCard; 