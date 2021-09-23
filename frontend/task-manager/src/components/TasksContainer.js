import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { readTasks } from "../apis/task-manager-api";

const useStyles = makeStyles((theme) => ({
  completed: {
    backgroundColor: "#32CD32",
    color: "black",
    height: "100%",
  },
  incomplete: {
    backgroundColor: "#FA8072",
    color: "black",
    height: "100%",
  },
  title: {
    fontFamily: "Roboto",
  },
  paper: {
    maxHeight: "100vh",
    overflow: "auto",
    background: "rgba(255, 255, 255, 0.7)",
  },
  icon: {
    color: "black",
  },
  chipTextCompleted: {
    whiteSpace: "normal",
    textDecoration: "line-through",
  },
  chipTextIncomplete: {
    whiteSpace: "normal",
  },
}));

const TasksContainer = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.paper}>
      <Typography className={classes.title} variant="h5" align="center">
        {props.taskType}
      </Typography>
      <List>
        {props.tasks.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip
                className={
                  props.completed ? classes.completed : classes.incomplete
                }
                label={
                  <Typography
                    className={
                      props.completed
                        ? classes.chipTextCompleted
                        : classes.chipTextIncomplete
                    }
                  >
                    {data.task.description}
                  </Typography>
                }
                onDelete={props.handleDelete(data.key)}
                deleteIcon={
                  props.completed ? (
                    <RemoveCircleOutlineIcon className={classes.icon} />
                  ) : (
                    <CheckCircleOutlineIcon className={classes.icon} />
                  )
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default TasksContainer;
