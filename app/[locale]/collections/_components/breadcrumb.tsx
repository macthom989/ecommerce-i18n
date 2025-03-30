'use client';
import { BreadcrumbItems } from '@/components/common/breadcrumb';
import ActiveLink from '@/components/ui/active-link';
import { ROUTES } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Breadcrumb() {
  const t = useTranslations('common');
  return (
    <BreadcrumbItems separator="/">
      <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
        {t('breadcrumb-home')}
      </ActiveLink>
      <ActiveLink href={ROUTES.COLLECTIONS} activeClassName="font-semibold text-heading" className="capitalize">
        {t('breadcrumb-collection')}
      </ActiveLink>
    </BreadcrumbItems>
  );
}
