import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import DateRangePicker from "@/components/cart/DateRangePicker";
import { Container, Grid } from "@mui/material";
import Recapitulatif from "@/components/cart/Recapitulatif";
import { VariablesColors } from "@/styles/Variables.colors";
import { useRouter } from "next/router";
import { GET_PRODUCT_REF } from "@/graphql/queryProdcutRef";
import { useMutation, useQuery } from "@apollo/client";
import { IProductReference } from "@/types/IProductReference";
import { MUTATION_CREATE_PRODUCT_CART } from "@/graphql/productCart/productCart";
import { Toaster } from "react-hot-toast";
import { showToast } from "@/components/utils/toastHelper";
import { GET_COUNT_STOCKS_AVAILABLE_BY_DATES_PRODUCTREFERENCEID } from "@/graphql/stocks/queryStocks";

function dateformater(date: Date) {
  return new Date(format(date, "yyyy-MM-dd")).toISOString();
}

type Product = {
  id: number;
  name: string;
  price: number;
};

export type DateRangeState = {
  startDate: Date;
  endDate: Date;
  key: string;
}[];

export default function AddToCart() {
  const [state, setState] = useState<DateRangeState>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const dateForMutation = new Date(
    format(state[0].startDate, "yyyy-MM-dd"),
  ).toISOString();

  const [product, setProduct] = useState<Product>({
    id: 1,
    name: "",
    price: 50,
  });
  const [quantity, setQuantity] = useState<number>(1);
  const { lightGreyColor } = new VariablesColors();
  const productId = useRouter().query.productId;
  const { data } = useQuery<{ item: IProductReference }>(GET_PRODUCT_REF, {
    variables: { getProductReferenceId: productId },
  });
  const { data: countStockAvaiable, refetch } = useQuery<{ count: number }>(
    GET_COUNT_STOCKS_AVAILABLE_BY_DATES_PRODUCTREFERENCEID,
    {
      variables: {
        productReferenceId: Number(productId),
        dateStart: dateformater(state[0].startDate),
        dateEnd: dateformater(state[0].endDate),
      },
    },
  );

  const [doCreateCart] = useMutation(MUTATION_CREATE_PRODUCT_CART);

  useEffect(() => {
    refetch();
  }, [state]);

  const addProductCart = async () => {
    try {
      await doCreateCart({
        variables: {
          data: {
            quantity: quantity,
            productReference: {
              id: productId,
            },
            dateTimeStart: state[0].startDate,
            dateTimeEnd: state[0].endDate,
          },
        },
      });
      showToast("success", "Produit ajouté au panier");
    } catch (error) {
      showToast("error", "Une erreur s'est produite");
    }
  };

  return (
    <>
      <Toaster />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DateRangePicker
              state={state}
              quantity={quantity}
              setState={setState}
              setQuantity={setQuantity}
              quantityAvailable={countStockAvaiable?.count || 0}
              addProductCart={addProductCart}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ backgroundColor: lightGreyColor }}>
            <Recapitulatif
              state={state}
              quantity={quantity}
              nameProduct={data?.item.name}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
