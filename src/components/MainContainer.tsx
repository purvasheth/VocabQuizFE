import { Container } from "@chakra-ui/react";
import React from "react";

type MainConatinerProps = {
  children: React.ReactNode;
};

export function MainContainer({ children }: MainConatinerProps) {
  return (
    <Container maxW="container.lg" m="auto" width="80%">
      {children}
    </Container>
  );
}
