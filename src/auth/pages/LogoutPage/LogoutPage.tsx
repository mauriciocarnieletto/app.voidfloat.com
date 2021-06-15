import React from "react";
import { Redirect } from "react-router-dom";
import { AuthTokenLocalStorageKey } from "../../constants";

export const LogoutPage = () => {
  localStorage.removeItem(AuthTokenLocalStorageKey);
  return <Redirect to='/login' />;
};
