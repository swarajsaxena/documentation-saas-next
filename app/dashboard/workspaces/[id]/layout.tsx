"use client";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  CodesandboxIcon,
  Settings01Icon,
  UserMultiple03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const routes = (id: string) => [
  {
    label: "Documentations",
    route: ROUTES.workspaces + `/${id}`,
    icon: CodesandboxIcon,
  },
  {
    label: "Team",
    route: ROUTES.workspaces + `/${id}/team`,
    icon: UserMultiple03Icon,
  },
  {
    label: "Settings",
    route: ROUTES.workspaces + `/${id}/settings`,
    icon: Settings01Icon,
  },
];

const layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="h-screen overflow-hidden flex">
      <div className="p-2 border-r border-border flex flex-col">
        {routes("123").map((route) => {
          const Icon = route.icon;
          return (
            <Link
              href={route.route}
              key={route.route}
              className={cn(
                "flex items-center gap-2 text-sm px-2 py-1.5 pr-6 text-muted-foreground font-medium rounded-md transition-all hover:bg-muted",
                pathname === route.route &&
                  "bg-muted-foreground/10 text-foreground"
              )}
            >
              <HugeiconsIcon icon={Icon} className={cn("size-4")} />
              {route.label}
            </Link>
          );
        })}
      </div>
      <div className="flex-1 overflow-auto bg-background">{children}</div>
    </div>
  );
};

export default layout;
