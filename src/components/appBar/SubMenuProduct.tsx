import { IProductReference } from "@/types/IProductReference";
import { Box, Link, Typography } from "@mui/material";
import React from "react";

export interface SubMenuProductProps {
  title: string;
  listProducts: IProductReference[] | null;
}

function SubMenuProduct({
  title,
  listProducts,
}: SubMenuProductProps): React.ReactNode {
  return (
    <Box marginTop={3} flexDirection={"column"} gap={2} display={"flex"}>
      <Typography textAlign={"left"} color={"black"}>
        {title}
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={1.5}>
        {listProducts?.map((product) => (
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
