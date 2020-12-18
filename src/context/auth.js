import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import { useApolloClient } from "@apollo/client";

export const AuthContext = createContext({
  id: "",
  first_name: "",
  last_name: "",
  login: (token) => {},
  logout: () => {}
});

const initialState = { id: "", first_name: "", last_name: "" };

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name
      };
    case "LOGOUT":
      return {
        ...state,
        id: "",
        first_name: "",
        last_name: ""
      };
    default:
      break;
  }
};

export const AuthProvider = ({ children }) => {
  const client = useApolloClient();
  const [state, dispatch] = useReducer(authReducer, initialState);

  if (localStorage.getItem("jwtToken") && state.id === "") {
    const token = localStorage.getItem("jwtToken");
    const { exp } = jwtDecode(token);
    if (Date.now() < exp * 1000) {
      login(token);
    }
  }

  function login(token) {
    localStorage.setItem("jwtToken", token);
    const { id, first_name, last_name } = jwtDecode(token);
    dispatch({
      type: "LOGIN",
      payload: { id, first_name, last_name }
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    client.clearStore();
    dispatch({
      type: "LOGOUT"
    });
  }

  return (
    <AuthContext.Provider
      value={{ id: state.id, first_name: state.first_name, last_name: state.last_name, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
