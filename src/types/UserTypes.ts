export type UserFormData = {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
  pictureId: number;
  adress?: string;
  zipCode: string;
  city: string;
  coordinates: [number, number];
  phoneNumber?: string;
  isVerified: boolean;
  role: string;
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
