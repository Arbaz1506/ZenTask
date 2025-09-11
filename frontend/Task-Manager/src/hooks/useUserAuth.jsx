import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/userContext";

/**
 * Safe auth helper hook.
 * - DOES NOT navigate anywhere.
 * - If there's no user after loading finishes, it clears stored token ONCE.
 * - Use this in components that need to ensure local storage is cleaned up,
 *   but do NOT call it inside routes that are already protected by PrivateRoute.
 */
export const useUserAuth = () => {
  const { user, loading, clearUser } = useContext(UserContext);
  const clearedRef = useRef(false);

  useEffect(() => {
    if (loading) return;

    // If no user and we haven't cleared during this mount, clear once.
    if (!user && !clearedRef.current) {
      clearUser?.();
      clearedRef.current = true;
    }
  }, [user, loading, clearUser]);
};
