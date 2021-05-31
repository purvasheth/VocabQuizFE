import React, { ReactElement } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

type SaveButtonProps = {
  isSelected: boolean;
  onClick: () => void;
};

export function SaveButton({ isSelected, onClick }: SaveButtonProps): ReactElement {
  return isSelected ? (
    <IconButton
      onClick={() => onClick()}
      variant="ghost"
      aria-label="Unbookmark word"
      icon={<BsBookmarkFill />}
      color="orange.500"
      fontSize="1.5rem"
    />
  ) : (
    <IconButton
      onClick={() => onClick()}
      variant="ghost"
      aria-label="bookmark word"
      icon={<BsBookmark />}
      fontSize="1.5rem"
    />
  );
}
