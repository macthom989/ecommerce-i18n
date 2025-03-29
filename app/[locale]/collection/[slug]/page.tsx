import Container from '@components/ui/container';
import StickyBox from 'react-sticky-box';
import ActiveLink from '@components/ui/active-link';
import { BreadcrumbItems } from '@components/common/breadcrumb';
import { ROUTES } from '@utils/routes';
import { useTranslations } from 'next-intl';
import { CollectionFilters } from '@/components/collection/collection-filters';
import CollectionTopBar from '@/components/collection/collection-top-bar';
import Subscription from '@/components/ui/subscription';
import { ProductGrid } from '@/components/product/product-grid-tag';
import { notFound } from 'next/navigation';

export default async function Collections({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();
  return (
    <div className="border-t-2 border-borderBottom">
      <Container>
        <div className="flex pt-8 pb-16 lg:pb-20">
          <div className="flex-shrink-0 hidden ltr:pr-24 rtl:pl-24 lg:block w-96">
            <div className="pb-7">
              {/* <BreadcrumbItems separator="/">
                  <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
                    {t('breadcrumb-home')}
                  </ActiveLink>
                  <ActiveLink href={ROUTES.SEARCH} activeClassName="font-semibold text-heading" className="capitalize">
                    {t('breadcrumb-collection')}
                  </ActiveLink>
                </BreadcrumbItems> */}
            </div>
            <CollectionFilters />
          </div>

          <div className="w-full ltr:lg:-ml-9 rtl:lg:-mr-9">
            <CollectionTopBar />
            <ProductGrid slug={slug} />
          </div>
        </div>
        <Subscription />
      </Container>
    </div>
  );
}
