// const

'use client';

import { Login } from "./Login";
import { Register } from "./Register";
import { useState } from "react";

export const Authenticate = () => {
  const [currentView, setCurentView] = useState("register");

  const onSubmit = () => {
    console.log("TODO");
  };

  // if (currentView === "login") {
    return <Login />;
  // }

  // return <Register />;
};
