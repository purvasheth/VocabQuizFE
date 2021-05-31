import React from 'react';
import { SET_WORDS, Action } from '../../contexts/quiz-context/quiz-reducer';
import { VocabWord } from '../../services/words-service/words-service-types';

export function selectSet(words: VocabWord[], setNumber: number, length = 10): VocabWord[] {
  return words.slice((setNumber - 1) * length, setNumber * length);
}

// copied from https://bost.ocks.org/mike/shuffle/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffle(array: any[]) {
  let max = array.length;
  let temp;
  let index;
  // While there remain elements to shuffle…
  const shuffledArray = array;
  while (max) {
    // Pick a remaining element…
    // eslint-disable-next-line no-plusplus
    index = Math.floor(Math.random() * max--);
    // And swap it with the current element.
    temp = shuffledArray[max];
    shuffledArray[max] = array[index];
    shuffledArray[index] = temp;
  }
  return shuffledArray;
}

export function getRandomWords(words: VocabWord[], count: number): VocabWord[] {
  const shuffledWords = shuffle(words);
  return shuffledWords.slice(0, count);
}

export function isPresentInBookmarkedWords(bookmarkedWords: VocabWord[], wordId: string): boolean {
  return !!bookmarkedWords.find((word) => word._id === wordId);
}

export function setIsBookmarked(words: VocabWord[], bookmarkedWords: VocabWord[]): VocabWord[] {
  return words.map((word) => ({
    ...word,
    isBookmarked: isPresentInBookmarkedWords(bookmarkedWords, word._id),
  }));
}

export function clearWordsState(dispatch: React.Dispatch<Action>): void {
  dispatch({
    type: SET_WORDS,
    payload: { words: [] },
  });
}
