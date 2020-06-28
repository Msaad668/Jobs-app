import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Jobs from "./components/pages/Jobs";
import Profile from "./components/pages/Profile";
import AddJob from "./components/pages/AddJob";
import SignIn from "./components/pages/SignIn";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/jobs" exact component={Jobs} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/add-job" exact component={AddJob} />
          <Route path="/signin" exact component={SignIn} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
