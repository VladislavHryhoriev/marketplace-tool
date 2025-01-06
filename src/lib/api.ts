import axios from "axios";

export const epicentrApi = axios.create({
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EPICENTR_TOKEN}`,
    "accept-language": "uk",
  },
});

export const rozetkaApi = axios.create({
  headers: {
    accept: "application/json",
  },
});
