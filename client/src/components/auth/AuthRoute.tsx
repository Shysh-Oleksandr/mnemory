import React from "react";
import logging from "../../config/logging";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../state";

interface IAuthRouteProps {
  children: JSX.Element;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;

  const { user } = useSelector((state: State) => state.user);

  if (user._id === "") {
    logging.info("Unauthorized, redirecting...");
    return <Navigate to={"/login"} />;
  } else {
    return <>{children}</>;
  }
};

export default AuthRoute;
