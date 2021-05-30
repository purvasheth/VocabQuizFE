import axios from "axios";
import { VocabWord } from "../words-service/words-service-types";
import { API_BOOKMARKED } from "../../urls";
import { genericCatchHandler } from "../words-service/words-service";
import { ServerError } from "../words-service/words-service-types";
import { BookMarkedWords } from "./bookmark-service-types";

export async function getBookmarkedWords(
  token: string
): Promise<VocabWord[] | ServerError> {
  try {
    const response = await axios.get<BookMarkedWords>(API_BOOKMARKED, {
      headers: { token },
    });
    return response.data.words;
  } catch (error) {
    return genericCatchHandler(error);
  }
}

export async function bookmarkWordService(
  token: string,
  wordId: string
): Promise<undefined | ServerError> {
  try {
    const response = await axios.post(
      `${API_BOOKMARKED}/${wordId}`,
      {},
      {
        headers: { token },
      }
    );
    if (response.status !== 201) {
      return { message: "failed to bookmark word" };
    }
  } catch (error) {
    return genericCatchHandler(error);
  }
}

export async function removeBookmarkService(
  token: string,
  wordId: string
): Promise<undefined | ServerError> {
  try {
    const response = await axios.delete(`${API_BOOKMARKED}/${wordId}`, {
      headers: { token },
    });
    if (response.status !== 204) {
      return { message: "failed to remove bookmark from word" };
    }
  } catch (error) {
    return genericCatchHandler(error);
  }
}
