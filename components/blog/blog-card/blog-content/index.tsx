function BlogExcerpt({ excerpt }: { excerpt: string }) {
  return (
    <p className="text-sm sm:text-base text-gray-500 line-clamp-3" dangerouslySetInnerHTML={{ __html: excerpt }}></p>
  );
}

function BlogTitle({ title }: { title: string }) {
  return (
    <h3 className="text-base sm:text-lg font-bold line-clamp-2 group-hover:text-pink-500 transition-colors duration-200">
      {title}
    </h3>
  );
}

function BlogContent({ title, excerpt }: { title: string; excerpt: string }) {
  return (
    <div className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
      <BlogTitle title={title} />
      <BlogExcerpt excerpt={excerpt} />
    </div>
  );
}

export default BlogContent;
