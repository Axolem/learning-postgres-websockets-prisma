import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";   

//import "primeicons/primeicons.css";

import { AuthProvider } from "./utils/AuthContext.js";

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("app")
);
