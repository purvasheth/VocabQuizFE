import { Heading, Stack, Button, Text, Link } from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { MainContainer } from '../../components';
import { LeftIconInput, PasswordInput } from './components';
import { useAuth } from '../../contexts';
import { validateTokenService } from '../../services/auth-service/auth-service';
import { checkField, validatePatterns } from './auth-utils';
import { FormError, State } from './auth-types';

export function Login(): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setToken, loginUser } = useAuth();
  const [errors, setErrors] = useState<FormError>({});
  const { state }: { state: State | null } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        (async () => {
          const response = await validateTokenService(storedToken);
          if (response?.message === 'success') {
            setToken(storedToken);
            navigate('/');
          }
        })();
      }
    }
  }, []);

  const validateRequiredFields = () => {
    const emailFailure = checkField('email', email, setErrors);
    const passwordFailure = checkField('password', password, setErrors);
    return emailFailure || passwordFailure;
  };

  const handleLogin = async () => {
    setErrors({});
    const isRequiredFailure = validateRequiredFields();
    const isPatternValid = validatePatterns(email, password, setErrors);
    if (!isRequiredFailure && isPatternValid) {
      const response = await loginUser(email, password);
      if (typeof response !== 'boolean' && 'errors' in response) {
        setErrors(response.errors || {});
      } else {
        // eslint-disable-next-line no-unused-expressions
        state?.from ? navigate(state.from) : navigate('/');
      }
    }
  };

  return (
    <MainContainer>
      <Heading mt={4} as="h1">
        Login
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
        <Text>
          <Link as={RouterLink} color="blue.500" to={{ pathname: '/reset-password' }} replace>
            Forgot Password?
          </Link>
        </Text>

        <Button colorScheme="blue" alignSelf="flex-start" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
      <Text fontWeight="bold" mt={8}>
        Dummy credentials for all those who wish to skip sign up :)
      </Text>
      <Text> Email: test@test.com</Text>
      <Text> Password: Test@1234 </Text>
    </MainContainer>
  );
}
