import ContentLoader from 'react-content-loader';

const HomeLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width="100%"
    height="100vh"
    backgroundColor="#f3f3f3"
    foregroundColor="#e0e0e0"
    className="w-full h-auto"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="120" />

    <rect x="0" y="80" rx="8" ry="8" width="100%" height="250" />

    <rect x="20" y="350" rx="6" ry="6" width="18%" height="30" />
    <rect x="22%" y="350" rx="6" ry="6" width="18%" height="30" />
    <rect x="44%" y="350" rx="6" ry="6" width="18%" height="30" />
    <rect x="66%" y="350" rx="6" ry="6" width="18%" height="30" />

    <rect x="20" y="400" rx="6" ry="6" width="22%" height="180" />
    <rect x="26%" y="400" rx="6" ry="6" width="22%" height="180" />
    <rect x="52%" y="400" rx="6" ry="6" width="22%" height="180" />
    <rect x="78%" y="400" rx="6" ry="6" width="22%" height="180" />

    <rect x="20" y="600" rx="6" ry="6" width="60%" height="20" />
    <rect x="20" y="630" rx="6" ry="6" width="40%" height="20" />
    <rect x="20" y="660" rx="6" ry="6" width="50%" height="20" />

    <rect x="20" y="700" rx="6" ry="6" width="40%" height="100" />
    <rect x="50%" y="700" rx="6" ry="6" width="40%" height="100" />

    <rect x="0" y="820" rx="0" ry="0" width="100%" height="60" />
  </ContentLoader>
);

export default HomeLoader;
