import AdminProtection from "@/components/backoffice/AdminProtection";
import { UserForm } from "@/components/backoffice/users/UserForm";
import { TitlePageWithStyle } from "@/components/utils/TitlePageWithStyle";
import { Box, Container } from "@mui/material";
import React from "react";

export function NewUser(): React.ReactNode {
  return (
    <>
      <Container maxWidth="xl">
        <TitlePageWithStyle title="Ajouter un utilisateur" sx={{ mt: 2 }} />
        <UserForm />
      </Container>
    </>
  );
}

export default AdminProtection(NewUser);
