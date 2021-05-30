import React, { createContext, ReactNode, useContext } from "react";
import {
  loginService,
  signupService,
  resetPasswordService,
} from "../services/auth-service/auth-service";
import { User } from "../services/auth-service/auth-service-types";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";

type AuthContextType = {
  token: string;
  loginUser: Function;
  resetPassword: Function;
  signupUser: Function;
  logoutUser: Function;
  setToken: Function;
};

const AuthContext = createContext<AuthContextType>({
  token: "",
  loginUser: () => {},
  signupUser: () => {},
  resetPassword: () => {},
  logoutUser: () => {},
  setToken: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>("");
  const toast = useToast();

  async function loginUser(email: string, password: string) {
    const response = await loginService(email, password);
    if ("errors" in response) {
      return { errors: response.errors };
    }
    if ("token" in response) {
      setToken(response.token);
      localStorage && localStorage.setItem("token", response.token);
    }
    if ("message" in response) {
      toast({
        title: "Error",
        description: response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  async function resetPassword(email: string, password: string) {
    const response = await resetPasswordService(email, password);
    if ("errors" in response) {
      return { errors: response.errors };
    }
    if (response?.message && response.message === "success") {
      return response;
    }
    toast({
      title: "Error",
      description: response.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  async function signupUser(user: User) {
    const response = await signupService(user);
    if ("errors" in response) {
      return { errors: response.errors };
    }
    if ("token" in response) {
      setToken(response.token);
      localStorage && localStorage.setItem("token", response.token);
    }
    if ("message" in response) {
      toast({
        title: "Error",
        description: response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function logoutUser() {
    setToken("");
    localStorage && localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        loginUser,
        signupUser,
        resetPassword,
        logoutUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
