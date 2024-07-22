import { Box, Popover } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { VariablesColors } from "@/styles/Variables.colors";

import SubMenuProduct from "./SubMenuProduct"; // first version
import SubMenuCategories from "./SubMenuCategories";
import { useQuery } from "@apollo/client";
import { ICategory } from "@/types/ICategory";
import { GET_ALL_CATEGORIES } from "@/graphql/queryAllCategories";
import SubMenuChildCategories from "./SubMenuChildCategories";
import { useRouter } from "next/router";

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
  const [openSubMenu, setOpenSubMenu] = useState(open); // a implementer pour fermer la fenetre lors de la selection d'une sous categorie.

  const { data, loading, error } = useQuery<{ items: ICategory[] }>(
    GET_ALL_CATEGORIES,
  );

  const router = useRouter();
  const [sortedSubCategories, setSortedSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  /** sort data alphabetical **/
  const sortedCategories: ICategory[] = data?.items.slice().sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    if (!open) {
      setSelectedCategoryId(null);
    }
  }, [open]);

  // Fonction pour traiter la catégorie sélectionnée et afficher les sous-catégories
  function handleCategorySelect(categoryId: string) {
    const sortedSubcategories = sortedCategories.find(
      (item) => item.id === categoryId,
    );
    sortedSubcategories?.childCategories;
    if (!sortedSubcategories.childCategories.length) {
      router.push(`/product/category/${categoryId}`);
    }
    setSortedSubCategories(sortedSubcategories?.childCategories || []);
    setSelectedCategoryId(categoryId);
  }

  useEffect(() => {}, [selectedCategoryId]);

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
        flexDirection={{ xs: "column-reverse", md: "row" }}
        width={"auto"}
        gap={0}
        sx={{ display: { xs: "flex", md: "flex" } }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
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
              title="Catégories"
              onCategorySelected={handleCategorySelect}
            />
          </Box>
        </Box>
        {selectedCategoryId && sortedSubCategories.length > 0 && (
          <Box
            flexGrow={4}
            display="flex"
            flexDirection="column"
            padding={"1rem"}
            borderRadius={"0 2rem 2rem 0"}
            bgcolor={"white"}
          >
            {sortedSubCategories && (
              <SubMenuChildCategories
                idCategoryParent={selectedCategoryId}
                title="Sous-catégories"
                listChildCategories={sortedSubCategories}
              />
            )}
          </Box>
        )}
      </Box>
    </Popover>
  );
}

export default MenuCategoriesProduct;
