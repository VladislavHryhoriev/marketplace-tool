import axios from "axios";

export const epicentrApi = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EPICENTR_TOKEN}`,
    "accept-language": "uk",
  },
});

export const rozetkaApi = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});
