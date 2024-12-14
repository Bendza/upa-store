import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        setError('Pogrešno korisničko ime ili lozinka');
      }
    } catch (err) {
      setError('Došlo je do greške prilikom prijave');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Admin prijava
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Korisničko ime"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              error={error}
            />
            <Input
              label="Lozinka"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#B39B8E] hover:bg-[#A38B7E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B39B8E]"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 