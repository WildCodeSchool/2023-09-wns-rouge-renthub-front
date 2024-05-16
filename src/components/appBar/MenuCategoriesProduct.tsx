import { Box, Link, Popover, Popper, withTheme } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { VariablesColors } from "@/styles/Variables.colors";

import SubMenuProduct from "./SubMenuProduct";
import SubMenuCategories from "./SubMenuCategories";
import { useQuery } from "@apollo/client";
import { ICategory } from "@/types/ICategory";
import { GET_ALL_CATEGORIES } from "@/graphql/queryAllCategories";

export interface MenuCategoriesProductProps {
  id: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  handleMenuCategoriesClose: () => void;
}

function MenuCategoriesProduct({
  id,
  open,
  anchorEl,
  handleMenuCategoriesClose,
}: MenuCategoriesProductProps): React.ReactNode {
  const { darkBlueColor } = new VariablesColors();

  const { data, loading, error } = useQuery<{ items: ICategory[] }>(
    GET_ALL_CATEGORIES,
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  /** sort data alphabetical **/
  const sortedCategories = data?.items.slice().sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    console.warn("isActive menu component", open);
    if (!open) {
      setSelectedCategoryId(null);
    }
  }, [open]);

  // Fonction pour traiter la catégorie sélectionnée
  function handleCategorySelect(categoryId: string) {
    setSelectedCategoryId(categoryId);
  }

  useEffect(() => {
    console.warn("Selected category ID in component is : ", selectedCategoryId);
  }, [selectedCategoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleMenuCategoriesClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{ vertical: -30, horizontal: 200 }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        width={"auto"}
        gap={0}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Box
          display="flex"
          flexDirection="column"
          padding={"1rem"}
          flexGrow={1}
          bgcolor={darkBlueColor}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            style={{ margin: "1rem", alignContent: "center" }}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              marginBottom={"1.2rem"}
              marginBlockEnd={"2rem"}
            >
              <SearchBar
                backgroundColor={darkBlueColor}
                borderColor={"white"}
                colorText={"white"}
              />
            </Box>
            <SubMenuCategories
              listCategories={sortedCategories}
              idActive={1}
              title="Catégories"
              onCategorySelected={handleCategorySelect}
            />
          </Box>
        </Box>
        {selectedCategoryId && (
          <Box
            flexGrow={4}
            display="flex"
            flexDirection="column"
            padding={"1rem"}
            borderRadius={"0 2rem 2rem 0"}
            bgcolor={"white"}
          >
            <SubMenuProduct title="Produits" idCategory={selectedCategoryId} />
          </Box>
        )}
      </Box>
    </Popover>
  );
}

export default MenuCategoriesProduct;
