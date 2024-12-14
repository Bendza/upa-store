import { useState } from 'react';
import Input from '../common/Input';

export interface PaymentData {
  method: 'cod' | 'card';
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
  };
}

interface PaymentSectionProps {
  onSubmit: (data: PaymentData) => void;
  onBack: () => void;
}

const PaymentSection = ({ onSubmit, onBack }: PaymentSectionProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentData: PaymentData = {
      method: paymentMethod,
      ...(paymentMethod === 'card' && { cardDetails })
    };
    onSubmit(paymentData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium mb-4">Način plaćanja</h3>
      
      {/* Payment Options */}
      <div className="space-y-4">
        {/* Cash on Delivery */}
        <label className={`
          flex items-start p-4 border rounded-lg cursor-pointer
          ${paymentMethod === 'cod' ? 'border-[#B39B8E] bg-[#B39B8E]/5' : 'hover:border-gray-400'}
        `}>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
            className="mt-1"
          />
          <div className="ml-3">
            <div className="font-medium">Plaćanje pouzećem</div>
            <div className="text-sm text-gray-600">
              Platite gotovinom prilikom preuzimanja
            </div>
          </div>
        </label>

        {/* Card Payment */}
        <label className={`
          flex items-start p-4 border rounded-lg cursor-pointer
          ${paymentMethod === 'card' ? 'border-[#B39B8E] bg-[#B39B8E]/5' : 'hover:border-gray-400'}
        `}>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value as 'card')}
            className="mt-1"
          />
          <div className="ml-3">
            <div className="font-medium">Plaćanje karticom</div>
            <div className="text-sm text-gray-600">
              Sigurno online plaćanje
            </div>
          </div>
        </label>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <div className="mt-6 space-y-4">
          <Input
            label="Broj kartice *"
            placeholder="1234 5678 9012 3456"
            value={cardDetails.number}
            onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
            maxLength={19}
            pattern="\d*"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Datum isteka *"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
              maxLength={5}
            />
            <Input
              label="CVV *"
              type="password"
              placeholder="123"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
              maxLength={3}
              pattern="\d*"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 hover:text-black"
        >
          ← Nazad na dostavu
        </button>
        <button
          type="submit"
          className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800"
        >
          Potvrdi porudžbinu
        </button>
      </div>
    </form>
  );
};

export default PaymentSection; 