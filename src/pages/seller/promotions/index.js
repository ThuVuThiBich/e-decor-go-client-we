import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { LoadingTable } from "components/common/LoadingTable";
import NoShop from "components/common/NoShop";
import Images from "constants/image";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deletePromotion, getAllPromotions } from "redux/promotionRedux";
import { promotionSelector, shopSelector } from "redux/selectors";
import PromotionForm from "./promotionForm";
import { useStyles } from "./styles";
export default function Promotions() {
  const history = useHistory();
  const { currentShop } = useSelector(shopSelector);
  const { allPromotions, isUpdating, isLoading } =
    useSelector(promotionSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  //
  const storeShop = useSelector(shopSelector);

  useEffect(() => {
    storeShop?.currentShop &&
      dispatch(
        getAllPromotions({ id: currentShop.id, params: { page: 1, limit: 5 } })
      );
  }, [dispatch, currentShop?.id, isUpdating, storeShop?.currentShop]);

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <LocalOfferIcon className={classes.icon} />
          <Typography className={classes.title}>My Promotions</Typography>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            id
              ? history.push("/shop/promotions")
              : history.push("/shop/promotions/add");
          }}
        >
          {id ? "Back To Promotion" : "Add New Promotion"}
        </Button>
      </Box>
      {storeShop?.currentShop ? (
        <Box my={2} mb={4}>
          {id ? (
            <PromotionForm />
          ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Promotion's Name</TableCell>
                    <TableCell align="center">Order Value ( $ )</TableCell>
                    <TableCell align="center">Discount Value (%)</TableCell>
                    <TableCell align="center">Expiration Date</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading && isUpdating ? (
                    <LoadingTable />
                  ) : (
                    allPromotions?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row?.content ? row?.content : "Lễ hội"}
                        </TableCell>

                        <TableCell align="center">
                          {row?.standarFee ? row?.standarFee : "100000"}
                        </TableCell>
                        <TableCell align="center">
                          {row?.discount ? row?.discount : "100000"}
                        </TableCell>
                        <TableCell align="center">
                          {row?.expiredAt
                            ? format(new Date(row?.expiredAt), "MMM dd, yyyy")
                            : "xxx"}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton
                              aria-label="edit"
                              onClick={() => {
                                history.push(`/shop/promotions/${row?.id}`);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                dispatch(
                                  deletePromotion({
                                    id: currentShop.id,
                                    body: row?.id,
                                  })
                                );
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {!allPromotions?.length && !isLoading && !id && !isUpdating && (
            <Paper>
              <Box
                style={{ height: 350 }}
                p={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <img alt="" src={Images.NO_DATA} />
                <Box mt={2} style={{ color: "#3f51b5" }}>
                  No Data
                </Box>
              </Box>
            </Paper>
          )}
        </Box>
      ) : (
        <NoShop />
      )}
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </div>
  );
}
