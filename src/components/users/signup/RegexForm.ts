export const isValidEmailRegex = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidNameRegex = (name: string) => {
  const regex = /^[a-zA-ZÀ-ÿ\s-]{2,50}$/;
  return regex.test(name);
};

export const isValidPhoneNumberRegex = (phoneNumber: string) => {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
};

export const isValidPasswordRegex = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/;
  return regex.test(password);
};
