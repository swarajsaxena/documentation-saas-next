"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import {
  ArrowDataTransferVerticalIcon,
  CodesandboxIcon,
  ThreeDViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const TopBar = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className=" p-3 flex gap-3 items-center text-sm border-b border-border">
        <div className="size-6 rounded-full bg-cyan-500 border" />
        <span className="text-xs text-muted-foreground italic font-medium">
          /
        </span>
        {pathname === ROUTES.workspaces ? (
          <div>Workspaces</div>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <HugeiconsIcon icon={ThreeDViewIcon} className="size-4" />
              <span>swarajsaxena's Workspace</span>
              <Button
                size={"icon_default"}
                className="hover:bg-foreground/10"
                variant={"ghost"}
              >
                <HugeiconsIcon
                  icon={ArrowDataTransferVerticalIcon}
                  className="size-4"
                />
              </Button>
            </div>
            {pathname.includes("documentation") && (
              <>
                <span className="text-xs text-muted-foreground italic font-medium">
                  /
                </span>
                <div className="flex gap-2 items-center">
                  <HugeiconsIcon icon={CodesandboxIcon} className="size-4" />
                  <span>totheprod</span>
                  <Button
                    size={"icon_default"}
                    className="hover:bg-foreground/10"
                    variant={"ghost"}
                  >
                    <HugeiconsIcon
                      icon={ArrowDataTransferVerticalIcon}
                      className="size-4"
                    />
                  </Button>
                </div>
              </>
            )}
          </>
        )}
        <div className="flex gap-2 items-center ml-auto">
          <Button size={"sm"} variant={"outline"}>
            Feedback
          </Button>
          <div className="size-6 rounded-full bg-cyan-700" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default TopBar;
