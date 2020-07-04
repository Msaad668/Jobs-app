import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Jobs from "./components/pages/jobs/Jobs";
import UserProfile from "./components/pages/profile/UserProfile";
import MyApplications from "./components/pages/MyApplications";
// import SignIn from "./components/pages/SignIn";
import store from "./store";
import Alert from "./components/layout/Alert";
import Login from "./components/pages/auth/Login";
import SignUpEmployer from "./components/pages/auth/SignUpEmployer";
import SignUpUser from "./components/pages/auth/SignUpUser";
import Job from "./components/pages/jobs/Job";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/jobs" exact component={Jobs} />
            <Route path="/job/:id" exact component={Job} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/add-job" exact component={MyApplications} />
            {/* <Route path="/signin" exact component={SignIn} /> */}
            <Route path="/login" exact component={Login} />
            <Route path="/signup/employer" exact component={SignUpEmployer} />
            <Route path="/signup/user" exact component={SignUpUser} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
