import React from "react";
import { Heading, Button } from "@chakra-ui/react";
import { Card } from "../../components";
import { useNavigate } from "react-router-dom";

type SetCardProps = {
  setNumber: number;
};

export function SetCard({ setNumber }: SetCardProps) {
  const navigate = useNavigate();
  return (
    <Card>
      <Heading as="h2" size="lg" textAlign="center" mb={4}>
        Set {setNumber + 1}
      </Heading>
      <Button
        colorScheme="blue"
        variant="outline"
        alignSelf="center"
        onClick={() => navigate(`list/list${setNumber + 1}`)}
      >
        Read the List
      </Button>
      <Button
        colorScheme="blue"
        alignSelf="center"
        my={4}
        onClick={() => navigate(`quiz/quiz${setNumber + 1}`)}
      >
        Take the Quiz
      </Button>
    </Card>
  );
}
