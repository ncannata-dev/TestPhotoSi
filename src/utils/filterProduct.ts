import { TProduct } from "../declarations/general";

export const utilityFilterProduct = (
  products: Array<TProduct>,
  query: string
) => {
  const filteredProducrList = products.filter(
    (product) =>
      (product.title &&
        product.title.toLowerCase().includes(query.toLowerCase())) ||
      (product.category &&
        product.category.toLowerCase().includes(query.toLowerCase()))
  );

  return filteredProducrList;
};
