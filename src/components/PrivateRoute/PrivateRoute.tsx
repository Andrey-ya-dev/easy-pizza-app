import { useAppSelector } from "@/store/hooks";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export function PrivateRoute({ children }: PropsWithChildren) {
  const jwt = useAppSelector((state) => state.user.jwt);

  if (!jwt) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return children;
}
