import React, { createContext, ReactElement, ReactNode, useContext, useState } from 'react';

import { useToast } from '@chakra-ui/toast';
import { VocabWord } from '../services/words-service/words-service-types';
import {
  bookmarkWordService,
  removeBookmarkService,
} from '../services/bookmark-service/bookmark-service';
import { useAuth } from './AuthProvider';
import { Dispatcher } from '../pages/Auth/auth-types';

type BookmarkContextType = {
  bookmarkedWords: VocabWord[];
  isLoading: boolean;
  setBookmarkedWords: Dispatcher<VocabWord[]>;
  // eslint-disable-next-line no-unused-vars
  bookmarkWord: (word: VocabWord) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  removeBookmark: (wordId: string) => Promise<boolean>;
};

const BookmarkContext = createContext<BookmarkContextType>({} as BookmarkContextType);

type BookmarkProviderProps = {
  children: ReactNode;
};

export const BookmarkProvider = ({ children }: BookmarkProviderProps): ReactElement => {
  const [bookmarkedWords, setBookmarkedWords] = useState<VocabWord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAuth();
  const toast = useToast();

  const customToast = (message: string) => {
    toast({
      title: 'Error',
      status: 'error',
      description: message,
      isClosable: true,
      duration: 5000,
    });
  };

  async function bookmarkWord(word: VocabWord): Promise<boolean> {
    setIsLoading(true);
    const response = await bookmarkWordService(token, word._id);
    if (response) {
      customToast(response.message);
      return false;
    }
    setBookmarkedWords((prev) => prev.concat(word));
    setIsLoading(false);
    return true;
  }
  async function removeBookmark(wordId: string): Promise<boolean> {
    setIsLoading(true);
    const response = await removeBookmarkService(token, wordId);
    if (response) {
      customToast(response.message);
      return false;
    }
    setBookmarkedWords((prev) => prev.filter(({ _id }) => _id !== wordId));
    setIsLoading(false);
    return true;
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
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

export const useBookmark = (): BookmarkContextType => useContext(BookmarkContext);
