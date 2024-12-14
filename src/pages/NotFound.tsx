import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#B39B8E] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Stranica nije pronađena</h2>
        <p className="text-gray-600 mb-8">
          Stranica koju tražite ne postoji ili je premeštena.
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
} 