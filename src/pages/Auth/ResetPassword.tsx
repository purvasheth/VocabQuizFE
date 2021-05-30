import {
  Heading,
  Stack,
  Button,
  Flex,
  Box,
  Text,
  Link,
  toast,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { MainContainer } from "../../components";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LeftIconInput, PasswordInput } from "./components";
import { REQUIRED } from "./constants";
import { useAuth } from "../../contexts";
import { checkField, checkPasswords, validatePatterns } from "./auth-utils";
import { FormError } from "./auth-types";

const initialErrorState = {
  email: "",
  password: "",
  confirmPassword: "",
};

export function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { resetPassword } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [errors, setErrors] =
    useState<typeof initialErrorState>(initialErrorState);

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
    return emailFailure || passwordFailure || confirmPasswordFailure;
  };

  const handleResetPassword = async () => {
    setErrors(initialErrorState);
    const isRequiredFailure = validateRequiredFields();
    const isPatternValid = validatePatterns(email, password, setErrors);
    if (!isRequiredFailure && isPatternValid) {
      const response = await resetPassword(email, password);
      if (response?.message === "success") {
        toast({
          title: "Password reset successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      }

      "errors" in response && setErrors(response.errors);
    }
  };

  return (
    <MainContainer>
      <Heading mt={4} as="h1">
        Reset Password
      </Heading>
      <Text my={4}>
        Do not have an account?
        <Link
          as={RouterLink}
          color="blue.500"
          to={{ pathname: "/signup" }}
          replace
          ml={2}
        >
          Sign Up
        </Link>
      </Text>
      <Stack spacing={4} mt={4} maxW="container.sm" width="100%">
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
          onClick={handleResetPassword}
          disabled={!!errors.confirmPassword}
        >
          Reset Password
        </Button>
      </Stack>
    </MainContainer>
  );
}
