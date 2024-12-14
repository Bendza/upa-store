import { useState } from 'react';

interface ContactFormData {
  ime: string;
  email: string;
  poruka: string;
}

interface ValidationErrors {
  ime?: string;
  email?: string;
  poruka?: string;
}

const validationRules = {
  ime: {
    required: true,
    minLength: 2,
    message: {
      required: 'Ime je obavezno polje',
      minLength: 'Ime mora imati najmanje 2 karaktera'
    }
  },
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: {
      required: 'Email je obavezno polje',
      pattern: 'Unesite validnu email adresu'
    }
  },
  poruka: {
    required: true,
    minLength: 10,
    message: {
      required: 'Poruka je obavezno polje',
      minLength: 'Poruka mora imati najmanje 10 karaktera'
    }
  }
};

interface ContactFormProps {
  onSubmitSuccess: () => void;
  onSubmitError: (error: string) => void;
}

const ContactForm = ({ onSubmitSuccess, onSubmitError }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    ime: '',
    email: '',
    poruka: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate name
    if (!formData.ime) {
      newErrors.ime = validationRules.ime.message.required;
    } else if (formData.ime.length < validationRules.ime.minLength) {
      newErrors.ime = validationRules.ime.message.minLength;
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = validationRules.email.message.required;
    } else if (!validationRules.email.pattern.test(formData.email)) {
      newErrors.email = validationRules.email.message.pattern;
    }

    // Validate message
    if (!formData.poruka) {
      newErrors.poruka = validationRules.poruka.message.required;
    } else if (formData.poruka.length < validationRules.poruka.minLength) {
      newErrors.poruka = validationRules.poruka.message.minLength;
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData({ ime: '', email: '', poruka: '' });
      onSubmitSuccess();
    } catch {
      onSubmitError('Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div>
        <label htmlFor="ime" className="block text-sm font-medium text-gray-700">
          Ime *
        </label>
        <input
          type="text"
          id="ime"
          name="ime"
          required
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.ime ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-[#B39B8E] focus:border-[#B39B8E]`}
          value={formData.ime}
          onChange={handleChange}
        />
        {errors.ime && (
          <p className="mt-1 text-sm text-red-600">{errors.ime}</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-[#B39B8E] focus:border-[#B39B8E]`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="poruka" className="block text-sm font-medium text-gray-700">
          Poruka *
        </label>
        <textarea
          id="poruka"
          name="poruka"
          required
          rows={6}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.poruka ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-[#B39B8E] focus:border-[#B39B8E]`}
          value={formData.poruka}
          onChange={handleChange}
        />
        {errors.poruka && (
          <p className="mt-1 text-sm text-red-600">{errors.poruka}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full md:w-auto px-6 py-3 bg-[#B39B8E] text-white rounded hover:bg-[#A38B7E] transition-colors ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Slanje...' : 'Pošalji'}
      </button>
    </form>
  );
};

export default ContactForm; 