'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CheckoutFormValues, TLineItem } from '@services/types';
import { useCart } from '@contexts/cart/cart-context';

interface CheckoutContextType {
  checkoutData: CheckoutFormValues;
  updateCheckoutData: (data: Partial<CheckoutFormValues>) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { items } = useCart();

  const lineItems: TLineItem[] = items.map((item) => {
    return { product_id: item.id, quantity: item?.quantity };
  });

  const [checkoutData, setCheckoutData] = useState<CheckoutFormValues>({
    payment_method: '',
    payment_method_title: '',
    set_paid: false,
    billing: {},
    shipping: {},
    line_items: lineItems,
    customer_note: '',
  });

  const updateCheckoutData = (data: Partial<CheckoutFormValues>) => {
    setCheckoutData((prev) => ({ ...prev, ...data }));
  };

  return <CheckoutContext.Provider value={{ checkoutData, updateCheckoutData }}>{children}</CheckoutContext.Provider>;
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
