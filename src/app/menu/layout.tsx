"use client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const open = window.localStorage.getItem("open");

  return <>{open && children}</>;
};

export default Layout;
