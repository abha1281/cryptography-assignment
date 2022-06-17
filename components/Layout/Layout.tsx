import React from "react";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto max-w-7xl mt-10">{children}</div>
    </>
  );
};

export default Layout;
