import { AppBar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { VariablesColors } from "@/styles/Variables.colors";

const colors = new VariablesColors();
const { whiteColor } = colors;

const BackOfficeAppBar = (): React.ReactNode => {
  const router = useRouter();
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: 75,
        backgroundColor: whiteColor,
      }}
    >
      <Image
        src={"/images/renthub-logo.png"}
        alt="logo"
        width={201}
        height={38.74}
        style={{ cursor: "pointer" }}
        onClick={() => {
          router.push("/renthub-backoffice");
        }}
      />
    </AppBar>
  );
};

export default BackOfficeAppBar;
