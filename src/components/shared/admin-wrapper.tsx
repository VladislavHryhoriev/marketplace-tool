import { useSession } from "next-auth/react";

const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  return session.data?.user.role === "admin" ? children : null;
};

export default AdminWrapper;
