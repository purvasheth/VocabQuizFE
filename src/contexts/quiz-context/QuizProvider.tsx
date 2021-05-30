import React from "react";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { initialState, quizReducer, State } from "./quiz-reducer";

type QuizContextType = {
  state: State;
  dispatch: Function;
};

type QuizProviderProps = {
  children: ReactNode;
};

const QuizContext = createContext<QuizContextType>({
  state: initialState,
  dispatch: () => {},
});

export function QuizProvider({ children }: QuizProviderProps) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
