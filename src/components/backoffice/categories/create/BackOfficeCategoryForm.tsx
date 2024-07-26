import { VariablesColors } from "@/styles/Variables.colors";
import { ICategoryCreateInput } from "@/types/ICategory";
import { TitlePageWithStyle } from "@/components/utils/TitlePageWithStyle";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import * as Yup from "yup";

import { GET_ALL_CATEGORIES } from "@/graphql/category/queryAllCategories";
import { useMutation } from "@apollo/client";

import { styleBoxContainer } from "@/components/utils/function";
import { MUTATION_CREATE_CATEGORY } from "@/graphql/category/category";

import { showToast } from "@/components/utils/toastHelper";
import CategorySelect from "../CategorySelect";

export interface CategoryFormValues extends ICategoryCreateInput {
  isRootCategory: boolean;
}

export default function BackOfficeCategoryForm(): React.ReactNode {
  const { lightBlueColor, hoverBlueColor } = new VariablesColors();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [renderKey, setRenderKey] = useState(0); // For re-rendering the component

  const [doCreate] = useMutation(MUTATION_CREATE_CATEGORY, {
    refetchQueries: [GET_ALL_CATEGORIES],
  });

  const formik = useFormik<CategoryFormValues>({
    initialValues: {
      display: true,
      isRootCategory: true,
      index: 1,
      name: "",
      parentCategoryId: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Le nom de la catégorie est requis"),
      isRootCategory: Yup.boolean(),
      display: Yup.boolean(),
      index: Yup.number(),
      parentCategoryId: Yup.number(),
    }),

    onSubmit: async (values) => {
      if (!values.isRootCategory && selectedCategory.length === 0) {
        setErrorCategory(
          "La catégorie parente est obligatoire si ce n'est pas une catégorie racine",
        );
        return;
      }

      formik.setValues({
        ...values,
        parentCategoryId: values.isRootCategory
          ? null
          : parseInt(selectedCategory),
      });

      const data: ICategoryCreateInput = {
        name: formik.values.name,
        index: formik.values.index,
        display: formik.values.display,

        parentCategoryId: formik.values.isRootCategory
          ? null
          : formik.values.parentCategoryId,
      };
      try {
        const { data: dataResponse, errors } = await doCreate({
          variables: { data },
        });
        if (errors) {
          setErrorCategory(errors[0].message);
          showToast("error", "Erreur lors de l'ajout de la category");
        } else {
          setErrorCategory(null);
          // Forcer le re-rendu en modifiant la clé de re-rendu
          setRenderKey((prevKey) => prevKey + 1);
          formik.resetForm();
          showToast("success", "Category ajouté avec succès !");
        }
      } catch (error) {
        setErrorCategory(error.message);

        console.error(error);
        showToast("error", "Erreur lors de l'ajout de la category");
      }
    },
  });

  useEffect(() => {
    setErrorCategory(null);
    formik.setFieldValue("parentCategoryId", selectedCategory);
  }, [selectedCategory]);

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorCategory(null);
    formik.setFieldValue("display", event.target.checked ? true : false);
  };

  const handleRootCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setErrorCategory(null);
    formik.setFieldValue("isRootCategory", event.target.checked ? true : false);
    if (event.target.checked) {
      setSelectedCategory("");
      formik.setFieldValue("categoryId", null);
    }
  };

  return (
    <>
      <TitlePageWithStyle title="Ajouter une categorie" sx={{ mt: 2 }} />
      <Toaster />
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
                onChangeCapture={() => setErrorCategory(null)}
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
                  <InputLabel>Catégorie racine</InputLabel>
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
                <InputLabel>Inclure dans la catégorie </InputLabel>
                <Grid item xs={12} sm={6} width={"100%"}>
                  <CategorySelect
                    key={renderKey}
                    disabled={formik.values.isRootCategory}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    formik={formik}
                  />
                  {errorCategory && (
                    <Typography variant="caption" color="error">
                      {errorCategory}
                    </Typography>
                  )}
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
      </Box>
    </>
  );
}
