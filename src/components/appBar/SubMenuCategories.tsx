import { Box, Link, Typography } from "@mui/material";
import React from "react";

export interface SubMenuCategoriesProps {
  idActive: number | null;
  title: string;
  listCategories: { id: number; title: string; description: string }[];
}
function SubMenuCategories({
  idActive,
  title,
  listCategories,
}: SubMenuCategoriesProps): React.ReactNode {
  return (
    <Box>
      <Typography textAlign={"left"} color={"white"}>
        {title}
      </Typography>
      <div className="submenu-product">
        <ul>
          <li>
            <a href="#">{title}</a>
          </li>
          {listCategories?.map((category) => (
            <li key={category.id}>
              <Link href={`/pages/category/${category.id}`}>
                <a>{category.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
}

export default SubMenuCategories;
