import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useQuery } from "@apollo/client";
import { Cart } from "@/types/Cart";
import { GET_CART } from "@/graphql/cart/cart";

interface CartContextProps {
  cart: Cart | null;
  refetchCartContext: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, refetch } = useQuery<{ item: Cart }>(GET_CART);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    if (error) {
      setCart(null);
    }
    if (data?.item) {
      setCart(data.item);
    }
  }, [data, error]);

  const refetchCartContext = useCallback(async () => {
    try {
      const { data } = await refetch();
      if (data?.item) {
        setCart(data.item);
      } else {
        setCart(null);
      }
    } catch (err) {
      console.error("Error during refetch:", err);
      setCart(null);
    }
  }, [refetch]);

  return (
    <CartContext.Provider value={{ cart, refetchCartContext }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
