// src: https://usehooks.com/useAuth/
import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";

import {
  signUpUser,
  signInUser,
  signOutUser,
  authenticateUser,
  getCurrentUser,
} from "utils/firebase";

const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthenticationContext.Provider value={auth}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};

// Provider hook that creates Authentication object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return signInUser(email, password)
      .then((response) => {
        setUser(response.user);
      })
      .catch(err => err);
  };
  const signup = (email, password) => {
    return signUpUser(email, password)
      .then((response) => {
        setUser(response.user);
        return;
      })
      .catch(err => err);
  };
  const signout = () => {
    return signOutUser().then(() => {
      setUser(false);
    });
  };

  useEffect(() => {
    const unsubscribe = authenticateUser(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      } else {
        setUser(false);
        nookies.set(undefined, "token", "", { path: "/" });
      }
    });

    return () => unsubscribe();
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = getCurrentUser();
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
  };
}
