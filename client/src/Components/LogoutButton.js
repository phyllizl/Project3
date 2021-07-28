import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const [logout, setLogout] = useState("");
  let history = useHistory();
  const loggingOut = (event) => {
    event.preventDefault();
    fetch("/v1/users/logout", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error in network");
      })
      .then((resJson) => {
        //console.log(resJson.error);
        if (resJson.error) {
          return setLogout("Error in logging out user");
        } else {
          return history.push("/");
        }
      });
  };
  return <button onClick={loggingOut}>Log Out</button>;
};

export default LogoutButton;
