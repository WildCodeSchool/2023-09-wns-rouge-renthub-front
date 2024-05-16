import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { queryMeContext } from "@/components/graphql/Users";
import SignIn from "@/components/users/signin/SignIn";
import { UserContextTypes } from "@/types/UserTypes";
import LoadingApp from "@/styles/LoadingApp";
import { useUserContext } from "@/context/UserContext";

const AdminProtection = (WrappedComponent: React.ComponentType) => {
  const ProtectedComponent = () => {
    const router = useRouter();
    // Get user context
    const { user } = useUserContext();

    useEffect(() => {
      // If user connected with role USER, redirect to home page
      if (user && user.role === "USER") {
        router.push("/");
      }
    }, [user, router]);

    // If loading, show loading component
    if (user === undefined) {
      return <LoadingApp />;
    }

    // If user not connected, show the sign in component
    if (!user) {
      return <SignIn />;
    }
    // If user connected with role ADMIN, show the wrapped component
    if (user.role === "ADMIN") {
      return <WrappedComponent />;
    }
    // Otherwise, show the sign in component
    return <SignIn />;
  };

  return ProtectedComponent;
};

export default AdminProtection;
