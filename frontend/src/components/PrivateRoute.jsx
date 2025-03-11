import "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element:, ...rest }) => {
  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <Route
      {...rest}
      element={isLoggedIn ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;