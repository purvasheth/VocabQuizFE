import React, { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heading, Button, Flex } from '@chakra-ui/react';
import { MainContainer } from '../components';

type State = {
  score?: number;
  total?: number;
  setNumber?: string;
  from?: string;
};

export function QuizDone(): ReactElement {
  const { state }: { state: State | null } = useLocation();
  const navigate = useNavigate();
  return (
    <MainContainer>
      <Heading as="h1" m={4}>
        Quiz over!
      </Heading>
      <Heading as="h2" size="md" m={4}>
        {`Score: ${state?.score}/${state?.total}`}
      </Heading>
      {state?.setNumber && (
        <>
          <Flex direction="column" alignItems="flex-start">
            <Button
              colorScheme="blue"
              m={4}
              variant="outline"
              onClick={() => navigate(`/quiz/${state?.setNumber}`)}
            >
              Replay this quiz
            </Button>
            <Button
              colorScheme="blue"
              m={4}
              variant="outline"
              onClick={() => navigate(`/list/list${state?.setNumber?.slice(4)}`)}
            >
              See list for this set
            </Button>
          </Flex>
        </>
      )}
      {state?.from && (
        <Button
          colorScheme="blue"
          m={4}
          variant="outline"
          onClick={() => navigate('/revise-words', { state: { from: 'revise-words' } })}
        >
          Keep revising words
        </Button>
      )}
      <Button colorScheme="blue" m={4} onClick={() => navigate('/')}>
        Practice another set
      </Button>
    </MainContainer>
  );
}
