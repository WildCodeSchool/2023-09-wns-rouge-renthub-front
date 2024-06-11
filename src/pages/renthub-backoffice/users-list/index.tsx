// MUI //
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Box, Button, Container, Grid } from "@mui/material";
// UTILS //
import BackOfficeUsersList from "@/components/backoffice/users/BackOfficeUsersList";
import AdminProtection from "@/components/backoffice/AdminProtection";
import { TitlePageWithStyle } from "@/components/utils/TitlePageWithStyle";
import { VariablesColors } from "@/styles/Variables.colors";

const BackUserListPage = (): React.ReactNode => {
  const { whiteColor, lightOrangeColor } = new VariablesColors();

  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12}>
            <TitlePageWithStyle title="Gestion des utilisateurs" />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                mt: 3,
                backgroundColor: whiteColor,
                borderTop: `2px solid ${lightOrangeColor}`,
              }}
            >
              <Button variant="contained" startIcon={<AddBoxOutlinedIcon />}>
                Ajouter un utilisateur
              </Button>
              <Grid item xs={12} sx={{ pt: 2 }}>
                <BackOfficeUsersList />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminProtection(BackUserListPage);
