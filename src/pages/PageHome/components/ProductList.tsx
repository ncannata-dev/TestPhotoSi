import React, { memo, FC } from "react";
import { useSelector } from "react-redux";

import { TStore } from "../../../declarations/general";
import { selectorProductList } from "../../../redux-modules/selectors";
import { ProductRow } from "./ProductRow";

interface Props {
  productFilter: string;
}

export const ProductList: FC<Props> = memo(
  ({ productFilter }): JSX.Element | null => {
    const productList = useSelector((store: TStore) =>
      selectorProductList({ store, query: productFilter })
    );

    if (!productList) return null;

    return (
      <>
        {productList.map((product) => (
          <ProductRow product={product} key={product.id} />
        ))}
      </>
    );
  }
);
