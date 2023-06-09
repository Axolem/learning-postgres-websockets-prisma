import { createContext } from 'preact';
import { Toast } from "primereact/toast";
import { useRouter } from "preact-router";
import { useContext, useRef, useState } from 'preact/hooks';

// Create the authentication context
export const AuthContext = createContext();

// Create a custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
        show("success", "Login Successful")
        setUser(res);
      }
      )
      .catch((error) => {
        show("error", "Login Failed")
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
        show("success", "Signup Successful")
        setUser(res);
        doRedirect()
      }
      )
      .catch((error) => {
        show("error", "Signup Failed")
        console.error("Error:", error.message)
      });
  }

  const doRedirect = () => {
    useRouter().push("/");
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
      if (!res.valid) {
        return;
      }
      show("success", "Login Successful")
      setUser(JSON.parse(user));
      doRedirect()
    }).catch((error) => {
      console.error("Error:", error.message)
    });
  }

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    show("success", "Logout Successful")
    doRedirect()
  }

  const toast = useRef(null);

  const show = (state, massage) => {
    toast.current.show({
      severity: state,
      summary: massage,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, doUserAuth, logout }}>
      <Toast ref={toast} />
      {children}
    </AuthContext.Provider>
  );
};
