import Breadcrumb from '@/components/common/breadcrumb';
import ProductSingleDetails from '@/components/product/product-single-details';
import Divider from '@/components/ui/divider';
import Subscription from '@/components/ui/subscription';
import { fetchFn } from '@/lib/fetcher';
import { notFound } from 'next/navigation';
import Container from '@components/ui/container';

type paramsType = Promise<{ slug: string }>;
export default async function ProductPage({ params }: { params: paramsType }) {
  const { slug } = await params;
  if (!slug) return notFound();

  const productUrl = `http://localhost:3000/api/products/${slug}`;
  const productResponse = await fetchFn('GET', productUrl);
  const product = productResponse.data;

  return (
    <>
      <Divider className="mb-0" />
      <Container>
        <div className="pt-8">
          <Breadcrumb />
        </div>
        <ProductSingleDetails product={product} />
        <Subscription />
      </Container>
    </>
  );
}
