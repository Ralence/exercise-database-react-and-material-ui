import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Create from "../Exercises/Dialog/Create";

export default ({ muscles, onExerciseSubmitted }) => {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Exercise Database
        </Typography>
        <Create onExerciseSubmitted={onExerciseSubmitted} muscles={muscles} />
      </Toolbar>
    </AppBar>
  );
};
