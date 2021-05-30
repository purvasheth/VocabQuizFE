import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { ReactChild } from "react";
import { PasswordInputProps } from "./PasswordInput";

type LeftIconInputProps = PasswordInputProps & {
  icon: ReactChild;
  type: "text" | "email";
};
export function LeftIconInput({
  value,
  setValue,
  placeholder,
  icon,
  type,
  error,
}: LeftIconInputProps) {
  return (
    <Stack>
      <InputGroup>
        <InputLeftElement color="gray.400" children={icon} />
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          isInvalid={!!error}
          onChange={(e) => setValue(e.target.value)}
        />
      </InputGroup>
      <Text color="red.500" fontSize="sm">
        {error}
      </Text>
    </Stack>
  );
}
