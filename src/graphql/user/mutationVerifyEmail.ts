import { gql } from "@apollo/client";

export const mutationVerifyEmail = gql`
  mutation VerifyEmail($data: VerifyEmailResponseInput!) {
    verifyEmail(data: $data) {
      message
      success
    }
  }
`;
