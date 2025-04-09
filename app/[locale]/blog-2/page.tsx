'use client';

import Container from '@components/ui/container';
import BlogCategoryBlock from '@blocks/blog-catalog-block';
import { useCategoriesPostQuery } from '@services/post/get-all-categories-post';
import { BlogCategorySectionSkeleton } from '@components/common/loaders/blog-category-section-loader';
import BlogCategoryHeader from '@components/blog/blog-category-header';
import BlogCategorySliderBlock from '@blocks/blog-category-slider-block';

export default function Blog2() {
  const { data, isLoading } = useCategoriesPostQuery();

  return (
    <Container>
      <div className="py-8 md:py-12">
        {/* Blog Category Slider */}
        <div className="mb-10 md:mb-16">
          <BlogCategorySliderBlock />
        </div>

        {/* Blog Categories */}
        <div className="space-y-12 md:space-y-16">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => <BlogCategorySectionSkeleton key={index} />)
            : data
                ?.sort((a, b) => b.count - a.count)
                .map((category) => {
                  if (!category?.count) {
                    return null;
                  }
                  return (
                    <div key={category.id} className="space-y-6">
                      <BlogCategoryHeader category={category} />
                      <div className="animate-in fade-in duration-500">
                        <BlogCategoryBlock categoryId={category.id} />
                      </div>
                    </div>
                  );
                })}
        </div>
      </div>
    </Container>
  );
}
