import React, { ReactElement } from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';
import { useBookmark, useQuiz } from '../../contexts';
import { VALIDATE_ANSWER } from '../../contexts/quiz-context/quiz-reducer';

export function DisplayQuestion(): ReactElement {
  const { state, dispatch } = useQuiz();
  const { isAnswerSelected, selectedAnswer, words, currentWordIndex } = state;
  const { bookmarkedWords, bookmarkWord, removeBookmark } = useBookmark();
  function setColor(index: number): string {
    if (isAnswerSelected) {
      switch (index) {
        case words[currentWordIndex].mcq.answer:
          return 'green';
        case selectedAnswer:
          return 'red';
        default:
          return 'gray';
      }
    }
    return 'gray';
  }
  function setVariant(index: number): string {
    if (isAnswerSelected) {
      return index === selectedAnswer || index === words[currentWordIndex].mcq.answer
        ? 'solid'
        : 'outline';
    }
    return 'outline';
  }

  const validateAnswer = async (answer: number) => {
    dispatch({
      type: VALIDATE_ANSWER,
      payload: { selectedAnswer: answer },
    });
    const word = words[currentWordIndex];
    if (bookmarkedWords.find(({ _id }) => _id === word._id) && answer === word.mcq.answer) {
      await removeBookmark(word._id);
    } else if (!bookmarkedWords.find(({ _id }) => _id === word._id) && answer !== word.mcq.answer) {
      await bookmarkWord(word);
    }
  };

  return (
    <Flex direction="column">
      {words[currentWordIndex].mcq.options.map((option, i) => (
        <Button
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          whiteSpace="normal"
          height="auto"
          py={3}
          colorScheme={setColor(i)}
          variant={setVariant(i)}
          justifyContent="flex-start"
          onClick={() => validateAnswer(i)}
          disabled={!!isAnswerSelected}
          _disabled={{ opacity: 1, cursor: 'no-drop' }}
          m={2}
        >
          <Text textAlign="left">{option}</Text>
        </Button>
      ))}
    </Flex>
  );
}
