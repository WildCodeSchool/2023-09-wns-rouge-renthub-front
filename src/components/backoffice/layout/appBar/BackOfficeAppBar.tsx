import { AppBar, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import { VariablesColors } from "@/styles/Variables.colors";
import { PATH_IMAGE } from "@/api/configApi";

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
        image={`${PATH_IMAGE}/general/renthub-logo.png`}
        title="logo renthub"
        onClick={() => {
          router.push("/renthub-backoffice");
        }}
      />
    </AppBar>
  );
};

export default BackOfficeAppBar;