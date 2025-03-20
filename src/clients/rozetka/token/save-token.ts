const isBrowser = typeof window !== "undefined";

const saveToken = (token: string) => {
  if (!isBrowser) return "Not browser";

  try {
    localStorage.setItem("token", token);
    localStorage.setItem("token_time", Date.now().toString());
  } catch (error) {
    console.error(error);
  }
};

export default saveToken;
