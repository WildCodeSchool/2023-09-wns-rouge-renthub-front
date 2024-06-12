import { styleBoxContainer } from "@/components/utils/function";
import { VariablesColors } from "@/styles/Variables.colors";
import { UserFormValues } from "@/types/UserTypes";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Yup from "yup";

export const UserForm = ({ userId }: { userId?: string | null }) => {
  const { lightBlueColor } = new VariablesColors();
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  // const { data, loading, error } = useQuery(GET_USER_BY_ID, {
  //   variables: { id: userId },
  //   skip: !userId,
  // });

  // useEffect(() => {
  //   if (data) {
  //     setUser(data.user);
  //   }
  // }, [data]);

  // const [createUser] = useMutation(CREATE_USER, {
  //   onCompleted: () => router.push("/renthub-backoffice/users-list"),
  // });

  // const [updateUser] = useMutation(UPDATE_USER, {
  //   onCompleted: () => router.push("/renthub-backoffice/users-list"),
  // });

  const formik = useFormik<UserFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Le prénom est requis"),
      lastName: Yup.string().required("Le nom est requis"),
      email: Yup.string().email().required("L'email est requis"),
      phoneNumber: Yup.string().required("Le numéro de téléphone est requis"),
      password: Yup.string().required("Le mot de passe est requis"),
    }),
    onSubmit: (values) => {
      if (userId) {
        // updateUser({ variables: { id: userId, data: values } });
      } else {
        // createUser({ variables: { data: values } });
      }
    },
  });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Box sx={styleBoxContainer(lightBlueColor)}>
        <form onSubmit={formik.handleSubmit}></form>
      </Box>
    </>
  );
};

export default UserForm;
