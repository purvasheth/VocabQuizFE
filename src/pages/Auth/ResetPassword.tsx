import { Heading, Stack, Button, Text, Link, useToast } from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MainContainer } from '../../components';
import { LeftIconInput, PasswordInput } from './components';
import { useAuth } from '../../contexts';
import { checkField, checkPasswords, validatePatterns } from './auth-utils';
import { FormError } from './auth-types';

export function ResetPassword(): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { resetPassword } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormError>({});

  useEffect(() => {
    checkPasswords(password, confirmPassword, setErrors);
  }, [confirmPassword, password]);

  const validateRequiredFields = () => {
    const emailFailure = checkField('email', email, setErrors);
    const passwordFailure = checkField('password', password, setErrors);
    const confirmPasswordFailure = checkField('confirmPassword', confirmPassword, setErrors);
    return emailFailure || passwordFailure || confirmPasswordFailure;
  };

  const handleResetPassword = async () => {
    setErrors({});
    const isRequiredFailure = validateRequiredFields();
    const isPatternValid = validatePatterns(email, password, setErrors);
    if (!isRequiredFailure && isPatternValid) {
      const response = await resetPassword(email, password);
      if (typeof response === 'boolean' && response) {
        toast({
          title: 'Password reset successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/login');
      }
      if (typeof response !== 'boolean' && 'errors' in response) {
        setErrors(response.errors || {});
      }
    }
  };

  return (
    <MainContainer>
      <Heading mt={4} as="h1">
        Reset Password
      </Heading>
      <Text my={4}>
        Do not have an account?
        <Link as={RouterLink} color="blue.500" to={{ pathname: '/signup' }} replace ml={2}>
          Sign Up
        </Link>
      </Text>
      <Stack spacing={4} mt={4} maxW="container.sm" width="100%">
        <LeftIconInput
          error={errors.email || ''}
          type="email"
          placeholder="Email*"
          value={email}
          setValue={setEmail}
          icon={<AiOutlineMail />}
        />

        <PasswordInput
          error={errors.password || ''}
          placeholder="Password*"
          value={password}
          setValue={setPassword}
        />
        <PasswordInput
          error={errors.confirmPassword || ''}
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
