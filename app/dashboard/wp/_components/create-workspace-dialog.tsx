"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateWorkspaceForm {
  name: string;
}

export function CreateWorkspaceDialog() {
  const createWorkspace = useMutation(api.workspaces.createWorkspace);
  const [open, setOpen] = useState(false);

  const form = useForm<CreateWorkspaceForm>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateWorkspaceForm) => {
    // console.log("🚀 ~ onSubmit ~ data:", data);
    try {
      await createWorkspace(data);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">New Workspace</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Workspace Name</Label>
            <Input
              id="name"
              {...form.register("name", {
                required: "Workspace name is required",
              })}
              placeholder="Enter workspace name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Workspace"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
