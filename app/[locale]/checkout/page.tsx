'use client';

import PageHeader from '@components/common/page-header';
import Container from '@components/ui/container';
import Subscription from '@components/ui/subscription';
import CheckoutCard from '@components/checkout/checkout-card';
import PaymentMethods from '@components/checkout/payment-methods';
import CheckoutForm from '@components/checkout/checkout-form';
import { CheckoutProvider } from '@contexts/checkout-provider';

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <PageHeader pageHeader="text-page-checkout" />
      <Container>
        <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
          <div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
            <CheckoutForm />
          </div>
          <div className="md:w-full lg:w-2/5 ltr:md:ml-7 rtl:md:mr-7 ltr:lg:ml-10 rtl:lg:mr-10 ltr:xl:ml-14 rtl:xl:mr-14 flex flex-col h-full -mt-1.5">
            <CheckoutCard />
            <PaymentMethods />
          </div>
        </div>
        <Subscription />
      </Container>
    </CheckoutProvider>
  );
}
