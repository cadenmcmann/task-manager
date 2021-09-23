import React from "react";

import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Account from "./components/Account";
import { Router, Route } from "react-router-dom";
import history from "./history";
import Logout from "./components/Logout";
import Tasks from "./components/Tasks";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/createaccount" exact component={CreateAccount} />
        <Route path="/login" exact component={Login} />
        <Route path="/account" exact component={Account} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/tasks" exact component={Tasks} />
      </Router>
    </div>
  );
};

export default App;
