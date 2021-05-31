import axios, { AxiosError } from 'axios';
import { ServerError } from './words-service-types';

export function genericCatchHandler(error: Error): ServerError {
  if (axios.isAxiosError(error)) {
    const serverError: AxiosError<ServerError> = error;
    if (serverError && serverError.response) {
      return serverError.response.data;
    }
  }
  return { message: 'something is wrong' };
}
