import React from "react";
import {
  TextField,
  Grid,
  Box,
  Typography,
  Avatar,
  Container,
  Button,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginUser } from "../apis/task-manager-api";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5px",
  },
  grid: {
    margin: "auto",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
  },
  avatar: {
    backgroundColor: "red",
  },
  submitButton: {
    backgroundColor: "blue",
    color: "white",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Box className={classes.box}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4">Sign in</Typography>
        <form>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                id="email"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                id="password"
                label="Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.submitButton}
                color="primary"
                onClick={() => loginUser(email, password)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/createaccount" variant="body2">
                Don't have an account? Create one here
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
