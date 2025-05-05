"use client";

import useAuth from "@/hooks/use-auth";
import { ROUTES } from "@/lib/constants";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, user } = useAuth();

  return (
    <>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      {isSignedIn && user && <Link href={ROUTES["workspaces"]}>Dashboard</Link>}
    </>
  );
}
