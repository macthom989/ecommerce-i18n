'use client';

import usePrice from '@services/product/use-price';
import { useEffect, useState } from 'react';
import { useCart } from '@contexts/cart/cart-context';
import { useTranslations } from 'next-intl';
import { CheckoutItem } from '@components/checkout/checkout-card/checkout-item';
import { CheckoutCardFooterItem } from '@components/checkout/checkout-card/checkout-footer-item';
import Button from '@components/common/button';
import { CgShoppingCart } from 'react-icons/cg';
import Link from 'next/link';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/navigation';

const CheckoutCard: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, total, isEmpty } = useCart();
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });
  const t = useTranslations('common');
  const checkoutFooter = [
    {
      id: 1,
      name: t('text-sub-total'),
      price: subtotal,
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: t('text-free'),
    },
    {
      id: 3,
      name: t('text-total'),
      price: subtotal,
    },
  ];

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return;

  return (
    <div className="pt-12 md:pt-0 ltr:2xl:pl-4 rtl:2xl:pr-4">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">{t('text-your-order')}</h2>
      <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
        <span>{t('text-product')}</span>
        <span className="ltr:ml-auto rtl:mr-auto flex-shrink-0">{t('text-sub-total')}</span>
      </div>
      {!isEmpty && items.map((item) => <CheckoutItem item={item} key={item.id} />)}
      {isEmpty && (
        <div className="flex-col flex items-center">
          <p className="text-red-500 lg:px-3 py-4 text-center">{t('text-empty-cart')}</p>
          <Button className=" flex gap-2 transition-all" onClick={() => router.push(ROUTES.PRODUCT)}>
            <CgShoppingCart className="h-4 w-4 animate-bounce" /> <Link href={ROUTES.PRODUCT}>Go to shopping</Link>
            <CgShoppingCart className="h-4 w-4 animate-bounce" />
          </Button>
        </div>
      )}
      {checkoutFooter.map((item: any) => (
        <CheckoutCardFooterItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CheckoutCard;
