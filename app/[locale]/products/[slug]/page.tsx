import Breadcrumb from '@/components/common/breadcrumb';
import ProductSingleDetails from '@/components/product/product-single-details';
import Divider from '@/components/ui/divider';
import Subscription from '@/components/ui/subscription';
import { notFound } from 'next/navigation';
import Container from '@components/ui/container';
import { fetchFn } from '@/lib/fetcher-local';
import { Metadata, ResolvingMetadata } from 'next';
import { API_ENDPOINTS } from '@/services/utils/api-endpoints';

type GenerateMetadataProps = Promise<{ slug: string }>;
const site = process.env.NEXT_PUBLIC_URL;
export async function generateMetadata({ params }: { params: GenerateMetadataProps }): Promise<Metadata> {
  const { slug } = await params;
  const productUrl = `${API_ENDPOINTS.PRODUCTS}/${slug}`;
  const productResponse = await fetchFn('GET', productUrl);
  const product = productResponse?.data;
  return {
    title: product?.name ? `${product.name} | ${site}` : `Product | ${site}`,
    description: product?.description || 'Product details',
    openGraph: {
      title: product?.name || 'Product',
      description: product?.description || 'Product details',
      images: [{ url: product?.yoast_head_json.og_image[0].url || '/images/assets/default-image.jpg' }],
      url: `${site}/products/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product?.name || 'Product',
      description: product?.description || 'Product details',
      images: [{ url: product?.image || '/images/assets/default-image.jpg' }],
    },
  };
}

type paramsType = Promise<{ slug: string }>;
export default async function ProductPage({ params }: { params: paramsType }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const productUrl = `${API_ENDPOINTS.PRODUCTS}/${slug}`;
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
