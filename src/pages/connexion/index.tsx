import LayoutFull from "@/components/layout/LayoutFull";
import UserConnection from "@/components/users/userConnection/UserConnection";

const SignUpPage = (): React.ReactNode => {
  return (
    <LayoutFull title="RentHub : Connexion">
      <UserConnection />
    </LayoutFull>
  );
};

export default SignUpPage;
