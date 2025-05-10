import { useMutation } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { CheckoutFormValues } from '@services/types';

interface CheckoutResponse {
  success?: boolean;
  orderId?: number;
  error?: string;
}

const checkoutFn = async (payload: CheckoutFormValues): Promise<CheckoutResponse> => {
  const { data } = await fetchFn('POST', API_ENDPOINTS.CHECKOUT, JSON.stringify(payload));
  return data;
};

export function useCheckoutMutation() {
  return useMutation<CheckoutResponse, Error, CheckoutFormValues>({
    mutationFn: checkoutFn,
  });
}
