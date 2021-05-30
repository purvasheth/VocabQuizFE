import React from "react";
import { Heading, Box, Text, Flex } from "@chakra-ui/react";
import { SaveButton } from "../../components";
import { VocabWord } from "../../services/words-service/words-service-types";
import { TOGGLE_IS_BOOKMARKED } from "../../contexts/quiz-context/quiz-reducer";
import { useBookmark, useQuiz } from "../../contexts";

type DisplayWordProps = {
  word: VocabWord;
};

export function DisplayWord({ word }: DisplayWordProps) {
  const { dispatch } = useQuiz();
  const { bookmarkWord, bookmarkedWords, removeBookmark } = useBookmark();

  const toggleBookmarkedWord = async () => {
    let failure = "";
    if (bookmarkedWords.find(({ _id }) => _id === word._id)) {
      failure = await removeBookmark(word._id);
    } else {
      failure = await bookmarkWord(word);
    }
    if (!failure) {
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
        />
      </Flex>
      {word.details.map(({ type, meaning, sentence, _id }) => (
        <Box mb={4} key={_id}>
          <Text color="blue.500" fontWeight="semibold">
            {type} {meaning}
          </Text>
          <Text>{sentence}</Text>
        </Box>
      ))}
    </div>
  );
}
