import { TStore } from "../declarations/general";

export const apiExternalData = async (): Promise<TStore["products"]> => {
  const response = await fetch("https://dummyjson.com/products?limit=3");
  const results = await response.json();

  const formattedData = results.products.reduce(
    (accumulator: any, value: any) => {
      return { ...accumulator, [value.id]: value };
    },
    {}
  );

  return formattedData;
};
