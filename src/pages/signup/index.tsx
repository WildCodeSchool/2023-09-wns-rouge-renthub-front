import LayoutFull from '@/components/layout/LayoutFull';
import UserForm from '@/components/users/userForm/UserForm';

const SignUpPage = (): React.ReactNode => {
  return (
    <LayoutFull title="RentHub : Inscription">
      <UserForm />
    </LayoutFull>
  );
};

export default SignUpPage;
