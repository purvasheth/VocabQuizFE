import React, { ReactElement, useEffect, useState } from 'react';
import { Heading, Grid, Button, Flex, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SetCard } from './SetCard';
import { LoadingIndicator, MainContainer } from '../../components';
import { useAuth, useBookmark } from '../../contexts';
import { getCountService } from '../../services/words-service/words-service';
import { getBookmarkedWords } from '../../services/bookmark-service/bookmark-service';
import { formSets, getNumberOfSets } from './home-utils';

export function Home(): ReactElement {
  const navigate = useNavigate();
  const { logoutUser, token } = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const { bookmarkedWords, setBookmarkedWords } = useBookmark();

  const customToast = (message: string): void => {
    toast({
      title: 'Error',
      status: 'error',
      description: message,
      isClosable: true,
      duration: 5000,
    });
  };

  const loadWordCount = async () => {
    setIsLoading(true);
    const response = await getCountService(token);
    if ('count' in response) {
      setCount(response.count);
    }
    if ('message' in response) {
      customToast(response.message);
    }
    setIsLoading(false);
  };
  const loadBookmarkedWords = async () => {
    setIsLoading(true);
    const response = await getBookmarkedWords(token);
    if ('message' in response) {
      customToast(response.message);
    } else {
      setBookmarkedWords(response);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    loadWordCount();
    if (bookmarkedWords.length === 0) {
      loadBookmarkedWords();
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <MainContainer>
      <Heading as="h1" m={4} ml={0}>
        <Flex justifyContent="space-between" wrap="wrap-reverse">
          Practice Words
          <Flex wrap="wrap" mb={4}>
            <Button
              colorScheme="blue"
              onClick={() => {
                navigate('/revise-words', { state: { from: 'revise-words' } });
              }}
            >
              Revise Words
            </Button>
            <Button ml={2} colorScheme="blue" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
        </Flex>
      </Heading>
      <LoadingIndicator isLoading={isLoading}>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
          {formSets(getNumberOfSets(count)).map((index) => (
            <SetCard key={index} setNumber={index} />
          ))}
        </Grid>
      </LoadingIndicator>
    </MainContainer>
  );
}
