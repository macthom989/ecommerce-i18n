import { capitalize } from 'lodash';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import type React from 'react';
import { PostCategory } from '@services/types';

interface Props {
  category?: PostCategory;
}

const BlogCategoryHeader: React.FC<Props> = ({ category }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{capitalize(category?.name)}</h2>
      <Link
        href={`/blog-2/${category?.slug}`}
        className="flex items-center text-sm font-bold text-primary/100 hover:text-primary/70 transition-colors duration-200 group"
      >
        See more
        <FaChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </div>
  );
};

export default BlogCategoryHeader;
