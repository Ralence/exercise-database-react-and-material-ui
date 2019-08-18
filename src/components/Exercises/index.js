import React, { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Form from "../Exercises/Form";
import { withStyles } from "@material-ui/styles";
import { WithContext } from "../../context";

import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

const styles = theme => ({
  "@global": {
    "html, body, #root": {
      height: "100%"
    }
  },
  paper: {
    padding: 20,
    [theme.breakpoints.up("sm")]: {
      marginTop: 5,
      height: "calc(100% - 10px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%"
    },
    textAlign: "left",
    overflow: "auto"
  },
  container: {
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px - 48px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(100% - 58px - 48px)"
    }
  },
  item: {
    [theme.breakpoints.up("sm")]: {
      height: "100%"
    },
    [theme.breakpoints.down("xs")]: {
      height: "50%"
    }
  }
});

const main = ({
  classes,
  muscles,
  exercises,
  category,
  editMode,
  onSelect,
  onDelete,
  onExerciseEdited,
  exerciseToDisplay,
  exerciseToDisplay: {
    title = "Wellcome",
    description = "Please select an exercese from the list!"
  },
  onSelectEdit
}) => {
  const filteredExercises =
    category === "all"
      ? exercises
      : exercises.filter(([muscleGroup]) => muscleGroup === category);
  const renderExercises = filteredExercises.map(
    ([muscleGroup, groupExercises]) => {
      return (
        <Fragment key={muscleGroup}>
          <Typography
            variant={"h5"}
            color="secondary"
            style={{ textTransform: "capitalize" }}
          >
            {muscleGroup}
          </Typography>
          <List>
            {groupExercises.map(({ id, title }) => (
              <ListItem
                style={{ borderBottom: "1px solid #dedede" }}
                key={id}
                button
                onClick={() => onSelect(id)}
              >
                <ListItemText primary={title} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="start"
                    aria-label="edit"
                    onClick={() => onSelectEdit(id)}
                  >
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(id)}
                  >
                    <DeleteForeverOutlinedIcon color="secondary" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Fragment>
      );
    }
  );

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.item} xs={12} sm={6}>
        <Paper className={classes.paper}>{renderExercises}</Paper>
      </Grid>
      <Grid item className={classes.item} xs={12} sm={6}>
        <Paper className={classes.paper}>
          {editMode ? (
            <Form
              exerciseToDisplay={exerciseToDisplay}
              muscles={muscles}
              onExerciseSubmitted={onExerciseEdited}
            />
          ) : (
            <Fragment>
              {exerciseToDisplay.muscles && (
                <Typography color="secondary" variant="h6" gutterBottom>
                  {exerciseToDisplay.muscles.toUpperCase()}
                </Typography>
              )}
              <Typography color="secondary" variant="h6">
                {title}
              </Typography>
              <Typography variant="subtitle2">{description}</Typography>
            </Fragment>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default WithContext(withStyles(styles)(main));
