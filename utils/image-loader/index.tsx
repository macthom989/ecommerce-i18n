export const imageLoader = ({ src }: { src: string }) => {
  return src.startsWith('http') ? src : `/default-path/${src}`;
};
