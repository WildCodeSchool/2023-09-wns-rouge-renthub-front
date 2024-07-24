import { gql } from "@apollo/client";

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
