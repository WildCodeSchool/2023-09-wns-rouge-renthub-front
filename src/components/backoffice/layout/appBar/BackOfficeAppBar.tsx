import { AppBar, CardMedia } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { VariablesColors } from "@/styles/Variables.colors";
import { API_URL } from "@/api/configApi";

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
      <CardMedia
        component="img"
        sx={{
          width: "200px",
          height: "auto",
          cursor: "pointer",
          margin: "auto",
        }}
        image={`${API_URL}assets/images/general/renthub-logo.png`}
        title="logo renthub"
        onClick={() => {
          router.push("/renthub-backoffice");
        }}
      />
    </AppBar>
  );
};

export default BackOfficeAppBar;
