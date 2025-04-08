'use client';
import usePrice from '@services/product/use-price';
import { OrderItem } from '@services/types';
import { useTranslations } from 'next-intl';
import { useOrderQuery } from '@services/order/get-order';
import ContentLoader from 'react-content-loader';
import { upperCase } from 'lodash';

const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: 'USD',
  });
  return (
    <tr className="font-normal border-b border-gray-300 last:border-b-0" key={product.id}>
      <td className="p-4">
        {product.name} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};

const OrderDetailsLoader = (props: any) => (
  <ContentLoader speed={2} width="100%" height={420} backgroundColor="#f3f3f3" foregroundColor="#e0e0e0" {...props}>
    <rect x="0" y="0" rx="3" ry="3" width="120" height="30" />
    <rect x="0" y="50" rx="4" ry="4" width="1344" height="40" />
    <rect x="0" y="100" rx="3" ry="3" width="1344" height="40" />
    <rect x="0" y="150" rx="4" ry="4" width="1344" height="40" />
    <rect x="0" y="200" rx="4" ry="4" width="1344" height="40" />
    <rect x="0" y="250" rx="4" ry="4" width="1344" height="40" />
    <rect x="0" y="300" rx="4" ry="4" width="1344" height="40" />
    <rect x="0" y="350" rx="4" ry="4" width="1344" height="40" />
  </ContentLoader>
);

const OrderDetails: React.FC<{ orderId: string; className?: string }> = ({ orderId, className }) => {
  const t = useTranslations('common');
  const { data: order, isLoading } = useOrderQuery(orderId);
  const { price: subtotal } = usePrice(
    order && {
      amount: Number(order.total),
      currencyCode: order?.currency,
    },
  );
  const { price: total } = usePrice(
    order && {
      amount: order.shipping_total ? Number(order.total) + Number(order.shipping_total) : Number(order.total),
      currencyCode: order?.currency,
    },
  );
  const { price: shipping } = usePrice(
    order && {
      amount: Number(order.shipping_total),
      currencyCode: order?.currency,
    },
  );
  if (isLoading)
    return (
      <div className="xl:px-32 2xl:px-44 3xl:px-56 py-6 ">
        <OrderDetailsLoader />
      </div>
    );
  return (
    <div className={className}>
      <div className="xl:px-32 2xl:px-44 3xl:px-56 py-6 ">
        <h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
          {t('text-order-details')}:
        </h2>
        <table className="w-full text-sm font-semibold text-heading lg:text-base">
          <thead>
            <tr>
              <th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
                {t('text-product')}
              </th>
              <th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
                {t('text-total')}
              </th>
            </tr>
          </thead>
          <tbody>{order?.line_items.map((product, index) => <OrderItemCard key={index} product={product} />)}</tbody>
          <tfoot>
            <tr className="odd:bg-gray-150">
              <td className="p-4 italic">{t('text-sub-total')}:</td>
              <td className="p-4">{subtotal}</td>
            </tr>
            <tr className="odd:bg-gray-150">
              <td className="p-4 italic">{t('text-shipping')}:</td>
              <td className="p-4">
                {shipping}{' '}
                <span className="text-[13px] font-normal ltr:pl-1.5 rtl:pr-1.5 inline-block">via Flat rate</span>
              </td>
            </tr>
            <tr className="odd:bg-gray-150">
              <td className="p-4 italic">{t('text-payment-method')}:</td>
              <td className="p-4">{upperCase(order?.payment_method)}</td>
            </tr>
            <tr className="odd:bg-gray-150">
              <td className="p-4 italic">{t('text-total')}:</td>
              <td className="p-4">{total}</td>
            </tr>
            <tr className="odd:bg-gray-150">
              <td className="p-4 italic">{t('text-note')}:</td>
              <td className="p-4">{order?.customer_note}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
