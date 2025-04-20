import { config } from "@/config";
import fetchToken from "./fetch-token";
import getToken from "./get-token";
import isValidToken from "./is-valid-token";
import saveToken from "./save-token";

export const getTokenRozetka = async (): Promise<string> => {
  const { token, time } = getToken();

  if (token && time && isValidToken(time, config.rozetka.tokenLifetime))
    return token;

  const newToken = await fetchToken();
  saveToken(newToken);

  return newToken;
};

export default getTokenRozetka;
