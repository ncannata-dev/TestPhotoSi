import { TStore } from "../declarations/general";
import { utilityFilterProduct } from "../utils/filterProduct";

export const selectorProductList = ({
  store,
  query,
}: {
  store: TStore;
  query: string;
}) => {
  const productsObj = store.products;
  const productList = Object.values(productsObj);
  const filteredProducts = utilityFilterProduct(productList, query);

  return filteredProducts;
};

export const selectorProductDetail = ({
  store,
  id,
}: {
  store: TStore;
  id: string;
}) => id && store.products[id];
