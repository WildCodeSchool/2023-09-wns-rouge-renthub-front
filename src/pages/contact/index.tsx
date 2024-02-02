import LayoutFull from '@/components/layout/LayoutFull';
import ContactHeader from '@/components/contact/ContactHeader';
import ContactForm from '@/components/contact/ContactForm';

const SignPage = (): React.ReactNode => {
  return (
    <LayoutFull title="RentHub : Contact">
      <ContactHeader />
      <ContactForm />
    </LayoutFull>
  );
};

export default SignPage;
