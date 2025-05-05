import TopBar from "@/components/dashboard/layout/top-bar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <TopBar>{children}</TopBar>;
};

export default layout;
