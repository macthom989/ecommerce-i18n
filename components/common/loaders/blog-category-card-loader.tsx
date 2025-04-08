import ContentLoader from 'react-content-loader';

const BlogCategoryCardLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={197}
    height={249}
    viewBox="0 0 197 249"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="w-full h-auto"
    {...props}
  >
    <rect x="0" y="0" rx="6" ry="6" width="197" height="197" />
  </ContentLoader>
);

export default BlogCategoryCardLoader;
