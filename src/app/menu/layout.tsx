"use client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const open = localStorage.getItem("open");

  return <>{open && children}</>;
};

export default Layout;
