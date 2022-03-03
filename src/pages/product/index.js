import { Container } from "@material-ui/core";
import { LoadingProductDetail } from "components/common/LoadingProductDetail";
import ScrollToTop from "components/common/ScrollToTop";
import Bottom from "components/product/bottom";
import Mid from "components/product/mid";
import Top from "components/product/top";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { storeShopInfo } from "redux/orderRedux";
import { getProduct, getShopProducts } from "redux/productRedux";
import { productSelector } from "redux/selectors";
import { useStyles } from "./styles";

export default function Product() {
  ScrollToTop();
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, product } = useSelector(productSelector);
  useEffect(() => {
    dispatch(getProduct(id)).then((data) => {
      dispatch(
        storeShopInfo({
          id: data?.payload?.shop?.id,
          name: data?.payload?.shop?.name,
        })
      );
    });
  }, [dispatch, id, product?.shop?.name]);

  useEffect(() => {
    dispatch(getShopProducts({ id: product?.shop?.id, params: { page: 1 } }));
  }, [dispatch, id, product?.shop?.id]);

  return (
    <Container className={classes.container}>
      {isLoading ? <LoadingProductDetail /> : <Top />}
      <Mid />
      <Bottom />
    </Container>
  );
}
