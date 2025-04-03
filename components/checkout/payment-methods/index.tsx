'use client';

import { useGetPaymentMethodsQuery } from '@services/payment-method/get-all-payment-methods';
import { PaymentMethod } from '@services/types';
import { useState } from 'react';
import { useCheckout } from '@contexts/checkout-provider';

const PaymentMethods = () => {
  const { data, isLoading, isError } = useGetPaymentMethodsQuery();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>();
  const { updateCheckoutData } = useCheckout();
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedMethod(method);
    updateCheckoutData({
      payment_method: method.id,
      payment_method_title: method.method_title,
    });
  };

  return (
    <div className="pt-12 md:pt-0 ltr:2xl:pl-4 rtl:2xl:pr-4">
      <div className="mb-4">
        <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
          <span>Payment Method</span>
          <span className="ltr:ml-auto rtl:mr-auto flex-shrink-0">Select how you would like to pay</span>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-6">
          <svg
            className="animate-spin h-5 w-5 text-gray-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-sm text-gray-500">Loading payment methods...</span>
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center py-6 text-red-500">
          <svg
            className="h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm">Failed to load payment methods. Please try again.</span>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="space-y-3">
          {data.map((method: PaymentMethod) => (
            <div
              key={method.id}
              className={`relative border rounded-md p-4 cursor-pointer transition-all ${
                selectedMethod?.id === method.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePaymentMethodChange(method)}
            >
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`payment-${method.id}`}
                    name="payment-method"
                    type="radio"
                    className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-500"
                    checked={selectedMethod?.id === method.id}
                    onChange={() => handlePaymentMethodChange(method)}
                  />
                </div>
                <div className="ml-3 flex-1">
                  <label htmlFor={`payment-${method.id}`} className="font-medium text-gray-900 block">
                    {method.method_title}
                  </label>
                  {method.description && <p className="text-sm text-gray-500 mt-1">{method.description}</p>}
                </div>
                {/*{method.icon && (*/}
                {/*  <div className="ml-4">*/}
                {/*    <img src={method.icon || '/placeholder.svg'} alt={method.title} className="h-8 w-auto" />*/}
                {/*  </div>*/}
                {/*)}*/}
              </div>
            </div>
          ))}
        </div>
      )}

      {data && data.length === 0 && (
        <div className="py-6 text-center text-gray-500 text-sm">No payment methods available.</div>
      )}
    </div>
  );
};

export default PaymentMethods;
