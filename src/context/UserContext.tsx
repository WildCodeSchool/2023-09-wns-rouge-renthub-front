import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useQuery } from "@apollo/client";
import { UserContextTypes } from "@/types/UserTypes";
import { queryMeContext } from "@/graphql/user/queryMeContext";

interface UserContextProps {
  user: UserContextTypes | null;
  refetchUserContext: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, refetch } = useQuery<{ item: UserContextTypes }>(
    queryMeContext,
  );
  const [user, setUser] = useState<UserContextTypes | null>(null);

  useEffect(() => {
    if (error) {
      setUser(null);
    }
    if (data?.item) {
      setUser(data.item);
    }
  }, [data, error]);

  const refetchUserContext = useCallback(async () => {
    try {
      const { data } = await refetch();
      if (data?.item) {
        setUser(data.item);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error during refetch:", err);
      setUser(null);
    }
  }, [refetch]);

  return (
    <UserContext.Provider value={{ user, refetchUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
