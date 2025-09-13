import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";

export default function PrivateRoute() {
  /* if user not logged in can't access to this url */
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [navigate, user]);

  /* if condition be true return outlet if false return null */
  if (user === null) {
    return null;
  }

  return <Outlet />;
}
