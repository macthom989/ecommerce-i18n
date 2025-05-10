import { fetchFn } from '@/lib/fetcher-local';
import { Metadata } from 'next';

type GenerateMetadataProps = { params: { slug: string } };
const site = process.env.NEXT_PUBLIC_URL;
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = params;
  const productUrl = `/api/products/${slug}`;
  try {
    const productResponse = await fetchFn('GET', productUrl);
    const product = productResponse.data;

    return {
      title: product?.name ? `${product.name} | Hv Core` : 'Sản phẩm | Hv Core',
      description: product?.description || 'Chi tiết sản phẩm',
      openGraph: {
        title: product?.name || 'Sản phẩm',
        description: product?.description || 'Chi tiết sản phẩm',
        images: [{ url: product?.image || '/default-image.jpg' }],
        url: `${site}/products/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product?.name || 'Sản phẩm',
        description: product?.description || 'Chi tiết sản phẩm',
        images: [{ url: product?.image || '/default-image.jpg' }],
      },
    };
  } catch (error) {
    return {
      title: 'Sản phẩm | Hv Core',
      description: 'Chi tiết sản phẩm không có sẵn',
    };
  }
}
