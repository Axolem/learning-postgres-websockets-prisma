import "./index.css";
import { render } from "preact";
import { App } from "./app.jsx";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import { AuthProvider } from "./utils/AuthContext.js";

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("app")
);
