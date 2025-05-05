import { useUser as _useUser } from "@clerk/nextjs";

export default function useAuth() {
  const { isSignedIn, user, isLoaded } = _useUser();

  return { isSignedIn, user, isLoaded };
}
