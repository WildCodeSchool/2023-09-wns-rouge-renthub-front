import LayoutFull from "@/components/layout/LayoutFull";
import ForgotPassword from "@/components/users/forgotPassword/ForgotPassword";

function ForgotPasswordPage(): React.ReactNode {
  return (
    <LayoutFull title="RentHub : Mot de passe oublié">
      <ForgotPassword />
    </LayoutFull>
  );
}

export default ForgotPasswordPage;
