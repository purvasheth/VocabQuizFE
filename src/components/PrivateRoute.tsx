import { Route, Navigate } from "react-router-dom";
import React, { ReactElement } from "react";
import { useAuth } from "../contexts";

type PrivateRouteProps = {
  path: string;
  element: ReactElement;
};

export function PrivateRoute({ path, ...props }: PrivateRouteProps) {
  const { token } = useAuth();

  return token !== "" ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate replace to="/login" />
  );
}
