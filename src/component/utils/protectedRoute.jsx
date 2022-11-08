import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteClient = ({
  isAllowed,
  redirectTo = "/home",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export const ProtectedRouteVendeor = ({
  isAllowed,
  redirectTo = "/home",
  children,
}) => {
  debugger
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};