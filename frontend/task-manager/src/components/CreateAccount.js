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
import { registerUser } from "../apis/task-manager-api";

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

const CreateAccount = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Box className={classes.box}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4">Create an account</Typography>
        <form>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
                id="firstName"
                label="First Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                required
                id="lastName"
                label="Last Name"
                variant="outlined"
              />
            </Grid>
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
                onClick={() =>
                  registerUser(firstName, lastName, email, password)
                }
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateAccount;
