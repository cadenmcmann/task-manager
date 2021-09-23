import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import history from "../history";
import { logoutUser, logoutUserAllSessions } from "../apis/task-manager-api";
import Cookies from "js-cookie";

const Logout = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStayLoggedIn = () => {
    history.push("/");
  };

  const handleLogoutSoloSession = async () => {
    Cookies.remove("is_logged_in");
    await logoutUser();
  };

  const handleLogoutAllSessions = async () => {
    Cookies.remove("is_logged_in");
    await logoutUserAllSessions();
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to log out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will log you out of you current user session. To log out all
            user sessions, click 'log out all sessions'
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStayLoggedIn} color="primary">
            Stay logged in
          </Button>
          <Button onClick={handleLogoutSoloSession} color="primary" autoFocus>
            Log out current session
          </Button>
          <Button onClick={handleLogoutAllSessions} color="primary" autoFocus>
            Log out all sessions
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Logout;
