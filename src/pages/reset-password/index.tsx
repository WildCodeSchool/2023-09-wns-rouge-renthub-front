import ResetPassword from "@/components/users/resetPassword/ResetPassword";
import LayoutFull from "@/components/layout/LayoutFull";

function ResetPasswordPage(): React.ReactNode {
  return (
    <LayoutFull title="RentHub : Réinitialisation MDP">
      <ResetPassword />
    </LayoutFull>
  );
}

export default ResetPasswordPage;
