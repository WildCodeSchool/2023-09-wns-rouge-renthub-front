import { gql } from "@apollo/client";

export const mutationReSendCode = gql`
  mutation GenerateNewVerificationCode($data: ReSendVerificationCodeInput!) {
    generateNewVerificationCode(data: $data)
  }
`;
