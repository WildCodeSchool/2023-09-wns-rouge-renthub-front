import AdminProtection from "@/components/backoffice/AdminProtection";
import { useRouter } from "next/router";
import React from "react";

export function UserUpdate(): React.ReactNode {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Update user {id}</h1>
    </div>
  );
}

export default AdminProtection(UserUpdate);
