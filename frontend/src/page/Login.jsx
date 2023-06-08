import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "preact-router/match";

import { Card } from "primereact/card";
import { useEffect, useState } from "preact/hooks";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ loading, setLoading ] = useState(false);

  const { login, doUserAuth } = useAuth();

  const handleLogin =async () => {
    setLoading(true);
    // null check
    if (!username || !password) {
        setLoading(false);
      return;
    }

    // login
     login(username, password);
    setLoading(false);
  };

  useEffect(() => {
    // redirect to home if already logged in
    doUserAuth();
  }, []);

  return (
    <div className="login-page">
      <Card title="Login">
        <img src="path_to_image" alt="Logo" className="logo-image" />

        <div className="flex flex-column gap-2">
          <label htmlFor="username">Username:</label>
          <InputText
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            aria-describedby="username-help"
            type="text"
            autoComplete="user-name"
          />
          <small id="username-help">Enter your username to pocced.</small>
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="password">Password:</label>
          <InputText
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            aria-describedby="password-help"
            type="password"
            autoComplete="current-password"
          />
          <small id="password-help">Enter your correct password.</small>
        </div>

        <Button label="Proced" rounded onClick={handleLogin} loading={loading}/>

        <Link href="/signup">Signup</Link>
      </Card>
    </div>
  );
};

export default Login;
