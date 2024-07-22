import React, { FormEvent, useState } from "react";
import { styleBoxContainer } from "@/components/utils/function";
import { TitlePageWithStyle } from "@/components/utils/TitlePageWithStyle";
import { VariablesColors } from "@/styles/Variables.colors";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { ProduitFormValues } from "@/types/IProductReference";
import { GET_ALL_CATEGORIES } from "@/graphql/queryAllCategories";
import { useMutation, useQuery } from "@apollo/client";
import { ICategory } from "@/types/ICategory";
import PictureDownload from "../utils/PictureDownload";
import { MUTATION_CREATE_PRODUCT_REFERENCE } from "@/graphql/productReference/mutationCreateProductReference";
import axios from "axios";
import { da } from "date-fns/locale";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const ProductForm = (): React.ReactNode => {
  const { lightBlueColor, hoverBlueColor } = new VariablesColors();
  const {
    data: dataCategories,
    loading,
    error,
  } = useQuery<{ items: ICategory[] }>(GET_ALL_CATEGORIES);
  const categories = dataCategories?.items;
  const [picture, setPicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [doCreate] = useMutation(MUTATION_CREATE_PRODUCT_REFERENCE);
  // const data = {
  //   name: name,
  //   parentCategory: parentCategory ? { id: parentCategory } : null,
  //   picture: filename ? filename : null,
  // };

  const formik = useFormik<ProduitFormValues>({
    initialValues: {
      name: "",
      brandName: "",
      description: "",
      price: 0,
      category: {
        id: "",
      },
      pictures: [
        {
          id: null,
        },
      ],
    },
    // validationSchema: Yup.object({
    //   firstName: Yup.string().required("Le prénom est requis"),
    //   lastName: Yup.string().required("Le nom est requis"),
    //   email: Yup.string().email().required("L'email est requis"),
    //   phoneNumber: Yup.string().required("Le numéro de téléphone est requis"),
    //   password: Yup.string().required("Le mot de passe est requis"),
    // }),
    onSubmit: async (values) => {
      let pictureId = null;
      if (picture) {
        const formData = new FormData();
        formData.append("file", picture);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_PATH_IMAGE}`,
          formData,
        );

        pictureId = data.pictureId;
      }

      const data: ProduitFormValues = {
        name: values.name,
        brandName: values.brandName,
        description: values.description,
        price: values.price,
        category: { id: String(values.category) },
        pictures: [
          {
            id: pictureId,
          },
        ],
      };

      await doCreate({
        variables: {
          data,
        },
      });
    },
  });
  return (
    <>
      <TitlePageWithStyle title="Ajouter une produit" sx={{ mt: 2 }} />
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
                id="name"
                name="name"
                label="Nom"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="brandName"
                name="brandName"
                label="Nom de la marque"
                value={formik.values.brandName}
                onChange={formik.handleChange}
                error={
                  formik.touched.brandName && Boolean(formik.errors.brandName)
                }
                helperText={formik.touched.brandName && formik.errors.brandName}
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="price"
                type="number"
                name="price"
                label="Prix"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <FormControl fullWidth>
                <InputLabel id="category" size="small">
                  Catégories
                </InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  value={formik.values.category}
                  label="Age"
                  onChange={formik.handleChange}
                  size="small"
                  name="category"
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <PictureDownload
                picture={picture}
                setPicture={setPicture}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
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
                Ajouter un produit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default ProductForm;
