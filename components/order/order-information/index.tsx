'use client';

import { IoCheckmarkCircle } from 'react-icons/io5';
import { useOrderQuery } from '@services/order/get-order';
import usePrice from '@services/product/use-price';
import { useTranslations } from 'next-intl';
import { formatDate } from 'date-fns/format';
import ContentLoader from 'react-content-loader';
import { upperCase } from 'lodash';

const OrderConfirmationLoader = (props: any) => (
  <ContentLoader speed={2} width="100%" height={270} backgroundColor="#f3f3f3" foregroundColor="#e0e0e0" {...props}>
    <circle cx="20" cy="30" r="20" />
    <rect x="60" y="10" rx="4" ry="4" width="1344" height="40" />
    <rect x="0" y="100" rx="8" ry="8" width="1344" height="90" />
    <rect x="0" y="240" rx="4" ry="4" width="250" height="32" />
  </ContentLoader>
);

export default function OrderInformation({ orderId }: { orderId: string }) {
  const t = useTranslations('common');
  const { data, isLoading } = useOrderQuery(orderId);

  const { price: total } = usePrice(
    data && {
      amount: Number(data?.shipping_total) ? Number(data?.total) + Number(data?.shipping_total) : Number(data.total),
      currencyCode: data?.currency,
    },
  );

  if (isLoading)
    return (
      <div className="xl:px-32 2xl:px-44 3xl:px-56 py-6 ">
        <OrderConfirmationLoader />
      </div>
    );
  return (
    <div className="xl:px-32 2xl:px-44 3xl:px-56 py-6 ">
      <div className="border border-gray-300 bg-gray-50 px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-heading text-sm md:text-base mb-6 lg:mb-8">
        <span className="w-10 h-10 ltr:mr-3 rtl:ml-3 ltr:xl:mr-4 rtl:xl:ml-4 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-green-600" />
        </span>
        {t('text-order-received')}
      </div>

      <ul className="border border-gray-300 bg-gray-50 rounded-md flex flex-col md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">{t('text-order-number')}:</span>
          {data?.id}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">{t('text-date')}:</span>
          {formatDate(data?.date_created ?? new Date(), 'PP')}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">{t('text-email')}:</span>
          {data?.billing?.email}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">{t('text-total')}:</span>
          {total}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {t('text-payment-method')}:
          </span>
          {upperCase(data?.payment_method)}
        </li>
      </ul>

      <p className="text-heading text-sm md:text-base mb-8">{data?.payment_method_title}</p>
    </div>
  );
}
