import { gql } from "@apollo/client";

export const mutationCreateUser = gql`
  mutation userCreate($data: UserCreateInput!) {
    item: userCreate(data: $data) {
      id
      firstName
    }
  }
`;

export const mutationVerifyEmail = gql`
  mutation VerifyEmail($data: VerifyEmailResponseInput!) {
    verifyEmail(data: $data) {
      message
      success
    }
  }
`;

export const mutationReSendCode = gql`
  mutation GenerateNewVerificationCode($data: ReSendVerificationCodeInput!) {
    generateNewVerificationCode(data: $data)
  }
`;

export const mutationUserLogin = gql`
  mutation userLogin($data: UserLoginInput!) {
    item: userLogin(data: $data) {
      id
      firstName
    }
  }
`;

export const queryMe = gql`
  query me {
    item: me {
      id
      firstName
      lastName
      nickName
      email
      picture {
        id
        filename
      }
      adress
      zipCode
      city
      coordinates
      phoneNumber
      registrationDate
      role
    }
  }
`;

export const queryMeContext = gql`
  query meContext {
    item: meContext {
      firstName
      lastName
      role
    }
  }
`;

export const mutationSignOut = gql`
  mutation userSignOut {
    userSignOut
  }
`;
