import { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import { queryMe } from "@/components/graphql/Users";
import { useQuery } from "@apollo/client";
import { UserTypes } from "@/types/UserTypes";

const UserAccount = (): React.ReactNode => {
  // User infos
  const { data, error } = useQuery<{ item: UserTypes }>(queryMe);
  const userInfos = data ? data.item : null;
  // Form states
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [picture, setPicture] = useState<File | null>(null);
  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setPicture(event.target.files[0]);
    }
  }
  // Set user infos in state
  useEffect(() => {
    if (userInfos) {
      setFirstName(userInfos.firstName);
      setLastName(userInfos.lastName);
      setNickName(userInfos.nickName);
      setZipCode(userInfos.zipCode);
      setCity(userInfos.city);
      setCoordinates(userInfos.coordinates);
      setEmail(userInfos.email);
      setPhoneNumber(userInfos.phoneNumber);
    }
  }, [userInfos]);
  return (
    <Card>
      {userInfos && (
        <Typography variant="h4" gutterBottom>
          {`Hey ${nickName} !`}
        </Typography>
      )}
    </Card>
  );
};

export default UserAccount;
