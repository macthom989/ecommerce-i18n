import isEmpty from 'lodash/isEmpty';

interface Item {
  id: string | number;
  name: string;
  slug: string;
  images: {
    thumbnail: string;
    [key: string]: unknown;
  }[];
  price: number;
  sale_price?: number;

  [key: string]: unknown;
}

export function generateCartItem(item: Item, attributes: object) {
  const { id, name, slug, images, price, sale_price } = item;
  const image = images[0];
  return {
    id: !isEmpty(attributes) ? `${id}.${Object.values(attributes).join('.')}` : id,
    name,
    slug,
    image: image.src,
    price: sale_price ? sale_price : price,
    attributes,
  };
}
