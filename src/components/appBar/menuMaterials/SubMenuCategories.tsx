import { ICategory } from "@/types/ICategory";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { VariablesColors } from "@/styles/Variables.colors";

export interface SubMenuCategoriesProps {
  title: string;
  listCategories: ICategory[];
  onCategorySelected: (categoryId: string) => void;
}
const { orangeColor } = new VariablesColors();

function SubMenuCategories({
  title,
  listCategories,

  onCategorySelected,
}: SubMenuCategoriesProps) {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  function handleClick(categoryId: string) {
    if (onCategorySelected) {
      onCategorySelected(categoryId);
    }
  }

  /** organise et creer l'arboresence des categorie par lettre alphabétique **/
  const groupedCategories = listCategories.reduce((acc, item) => {
    // initialisation de l'objet par une lettre avec 1er eleement du tableau
    const firstLetter = item.name[0].toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});

  return (
    <div className="submenu-categories">
      <Box>
        <Typography textAlign={"left"} color={"white"}>
          <Typography fontSize={"1.5rem"} padding={"1rem 0 "}>
            {title}
          </Typography>
          {Object.keys(groupedCategories).map((letter) => (
            <div key={letter}>
              <Typography
                variant="caption"
                fontSize={"1.2rem"}
                fontWeight={600}
                padding={"0rem"}
                margin={"0.3rem 0 0 0"}
                borderRadius={"1rem"}
                color={"white"}
                bgcolor={orangeColor}
                width={"3rem"}
                textAlign={"center"}
                display={"inline-block"}
                marginBottom={"1rem"}
              >
                {letter}
              </Typography>
              <ul>
                {groupedCategories[letter].map((category) => (
                  <li
                    style={{ border: "1px solid transparent" }}
                    key={category.id}
                    onClick={(e) => handleClick(category.id)}
                    onMouseEnter={() => setHoveredItemId(category.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                  >
                    <Box
                      display={"flex"}
                      padding={"0.4rem 0"}
                      justifyContent="space-between"
                      flexDirection={"row"}
                    >
                      <Typography padding={"0 1rem"}>
                        {category.name}
                      </Typography>
                      {hoveredItemId === category.id && (
                        <ArrowForwardIosIcon fontSize="small" />
                      )}
                    </Box>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Typography>
      </Box>
    </div>
  );
}

export default SubMenuCategories;
