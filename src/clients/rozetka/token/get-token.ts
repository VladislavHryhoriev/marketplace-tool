const isBrowser = typeof window !== "undefined";

const getToken = (): {
  token: string | null;
  time: number | null;
} => {
  if (!isBrowser) return { token: null, time: null };

  try {
    const token = localStorage.getItem("token");
    const time = localStorage.getItem("token_time");

    return { token, time: time ? Number(time) : null };
  } catch (error) {
    console.error(error);
    return { token: null, time: null };
  }
};

export default getToken;
