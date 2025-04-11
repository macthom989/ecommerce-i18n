'use client';

import Container from '@components/ui/container';
import React, { use } from 'react';
import { BreadcrumbItems } from '@components/common/breadcrumb';
import ActiveLink from '@components/ui/active-link';
import { ROUTES } from '@utils/routes';
import { useTranslations } from 'next-intl';
import CategoryHeader from '@blocks/blog-category-hero-block';
import { useCategoryBySlug } from '@services/post/get-category-by-slug';
import BlogCategoryBlock from '@blocks/blog-catalog-block';
import { FeaturedPostsBlock } from '@blocks/featured-post-block';
import { MostViewedPostsBlock } from '@blocks/most-viewed-post-block';

export default function BlogByCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = use(params).slug;
  const t = useTranslations('common');
  const { data: category, isLoading: loadingCategory } = useCategoryBySlug({ slug });
  return (
    <Container>
      <div className="py-4 md:py-6">
        <BreadcrumbItems separator=">">
          <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
            {t('breadcrumb-home')}
          </ActiveLink>
          <ActiveLink href={ROUTES.BLOG_2} activeClassName="font-semibold text-heading" className="capitalize">
            Blog-2
          </ActiveLink>
          <ActiveLink href={'/'} activeClassName="font-semibold text-heading" className="capitalize">
            {slug}
          </ActiveLink>
        </BreadcrumbItems>
      </div>
      <CategoryHeader category={category} loading={loadingCategory} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <FeaturedPostsBlock category={category} loading={loadingCategory} />
        <MostViewedPostsBlock category={category} loading={loadingCategory} />
      </div>
      <div className="py-12">
        <BlogCategoryBlock categoryId={category?.id} countLoader={12} perPage={12} loading={loadingCategory} />
      </div>
    </Container>
  );
}
