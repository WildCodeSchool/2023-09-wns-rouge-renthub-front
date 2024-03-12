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
  id: string;
  nickName: string;
  picture: string;
};
