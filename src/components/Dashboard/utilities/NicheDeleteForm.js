import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import api from "./../../../apis/local";
import { DELETE_LOCATION } from "../../../actions/types";

function NicheDeleteForm(props) {
  const { params, token, userId } = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    setLoading(true);

    if (params[0].id) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.delete(`/niches/${params[0].id}`);

        if (response.status === 204) {
          props.handleSuccessfulDeletedItemSnackbar(
            `${params[0].niche} Niche is deleted successfully!!!`
          );
          props.handleDeleteDialogOpenStatus();
          props.renderNicheDeletedUpdateCounter();
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

  const handleNoDelete = () => {
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
            onClick={handleDelete}
          >
            Yes
          </Button>,
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleNoDelete}
            style={{ marginLeft: 10 }}
          >
            No
          </Button>,
        ]}
      >
        <AlertTitle>Delete "{params[0].niche}" Niche?</AlertTitle>
        Are you sure you want to delete this niche?
      </Alert>
    </>
  );
}

export default NicheDeleteForm;
