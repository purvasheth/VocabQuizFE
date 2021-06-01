import React, { ReactElement, ReactNode } from 'react';
import { Spinner } from '@chakra-ui/react';

type LoadingIndicatorProps = {
  isLoading: boolean;
  children: ReactNode;
};

export function LoadingIndicator({ isLoading, children }: LoadingIndicatorProps): ReactElement {
  return isLoading ? <Spinner size="xl" m={4} /> : <>{children}</>;
}
