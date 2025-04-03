'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Button from '@components/common/button';
import TextArea from '@components/ui/text-area';
import { CheckBox } from '@components/ui/checkbox';
import Input from '@components/common/input';
import { PaymentMethod } from '@services/types';
import { useCheckout } from '@contexts/checkout-provider';
import { useCheckoutMutation } from '@services/order/order-create';

interface CheckoutFormValues {
  payment_method: Pick<PaymentMethod, 'id'>;
  payment_method_title: Pick<PaymentMethod, 'method_title'>;
  set_paid?: boolean;
  billing?: any;
  shipping?: any;
  line_items: { product_id: number; quantity: number }[];
}

// Example Params Checkout:
// {
//   "payment_method": "ppcp-gateway",
//   "payment_method_title": "Thanh toán khi nhận hàng",
//   "set_paid": true,
//   "billing": {
//   "first_name": "Nguyen",
//     "last_name": "Van A",
//     "email": "nguyenvana@example.com",
//     "address_1": "asldj",
//     "phone": "0123456789"
// }, "shipping": {
//   "first_name": "Mac",
//     "last_name": "Van B",
//     "email": "MacvanB@example.com",
//     "address_1": "dddddddd",
//     "phone": "0123456789"
// },
//   "line_items": [
//   {
//     "product_id": 123,
//     "quantity": 1
//   }
// ]
// }

interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address_1: string;
  address_2?: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}

const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>({});

  const { mutate } = useCheckoutMutation();
  const { checkoutData, updateCheckoutData } = useCheckout();

  function onSubmit(input: CheckoutInputType) {
    updateCheckoutData({ billing: input, shipping: input });
    mutate(
      {
        ...checkoutData,
        billing: input,
        shipping: input,
      },
      { onSuccess: (data) => router.push(`/orders/${data?.orderId}`) },
    );
  }

  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t('common.text-shipping-address')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto flex flex-col justify-center ">
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms.label-first-name"
              {...register('firstName', {
                required: 'forms.first-name-required',
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="forms.label-last-name"
              {...register('lastName', {
                required: 'forms.last-name-required',
              })}
              errorKey={errors.lastName?.message}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <Input
            labelKey="forms.label-address"
            {...register('address_1', {
              required: 'forms.address-required',
            })}
            errorKey={errors.address_1?.message}
            variant="solid"
          />
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              type="tel"
              labelKey="forms.label-phone"
              {...register('phone', {
                required: 'forms.phone-required',
              })}
              errorKey={errors.phone?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              type="email"
              labelKey="forms.label-email-star"
              {...register('email', {
                required: 'forms.email-required',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'forms.email-error',
                },
              })}
              errorKey={errors.email?.message}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input labelKey="forms.label-city" {...register('city')} variant="solid" className="w-full lg:w-1/2 " />

            <Input
              labelKey="forms.label-postcode"
              {...register('zipCode')}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <div className="relative flex items-center ">
            <CheckBox labelKey="forms.label-save-information" />
          </div>
          <TextArea
            labelKey="forms.label-order-notes"
            {...register('note')}
            placeholder="forms.placeholder-order-notes"
            className="relative pt-3 xl:pt-6"
          />
          <div className="flex w-full">
            <Button
              className="w-full sm:w-auto"
              disabled={!checkoutData.payment_method}
              // loading={isPending} disabled={isPending}
            >
              {t('common.button-place-order')}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
