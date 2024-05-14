export const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000/" : "/api";
export const PATH_IMAGE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/assets/images"
    : "/api/assets/images";
export const RECAPTCHA_SITE_KEY: string =
  process.env.NODE_ENV === "development"
    ? "6LctKSQpAAAAAOdHh-YB8K9XDvf93Qeko1r5nfRl"
    : "6LfcS9spAAAAAINufAG7cgIYfXPSk3P3LRw0yxNQ";
