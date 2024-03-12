import LayoutFull from '@/components/layout/LayoutFull';
import SignIn from '@/components/users/signin/SignIn';

const SignUpPage = (): React.ReactNode => {
  return (
    <LayoutFull title="RentHub : Connexion">
      <SignIn />
    </LayoutFull>
  );
};

export default SignUpPage;
