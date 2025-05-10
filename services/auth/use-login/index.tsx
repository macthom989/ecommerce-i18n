'use client';

import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { useUI } from '@contexts/managed-ui-provider';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}

async function login(input: LoginInputType) {
  return {
    token: `${input.email}.${input.remember_me}`.split('').reverse().join(''),
  };
}

export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: (input: LoginInputType) => login(input),
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.warn(data, 'login error response');
    },
  });
};
