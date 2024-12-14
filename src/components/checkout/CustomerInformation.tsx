import { useForm } from 'react-hook-form';
import Input from '../common/Input';

export interface CustomerFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
}

interface CustomerInformationProps {
  onSubmit: (data: CustomerFormData) => void;
  onBack: () => void;
}

const CustomerInformation = ({ onSubmit, onBack }: CustomerInformationProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormData>({
    mode: 'onChange'
  });

  const onSubmitForm = (data: CustomerFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Kontakt informacije</h3>
        <div className="space-y-4">
          <Input
            label="Email adresa *"
            type="email"
            {...register('email', {
              required: 'Email je obavezan',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Unesite validnu email adresu'
              }
            })}
            error={errors.email?.message}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ime *"
              {...register('firstName', {
                required: 'Ime je obavezno',
                minLength: {
                  value: 2,
                  message: 'Ime mora imati najmanje 2 karaktera'
                }
              })}
              error={errors.firstName?.message}
            />
            <Input
              label="Prezime *"
              {...register('lastName', {
                required: 'Prezime je obavezno',
                minLength: {
                  value: 2,
                  message: 'Prezime mora imati najmanje 2 karaktera'
                }
              })}
              error={errors.lastName?.message}
            />
          </div>
          <Input
            label="Telefon *"
            type="tel"
            {...register('phone', {
              required: 'Telefon je obavezan',
              pattern: {
                value: /^[0-9+\s-]+$/,
                message: 'Unesite validan broj telefona'
              }
            })}
            error={errors.phone?.message}
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="text-lg font-medium mb-4">Adresa za dostavu</h3>
        <div className="space-y-4">
          <Input
            label="Ulica i broj *"
            {...register('address.street', {
              required: 'Ulica i broj su obavezni'
            })}
            error={errors.address?.street?.message}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Grad *"
              {...register('address.city', {
                required: 'Grad je obavezan'
              })}
              error={errors.address?.city?.message}
            />
            <Input
              label="Poštanski broj *"
              {...register('address.postalCode', {
                required: 'Poštanski broj je obavezan',
                pattern: {
                  value: /^\d{5}$/,
                  message: 'Unesite validan poštanski broj'
                }
              })}
              error={errors.address?.postalCode?.message}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 hover:text-black"
        >
          ← Povratak na korpu
        </button>
        <button
          type="submit"
          className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800"
        >
          Nastavi na dostavu
        </button>
      </div>
    </form>
  );
};

export default CustomerInformation; 