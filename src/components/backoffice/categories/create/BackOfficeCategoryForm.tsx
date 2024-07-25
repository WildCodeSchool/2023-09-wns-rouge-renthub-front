import { VariablesColors } from "@/styles/Variables.colors";
import { ICategory } from "@/types/ICategory";
// FORMIK - YUP
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { TitlePageWithStyle } from "@/components/utils/TitlePageWithStyle";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { GET_ALL_CATEGORIES } from "@/graphql/category/queryAllCategories";
import { useMutation, useQuery } from "@apollo/client";

import { MUTATION_CREATE_CATEGORY } from "@/graphql/category/category";
import { styleBoxContainer } from "@/components/utils/function";

import CategorySelect from "../CategorySelect";
import { showToast } from "@/components/utils/toastHelper";

export interface CategoryFormValues {
  display?: boolean;
  index: number;
  name: string;
  categoryId: number | null;
  isRootCategory: boolean; // parentCategoryId
}

export default function BackOfficeCategoryForm(): React.ReactNode {
  const { lightBlueColor, hoverBlueColor } = new VariablesColors();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    data: dataCategories,
    loading,
    error,
  } = useQuery<{ items: ICategory[] }>(GET_ALL_CATEGORIES);
  const [doCreate] = useMutation(MUTATION_CREATE_CATEGORY);

  const categories = dataCategories?.items;

  const formik = useFormik<CategoryFormValues>({
    initialValues: {
      display: true,
      isRootCategory: true,

      index: 1,
      name: "",
      categoryId: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom de la category est requis"),
    }),
    onSubmit: async (values) => {
      try {
        // updateUser({ variables: { id: userId, data: values } });
        formik.setValues({
          ...values,
          categoryId: values.isRootCategory ? null : parseInt(selectedCategory),
        });

        const data: Partial<ICategory> = {
          name: formik.values.name,
          index: formik.values.index,
          display: formik.values.display,
          parentCategory: formik.values.isRootCategory
            ? null
            : { id: parseInt(selectedCategory) },
          picture: null,

          pictures: [],
          productReferences: [],
        };

        await doCreate({ variables: { data } });

        showToast("success", "Category ajouté avec succès !");
      } catch (error) {
        console.error(error);
        showToast("error", "Erreur lors de l'ajout de la category");
      }
    },
  });

  // useEffect(() => {
  //   console.debug("categories", selectedCategory, categories);
  // });

  useEffect(() => {
    //console.debug("selectedCategory", selectedCategory);
    formik.setFieldValue("categoryId", selectedCategory);
  }, [selectedCategory]);

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.debug("event.target.checked", event.target.checked);
    formik.setFieldValue("display", event.target.checked ? 1 : 0);
  };

  const handleRootCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // console.debug("isRootCategory", event.target.checked);
    formik.setFieldValue("isRootCategory", event.target.checked);
    if (event.target.checked) {
      setSelectedCategory(""); // Réinitialiser la catégorie parente
      formik.setFieldValue("categoryId", null);
    }
  };

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

              <Grid
                item
                sx={{ display: "flex", alignItems: "baseline", gap: 2 }}
                xs={12}
                sm={6}
                width="100%"
              >
                <Box>
                  <InputLabel>En ligne ?</InputLabel>
                </Box>
                <Box>
                  <Checkbox
                    checked={formik.values.display}
                    onChange={handleDisplayChange}
                    name="display"
                  />
                </Box>
              </Grid>

              <Grid
                item
                sx={{ display: "flex", alignItems: "baseline", gap: 2 }}
                xs={12}
                sm={6}
                width="100%"
              >
                <Box>
                  <InputLabel>Catégorie racine ?</InputLabel>
                </Box>
                <Box>
                  <Checkbox
                    checked={formik.values.isRootCategory}
                    onChange={handleRootCategoryChange}
                    name="isRootCategory"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} width="100%">
                <Typography width="50%" variant="h6" gutterBottom>
                  Catégorie parente
                </Typography>
                <Grid item xs={12} sm={6} width={"100%"}>
                  <CategorySelect
                    disabled={formik.values.isRootCategory}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    formik={formik}
                  />
                </Grid>
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

        <pre>display{formik.values.display}</pre>
        <pre>index : {formik.values.index}</pre>
        <pre>name : {formik.values.name}</pre>
        <pre>parentCategoryId : {formik.values.categoryId}</pre>
        <pre>
          isRootCategory : {formik.values.isRootCategory ? "true" : "false"}
        </pre>
      </Box>
    </>
  );
}
