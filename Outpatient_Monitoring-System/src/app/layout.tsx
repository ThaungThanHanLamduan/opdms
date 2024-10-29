"use client";

import React from "react";
import RootLayout from "./RootLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <RootLayout>{children}</RootLayout>;
};

export default Layout;
