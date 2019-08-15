import React, { Component, Fragment } from "react";
import { Header, Footer } from "./components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Exercises from "./components/Exercises";
import { muscles, exercises } from "./store/store";

export default class extends Component {
  state = {
    exercises,
    muscles,
    category: "all",
    exerciseToDisplay: {}
  };

  sortExercisesByMuscle = () => {
    const muscleGroups = {};
    muscles.forEach(muscle => (muscleGroups[muscle] = []));

    return Object.entries(
      this.state.exercises.reduce((exerciseList, exercise) => {
        const { muscles } = exercise;

        exerciseList[muscles] = [...exerciseList[muscles], exercise];

        return exerciseList;
      }, muscleGroups)
    );
  };

  handleTabSelected = muscleGroupCategory => {
    this.setState({
      category: muscleGroupCategory,
      exerciseToDisplay: {},
      editMode: false
    });
  };

  handleExerciseSelected = id => {
    this.setState(prevState => ({
      exerciseToDisplay: prevState.exercises.find(item => item.id === id),
      editMode: false
    }));
  };

  handleExerciseSubmitted = exercise => {
    this.setState(prevState => ({
      exercises: prevState.exercises.concat(exercise),
      exerciseToDisplay: exercise
    }));
  };

  handleExerciseDeleted = id => {
    this.setState(prevState => ({
      exercises: prevState.exercises.filter(exercise => exercise.id !== id),
      exerciseToDisplay:
        prevState.exerciseToDisplay.id === id
          ? {}
          : prevState.exerciseToDisplay,
      editMode:
        prevState.exerciseToDisplay.id === id ? false : prevState.editMode
    }));
  };

  handleExerciseEditSelected = id => {
    this.setState(prevState => ({
      exerciseToDisplay: prevState.exercises.find(item => item.id === id),
      editMode: true
    }));
  };

  handleExerciseEdited = exercise => {
    this.setState(prevState => ({
      exercises: [
        ...prevState.exercises.filter(ex => ex.id !== exercise.id),
        exercise
      ],
      editMode: false,
      exerciseToDisplay: exercise
    }));
  };
  render() {
    const sortedExercises = this.sortExercisesByMuscle();
    const { category, exerciseToDisplay, muscles, editMode } = this.state;

    return (
      <Fragment>
        <CssBaseline />
        <Header
          onExerciseSubmitted={this.handleExerciseSubmitted}
          muscles={muscles}
        />
        <Exercises
          muscles={this.state.muscles}
          exerciseToDisplay={exerciseToDisplay}
          category={category}
          exercises={sortedExercises}
          editMode={editMode}
          onSelect={this.handleExerciseSelected}
          onDelete={this.handleExerciseDeleted}
          onSelectEdit={this.handleExerciseEditSelected}
          onExerciseSubmitted={this.handleExerciseSubmitted}
          onExerciseEdited={this.handleExerciseEdited}
        />
        <Footer
          muscles={this.state.muscles}
          category={category}
          onTabSelect={this.handleTabSelected}
        />
      </Fragment>
    );
  }
}
