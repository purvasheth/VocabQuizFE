import React, { useEffect, useState } from "react";
import {
  Heading,
  Grid,
  Button,
  Flex,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { SetCard } from "./SetCard";
import { MainContainer } from "../../components";
import { useNavigate } from "react-router";
import { useAuth, useBookmark } from "../../contexts";
import { SET_SIZE } from "./constants";
import { getCountService } from "../../services/words-service/words-service";
import { getBookmarkedWords } from "../../services/bookmark-service/bookmark-service";

function getNumberOfSets(count: number): number {
  return count > 0 ? count / SET_SIZE : 0;
}

function formSets(noOfSets: number): number[] {
  return Array.from(Array(noOfSets).keys());
}

export function Home() {
  const navigate = useNavigate();
  const { logoutUser, token } = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const { bookmarkedWords, setBookmarkedWords } = useBookmark();

  const customToast = (message: string) => {
    toast({
      title: "Error",
      status: "error",
      description: message,
      isClosable: true,
      duration: 5000,
    });
  };

  const loadWordCount = async () => {
    setIsLoading(true);
    const response = await getCountService(token);
    if ("count" in response) {
      setCount(response.count);
    }
    if ("message" in response) {
      customToast(response.message);
    }
    setIsLoading(false);
  };
  const loadBookmarkedWords = async () => {
    if (bookmarkedWords.length === 0) {
      setIsLoading(true);
      const response = await getBookmarkedWords(token);
      if ("message" in response) {
        customToast(response.message);
      } else {
        setBookmarkedWords(response);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadWordCount();
    loadBookmarkedWords();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
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
                navigate("/revise-words", { state: { from: "revise-words" } });
              }}
            >
              Revise Words
            </Button>
            <Button
              ml={2}
              colorScheme="blue"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
        </Flex>
      </Heading>
      {isLoading ? (
        <Spinner size="xl" m={8} />
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
          {formSets(getNumberOfSets(count)).map((index) => (
            <SetCard key={index} setNumber={index} />
          ))}
        </Grid>
      )}
    </MainContainer>
  );
}
