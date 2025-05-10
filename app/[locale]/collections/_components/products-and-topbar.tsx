'use client';
import CollectionTopBar from '@/components/collection/collection-top-bar';
import { ProductGrid } from '@/components/product/product-grid-tag';
import React from 'react';

export default function ProductsTopbar({ slug }: { slug: string }) {
  const [totalItem, setTotalItem] = React.useState(0);
  return (
    <div>
      <CollectionTopBar totalItem={totalItem} />
      <ProductGrid slug={slug} setTotalItem={setTotalItem} />
    </div>
  );
}
