const BASE_URL =
  process.env.NODE_ENV === "production"
    ? (process.env.BASE_URL as string)
    : "http://localhost:3000";

export default BASE_URL;
