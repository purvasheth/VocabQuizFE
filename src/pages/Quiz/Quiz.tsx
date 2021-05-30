import React, { useState, useEffect } from "react";
import {
  Heading,
  Box,
  Flex,
  Button,
  Spinner,
  useToast,
  Text,
} from "@chakra-ui/react";
import { MainContainer } from "../../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DisplayWord } from "../List";
import { useAuth, useBookmark, useQuiz } from "../../contexts";
import {
  SET_NEXT_QUESTION,
  SET_WORDS,
} from "../../contexts/quiz-context/quiz-reducer";
import { Score } from "./Score";
import { DisplayQuestion } from "./DisplayQuestion";
import { getWordsService } from "../../services/words-service/words-service";
import { SET_SIZE } from "../Home/constants";
import { VocabWord } from "../../services/words-service/words-service-types";
import { clearWordsState, getRandomWords, setIsBookmarked } from "./quiz-utils";

type State = {
  from?: string;
};

export function Quiz() {
  const { setNumber } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const { currentWordIndex, score, words, isAnswerSelected } = state;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { bookmarkedWords } = useBookmark();
  const { token } = useAuth();
  const toast = useToast();
  const routerState: State | null | undefined = useLocation().state;

  const loadWords = async () => {
    const response = await getWordsService(
      token,
      SET_SIZE,
      String(+setNumber.slice(4) - 1)
    );
    if ("message" in response) {
      toast({
        title: "Error",
        description: response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      dispatch({
        type: SET_WORDS,
        payload: { words: setIsBookmarked(response, bookmarkedWords) },
      });
    }
    setIsLoading(false);
  };

  const setBookmarkedWords = () => {
    dispatch({
      type: SET_WORDS,
      payload: { words: getRandomWords(bookmarkedWords, SET_SIZE) },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (routerState?.from === "revise-words") {
      setBookmarkedWords();
    } else {
      loadWords();
    }
    return () => {
      clearWordsState(dispatch);
    };
  }, []);

  return (
    <MainContainer>
      <Flex justify="space-between" wrap="wrap-reverse" mt={4}>
        <Heading as="h1" ml={0}>
          {routerState?.from === "revise-words"
            ? "Random Quiz (bookmarked words)"
            : `Quiz ${setNumber.slice(4)}`}
        </Heading>
        <Button colorScheme="blue" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Flex>
      {isLoading ? (
        <Spinner size="xl" m={4} />
      ) : words.length === 0 ? (
        <Text> There are no words to revise </Text>
      ) : (
        <>
          <Flex justify="flex-end">
            <Score correct={score} total={words.length} />
          </Flex>
          <Heading as="h3" size="md" alignSelf="center" m={4}>
            {currentWordIndex + 1}. Select the most appropriate meaning for
            <Box ml={1} display="inline" color="blue.500">
              {words[currentWordIndex].word}
            </Box>
          </Heading>
          <DisplayQuestion />
          {isAnswerSelected === "wrong" && (
            <Box mt={4} m={2}>
              <DisplayWord word={words[currentWordIndex]} />
            </Box>
          )}
          {isAnswerSelected && (
            <Button
              m={2}
              colorScheme="blue"
              onClick={() => {
                if (words && currentWordIndex !== words.length - 1) {
                  dispatch({ type: SET_NEXT_QUESTION });
                } else {
                  navigate("/quiz-done", {
                    state: {
                      score,
                      setNumber,
                      from: routerState?.from,
                      total: Math.min(words.length, SET_SIZE),
                    },
                  });
                }
              }}
            >
              Next Question
            </Button>
          )}
        </>
      )}
    </MainContainer>
  );
}
