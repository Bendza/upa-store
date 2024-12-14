import { useState } from 'react';

export interface ShippingMethodType {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

interface ShippingMethodProps {
  onSubmit: (method: ShippingMethodType) => void;
  onBack: () => void;
}

const shippingMethods: ShippingMethodType[] = [
  {
    id: 'standard',
    name: 'Standardna dostava',
    description: 'Dostava na kućnu adresu',
    price: 400,
    estimatedDays: '2-3 radna dana'
  },
  {
    id: 'express',
    name: 'Express dostava',
    description: 'Dostava sledećeg radnog dana',
    price: 600,
    estimatedDays: '1 radni dan'
  }
];

const ShippingMethod = ({ onSubmit, onBack }: ShippingMethodProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = shippingMethods.find(m => m.id === selectedMethod);
    if (method) {
      onSubmit(method);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium mb-4">Način dostave</h3>
      <div className="space-y-4">
        {shippingMethods.map(method => (
          <label
            key={method.id}
            className={`
              flex items-start p-4 border rounded-lg cursor-pointer
              ${selectedMethod === method.id ? 'border-[#B39B8E] bg-[#B39B8E]/5' : 'hover:border-gray-400'}
            `}
          >
            <input
              type="radio"
              name="shipping"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="mt-1"
            />
            <div className="ml-3">
              <div className="font-medium">{method.name}</div>
              <div className="text-sm text-gray-600">{method.description}</div>
              <div className="text-sm text-gray-600">
                Procenjeno vreme dostave: {method.estimatedDays}
              </div>
              <div className="mt-1 font-medium">
                {method.price.toLocaleString()} RSD
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 hover:text-black"
        >
          ��� Nazad na informacije
        </button>
        <button
          type="submit"
          disabled={!selectedMethod}
          className={`
            px-8 py-3 rounded
            ${selectedMethod
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Nastavi na plaćanje
        </button>
      </div>
    </form>
  );
};

export default ShippingMethod; 