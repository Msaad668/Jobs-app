import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Jobs from "./components/pages/Jobs";
import Profile from "./components/pages/Profile";
import MyApplications from "./components/pages/MyApplications";
import SignIn from "./components/pages/SignIn";
import store from "./store";
import Alert from "./components/layout/Alert";
import Login from "./components/pages/auth/Login";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/jobs" exact component={Jobs} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/add-job" exact component={MyApplications} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
