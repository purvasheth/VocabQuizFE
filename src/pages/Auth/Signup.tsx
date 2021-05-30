import {
  Heading,
  Stack,
  Button,
  Flex,
  Box,
  Text,
  Link,
  Container,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { MainContainer } from "../../components";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import { LeftIconInput, PasswordInput } from "./components";
import { REQUIRED } from "./constants";
import { useAuth } from "../../contexts";
import { checkField, checkPasswords, validatePatterns } from "./auth-utils";
import { State } from "./auth-types";

const initialErrorState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

export function Signup() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] =
    useState<typeof initialErrorState>(initialErrorState);
  const { signupUser } = useAuth();
  const state: State | null | undefined = useLocation().state;
  const navigate = useNavigate();
  useEffect(() => {
    checkPasswords(password, confirmPassword, setErrors);
  }, [confirmPassword, password]);

  const validateRequiredFields = () => {
    const emailFailure = checkField("email", email, setErrors);
    const passwordFailure = checkField("password", password, setErrors);
    const confirmPasswordFailure = checkField(
      "confirmPassword",
      confirmPassword,
      setErrors
    );
    const firstNameFailure = checkField("firstName", firstName, setErrors);
    return emailFailure || passwordFailure || confirmPasswordFailure;
  };

  const handleSignup = async () => {
    setErrors(initialErrorState);
    const isRequiredFailure = validateRequiredFields();
    const isPatternValid = validatePatterns(email, password, setErrors);
    if (!isRequiredFailure && isPatternValid) {
      const response = await signupUser({
        email,
        password,
        firstName,
        lastName,
      });
      if (response) {
        "errors" in response && setErrors(response.errors);
      } else {
        state?.from ? navigate(state.from) : navigate("/");
      }
    }
  };

  return (
    <MainContainer>
      <Heading mt={4} as="h1">
        Sign Up
      </Heading>
      <Text my={4}>
        Already have an account?
        <Link
          as={ReactLink}
          ml={2}
          color="blue.500"
          to={{ pathname: "/login" }}
          replace
        >
          Login
        </Link>
      </Text>
      <Stack spacing={4} mt={4} maxW="container.sm" width="100%">
        <Flex wrap="wrap">
          <LeftIconInput
            error={errors.firstName}
            type="text"
            placeholder="First Name*"
            value={firstName}
            setValue={setFirstName}
            icon={<BsFillPersonFill />}
          />
          <Box ml={4} mt={4} />
          <LeftIconInput
            error={errors.lastName}
            type="text"
            placeholder="Last Name"
            value={lastName}
            setValue={setLastName}
            icon={<BsFillPersonFill />}
          />
        </Flex>
        <LeftIconInput
          error={errors.email}
          type="email"
          placeholder="Email*"
          value={email}
          setValue={setEmail}
          icon={<AiOutlineMail />}
        />

        <PasswordInput
          error={errors.password}
          placeholder="Password*"
          value={password}
          setValue={setPassword}
        />
        <PasswordInput
          error={errors.confirmPassword}
          placeholder="Confirm Password*"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <Button
          colorScheme="blue"
          alignSelf="flex-start"
          onClick={handleSignup}
          disabled={!!errors.confirmPassword}
        >
          Signup
        </Button>
      </Stack>
    </MainContainer>
  );
}
