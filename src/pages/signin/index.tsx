import LayoutFull from "@/components/layout/LayoutFull";
import SignIn from "@/components/users/signin/SignIn";
import { Stack } from "@mui/material";

const SignUpPage = (): React.ReactNode => {
  return (
    <LayoutFull title="RentHub : Connexion">
      <Stack
        direction="row"
        marginBlock={8}
        justifyContent="end"
        alignContent={"center"}
        alignItems={"center"}
      >
        <SignIn />
      </Stack>
    </LayoutFull>
  );
};

export default SignUpPage;
