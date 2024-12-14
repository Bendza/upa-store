import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-[#B39B8E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Hvala na porudžbini!</h1>
        <p className="text-gray-600 mb-8">
          Vaša porudžbina je uspešno primljena. Poslali smo vam email sa detaljima porudžbine.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#B39B8E] text-white px-8 py-3 rounded hover:bg-[#9A8275] transition-colors"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess; 