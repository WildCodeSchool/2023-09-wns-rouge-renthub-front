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
      // If user connected with role USER, redirect to home page
      if (user && user.role === "USER") {
        router.push("/");
      }
    }, [user, error, router]);

    // Handle sign in to refetch the userContext
    const handleSignIn = async () => {
      await refetch();
    };

    // If loading, show loading component
    if (loading) {
      return <LoadingApp />;
    }

    // If user not connected, show the sign in component
    if (error) {
      return <SignIn onSignIn={handleSignIn} />;
    }
    // If user connected with role ADMIN, show the wrapped component
    if (user && user.role === "ADMIN") {
      return <WrappedComponent />;
    }
    // Otherwise, show the sign in component
    return <SignIn onSignIn={handleSignIn} />;
  };

  return ProtectedComponent;
};

export default AdminProtection;
