import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { fetchFn } from '@lib/fetcher-local';
import { PaymentMethod } from '@services/types';

const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.PAYMENT_METHODS);
  return data;
};

export const useGetPaymentMethodsQuery = () => {
  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: () => fetchPaymentMethods(),
    staleTime: 3600 * 60 * 1000,
  });
};
