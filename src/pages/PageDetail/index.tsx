import React, { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { TStore } from "../../declarations/general";
import { selectorProductDetail } from "../../redux-modules/selectors";
import { Product } from "./components/Product";

// #region ::: PARTIALS
const Header = styled.h1`
  text-align: center;
`;

const Wrapper = styled.div`
  /* background-color: #f2f2f2;
  border-radius: 1rem; */
  padding: 1rem 0;
  max-width: 1400px;
  justify-content: center;
  margin: 0 auto;
  margin-top: 2rem;
`;
// #endregion

const PageDetail: FC = memo((): JSX.Element | null => {
  let { id } = useParams();
  const navigate = useNavigate();

  const productDetail = useSelector((store: TStore) =>
    selectorProductDetail({ store, id: id! })
  );

  useEffect(() => {
    if (!productDetail) navigate("/");
  }, [navigate, productDetail]);

  if (!productDetail) return null;

  return (
    <Wrapper>
      <Header>Scheda dettaglio prodotto {productDetail.title}</Header>
      <Product product={productDetail} />
    </Wrapper>
  );
});

export default PageDetail;
