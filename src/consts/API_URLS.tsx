import BASE_URL from "./BASE_URL";

const API_URLS = {
  telegram: {
    sendMessage: `${BASE_URL}/api/telegram/send-message`,
    deleteMessage: `${BASE_URL}/api/telegram/delete-message`,
  },

  novaPoshta: { route: `${BASE_URL}/api/nova-poshta` },
};

export default API_URLS;
