import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import api from "./apis/local";
import {
  CREATE_ORDER,
  DELETE_CART,
  CREATE_TRANSACTION,
  FETCH_TRANSACTION,
} from "./actions/types";
import history from "./history";
import ThankYou from "./components/thankyou/ThankYou";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 70,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  offDeliveryLocationButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  checkout: {
    borderRadius: 10,
    height: 40,
    width: 190,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

function Paystack(props) {
  const dispatch = useDispatch();

  //console.log("this props is at paystack:", props);

  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();

  const config = {
    reference: props.orderNumber,
    className: classes.checkout,
    email: props.email,
    amount: props.amount,
    publicKey: "pk_test_9181f2dcbb5a6bf2cf56c8f2632eaa5e2fd182cb", //wholeroof test
    //publicKey: "pk_live_5700e72ac96f8aafda7af34e76b1dcfd1b6ec8b2", //wholeroof live
  };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    if (reference.status == "success") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  //console.log("the product list is at paystack:", props.productList);

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed paystck");
  };

  const componentProps = {
    ...config,
    text: props.text,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const commitDataToDatabase = () => {
    const transData = {
      orderNumber: props.data.orderNumber,
      recipientName: props.data.recipientName,
      recipientPhoneNumber: props.data.recipientPhoneNumber,
      recipientEmailAddress: props.data.recipientEmailAddress,
      brand: props.data.brand,
      project:props.data.project,
      grandTotal: props.data.grandTotal,
      totalProductCost: props.data.totalProductCost,
      // totalProductCostUs: props.data.totalProductCostUs,
      // totalProductCostUk: props.data.totalProductCostUk,
      paymentMethod: props.data.paymentMethod,
      paymentStatus: "to-be-confirmed",
      orderedBy: props.data.orderedBy,
      productCurrency: props.data.productCurrency,
    };

    if (transData) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/transactions`, transData);

        const transId = response.data.data.data.id;

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_TRANSACTION,
            payload: response.data.data.data,
          });

          props.productList.map((cart, index) => {
            const data = {
              orderNumber: props.data.orderNumber,
              transactionId: transId,
              creator: cart.creator,
              orderedCreativePricePerUnit: cart.creativeUnitPrice,
              orderedHookPricePerUnit:cart.creativeHookUnitPrice,
              recipientName: props.data.recipientName,
              recipientPhoneNumber: props.data.recipientPhoneNumber,
              recipientEmailAddress: props.data.recipientEmailAddress,
              cartId: cart.id,
              quantityAdddedToCart: cart.creativeQuantity,
              orderedCreativeQuantity: cart.creativeQuantity,
              orderedHookQuantity:cart.creativeHookQuantity,
              dateAddedToCart: cart.dateAddedToCart,
              productCurrency: cart.currency.id,
              currencyName:cart.currencyName,
              paymentMethod: props.data.paymentMethod,
              paymentStatus: "to-be-confirmed",
              orderedBy: cart.cartHolder,
              project:cart.project.id,
              projectName:cart.project.name,
              creativeType: cart.creativeType,              
              productCategory: cart.category[0].id,              
              //paymentOptions: cart.paymentOptions,
              slug: cart.slug,
              brand: cart.brand,
              brandName: cart.brandName,
              brandCountry: cart.brandCountry,
              creativeLanguage: cart.creativeLanguage.language,
              language:cart.creativeLanguage.id,
              creatorCategoryCode: cart.creatorCategoryCode,
              creativeDeliveryDays: cart.creativeDeliveryDays,
              image: cart.image,
              
            };
            if (data) {
              const createForm = async () => {
                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${props.token}`;
                const response = await api.post(`/orders`, data);
                if (response.data.status === "success") {
                  dispatch({
                    type: CREATE_ORDER,
                    payload: response.data.data.data,
                  });
                  //setLoading(false);
                } else {
                  props.handleFailedSnackbar(
                    "Something went wrong, please try again!!!"
                  );
                }
              };
              createForm().catch((err) => {
                //props.handleFailedSnackbar();
                console.log("err:", err.message);
              });
            } else {
              //props.handleFailedSnackbar("Something went wrong, please try again!!!");
            }
          });
        } else {
          // props.handleFailedSnackbar(
          //   "Something went wrong, please try again!!!"
          // );
        }
      };
      createForm().catch((err) => {
        //props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } //end of the transdate if statement

    const cartData = {
      status: "checkedout",
    };
    //remove order from cart
    props.productList.map((cart, index) => {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        await api.delete(`/carts/${cart.id}`);
        dispatch({
          type: DELETE_CART,
          //payload: response2.data.data.data,
        });
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    });
    props.handleSuccessfulCreateSnackbar(
      `Thank you for your patronage, we will contact the creator to commence work immediately on the project`
    );
    history.push("/thankyou");
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
      {isSuccess}
      {isSuccess && commitDataToDatabase()}
    </div>
  );
}

export default Paystack;
