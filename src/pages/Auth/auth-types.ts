import { Dispatch, SetStateAction } from 'react';

export type State = {
  from?: string;
};

export type FormError = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
};

export type Dispatcher<S> = Dispatch<SetStateAction<S>>;
