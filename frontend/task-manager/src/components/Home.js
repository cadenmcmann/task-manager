import React, { useState, useEffect } from "react";
import history from "../history";
import HomeCard from "./HomeCard";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { readTasks } from "../apis/task-manager-api";
import {
  // TextField,
  Grid,
  // Box,
  Typography,
  // Avatar,
  // Container,
  // Button,
  // Link,
  Card,
  CardActionArea,
} from "@material-ui/core";
import Cookies from "js-cookie";
import backgroundPic from "../background-pic.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${backgroundPic})`,
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
    position: "flex",
  },
  header: {
    fontFamily: "Roboto",
    padding: "2vh",
  },
  subHeader: {
    fontFamily: "Roboto",
    paddingBottom: "2vh",
  },
  grid: {
    direction: "row",
    padding: "5vh",
    paddingLeft: "15vh",
    paddingRight: "15vh",
  },
  actionCard: {
    display: "flex",
    padding: "2vh",
    maxWidth: "auto",
    opacity: ".8",
    height: "22vh",
  },
}));
const Home = (props) => {
  const classes = useStyles();
  if (!Cookies.get("is_logged_in")) {
    history.push("/login");
  }

  const handleGoToTasks = () => {
    history.push("/tasks");
  };

  const [tasks, updateTasks] = useState(null);

  useEffect(() => {
    readTasks()
      .then((data) => {
        updateTasks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!tasks) {
    return <div>Loading...</div>;
  }

  var completed = 0;
  var incomplete = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      completed++;
    } else {
      incomplete++;
    }
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.header} align="center" variant="h1">
        Welcome to Task Manager
      </Typography>
      <Typography className={classes.subHeader} align="center" variant="h4">
        A tool to help you track your productivity
      </Typography>
      <Grid className={classes.grid} container spacing={2}>
        <Grid xs={4} item>
          <HomeCard
            number={completed}
            description="complete tasks"
            color="green"
          />
        </Grid>
        <Grid xs={4} item>
          <HomeCard
            number={incomplete}
            description="incomplete tasks"
            color="red"
          />
        </Grid>
        <Grid xs={4} item>
          <Card className={classes.actionCard} onClick={handleGoToTasks}>
            <CardActionArea style={{ display: "flex" }}>
              <ExitToAppIcon style={{ fontSize: 100, paddingLeft: "2vh" }} />
              <Typography
                align="center"
                style={{ fontFamily: "Roboto", fontSize: 30 }}
              >
                Go to tasks
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
