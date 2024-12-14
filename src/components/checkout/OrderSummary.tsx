import useCartStore from '../../stores/cartStore';
import { ShippingMethodType } from './ShippingMethod';

interface OrderSummaryProps {
  shippingMethod?: ShippingMethodType;
}

const OrderSummary = ({ shippingMethod }: OrderSummaryProps) => {
  const { items } = useCartStore();
  
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = shippingMethod?.price || 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Pregled porudžbine</h3>
      
      {/* Order Items */}
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{item.name}</div>
              <div className="text-sm text-gray-600">
                Veličina: {item.size}
              </div>
              <div className="text-sm text-gray-600">
                Količina: {item.quantity}
              </div>
              <div className="font-medium">
                {(item.price * item.quantity).toLocaleString()} RSD
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Order Totals */}
      <div className="mt-6 space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Međuzbir:</span>
          <span>{subtotal.toLocaleString()} RSD</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Dostava:</span>
          <span>{shipping.toLocaleString()} RSD</span>
        </div>
        <div className="flex justify-between font-medium text-lg border-t pt-2">
          <span>Ukupno:</span>
          <span>{total.toLocaleString()} RSD</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 