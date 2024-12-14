import { useState } from 'react';
import PageHeader from '../components/contact/PageHeader';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import Notification from '../components/common/Notification';

const Contact = () => {
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.values(newErrors).every(x => x === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form
      console.log('Form submitted:', formData);
    }
  };

  const handleSubmitSuccess = () => {
    setNotification({
      type: 'success',
      message: 'Vaša poruka je uspešno poslata. Kontaktiraćemo vas uskoro.'
    });
  };

  const handleSubmitError = (error: string) => {
    setNotification({
      type: 'error',
      message: error
    });
  };

  return (
    <>
      <PageHeader title="KONTAKT" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm 
            onSubmitSuccess={handleSubmitSuccess}
            onSubmitError={handleSubmitError}
            onSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
      </div>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default Contact; 