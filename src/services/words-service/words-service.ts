import axios from 'axios';
import { VocabWord, Count, ServerError, Words } from './words-service-types';
import { API_WORDS, API_WORDS_COUNT } from '../../urls';
import { genericCatchHandler } from './genericCatchHandler';

export async function getCountService(token: string): Promise<Count | ServerError> {
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
  page: string | null | undefined,
): Promise<VocabWord[] | ServerError> {
  try {
    const url = size && page ? `${API_WORDS}?page=${+page}&size=${+size}` : API_WORDS;
    const response = await axios.get<Words>(url, {
      headers: { token },
    });
    return response.data.words;
  } catch (error) {
    return genericCatchHandler(error);
  }
}
