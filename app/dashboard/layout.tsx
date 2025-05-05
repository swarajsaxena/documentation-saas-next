"use client";

import AuthLayout from "@/components/dashboard/layout/auth-layout";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
