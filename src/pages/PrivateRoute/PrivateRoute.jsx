import React from "react";
import { Outlet } from "react-router";

export default function PrivateRoute() {
  /* if condition be true retur outlet if false return null */
  return <Outlet />;
}
