import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  /*------------ States ------------*/
  const [initialLoading, setInitialLoading] = useState(true); // for fetch user
  const [loading, setLoading] = useState(false); // for login , register , logout
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  /*------------ Functions ------------*/

  async function register(userInfo) {
    try {
      const resp = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (!resp.ok) throw new Error("Register failed");
    } catch (err) {
      console.log(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials) {
    // in json-server min credentials are email and pass
    try {
      setLoading(true);
      const resp = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!resp.ok) throw new Error("The information entered is incorrect.");

      const data = await resp.json();

      // save user token in localStorage after success login
      localStorage.setItem("novan-user-token", data.accessToken);
      setUser(data.user);
      return data;
      // return { success: true, message: "Logged in successfully" };
    } catch (err) {
      setError(err.message);
      throw err;
      // return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("novan-user-token");
    setUser(null);
    setToken(null);
  }

  /*---------------- Effects ----------------*/

  useEffect(() => {
    const token = localStorage.getItem("novan-user-token"); // string & null
    if (!token) {
      setInitialLoading(false);
      return;
    }

    // Get user id with jwtDecode package this function extract some information in token string and return as object
    setToken(token);
    const decode = jwtDecode(token);
    const userID = decode.sub;

    async function fetchUser() {
      try {
        setInitialLoading(true);
        const resp = await fetch(`http://localhost:3000/users/${userID}`);

        if (!resp.ok) throw new Error("fetch user info failed");

        const data = await resp.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        setUser(null);
        throw err;
      } finally {
        setInitialLoading(false);
      }
    }

    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ register, login, logout, setUser, user, error, loading, initialLoading, token }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
