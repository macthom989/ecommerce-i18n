'use client';
import { useCart } from '@contexts/cart/cart-context';
import usePrice from '@services/product/use-price';
import { getVariations } from '@services/utils/get-variations';
import { generateCartItem } from '@utils/generate-cart-item';
import { useWindowSize } from '@utils/use-window-size';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSsrCompatible } from '@utils/use-ssr-compatible';
import { SwiperSlide } from 'swiper/react';
import { ProductAttributes } from './product-attributes';
import { colorMetaMap } from '@/contants/attributes';
import Counter from '../common/counter';
import Button from '../common/button';
import Link from '../ui/link';
import ProductMetaReview from './product-meta-review';
import Carousel from '@components/ui/carousel';

const productGalleryCarouselResponsive = {
  '768': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const ProductSingleDetails: React.FC<{ product: any }> = ({ product }) => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { addItemToCart } = useCart();
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? Number(product.sale_price) : Number(product.price),
    baseAmount: product.on_sale ? Number(product.regular_price) : Number(product.price),
    currencyCode: 'USD',
  });

  let idCounter = 1;
  const transformedData = product.attributes.flatMap((attr) =>
    attr.options.map((option) => ({
      id: idCounter++,
      value: option,

      ...(attr.name === 'color' && { meta: colorMetaMap[option.toLowerCase()] || '#ccc' }),
      attribute: {
        id: 1,
        name: attr.name.charAt(0).toUpperCase() + attr.name.slice(1),
        slug: attr.slug,
      },
    })),
  );

  const variations = getVariations(transformedData);
  const isSelected = Object.keys(variations).every((variation) => attributes.hasOwnProperty(variation));

  function addToCart() {
    if (!isSelected) return;

    setAddToCartLoader(true);
    setTimeout(() => setAddToCartLoader(false), 600);
    const item = generateCartItem(product!, attributes);

    addItemToCart(item, quantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width > 768 ? 'bottom-right' : 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  function handleAttribute(attribute: any) {
    setAttributes((prev) => ({ ...prev, ...attribute }));
  }

  const coll = [
    {
      id: 1,
      title: 'Product Details',
      content:
        'Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.',
    },
    {
      id: 2,
      title: 'Additional Information',
      content:
        'Please read the documentation carefully . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum',
    },
    {
      id: 3,
      title: 'Customer Reviews',
      content:
        'At first, Please check your internet connection . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.',
    },
  ];

  return (
    <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
      {width < 1025 ? (
        <Carousel
          pagination={{
            clickable: true,
          }}
          breakpoints={productGalleryCarouselResponsive}
          className="product-gallery"
          buttonGroupClassName="hidden"
        >
          {product?.images?.map((item, index: number) => (
            <SwiperSlide key={`product-gallery-key-${index}`}>
              <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item?.src ?? '/assets/placeholder/products/product-gallery.svg'}
                  alt={``}
                  className="object-cover w-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {product?.images?.map((item, index: number) => (
            <div key={index} className="col-span-1 transition duration-150 ease-in hover:opacity-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item?.src ?? '/assets/placeholder/products/product-gallery.svg'}
                alt={``}
                className="object-cover w-full"
              />
            </div>
          ))}
        </div>
      )}

      <div className="col-span-4 pt-8 lg:pt-0">
        <div className="pb-7 mb-7 border-b border-gray-300">
          <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
            {product?.name}
          </h2>
          <div className="flex items-center mt-5">
            <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">
              {price}
            </div>
            {discount && (
              <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ltr:pl-2 rtl:pr-2">
                {basePrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-x-4 ltr:md:pr-32 rtl:md:pl-32 ltr:lg:pr-12 rtl:lg:pl-12 ltr:2xl:pr-32 rtl:2xl:pl-32 ltr:3xl:pr-48 rtl:3xl:pl-48  border-b border-gray-300 py-8">
            <Counter
              quantity={quantity}
              onIncrement={() => setQuantity((prev) => prev + 1)}
              onDecrement={() => setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))}
              disableDecrement={quantity === 1}
            />
            <Button
              onClick={addToCart}
              variant="slim"
              className={`w-full md:w-6/12 xl:w-full ${!isSelected && 'bg-gray-400 hover:bg-gray-400'}`}
              disabled={!isSelected}
              loading={addToCartLoader}
            >
              <span className="py-2 3xl:px-8">Add to cart</span>
            </Button>
          </div>
          <div className="pb-3 border-b border-gray-300">
            {Object.keys(variations).map((variation) => {
              return (
                <ProductAttributes
                  key={variation}
                  title={variation}
                  attributes={variations[variation]}
                  active={attributes[variation]}
                  onClick={handleAttribute}
                />
              );
            })}
          </div>
          <div
            className="text-body text-sm lg:text-base leading-6 lg:leading-8"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          />

          <div className="py-6">
            <ul className="text-sm space-y-5 pb-1">
              <li>
                <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">SKU:</span>
                {product?.sku ?? 'N/A'}
              </li>
              <li>
                <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">Category:</span>
                <Link href="/" className="transition hover:underline hover:text-heading">
                  {product?.categories?.map((item) => item.name).join(', ')}
                </Link>
              </li>
              {product?.tags && Array.isArray(product.tags) && (
                <li className="productTags">
                  <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">Tags:</span>
                  {product.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={tag.slug}
                      className="inline-block ltr:pr-1.5 rtl:pl-1.5 transition hover:underline hover:text-heading ltr:last:pr-0 rtl:last:pl-0"
                    >
                      {tag.name}
                      <span className="text-heading">,</span>
                    </Link>
                  ))}
                </li>
              )}
            </ul>
          </div>

          <ProductMetaReview data={coll} />
        </div>
      </div>
    </div>
  );
};

export default ProductSingleDetails;
