import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";

ReactDOM.hydrateRoot(
  document.getElementById("app"),
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);