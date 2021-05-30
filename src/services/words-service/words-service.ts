import axios, { AxiosError } from "axios";
import { VocabWord } from "./words-service-types";
import { API_WORDS, API_WORDS_COUNT } from "../../urls";
import { Count, ServerError, Words } from "./words-service-types";

export async function getCountService(
  token: string
): Promise<Count | ServerError> {
  try {
    const response = await axios.get<Count>(API_WORDS_COUNT, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    return genericCatchHandler(error);
  }
}

export async function getWordsService(
  token: string,
  size: number | null | undefined,
  page: string | null | undefined
): Promise<VocabWord[] | ServerError> {
  try {
    const url =
      size && page ? `${API_WORDS}?page=${+page}&size=${+size}` : API_WORDS;
    const response = await axios.get<Words>(url, {
      headers: { token },
    });
    return response.data.words;
  } catch (error) {
    return genericCatchHandler(error);
  }
}

export function genericCatchHandler(error: Error) {
  if (axios.isAxiosError(error)) {
    const serverError: AxiosError<ServerError> = error;
    if (serverError && serverError.response) {
      return serverError.response.data;
    }
  }
  return { message: "something is wrong" };
}
