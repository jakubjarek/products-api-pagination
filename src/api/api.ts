import { PER_PAGE } from 'App/constants';
import { ProductType, DataType } from './types';

interface Cache {
  [url: string]: DataType;
}

let cache: Cache = {};

export const getPageData = async (page: string) => {
  const url = `https://reqres.in/api/products/?per_page=${PER_PAGE}&page=${page}`;

  if (cache.hasOwnProperty(url)) {
    return cache[url];
  }

  const data = await (await fetch(url)).json();
  cache[url] = data;

  return data as DataType;
};

export const getSingleProductData = async (id: string) => {
  const url = `https://reqres.in/api/products/?id=${id}`;

  if (cache.hasOwnProperty(url)) {
    return cache[url];
  }

  // check cached pages wether for product
  const cachedProduct = getProductFromCachedPages(id);

  let product;
  if (cachedProduct) {
    product = cachedProduct;
  } else {
    const { data } = await (await fetch(url)).json();
    product = data;
  }

  const dataObject = createDefaultDataObject(product);
  cache[url] = dataObject;
  return dataObject;
};

function getProductFromCachedPages(id: string) {
  const entries = Object.entries(cache);
  const cachedProducts = entries.reduce(
    (acc, [key, data]) =>
      key.includes('page') ? (acc = acc.concat(data.data)) : acc,
    [] as ProductType[]
  );

  return cachedProducts.find((p) => String(p.id) === id);
}

// we need these default values for the pagination component
function createDefaultDataObject(product: ProductType): DataType {
  return {
    page: 1,
    per_page: 1,
    total: 1,
    total_pages: 1,
    data: [product],
  };
}
