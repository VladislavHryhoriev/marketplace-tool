// TODO: Обновить класс RozetkaApiClient

// import { config } from "@/config";
// import API_URLS from "@/consts/API_URLS";
// import fetchToken from "./token/fetch-token";
// import getToken from "./token/get-token";
// import saveToken from "./token/save-token";
// import isValidToken from "./token/is-valid-token";

// export const getTokenRozetka = async (): Promise<string> => {
//   const { token, time } = getToken();

//   if (token && time && isValidToken(time, config.rozetka.tokenLifetime))
//     return token;

//   const newToken = await fetchToken();
//   saveToken(newToken);

//   return newToken;
// };

// class RozetkaApiClient {
//   protected async request<T>(options?: RequestInit): Promise<T> {
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };

//     const response = await fetch(API_URLS.rozetka.route, {
//       headers,
//       next: { revalidate: 10 },
//       ...options,
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     const json = await response.json();

//     return json;
//   }

//   async getTokenRozetka(): Promise<string> {
//     const { token, time } = getToken();

//     if (token && time && isValidToken(time, config.rozetka.tokenLifetime))
//       return token;

//     const newToken = await fetchToken();
//     saveToken(newToken);

//     return newToken;
//   }
// }

// const rozetkaApi = new RozetkaApiClient();

// export default rozetkaApi;
