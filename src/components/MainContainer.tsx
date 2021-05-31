import { Container } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

type MainContainerProps = {
  children: React.ReactNode;
};

export function MainContainer({ children }: MainContainerProps): ReactElement {
  return (
    <Container maxW="container.lg" m="auto" width="80%">
      {children}
    </Container>
  );
}
