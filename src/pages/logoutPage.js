import React, { useEffect } from "react";
import Cookies from "js-cookie";

const LogoutPage = (props) => {
  useEffect(() => {
    props.logoutCallback();
  }, []);

  return <>Succesfully logged out</>;
};

export default LogoutPage;
