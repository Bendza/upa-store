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