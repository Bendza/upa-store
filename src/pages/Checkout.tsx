import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import CustomerInformation, { CustomerFormData } from '../components/checkout/CustomerInformation';
import ShippingMethod, { ShippingMethodType } from '../components/checkout/ShippingMethod';
import PaymentSection, { PaymentData } from '../components/checkout/PaymentSection';
import OrderSummary from '../components/checkout/OrderSummary';
import useCartStore from '../stores/cartStore';

type CheckoutStep = 'information' | 'shipping' | 'payment';

interface CheckoutData {
  customer?: CustomerFormData;
  shipping?: ShippingMethodType;
  payment?: PaymentData;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState<CheckoutStep>('information');
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({});

  // Redirect to home if cart is empty
  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const handleCustomerSubmit = (data: CustomerFormData) => {
    setCheckoutData(prev => ({ ...prev, customer: data }));
    setStep('shipping');
  };

  const handleShippingSubmit = (method: ShippingMethodType) => {
    setCheckoutData(prev => ({ ...prev, shipping: method }));
    setStep('payment');
  };

  const handlePaymentSubmit = async (data: PaymentData) => {
    setCheckoutData(prev => ({ ...prev, payment: data }));
    
    try {
      // Here you would typically send the order to your backend
      // const response = await createOrder({ ...checkoutData, payment: data });
      
      // For now, we'll just simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Failed to process order:', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <CheckoutSteps currentStep={step} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-8">
            {step === 'information' && (
              <CustomerInformation
                onSubmit={handleCustomerSubmit}
                onBack={() => navigate('/cart')}
              />
            )}
            
            {step === 'shipping' && (
              <ShippingMethod
                onSubmit={handleShippingSubmit}
                onBack={() => setStep('information')}
              />
            )}
            
            {step === 'payment' && (
              <PaymentSection
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep('shipping')}
              />
            )}
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <OrderSummary shippingMethod={checkoutData.shipping} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 