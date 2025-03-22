'use client';
import { useCart } from '@contexts/cart/cart-context';
import usePrice from '@services/product/use-price';
import { getVariations } from '@services/utils/get-variations';
import { generateCartItem } from '@utils/generate-cart-item';
import { useWindowSize } from '@utils/use-window-size';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import ProductMetaReview from '@components/product/product-meta-review';
import { useSsrCompatible } from '@utils/use-ssr-compatible';

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
    amount: product.sale_price ? product.sale_price : product.price,
    baseAmount: product.price,
    currencyCode: 'USD',
  });

  const variations = getVariations(product.variations);
  const isSelected = Object.keys(variations).every((variation) => attributes.hasOwnProperty(variation));

  function addToCart() {
    if (!isSelected) return;
    setAddToCartLoader(true);
    setTimeout(() => setAddToCartLoader(false), 600);
    const item = generateCartItem(product, attributes);
    addItemToCart(item, quantity);
    toast('Added to the bag', { autoClose: 2000 });
  }

  function handleAttribute(attribute: any) {
    setAttributes((prev) => ({ ...prev, ...attribute }));
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div className="price">{price}</div>
    </div>
  );
};

export default ProductSingleDetails;
