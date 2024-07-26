import { Box, IconButton, TextField, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { ProductCart } from "@/types/ProductCart";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COUNT_STOCKS_AVAILABLE_BY_DATES_PRODUCTREFERENCEID } from "@/graphql/stocks/queryStocks";
import { dateformater } from "../utils/helpers";
import { MUTATION_UPDATE_PRODUCT_CART } from "@/graphql/productCart/productCart";
import { showToast } from "../utils/toastHelper";
import { useRouter } from "next/router";
import { useCartContext } from "@/context/CartContext";

type ProductCartAvailabilityProps = {
  productCart: ProductCart;
};

function ProductCartAvailability({
  productCart,
}: ProductCartAvailabilityProps) {
  const router = useRouter();
  const { refetchCartContext } = useCartContext();

  const { data: countStockAvaiable, refetch } = useQuery<{ count: number }>(
    GET_COUNT_STOCKS_AVAILABLE_BY_DATES_PRODUCTREFERENCEID,
    {
      variables: {
        productReferenceId: Number(productCart.productReference.id),
        dateStart: dateformater(productCart.dateTimeStart),
        dateEnd: dateformater(productCart.dateTimeEnd),
      },
    },
  );
  const [doUpdateProductCart] = useMutation(MUTATION_UPDATE_PRODUCT_CART);

  const handleQuantity = async (quantity: number) => {
    try {
      await doUpdateProductCart({
        variables: {
          data: {
            quantity: Number(quantity),
          },
          updateProductCartId: Number(productCart.id),
        },
      });
      showToast("success", "Quantity modifiée");
      refetchCartContext();
    } catch (error) {
      showToast("error", "Une erreur s'est produite");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem", // Space between the input and buttons
        }}
      >
        {/* Add Button */}
        <IconButton
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            outline: `1px solid black`,
            borderRadius: "50%",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "orange",
              outline: `1px solid orange`,
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            "& .MuiSvgIcon-root": {
              color: "black",
            },
          }}
          onClick={() => handleQuantity(productCart.quantity - 1)}
        >
          <RemoveIcon />
        </IconButton>

        {/* Quantity Input */}
        <Typography variant="body1">{productCart.quantity}</Typography>

        {/* Remove Button */}
        <IconButton
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            outline: `1px solid black`,
            borderRadius: "50%",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "orange",
              outline: `1px solid orange`,
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            "& .MuiSvgIcon-root": {
              color: "black",
            },
          }}
          onClick={() => handleQuantity(productCart.quantity + 1)}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Typography
        variant="body1"
        // textAlign={"center"}
        color={
          countStockAvaiable?.count >= productCart.quantity ? "green" : "red"
        }
      >
        Disponible {countStockAvaiable?.count}
      </Typography>
    </Box>
  );
}

export default ProductCartAvailability;
