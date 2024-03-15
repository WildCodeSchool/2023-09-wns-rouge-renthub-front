import LayoutFull from "@/components/layout/LayoutFull";
import UserAccount from "@/components/users/userAccount/UserAccount";

const AccountPage = (): React.ReactNode => {
  return (
    <LayoutFull title="RentHub : Mon compte">
      <UserAccount />
    </LayoutFull>
  );
};

export default AccountPage;
