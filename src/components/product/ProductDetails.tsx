import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../stores/cartStore';
import type { Product } from '../../types/product';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.images[0],
      maxQuantity: 10
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Product Title & SKU */}
      <div>
        <h1 className="text-3xl font-medium">{product.name}</h1>
        <p className="text-gray-600 mt-1">
          Oznaka proizvoda: {product.sku}
        </p>
      </div>
      
      {/* Price */}
      <div className="text-2xl">
        {product.price.toLocaleString()} RSD
      </div>
      
      {/* Color Variants */}
      {product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">
            Dostupno u više boja:
          </h3>
          <div className="flex gap-2">
            {product.colors.map(color => (
              <Link
                key={color.code}
                to={`/proizvod/${color.code}`}
                className="w-16 h-16 border rounded-md overflow-hidden"
              >
                <img
                  src={color.image}
                  alt={color.name}
                  className="w-full h-full object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Size Selection */}
      <div>
        <h3 className="text-sm font-medium mb-2">Veličina:</h3>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map(({ size, inStock }) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              disabled={!inStock}
              className={`
                py-2 border rounded-md text-center
                ${selectedSize === size ? 'border-black' : 'border-gray-200'}
                ${!inStock && 'opacity-50 cursor-not-allowed'}
                hover:border-black transition-colors
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      {/* Add to Cart Section */}
      <div className="flex gap-4">
        <div className="flex border rounded-md">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 border-r hover:bg-gray-50"
          >
            -
          </button>
          <span className="px-4 py-2">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 border-l hover:bg-gray-50"
          >
            +
          </button>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className="flex-1 bg-black text-white py-2 px-6 rounded-md disabled:bg-gray-200 hover:bg-[#B39B8E] transition-colors"
        >
          DODAJ U KORPU
        </button>
      </div>
      
      {/* Size Guide */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSizeGuideOpen(true)}
          className="text-gray-600 hover:text-black flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM16 3v18M8 3v18M3 16h18M3 8h18" />
          </svg>
          Vodič za veličine
        </button>
      </div>
      
      {/* Product Description */}
      <div className="border-t pt-6">
        <div className="space-y-4">
          <button 
            className="flex justify-between w-full py-2"
            onClick={() => {}}
          >
            <span className="font-medium">OPIS</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="text-gray-600 space-y-2">
            <p>{product.description}</p>
            <ul className="list-disc list-inside">
              <li>Vrsta obuće: {product.specifications.type}</li>
              <li>Materijal: {product.specifications.material}</li>
              <li>Sezona: {product.specifications.season}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setIsSizeGuideOpen(false)} />
            <div className="relative bg-white p-6 rounded-lg max-w-2xl w-full">
              <h2 className="text-xl font-medium mb-4">Vodič za veličine</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">EU</th>
                      <th className="py-2 px-4 text-left">UK</th>
                      <th className="py-2 px-4 text-left">US</th>
                      <th className="py-2 px-4 text-left">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { eu: "36", uk: "3.5", us: "6", cm: "23" },
                      { eu: "37", uk: "4", us: "6.5", cm: "23.5" },
                      { eu: "38", uk: "5", us: "7.5", cm: "24.5" },
                      { eu: "39", uk: "6", us: "8.5", cm: "25.5" },
                      { eu: "40", uk: "6.5", us: "9", cm: "26" },
                      { eu: "41", uk: "7.5", us: "10", cm: "27" },
                      { eu: "42", uk: "8", us: "10.5", cm: "27.5" },
                      { eu: "43", uk: "9", us: "11.5", cm: "28.5" },
                      { eu: "44", uk: "9.5", us: "12", cm: "29" },
                      { eu: "45", uk: "10.5", us: "13", cm: "30" },
                    ].map((size) => (
                      <tr key={size.eu} className="border-b">
                        <td className="py-2 px-4">{size.eu}</td>
                        <td className="py-2 px-4">{size.uk}</td>
                        <td className="py-2 px-4">{size.us}</td>
                        <td className="py-2 px-4">{size.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails; 