import { AppBar, Box, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { VariablesColors } from "@/styles/Variables.colors";
import { useMutation } from "@apollo/client";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { mutationSignOut } from "@/components/graphql/Users";
import { useUserContext } from "@/context/UserContext";

const colors = new VariablesColors();
const { whiteColor, orangeColor } = colors;

const BackOfficeAppBar = (): React.ReactNode => {
  const router = useRouter();
  // User connected ?
  const { user, refetchUserContext } = useUserContext();
  // Signout
  const [doSignout] = useMutation(mutationSignOut, {
    onCompleted: () => {
      refetchUserContext();
      router.replace(`/renthub-backoffice`);
    },
  });
  const handleSignOut = () => {
    doSignout();
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: 75,
        backgroundColor: whiteColor,
      }}
    >
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "250px",
            height: "auto",
            objectFit: "contain",
            cursor: "pointer",
          }}
          image={`/images/renthub-logo.png`}
          title="logo renthub"
          onClick={() => {
            router.push("/renthub-backoffice");
          }}
        />
        {user && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Box>
                <Typography>
                  Admin : {user.firstName} {user.lastName}
                </Typography>
              </Box>
              <Box
                onClick={handleSignOut}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <ExitToAppIcon
                  sx={{ width: "35px", height: "auto", color: orangeColor }}
                />
                <Typography sx={{ marginLeft: "10px" }}>
                  Se déconnecter
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </AppBar>
  );
};

export default BackOfficeAppBar;
