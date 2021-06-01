import React, { createContext, ReactElement, ReactNode, useContext, useReducer } from 'react';
import { initialState, quizReducer, State, Action } from './quiz-reducer';

type QuizContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

type QuizProviderProps = {
  children: ReactNode;
};

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

export function QuizProvider({ children }: QuizProviderProps): ReactElement {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
}

export function useQuiz(): QuizContextType {
  return useContext(QuizContext);
}
