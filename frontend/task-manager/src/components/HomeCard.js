import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  // TextField,
  // Grid,
  // Box,
  Typography,
  // Avatar,
  // Container,
  // Button,
  // Link,
  Card,
  CardContent,
  // CardHeader,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "2vh",
    maxWidth: "auto",
    opacity: ".8",
    height: "22vh",
  },
  cardContent: {
    textAlign: "center",
  },
}));

const HomeCard = (props) => {
  const classes = useStyles();
  // TO-DO: Dynamically update task numbers for user account
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.typography}
          variant="h1"
          style={{ color: props.color }}
        >
          {props.number}
        </Typography>
        <Typography
          className={classes.typography}
          variant="h5"
          style={{ color: props.color }}
        >
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
