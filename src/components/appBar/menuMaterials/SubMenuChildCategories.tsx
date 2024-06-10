import { ICategory } from "@/types/ICategory";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export interface SubMenuProductProps {
  idCategoryParent: string;
  title: string;
  listChildCategories?: ICategory[] | null;
}

function SubMenuChildCategories({
  idCategoryParent,
  title,
  listChildCategories,
}: SubMenuProductProps): React.ReactNode {
  const sortedChildCategories = listChildCategories
    ? [...listChildCategories].sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    : [];

  return (
    <Box
      minWidth={"400px"}
      marginTop={3}
      flexDirection={"column"}
      gap={2}
      display={"flex"}
    >
      <Typography textAlign={"left"} color={"black"}>
        {title}
        {/* {idCategoryParent} */}
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={1.5}>
        {sortedChildCategories &&
          sortedChildCategories?.map((category) => (
            <li key={category.id}>
              <Link href={`/product/category/${category.id}`}>
                {/* {"->"} {category.id}  */}
                {category.name}
              </Link>
            </li>
          ))}
      </Box>
    </Box>
  );
}

export default SubMenuChildCategories;
