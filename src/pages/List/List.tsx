import React, { useState, useEffect, ReactElement } from 'react';
import { Stack, Heading, Flex, Button, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingIndicator, MainContainer } from '../../components';
import { useAuth, useBookmark, useQuiz } from '../../contexts';

import { SET_WORDS } from '../../contexts/quiz-context/quiz-reducer';
import { DisplayWord } from './DisplayWord';
import { getWordsService } from '../../services/words-service/words-service';
import { SET_SIZE } from '../Home/constants';
import { clearWordsState, setIsBookmarked } from '../Quiz/quiz-utils';

export function List(): ReactElement {
  const { setNumber } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const { words } = state;
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { bookmarkedWords } = useBookmark();
  const toast = useToast();

  const loadWords = async () => {
    setIsLoading(true);
    const response = await getWordsService(token, SET_SIZE, String(+setNumber.slice(4) - 1));
    if ('message' in response) {
      toast({
        title: 'Error',
        description: response.message,
        status: 'error',
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

  useEffect(() => {
    loadWords();
    return () => {
      clearWordsState(dispatch);
    };
  }, []);

  return (
    <MainContainer>
      <Flex justify="space-between" wrap="wrap-reverse" mt={4}>
        <Heading as="h1" ml={0}>
          {`List ${setNumber.slice(4)}`}
        </Heading>
        <Button colorScheme="blue" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Flex>
      <LoadingIndicator isLoading={isLoading || words.length === 0}>
        <Stack direction="column">
          {words.map((word) => (
            <DisplayWord key={word._id} word={word} />
          ))}
        </Stack>
      </LoadingIndicator>
    </MainContainer>
  );
}
