import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [mainImage, setMainImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Thumbnail Column */}
      <div className="col-span-2 space-y-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(index)}
            className={`w-full aspect-square border-2 ${
              mainImage === index ? 'border-black' : 'border-transparent'
            }`}
          >
            <img
              src={image}
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Main Image */}
      <div className="col-span-10">
        <div className="relative aspect-square">
          <img
            src={images[mainImage]}
            alt="Product"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 space-x-2">
            <button 
              onClick={() => setIsZoomOpen(true)}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={images[mainImage]}
            alt="Zoomed product view"
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </div>
  );
};

export default ProductGallery; 