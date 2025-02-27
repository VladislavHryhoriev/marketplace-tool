export const capitalize = (str: string) => {
  return str
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .join(" ");
};
