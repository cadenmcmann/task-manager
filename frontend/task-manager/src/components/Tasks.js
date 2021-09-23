import React, { useState, useEffect, useReducer } from "react";
import { readTasks } from "../apis/task-manager-api";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TasksContainer from "./TasksContainer";
import {
  deleteTask,
  updateTaskAsCompleted,
  addTask,
} from "../apis/task-manager-api";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import backgroundPic from "../tasksBackground.jpeg";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    margin: "auto",
    maxWidth: "60%",
    paddingTop: "2vh",
  },
  root: {
    flexGrow: 1,
    backgroundImage: `url(${backgroundPic})`,
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
    position: "flex",
  },
  textField: {
    background: "rgba(255, 255, 255, 0.8)",
  },
}));

const Tasks = () => {
  // let [tasks, updateTasks] = useState(null);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { completedTasks: null, incompleteTasks: null, newTask: "" }
  );

  const classes = useStyles();

  useEffect(() => {
    readTasks()
      .then((data) => {
        let complete = [];
        let incomplete = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].completed) {
            complete.push({ key: data[i]._id, task: data[i] });
          } else {
            incomplete.push({ key: data[i]._id, task: data[i] });
          }
        }
        setState({ completedTasks: complete, incompleteTasks: incomplete });
        // updateTasks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!state.completedTasks || !state.incompleteTasks) {
    return <CircularProgress />;
  }

  // helper function
  const findTaskById = (key, list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].key === key) {
        return list[i];
      }
      continue;
    }
  };

  const handleDelete = (keyOfDeletedTask) => () => {
    deleteTask(keyOfDeletedTask)
      .then((res) => {
        let newCompleted = state.completedTasks.filter(
          (task) => task.key !== keyOfDeletedTask
        );
        setState({ completedTasks: newCompleted });
      })
      .catch((err) => {
        alert("There was an error deleting your task");
      });

    console.log("task deleted");
  };

  const handleCompleteTask = (keyOfCompletedTask) => () => {
    // update later for cleaner syntax

    updateTaskAsCompleted(keyOfCompletedTask)
      .then((res) => {
        let newCompleted = state.completedTasks;
        let completedTask = findTaskById(
          keyOfCompletedTask,
          state.incompleteTasks
        );
        newCompleted.push(completedTask);

        let newIncompleted = state.incompleteTasks.filter(
          (task) => task.key !== keyOfCompletedTask
        );

        setState({
          completedTasks: newCompleted,
          incompleteTasks: newIncompleted,
        });
      })

      .catch((err) => {
        alert("Sorry, there was an error completing that task");
      });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(state.newTask)
      .then((response) => {
        setState({ newTask: "" });
        let newIncompleted = state.incompleteTasks;
        newIncompleted.push({ key: response.data._id, task: response.data });
        setState({ incompleteTasks: newIncompleted });
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Sorry, there was an error adding that task. Please reload the page and try again."
        );
      });
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setState({ newTask: e.target.value });
  };

  return (
    <div className={classes.root}>
      <div className={classes.gridContainer}>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <TasksContainer
              taskType="Completed"
              tasks={state.completedTasks}
              completed={true}
              handleDelete={handleDelete}
            />
          </Grid>
          <Grid item xs={6}>
            <TasksContainer
              taskType="Incomplete"
              tasks={state.incompleteTasks}
              completed={false}
              handleDelete={handleCompleteTask}
            />
          </Grid>
          <Grid item xs={12}>
            <form onChange={handleTextChange} onSubmit={handleAddTask}>
              <TextField
                className={classes.textField}
                value={state.newTask}
                id="outlined-basic"
                label="New Task"
                variant="filled"
                fullWidth
              />
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Tasks;
