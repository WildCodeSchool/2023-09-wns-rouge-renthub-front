// REACT
import React, { useState } from "react";
// FORMIK - YUP
import * as Yup from "yup";
import { useFormik } from "formik";
// MUI
import { Box, Button, Grid, TextField } from "@mui/material";
// UTILS
import { styleBoxContainer } from "@/components/utils/function";
import { VariablesColors } from "@/styles/Variables.colors";
import { UserFormValues } from "@/types/UserTypes";
import { useRouter } from "next/router";

export const UserForm = ({ userId }: { userId?: string | null }) => {
  const { lightBlueColor, hoverBlueColor } = new VariablesColors();
  const router = useRouter();

  const formik = useFormik<UserFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Le prénom est requis"),
      lastName: Yup.string().required("Le nom est requis"),
      email: Yup.string().email().required("L'email est requis"),
      phoneNumber: Yup.string().required("Le numéro de téléphone est requis"),
      password: Yup.string().required("Le mot de passe est requis"),
    }),
    onSubmit: (values) => {
      if (userId) {
        // updateUser({ variables: { id: userId, data: values } });
      } else {
        // createUser({ variables: { data: values } });
      }
    },
  });

  return (
    <>
      <Box sx={styleBoxContainer(lightBlueColor)}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="firstName"
                name="firstName"
                label="Prénom"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="lastName"
                name="lastName"
                label="Nom"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="email"
                type="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="phoneNumber"
                name="phoneNumber"
                label="Téléphone"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="password"
                type="password"
                name="password"
                label="Mot de passe"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              width={"100%"}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button
                type="submit"
                variant="contained"
                className="btn-lightBlue"
                sx={{
                  backgroundColor: lightBlueColor,
                  color: "#fff",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: hoverBlueColor,
                  },
                }}
              >
                Enregistrer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default UserForm;
