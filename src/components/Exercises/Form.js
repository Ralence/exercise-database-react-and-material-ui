import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  MuscleGroup: {
    flexBasis: 1
    //`width: 200
  }
});

const Form = ({
  classes,
  exerciseToDisplay,
  setOpen,
  onExerciseSubmitted,
  muscles
}) => {
  const [form, setForm] = React.useState(
    exerciseToDisplay
      ? exerciseToDisplay
      : {
          title: "",
          description: "",
          muscles: ""
        }
  );

  useEffect(() => {
    if (exerciseToDisplay) {
      setForm({
        ...exerciseToDisplay
      });
    }
  }, [exerciseToDisplay]);

  function handleClose() {
    setForm({
      title: "",
      description: "",
      muscles: ""
    });
    setOpen && setOpen(false);
  }

  const handleInpurt = (e, id) => {
    const val = e.target.value;

    setForm({
      ...form,
      [id]: val
    });
  };

  const handleSubmit = () => {
    //TODO validate
    const id = form.title.toLowerCase().replace(/ /g, "-");
    form.id = form.id ? form.id : id;
    onExerciseSubmitted(form);
    handleClose();
  };

  return (
    <form>
      <DialogContent>
        <DialogContentText>Please fill in the form below.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Exercise Title"
          type="text"
          value={form.title}
          onChange={e => handleInpurt(e, "title")}
          fullWidth
        />
        <br />
        <TextField
          select
          className={classes.MuscleGroup}
          margin="dense"
          id="muscles"
          label="Muscle Group"
          type="text"
          value={form.muscles}
          onChange={e => handleInpurt(e, "muscles")}
          fullWidth
        >
          {muscles.map(muscle => (
            <MenuItem
              key={muscle}
              value={muscle}
              style={{ textTransform: "capitalize" }}
            >
              {muscle}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          id="description"
          label="Enter the Description"
          type="text"
          value={form.description}
          onChange={e => handleInpurt(e, "description")}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        {exerciseToDisplay ? null : (
          <Button variant="outlined" onClick={handleClose} color="default">
            Cancel
          </Button>
        )}
        <Button variant="contained" onClick={handleSubmit} color="primary">
          {exerciseToDisplay ? "Edit" : "Create"}
        </Button>
      </DialogActions>
    </form>
  );
};

export default withStyles(styles)(Form);
