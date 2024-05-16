import { GET_ALL_CATEGORIES } from "@/graphql/queryAllCategories";
import { ICategory } from "@/types/ICategory";
import { useQuery } from "@apollo/client";
import { Box, Icon, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface SubMenuCategoriesProps {
  idActive: number | null;
  title: string;
  listCategories: ICategory[];
  onCategorySelected: (categoryId: string) => void;
}

function SubMenuCategories({
  idActive,
  title,
  listCategories,
  onCategorySelected,
}: SubMenuCategoriesProps) {
  function handleClick(categoryId: string) {
    if (onCategorySelected) {
      onCategorySelected(categoryId);
    }
  }

  const isActived = useState(false);
  return (
    <div className="submenu-categories">
      <Box>
        <Typography textAlign={"left"} color={"white"}>
          {title}
          {listCategories.map((category) => (
            <li
              key={category.id}
              className="isActive"
              onClick={(e) => handleClick(category.id)}
            >
              <p>{category.name}</p>
            </li>
          ))}
        </Typography>
      </Box>
    </div>
  );
}

export default SubMenuCategories;
