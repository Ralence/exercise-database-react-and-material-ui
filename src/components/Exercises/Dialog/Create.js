import React, { Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Form from "../Form";

export default ({ muscles, onExerciseSubmitted }) => {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <Fab size="small" onClick={handleClickOpen} aria-label="add">
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new Exercise</DialogTitle>
        <Form
          setOpen={setOpen}
          muscles={muscles}
          onExerciseSubmitted={onExerciseSubmitted}
        />
      </Dialog>
    </Fragment>
  );
};
