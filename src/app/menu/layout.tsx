"use client";

import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => setToken(localStorage.getItem("token")), []);

  return <>{token && children}</>;
};

export default Layout;
