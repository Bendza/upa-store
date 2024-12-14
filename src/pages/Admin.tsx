import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication and role
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login', { state: { from: '/admin' } });
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <span className="text-sm text-gray-600">
          Logged in as: {user?.username}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Orders Section */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Porudžbine</h2>
          <p className="text-gray-600 mb-4">Upravljajte porudžbinama</p>
          <button className="text-[#B39B8E] hover:text-[#9A8275]">
            Pregledaj →
          </button>
        </div>

        {/* Products Section */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Proizvodi</h2>
          <p className="text-gray-600 mb-4">Upravljajte proizvodima</p>
          <button className="text-[#B39B8E] hover:text-[#9A8275]">
            Pregledaj →
          </button>
        </div>

        {/* Users Section */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Korisnici</h2>
          <p className="text-gray-600 mb-4">Upravljajte korisnicima</p>
          <button className="text-[#B39B8E] hover:text-[#9A8275]">
            Pregledaj →
          </button>
        </div>
      </div>
    </div>
  );
} 