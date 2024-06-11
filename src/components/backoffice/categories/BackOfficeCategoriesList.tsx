import React from "react";
import { useQuery } from "@apollo/client";
import { ICategory } from "@/types/ICategory";
import { GET_ALL_CATEGORIES } from "@/graphql/queryAllCategories";
import CategoryDataGrid from "./CategoriesDataGrid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import router from "next/router";
import LoadingApp from "@/styles/LoadingApp";

const BackOfficeCategoriesList = (): React.ReactNode => {
  const { data, loading } = useQuery<{ items: ICategory[] }>(
    GET_ALL_CATEGORIES,
  );
  if (loading) return <LoadingApp />;
  const categories = data?.items || [];
  return (
    <Box sx={{ marginTop: "30px" }}>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          router.push(`/renthub-backoffice/categories/new`);
        }}
      >
        Ajouter une catégorie
      </Button>
      {categories && <CategoryDataGrid categories={categories} />}
    </Box>
  );
};

export default BackOfficeCategoriesList;
