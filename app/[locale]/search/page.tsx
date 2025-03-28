'use client';
import Container from '@components/ui/container';
import ActiveLink from '@components/ui/active-link';
import { BreadcrumbItems } from '@components/common/breadcrumb';
import { ROUTES } from '@utils/routes';
import { useTranslations } from 'next-intl';
import SearchTopBar from '@/components/shop/top-bar';
import { ShopFilters } from '@/components/shop/filters';
import Subscription from '@/components/ui/subscription';
import StickyBox from 'react-sticky-box';
import ShopDiscount from '@/components/shop/discount';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/product-grid-search';
import React from 'react';

export default function Shop() {
  const t = useTranslations('common');
  const [totalItem, setTotalItem] = React.useState(0);
  return (
    <>
      <ShopDiscount />
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="flex-shrink-0 ltr:pr-24 rtl:pl-24 hidden lg:block w-96">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <div className="pb-7">
                <BreadcrumbItems separator="/">
                  <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
                    {t('breadcrumb-home')}
                  </ActiveLink>
                  <ActiveLink href={ROUTES.SEARCH} activeClassName="font-semibold text-heading" className="capitalize">
                    {t('breadcrumb-search')}
                  </ActiveLink>
                </BreadcrumbItems>
              </div>
              <ShopFilters />
            </StickyBox>
          </div>

          <div className="w-full ltr:lg:-ml-9 rtl:lg:-mr-9">
            <SearchTopBar totalItem={totalItem} />
            <ProductGrid setTotalItem={setTotalItem} />
          </div>
        </div>
        <Subscription />
      </Container>
    </>
  );
}
