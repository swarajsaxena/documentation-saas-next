import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Workspaces = () => {
  return (
    <div className="flex justify-center bg-background h-screen overflow-hidden">
      <div className="max-w-4xl w-full p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl font-medium">Workspaces</h1>
          <Button variant={"secondary"}>New Workspace</Button>
        </div>
        <Separator />
        <div className="grid-cols-2 grid gap-4">
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
