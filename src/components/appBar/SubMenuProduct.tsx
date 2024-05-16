import { GET_CATEGORY_PRODUCT } from "@/graphql/queryCategoryWithProducts";
import { ICategory } from "@/types/ICategory";
import { IProductReference } from "@/types/IProductReference";
import { useQuery } from "@apollo/client";
import { Box, Link, Typography } from "@mui/material";
import React from "react";

export interface SubMenuProductProps {
  idCategory: string;
  title: string;
  listProducts?: IProductReference[] | null;
}

function SubMenuProduct({
  idCategory,
  title,
  listProducts,
}: SubMenuProductProps): React.ReactNode {
  const { data, loading, error } = useQuery<{ item: ICategory }>(
    GET_CATEGORY_PRODUCT,
    { variables: { findCategoryId: idCategory } },
  );

  const sortedProducts = data
    ? [...data.item?.productReference].sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    : [];

  console.warn("SubMenuProduct", { data, loading, error });
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
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={1.5}>
        {sortedProducts &&
          sortedProducts?.map((product: IProductReference) => (
            <li key={product.id}>
              <Link href={`/pages/product/${product.id}`}>
                <a>{product.name}</a>
              </Link>
            </li>
          ))}
      </Box>
    </Box>
  );
}

export default SubMenuProduct;
