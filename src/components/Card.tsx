import React, { ReactElement } from 'react';
import { Flex } from '@chakra-ui/react';

type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps): ReactElement {
  return (
    <Flex width="3xs" boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)" p={4} direction="column">
      {children}
    </Flex>
  );
}
