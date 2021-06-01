import axios, { AxiosError } from 'axios';
import {
  API_LOGIN,
  API_RESET_PASSWORD,
  API_SELF,
  API_SIGNUP,
} from '../../urls';
import { Token, ServerError, User, Success } from './auth-service-types';
import { authCatchHandler } from './authCatchHandler';

export async function loginService(
  email: string,
  password: string,
): Promise<Token | ServerError> {
  try {
    const response = await axios.post<Token>(API_LOGIN, { email, password });
    return response.data;
  } catch (error) {
    return authCatchHandler(error);
  }
}

export async function signupService(user: User): Promise<Token | ServerError> {
  try {
    const response = await axios.post<Token>(API_SIGNUP, user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError: AxiosError<ServerError> = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { message: 'something is wrong' };
  }
}

export async function resetPasswordService(
  email: string,
  password: string,
): Promise<Success | ServerError> {
  try {
    const response = await axios.post<Success>(API_RESET_PASSWORD, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return authCatchHandler(error);
  }
}
export async function validateTokenService(
  token: string,
): Promise<Success | ServerError> {
  try {
    const response = await axios.get<Success>(API_SELF, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    return authCatchHandler(error);
  }
}
