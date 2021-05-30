import React, { createContext, ReactNode, useContext } from "react";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { VocabWord } from "../services/words-service/words-service-types";
import {
  bookmarkWordService,
  removeBookmarkService,
} from "../services/bookmark-service/bookmark-service";
import { useAuth } from "./AuthProvider";

type BookmarkContextType = {
  bookmarkedWords: VocabWord[];
  setBookmarkedWords: Function;
  bookmarkWord: Function;
  removeBookmark: Function;
};

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarkedWords: [],
  bookmarkWord: () => {},
  removeBookmark: () => {},
  setBookmarkedWords: () => {},
});

type BookmarkProviderProps = {
  children: ReactNode;
};

export const BookmarkProvider = ({ children }: BookmarkProviderProps) => {
  const [bookmarkedWords, setBookmarkedWords] = useState<VocabWord[]>([]);
  const { token } = useAuth();
  const toast = useToast();

  const customToast = (message: string) => {
    toast({
      title: "Error",
      status: "error",
      description: message,
      isClosable: true,
      duration: 5000,
    });
  };

  const bookmarkWord = async (word: VocabWord) => {
    const response = await bookmarkWordService(token, word._id);
    if (response) {
      customToast(response.message);
      return "error";
    }
    setBookmarkedWords((prev) => prev.concat(word));
  };
  const removeBookmark = async (wordId: string) => {
    const response = await removeBookmarkService(token, wordId);
    if (response) {
      customToast(response.message);
      return "error";
    }
    setBookmarkedWords((prev) => prev.filter(({ _id }) => _id !== wordId));
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedWords,
        bookmarkWord,
        removeBookmark,
        setBookmarkedWords,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  return useContext(BookmarkContext);
};
