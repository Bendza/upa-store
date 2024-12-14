import { useState, useEffect } from 'react';

interface PriceRangeProps {
  min: number;
  max: number;
  currency: string;
  onChange: (range: [number, number]) => void;
}

const PriceRangeSlider = ({ min, max, currency, onChange }: PriceRangeProps) => {
  const [range, setRange] = useState<[number, number]>([min, max]);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  useEffect(() => {
    onChange(range);
  }, [range, onChange]);

  const handleMouseDown = (type: 'min' | 'max') => {
    setIsDragging(type);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const container = e.currentTarget.getBoundingClientRect();
    const position = (e.clientX - container.left) / container.width;
    const value = Math.round(min + (max - min) * position);

    if (isDragging === 'min') {
      setRange([Math.min(Math.max(value, min), range[1] - 1000), range[1]]);
    } else {
      setRange([range[0], Math.max(Math.min(value, max), range[0] + 1000)]);
    }
  };

  const getLeftPosition = () => ((range[0] - min) / (max - min)) * 100;
  const getRightPosition = () => ((max - range[1]) / (max - min)) * 100;

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => setIsDragging(null);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  return (
    <div className="space-y-4">
      <div 
        className="relative h-2 bg-gray-200 rounded cursor-pointer"
        onMouseMove={handleMouseMove}
      >
        <div 
          className="absolute h-full bg-[#B39B8E]" 
          style={{
            left: `${getLeftPosition()}%`,
            right: `${getRightPosition()}%`
          }} 
        />
        <div 
          className="absolute w-4 h-4 bg-[#B39B8E] rounded-full -mt-1.5 cursor-pointer"
          style={{ left: `${getLeftPosition()}%` }}
          onMouseDown={() => handleMouseDown('min')}
          onMouseUp={handleMouseUp}
        />
        <div 
          className="absolute w-4 h-4 bg-[#B39B8E] rounded-full -mt-1.5 cursor-pointer"
          style={{ left: `${100 - getRightPosition()}%` }}
          onMouseDown={() => handleMouseDown('max')}
          onMouseUp={handleMouseUp}
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <span>{range[0].toLocaleString()} {currency}</span>
        <span>{range[1].toLocaleString()} {currency}</span>
      </div>
      
      <button 
        onClick={() => onChange(range)}
        className="bg-[#B39B8E] text-white px-4 py-2 rounded w-full hover:bg-[#9A8275] transition-colors"
      >
        FILTER
      </button>
    </div>
  );
};

export default PriceRangeSlider; 