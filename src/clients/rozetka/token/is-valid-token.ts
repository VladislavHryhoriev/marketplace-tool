const isValidToken = (storedTime: number, lifetime: number): boolean => {
  return Date.now() - storedTime < lifetime;
};

export default isValidToken;
