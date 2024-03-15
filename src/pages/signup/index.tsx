import LayoutFull from "@/components/layout/LayoutFull";
import SignUp from "@/components/users/signup/SignUp";

const SignUpPage = (): React.ReactNode => {
  return (
    <LayoutFull title="RentHub : Inscription">
      <SignUp />
    </LayoutFull>
  );
};

export default SignUpPage;
