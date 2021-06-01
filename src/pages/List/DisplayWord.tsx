import React, { ReactElement } from 'react';
import { Heading, Box, Text, Flex } from '@chakra-ui/react';
import { SaveButton } from '../../components';
import { VocabWord } from '../../services/words-service/words-service-types';
import { TOGGLE_IS_BOOKMARKED } from '../../contexts/quiz-context/quiz-reducer';
import { useBookmark, useQuiz } from '../../contexts';

type DisplayWordProps = {
  word: VocabWord;
};

export function DisplayWord({ word }: DisplayWordProps): ReactElement {
  const { dispatch } = useQuiz();
  const {
    bookmarkWord,
    bookmarkedWords,
    removeBookmark,
    isLoading: disabledButton,
  } = useBookmark();

  const toggleBookmarkedWord = async () => {
    let success = true;
    if (bookmarkedWords.find(({ _id }) => _id === word._id)) {
      success = await removeBookmark(word._id);
    } else {
      success = await bookmarkWord(word);
    }
    if (success) {
      dispatch({
        type: TOGGLE_IS_BOOKMARKED,
        payload: { wordId: word._id },
      });
    }
  };

  return (
    <div>
      <Flex mb={2}>
        <Heading as="h3" size="md" pt={1.5} mr={2}>
          {word.word}
        </Heading>
        <SaveButton
          isSelected={word.isBookmarked}
          onClick={toggleBookmarkedWord}
          disabled={disabledButton}
        />
      </Flex>
      {word.details.map(({ type, meaning, sentence, _id }) => (
        <Box mb={4} key={_id}>
          <Text color="blue.500" fontWeight="semibold">
            {`${type} ${meaning}`}
          </Text>
          <Text>{sentence}</Text>
        </Box>
      ))}
    </div>
  );
}
