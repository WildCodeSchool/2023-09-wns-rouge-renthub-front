import React from "react";
import { TextField } from "@mui/material";

type UserPhoneProps = {
  phoneNumber: string;
  setPhoneNumber: (email: string) => void;
};

const UserPhone = (props: UserPhoneProps): React.ReactNode => {
  return (
    <TextField
      fullWidth
      id="phoneNumber"
      type="tel"
      size="small"
      label="Téléphone"
      variant="outlined"
      value={props.phoneNumber || ""}
      onChange={(e) => {
        const inputNumber = e.target.value;
        const regex = /^[0-9]*$/;
        if (regex.test(inputNumber)) {
          props.setPhoneNumber(inputNumber);
        }
      }}
      inputProps={{
        maxLength: 10,
      }}
    />
  );
};

export default UserPhone;
