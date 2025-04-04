import BASE_URL from "./BASE_URL";

const API_URLS = {
  telegram: {
    sendMessage: `${BASE_URL}/api/telegram/send-message`,
    deleteMessage: `${BASE_URL}/api/telegram/delete-message`,
  },

  novaPoshta: {
    tracking: `${BASE_URL}/api/nova-poshta/tracking`,
  },
};

export default API_URLS;
