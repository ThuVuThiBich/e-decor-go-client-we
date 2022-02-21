import { Box, Grid } from "@material-ui/core";
import Infor from "components/user/orderDetail/invoice/info";
import Total from "components/user/orderDetail/invoice/total";
import React from "react";
import { useSelector } from "react-redux";
import { orderSelector } from "redux/selectors";
import Products from "./products";
import { useStyles } from "./styles";

export default function Invoice() {
  const classes = useStyles();
  const { order, isLoading } = useSelector(orderSelector);
  return (
    <Box>
      {!isLoading && <Products order={order} />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Infor order={order} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Total order={order} />
        </Grid>
      </Grid>
    </Box>
  );
}
