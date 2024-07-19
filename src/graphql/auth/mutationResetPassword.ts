import { gql } from "@apollo/client";

export const mutationResetPassword = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;
