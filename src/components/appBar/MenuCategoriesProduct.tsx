import { Box, Link, Popover, Popper, withTheme } from "@mui/material";
import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import { VariablesColors } from "@/styles/Variables.colors";
import { blue } from "@mui/material/colors";
import { WidthFull } from "@mui/icons-material";
import SubMenuProduct from "./SubMenuProduct";
import SubMenuCategories from "./SubMenuCategories";

export interface MenuCategoriesProductProps {
  id: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  handleMenuCategoriesClose: () => void;
}

const listProducts = [
  {
    id: 1,
    title: "Véhicules",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
  {
    id: 2,
    title: "Véhicules",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
  {
    id: 3,
    title: "Véhicules",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
  {
    id: 4,
    title: "Véhicules",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
  {
    id: 5,
    title: "Véhicules",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
];

function MenuCategoriesProduct({
  id,
  open,
  anchorEl,
  handleMenuCategoriesClose,
}: MenuCategoriesProductProps): React.ReactNode {
  const { darkBlueColor, lightBlueColor } = new VariablesColors();

  const colorBlue = "#152535";

  useEffect(() => {
    console.warn("isActive menu component", open);
  }, [open]);

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
      {" "}
      <Box
        display={"flex"}
        flexDirection={"row"}
        width={"800px"}
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
                backgroundColor={"white"}
                outerColor={"white"}
                colorText={"white"}
              />
            </Box>
            <SubMenuCategories
              listCategories={listProducts}
              idActive={1}
              title="test"
            />
          </Box>
        </Box>

        <Box
          flexGrow={4}
          display="flex"
          flexDirection="column"
          padding={"1rem"}
          borderRadius={"0 2rem 2rem 0"}
          bgcolor={"white"}
        >
          <SubMenuProduct title="Categories" listProducts={listProducts} />
        </Box>
      </Box>
    </Popover>
  );
}

export default MenuCategoriesProduct;
