import React from "react";
import { Heading } from "@chakra-ui/react";

type ScoreProps = {
  correct: number;
  total: number;
};
export function Score({ correct, total }: ScoreProps) {
  return (
    <Heading as="h3" size="md" mt={4} alignSelf="center">
      Score: {correct}/{total}
    </Heading>
  );
}
