import { CollectionFilters } from '@/components/collection/collection-filters';
import CollectionTopBar from '@/components/collection/collection-top-bar';
import { ProductGrid } from '@/components/product/product-grid-tag';
import Subscription from '@/components/ui/subscription';
import Container from '@components/ui/container';
import { notFound } from 'next/navigation';
import ProductsTopbar from '../_components/products-and-topbar';
import Breadcrumb from '../_components/breadcrumb';

export default async function Collections({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();
  return (
    <div className="border-t-2 border-borderBottom">
      <Container>
        <div className="flex pt-8 pb-16 lg:pb-20">
          <div className="flex-shrink-0 hidden ltr:pr-24 rtl:pl-24 lg:block w-96">
            <div className="pb-7">
              <Breadcrumb />
            </div>
            <CollectionFilters />
          </div>
          <div className="w-full ltr:lg:-ml-9 rtl:lg:-mr-9">
            <ProductsTopbar slug={slug} />
          </div>
        </div>
        <Subscription />
      </Container>
    </div>
  );
}
