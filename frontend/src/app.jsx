import "./app.css";

import Router, { Route } from "preact-router";

import Login from "./page/Login";
import Signup from "./page/Signup";
import Home from "./page/Home";

import { useAuth } from "./utils/AuthContext";

export function App() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Router>
          <Route path="/" component={Home} />
        </Router>
      ) : (
        <Router>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
        </Router>
      )}
    </>
  );
}
