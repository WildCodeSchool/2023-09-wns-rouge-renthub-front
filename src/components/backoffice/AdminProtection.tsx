import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SignIn from "@/components/users/signin/SignIn";
import LoadingApp from "@/styles/LoadingApp";
import { useUserContext } from "@/context/UserContext";

const AdminProtection = (WrappedComponent: React.ComponentType) => {
  const ProtectedComponent = () => {
    const router = useRouter();
    // Get user context
    // If user is connected, user is an object with the user data
    // If user is not connected, user is null
    // If user is loading, user is undefined
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
