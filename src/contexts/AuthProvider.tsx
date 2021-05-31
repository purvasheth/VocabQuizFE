import React, { createContext, ReactElement, ReactNode, useContext, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import {
  loginService,
  signupService,
  resetPasswordService,
} from '../services/auth-service/auth-service';
import { ServerError, User } from '../services/auth-service/auth-service-types';
import { Dispatcher } from '../pages/Auth/auth-types';

type AuthContextType = {
  token: string;
  // eslint-disable-next-line no-unused-vars
  loginUser: (email: string, password: string) => Promise<boolean | ServerError>;
  // eslint-disable-next-line no-unused-vars
  resetPassword: (email: string, password: string) => Promise<boolean | ServerError>;
  // eslint-disable-next-line no-unused-vars
  signupUser: (user: User) => Promise<boolean | ServerError>;
  logoutUser: () => void;
  setToken: Dispatcher<string>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [token, setToken] = useState<string>('');
  const toast = useToast();

  async function loginUser(email: string, password: string): Promise<boolean | ServerError> {
    const response = await loginService(email, password);
    if ('errors' in response) {
      return { errors: response.errors };
    }
    if ('token' in response) {
      setToken(response.token);
      if (localStorage) {
        localStorage.setItem('token', response.token);
      }
      return true;
    }
    if ('message' in response) {
      toast({
        title: 'Error',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    return false;
  }
  async function resetPassword(email: string, password: string): Promise<boolean | ServerError> {
    const response = await resetPasswordService(email, password);
    if ('errors' in response) {
      return { errors: response.errors };
    }
    if (response?.message && response.message === 'success') {
      return true;
    }
    toast({
      title: 'Error',
      description: response.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return false;
  }

  async function signupUser(user: User): Promise<boolean | ServerError> {
    const response = await signupService(user);
    if ('errors' in response) {
      return { errors: response.errors };
    }
    if ('token' in response) {
      setToken(response.token);
      if (localStorage) {
        localStorage.setItem('token', response.token);
      }
      return true;
    }
    if ('message' in response) {
      toast({
        title: 'Error',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    return false;
  }

  function logoutUser(): void {
    setToken('');
    if (localStorage) {
      localStorage.removeItem('token');
    }
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

export const useAuth = (): AuthContextType => useContext(AuthContext);
