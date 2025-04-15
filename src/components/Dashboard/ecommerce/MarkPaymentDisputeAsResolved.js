import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import api from "./../../../apis/local";
//import { DELETE_ASSESSOR } from "../../../actions/types";

function MarkPaymentDisputeAsResolved(props) {
  const { params, token, userId } = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleMarkAsCompleted = () => {
    setLoading(true);

    const data = {
        paymentStatus:"paid",
        markPaymentAsResolvedBy: userId,
        markPaymentAsResolvedDate: new Date().toISOString(),
        
    };

    if (params[0].id) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.patch(`/payments/${params[0].id}`, data);

        if (response.data.status === "success") {
          props.handleSuccessfulDeletedItemSnackbar(
            `Payment dispute is successfully marked as resolved!!!`
          );
          props.handleDeleteDialogOpenStatus();
          props.renderProjectEdittedUpdateCounter();
          setLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      editForm().catch((err) => {
        props.handleFailedSnackbar("Something went wrong, please try again!!!");
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  const handleNoMarkAsCompleted = () => {
    props.handleDeleteDialogOpenStatus();
  };

  return (
    <>
      {/* <Alert onClose={() => {}}>This is a success alert — check it out!</Alert> */}

      <Alert
        severity="warning"
        action={[
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleMarkAsCompleted}
          >
            Yes
          </Button>,
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleNoMarkAsCompleted}
            style={{ marginLeft: 10 }}
          >
            No
          </Button>,
        ]}
      >
        <AlertTitle>Mark Creator, {params[0].creatorName}'s Payment Dispute As Resolved" ?</AlertTitle>
        Are you sure you want to mark this payment dispute as resolved?
      </Alert>
    </>
  );
}

export default MarkPaymentDisputeAsResolved;
