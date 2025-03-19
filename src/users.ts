type User = {
  id: string;
  name: string;
  role: "admin" | "user";
  password: string;
};

export const users: User[] = [
  {
    id: "0",
    name: "human",
    role: "admin",
    password: "token3301",
  },
  {
    id: "1",
    name: "user",
    role: "user",
    password: "token3301",
  },
];
