import { SET_WORDS } from "../../contexts/quiz-context/quiz-reducer";
import { VocabWord } from "../../services/words-service/words-service-types";

export function selectSet(
  words: VocabWord[],
  setNumber: number,
  length: number = 10
): VocabWord[] {
  return words.slice((setNumber - 1) * length, setNumber * length);
}

// copied from https://bost.ocks.org/mike/shuffle/
function shuffle(array: any[]) {
  let max = array.length,
    temp,
    index;
  // While there remain elements to shuffle…
  while (max) {
    // Pick a remaining element…
    index = Math.floor(Math.random() * max--);
    // And swap it with the current element.
    temp = array[max];
    array[max] = array[index];
    array[index] = temp;
  }
  return array;
}

export function getRandomWords(words: VocabWord[], count: number) {
  const shuffledWords = shuffle(words);
  return shuffledWords.slice(0, count);
}

export function isPresentInBookmarkedWords(
  bookmarkedWords: VocabWord[],
  wordId: string
) {
  return !!bookmarkedWords.find((word) => word._id === wordId);
}

export function setIsBookmarked(
  words: VocabWord[],
  bookmarkedWords: VocabWord[]
) {
  return words.map((word) => ({
    ...word,
    isBookmarked: isPresentInBookmarkedWords(bookmarkedWords, word._id),
  }));
}

export function clearWordsState(dispatch: Function) {
  dispatch({
    type: SET_WORDS,
    payload: { words: [] },
  });
}
