import LayoutFull from '@/components/layout/LayoutFull';
import EmailVerify from '@/components/users/userVerifyEmail/EmailVerify';

const VerifyEmail = () => {
  return (
    <LayoutFull title="RentHub : Vérification email">
      <EmailVerify />
    </LayoutFull>
  );
};

export default VerifyEmail;
