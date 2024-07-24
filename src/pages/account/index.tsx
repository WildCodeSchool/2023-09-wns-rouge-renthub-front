import LayoutFull from "@/components/layout/LayoutFull";
// import UserAccount from "@/components/users/userAccount/UserAccount";
import { Stack } from "@mui/material";

const AccountPage = (): React.ReactNode => {
  return (
    <LayoutFull title="RentHub : Mon compte">
      <Stack direction="row" spacing={2} justifyContent="center">
        {/* <UserAccount /> */}
      </Stack>
    </LayoutFull>
  );
};

export default AccountPage;
