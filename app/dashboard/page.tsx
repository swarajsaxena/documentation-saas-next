"use client";

import { api } from "@/convex/_generated/api";
import useCustomQuery from "@/hooks/use-custom-query";
import { ROUTES } from "@/lib/constants";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { data, isLoading } = useCustomQuery(api.workspaces.getWorkspaces);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return redirect(ROUTES.workspaces + "/" + data[0]._id);
};

export default Dashboard;
