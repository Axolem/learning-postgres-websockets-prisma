import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

// Create the authentication context
export const AuthContext = createContext();

// Create a custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Implement your authentication logic, such as login, logout, etc.

  const URL = "http://localhost:3001/api/auth/";

  const login = async (username, password) => {

    const data = JSON.stringify({ username, password });

    fetch(`${URL}authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        setUser(res);
      }
      )
      .catch((error) => {
        console.error("Error:", error.message)
      });
  }

  const signup = async (username, password) => {

    const data = JSON.stringify({ username, password });

    fetch(`${URL}create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        setUser(res);
      }
      )
      .catch((error) => {
        console.error("Error:", error.message)
      });
  }

  const doUserAuth = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      return;
    }
    let data = JSON.parse(user);
    data.scope = "verify";

    data = JSON.stringify(data);

    fetch(`${URL}authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }).then((res) => {
      if (res.valid) {
        setUser(JSON.parse(user));
      }
    }).catch((error) => {
      console.error("Error:", error.message)
    });
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, doUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
