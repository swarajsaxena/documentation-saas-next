import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Add01Icon,
  ArrowDown01Icon,
  DragDropVerticalIcon,
  Menu01Icon,
  Menu02Icon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const ConfigureRoutes = () => {
  return (
    <div className="flex bg-background h-screen overflow-hidden">
      <div className="flex flex-col border-r border-border w-48">
        <h1 className="font-medium px-2 py-1.5 text-sm">Configure Routes</h1>
        <Separator />
        <div className="py-1.5 flex flex-col space-y-1">
          {[2, 3].map((item, index) => (
            <div className="text-sm px-1.5 space-y-1">
              <div className={cn("flex items-center gap-1 rounded-sm group")}>
                <HugeiconsIcon
                  icon={DragDropVerticalIcon}
                  className="size-4 text-muted-foreground hover:text-foreground"
                />{" "}
                <div className=" py-0.5 pr-1 pl-1.5 rounded-sm cursor-pointer flex-1 border-border border group-hover:border-border flex items-center gap-1">
                  Parent {index + 1}
                  <HugeiconsIcon
                    icon={Add01Icon}
                    className={
                      "size-4 text-muted-foreground hover:text-foreground ml-auto opacity-20 group-hover:opacity-100 transition-all"
                    }
                  />
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className="size-4 text-muted-foreground hover:text-foreground"
                  />
                </div>
              </div>
              <div className="space-y-1">
                {Array.from({ length: item }).map((_, i) => (
                  <div
                    className={cn(
                      "pl-4 flex items-center gap-1 rounded-sm group"
                    )}
                  >
                    <HugeiconsIcon
                      icon={DragDropVerticalIcon}
                      className="size-4 text-muted-foreground hover:text-foreground"
                    />
                    <div
                      className={cn(
                        " py-0.5 pr-1 pl-1.5 rounded-sm cursor-pointer flex-1 border-border border group-hover:border-border flex items-center gap-1",
                        i === 0 && index === 0 && "bg-muted border-transparent"
                      )}
                    >
                      Child {i + 1}
                      <HugeiconsIcon
                        icon={Add01Icon}
                        className={
                          "size-4 text-muted-foreground hover:text-foreground ml-auto opacity-20 group-hover:opacity-100 transition-all"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col p-4 items-center gap-8">
        <div className="flex items-center gap-1 text-xs text-muted-foreground w-full">
          <Skeleton className="w-20 h-6" />
          /
          <Skeleton className="w-32 h-6" />
          <Skeleton className="ml-auto w-32 h-6" />
          <HugeiconsIcon
            icon={MoreVerticalIcon}
            className="size-5 text-muted-foreground hover:text-foreground"
          />
        </div>
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <div className="border border-border rounded-md border-dashed text-xl font-medium px-2 py-1">
            Child 1
          </div>
          <Skeleton className="w-full h-56" />
        </div>
      </div>
    </div>
  );
};

export default ConfigureRoutes;
