import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Cookies from "js-cookie";

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import Home from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    flexGrow: 1,
    backgroundColor: "black",
    color: "#F3F3F3",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingRight: "7vh",
  },
  avatar: {
    display: "block",
    margin: "0.5rem auto",
    width: theme.spacing(13),
    height: theme.spacing(15),
  },
  sidebar: {
    flexGrow: 1,
    width: 250,
    backgroundColor: "black",
  },
  sidebarOption: {
    color: "#F3F3F3",
  },
}));

const loggedinOptions = [
  { icon: <Home />, text: "Home", toRoute: "/" },
  { icon: <PersonIcon />, text: "Account Info", toRoute: "/account" },
  { icon: <CodeIcon />, text: "Tasks", toRoute: "/tasks" },
  { icon: <ExitToAppIcon />, text: "Logout", toRoute: "/logout" },
];

const anonOptions = [
  { icon: <AssignmentIndIcon />, text: "Login", toRoute: "/login" },
  {
    icon: <AccountCircleIcon />,
    text: "Create Account",
    toRoute: "/createaccount",
  },
];

const NavBar = (props) => {
  const classes = useStyles();

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const loggedIn = Cookies.get("is_logged_in");

  // show different sidebar options based on if user is logged in or not
  let sidebarOptions = anonOptions;
  if (loggedIn) {
    sidebarOptions = loggedinOptions;
  }

  const showSidebar = () => {
    return (
      <Box className={classes.sidebar}>
        <List>
          <Divider />
          {sidebarOptions.map((option) => (
            <ListItem
              button
              className={classes.sidebarOption}
              component={Link}
              onClick={() => setSideBarOpen(false)}
              to={option.toRoute}
              key={option.text}
            >
              <ListItemIcon className={classes.sidebarOption}>
                {option.icon}
              </ListItemIcon>
              <ListItemText>{option.text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setSideBarOpen(!sideBarOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} align="center">
            Task Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
      >
        {showSidebar()}
      </Drawer>
    </div>
  );
};

export default NavBar;
