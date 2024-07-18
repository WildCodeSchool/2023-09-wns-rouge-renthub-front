import { Role } from "./RoleTypes";

export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
};

export type UserTypes = {
  id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  picture: {
    id: number;
    filename: string;
  };
  adress?: string;
  zipCode: string;
  city: string;
  coordinates: [number, number];
  phoneNumber?: string;
  registrationDate: string;
  role: string;
};

export type UserContextTypes = {
  firstName: string;
  lastName: string;
  role: string;
};

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdBy: CreatedBy | null;
  createdAt: string;
  role: Role;
  lastConnectionDate: string;
  nickName: string;
  updatedAt: string;
  updatedBy: UpdatedBy | null;
}

export interface CreatedBy {
  id: string;
  firstName: string;
  lastName: string;
}

interface UpdatedBy {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
