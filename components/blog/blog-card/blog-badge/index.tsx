import { PostWpTerm } from '@services/types';

function BlogBadge({ category }: { category?: PostWpTerm[] }) {
  if (!category) return null;
  return (
    <div className="flex gap-1 flex-wrap mt-2">
      {category?.map((item) => (
        <div key={item?.id} className="mb-1">
          <span className="bg-pink-500 text-white text-xs font-semibold px-2.5 py-1 rounded-3xl shadow-sm hover:bg-pink-600 transition-colors">
            {item?.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BlogBadge;
