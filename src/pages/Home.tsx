import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sliderImages, categories } from '../data/mockData';

interface SlideProps {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

interface CategoryProps {
  id: string;
  title: string;
  image: string;
  link: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderImages.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-2xl mb-8">{slide.subtitle}</p>
                <Link 
                  to={slide.ctaLink}
                  className="inline-block bg-white text-black px-8 py-3 hover:bg-[#B39B8E] hover:text-white transition-colors"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const CategoryShowcase = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-12 px-4">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          to={category.link}
          className="relative group overflow-hidden"
        >
          <img 
            src={category.image} 
            alt={category.title}
            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">{category.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <CategoryShowcase />
    </div>
  );
};

export default Home; 