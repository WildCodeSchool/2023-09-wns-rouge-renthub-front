import LayoutFull from "@/components/layout/LayoutFull";

import { Stack } from "@mui/material";

const AccountPage = (): React.ReactNode => {
  return (
    <LayoutFull title="RentHub : Mon compte">
      <Stack direction="row" spacing={2} justifyContent="center"></Stack>
    </LayoutFull>
  );
};

export default AccountPage;
