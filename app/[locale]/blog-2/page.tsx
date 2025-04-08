'use client';

import Container from '@components/ui/container';
import BlogCategorySliderBlock from '../../../components/blocks/blog-category-slider-block';
import BlogCategoryBlock from '@blocks/blog-catalog-block';

export default function Blog2() {
  return (
    <Container>
      <BlogCategorySliderBlock />
      <div>
        <BlogCategoryBlock categoryId={1} />
      </div>
    </Container>
  );
}
