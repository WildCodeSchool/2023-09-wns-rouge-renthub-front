import React from "react";
import { TextField } from "@mui/material";

type UserEmailProps = {
  email: string;
  setEmail: (email: string) => void;
};

const UserEmail = (props: UserEmailProps): React.ReactNode => {
  return (
    <TextField
      fullWidth
      id="email"
      type="email"
      size="small"
      label="Email"
      variant="outlined"
      value={props.email || ""}
      onChange={(e) => props.setEmail(e.target.value)}
      required
    />
  );
};

export default UserEmail;
