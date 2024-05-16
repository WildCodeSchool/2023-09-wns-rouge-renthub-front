import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { queryMeContext } from "@/components/graphql/Users";
import SignIn from "@/components/users/signin/SignIn";
import { UserContextTypes } from "@/types/UserTypes";
import LoadingApp from "@/styles/LoadingApp";

const AdminProtection = (WrappedComponent: React.ComponentType) => {
  const ProtectedComponent = () => {
    const { data, error, loading, refetch } = useQuery<{
      item: UserContextTypes;
    }>(queryMeContext);
    const router = useRouter();
    const user = data ? data.item : null;

    useEffect(() => {
      if (error) {
        return;
      }

      if (user && user.role === "USER") {
        router.push("/");
      }
    }, [user, error, router]);

    const handleSignIn = async () => {
      await refetch();
    };

    if (loading) {
      return <LoadingApp />;
    }

    if (error) {
      return <SignIn onSignIn={handleSignIn} />;
    }

    if (user && user.role === "ADMIN") {
      return <WrappedComponent />;
    }
    return <SignIn onSignIn={handleSignIn} />;
  };

  return ProtectedComponent;
};

export default AdminProtection;
