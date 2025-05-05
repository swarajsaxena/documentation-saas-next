import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Workspace = () => {
  return (
    <div className="flex justify-center bg-background h-screen overflow-hidden">
      <div className="max-w-4xl w-full p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <Button>New Project</Button>
        </div>
        <div className="grid-cols-3 grid gap-4">
          <Skeleton className="w-full h-40" />
          <Skeleton className="w-full h-40" />
          <Skeleton className="w-full h-40" />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
