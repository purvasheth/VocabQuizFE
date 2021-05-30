import { VocabWord } from "../../services/words-service/words-service-types";
export const SET_WORDS = "setWords";
export const VALIDATE_ANSWER = "validateAnswer";
export const SET_NEXT_QUESTION = "setNextQuestion";
export const TOGGLE_IS_BOOKMARKED = "toggleIsBookmarked";

export type State = {
  words: VocabWord[];
  score: number;
  currentWordIndex: number;
  isAnswerSelected: "" | "correct" | "wrong";
  selectedAnswer: null | number;
};

export const initialState: State = {
  words: [],
  score: 0,
  currentWordIndex: 0,
  isAnswerSelected: "",
  selectedAnswer: null,
};

type Action =
  | { type: typeof SET_WORDS; payload: { words: VocabWord[] } }
  | { type: typeof VALIDATE_ANSWER; payload: { selectedAnswer: number } }
  | { type: typeof SET_NEXT_QUESTION }
  | { type: typeof TOGGLE_IS_BOOKMARKED; payload: { wordId: string } };

export function quizReducer(state: State, action: Action): typeof initialState {
  const { words, currentWordIndex, score } = state;
  switch (action.type) {
    case SET_WORDS:
      return {
        ...initialState,
        words: action.payload.words,
      };
    case VALIDATE_ANSWER:
      const {
        payload: { selectedAnswer },
      } = action;
      if (selectedAnswer === words[currentWordIndex].mcq.answer) {
        return {
          ...state,
          isAnswerSelected: "correct",
          score: score + 1,
          selectedAnswer,
          words: words.map((word, i) =>
            i === currentWordIndex ? { ...word, isBookmarked: false } : word
          ),
        };
      }
      return {
        ...state,
        isAnswerSelected: "wrong",
        selectedAnswer,
        words: words.map((word, i) =>
          i === currentWordIndex ? { ...word, isBookmarked: true } : word
        ),
      };
    case SET_NEXT_QUESTION:
      return {
        ...state,
        currentWordIndex: currentWordIndex + 1,
        selectedAnswer: null,
        isAnswerSelected: "",
      };
    case TOGGLE_IS_BOOKMARKED:
      return {
        ...state,
        words: words.map((word) =>
          word._id === action.payload.wordId
            ? { ...word, isBookmarked: !word.isBookmarked }
            : word
        ),
      };
    default:
      return state;
  }
}
