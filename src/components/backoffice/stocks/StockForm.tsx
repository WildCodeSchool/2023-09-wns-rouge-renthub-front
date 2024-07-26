import React, { FormEvent, useState } from "react";
import { styleBoxContainer } from "@/components/utils/function";
import { TitlePageWithStyle } from "@/components/utils/TitlePageWithStyle";
import { VariablesColors } from "@/styles/Variables.colors";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";
import { showToast } from "@/components/utils/toastHelper";
import { StockFormValues } from "@/types/Stock";
import { QUERY_PRODUCTS_REFERENCES } from "@/graphql/productReference/queryProductsReferences";
import { MUTATION_CREATE_STOCK } from "@/graphql/stocks/mutationCreateStock";

const StockForm = (): React.ReactNode => {
  const { lightBlueColor, hoverBlueColor } = new VariablesColors();
  const [doCreate] = useMutation(MUTATION_CREATE_STOCK);
  const { data } = useQuery(QUERY_PRODUCTS_REFERENCES);
  const formik = useFormik<StockFormValues>({
    initialValues: {
      name: "",
      serialNumber: "",
      productReference: {
        id: "",
      },
      isAvailable: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est obligatoire"),
      serialNumber: Yup.string().required("Le numéro de série est obligatoire"),
      productReference: Yup.object({
        id: Yup.string().required("Le produit est obligatoire"),
      }).required("Le produit est obligatoire"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const data: StockFormValues = {
          name: values.name,
          serialNumber: values.serialNumber,
          productReference: {
            id: String(values.productReference.id),
          },
          isAvailable: values.isAvailable,
        };

        await doCreate({
          variables: {
            data,
          },
        });
        showToast("success", "Produit ajouté avec succès !");
        resetForm();
      } catch (error) {
        console.error(error);
        showToast("error", "Erreur lors de l'ajout du produit");
      }
    },
  });

  return (
    <>
      <TitlePageWithStyle title="Ajouter une stock" sx={{ mt: 2 }} />
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
                id="serialNumber"
                name="serialNumber"
                label="Numéro de série"
                value={formik.values.serialNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.serialNumber &&
                  Boolean(formik.errors.serialNumber)
                }
                helperText={
                  formik.touched.serialNumber && formik.errors.serialNumber
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <FormControl
                fullWidth
                size="small"
                error={
                  formik.touched.productReference?.id &&
                  Boolean(formik.errors.productReference?.id)
                }
              >
                <InputLabel id="productReference">Produit</InputLabel>
                <Select
                  labelId="productReference"
                  id="productReference"
                  name="productReference.id"
                  value={formik.values.productReference.id}
                  onChange={formik.handleChange}
                >
                  {data?.items.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.productReference?.id &&
                    formik.errors.productReference?.id}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              width={"100%"}
              sx={{ display: "flex", alignItems: "baseline", gap: 3 }}
            >
              <Box>
                <InputLabel>Disponible ?</InputLabel>
              </Box>
              <Box>
                <Checkbox
                  checked={formik.values.isAvailable}
                  onChange={formik.handleChange}
                  name="isAvailable"
                />
              </Box>
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
                Ajouter un stock
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default StockForm;
