import { VariablesColors } from "@/styles/Variables.colors";
import { ICategory } from "@/types/ICategory";
// FORMIK - YUP
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { TitlePageWithStyle } from "@/components/utils/TitlePageWithStyle";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { GET_ALL_CATEGORIES } from "@/graphql/queryAllCategories";
import { useMutation, useQuery } from "@apollo/client";

import { MUTATION_CREATE_CATEGORY } from "@/graphql/category/category";
import { styleBoxContainer } from "@/components/utils/function";

import { useUserContext } from "@/context/UserContext";

export interface CategoryFormValues {
  createdBy: number;
  display?: boolean;
  index: number;
  name: string;
  parentCategoryId: number | null;
}

export default function BackOfficeCategoryForm({
  userId,
}: {
  userId?: string | null;
}): React.ReactNode {
  const { lightBlueColor, hoverBlueColor } = new VariablesColors();
  const router = useRouter();
  const {
    data: dataCategories,
    loading,
    error,
  } = useQuery<{ items: ICategory[] }>(GET_ALL_CATEGORIES);
  const categories = dataCategories?.items;
  const { user } = useUserContext();

  useEffect(() => {
    // console.debug("categories", user, categories);
  });

  const formik = useFormik<CategoryFormValues>({
    initialValues: {
      createdBy: 0, // PAR DEFAUT ADMIN ID  sinon recuperer l'id user connecté
      display: true,
      index: 1,
      name: "",
      parentCategoryId: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom de la category est requis"),
    }),
    onSubmit: async (values) => {
      if (userId) {
        // updateUser({ variables: { id: userId, data: values } });
        formik.setValues({
          ...values,
          createdBy: parseInt(userId),
          parentCategoryId: parseInt(values.parentCategoryId as any),
        });
      } else {
        formik.errors.name = "Le nom de la category est requis";
      }
    },
  });

  return (
    <>
      <TitlePageWithStyle title="Ajouter une categorie" sx={{ mt: 2 }} />

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
            <Grid
              item
              xs={12}
              sm={6}
              direction={"column"}
              gap={1}
              width={"100%"}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <TextField
                fullWidth
                size="small"
                id="name"
                name="name"
                label="Nom "
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <Grid item xs={12} sm={6} width="100%">
                <Typography width="50%" variant="h6" gutterBottom>
                  Catégorie parente
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="category" size="small">
                    Catégories
                  </InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    value={formik.values.parentCategoryId}
                    label="Age"
                    onChange={formik.handleChange}
                    size="small"
                  >
                    {categories?.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.id} - {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
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
                Ajouter une catégorie
              </Button>
            </Grid>
          </Grid>
        </form>
        <pre>createdBy : {formik.values.createdBy}</pre>
        <pre>display{formik.values.display}</pre>
        <pre>index : {formik.values.index}</pre>
        <pre>name : {formik.values.name}</pre>
        <pre>parentCategoryId : {formik.values.parentCategoryId}</pre>
        <pre>userId {userId}</pre>
      </Box>
    </>
  );
}
