import CategoryBanner from '@/components/banner/category-banner';
import { ProductGrid } from '@/components/product/product-grid';
import Container from '@/components/ui/container';
import Subscription from '@/components/ui/subscription';
import { notFound } from 'next/navigation';

type paramsType = Promise<{ slug: string }>;
export default async function Category({ params }: { params: paramsType }) {
  const { slug } = await params;
  if (!slug) return notFound();
  return (
    <div className="border-t-2 border-borderBottom">
      <Container>
        <CategoryBanner />
        <div className="pb-16 lg:pb-20">
          <ProductGrid className="3xl:grid-cols-6" slug={slug} />
        </div>
        <Subscription />
      </Container>
    </div>
  );
}
