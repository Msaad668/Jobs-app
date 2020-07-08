import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Jobs from "./components/pages/jobs/Jobs";
import UserProfile from "./components/pages/profile/UserProfile";
import MyApplications from "./components/pages/applications/MyApplications";
import store from "./store";
import Alert from "./components/layout/Alert";
import Login from "./components/pages/auth/Login";
import SignUpEmployer from "./components/pages/auth/SignUpEmployer";
import SignUpUser from "./components/pages/auth/SignUpUser";
import Job from "./components/pages/jobs/Job";
import setAuthToken from "./utils/setAuthToken";
import EmployerProfile from "./components/pages/profile/EmployerProfile";
import CompanyInfo from "./components/pages/profile/CompanyInfo";
import CreateEmployerProfileForm from "./components/pages/profile/CreateEmployerProfileForm";
import CreateUserProfileForm from "./components/pages/profile/CreateUserProfileForm";

import AddExperienceForm from "./components/pages/profile/AddExperienceForm";
import AddEducationForm from "./components/pages/profile/AddEducationForm";
import JobForm from "./components/pages/jobs/JobForm";
import MyJobs from "./components/pages/jobs/MyJobs";
import EditJobForm from "./components/pages/jobs/EditJobForm";
import Applications from "./components/pages/jobs/Applications";
import UserInfo from "./components/pages/profile/UserInfo";

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
            <Route path="/jobs/create-job" exact component={JobForm} />
            <Route path="/jobs/myjobs" exact component={MyJobs} />
            <Route
              path="/jobs/myjobs/applications/user-info/:id"
              exact
              component={UserInfo}
            />
            <Route
              path="/jobs/myjobs/applications/:id"
              exact
              component={Applications}
            />
            <Route
              path="/jobs/myjobs/update-job/:id"
              exact
              component={EditJobForm}
            />
            <Route path="/job/:id" exact component={Job} />
            <Route path="/company-info/:id" exact component={CompanyInfo} />
            <Route path="/profile" exact component={UserProfile} />
            <Route
              path="/create-edit-user-profile"
              exact
              component={CreateUserProfileForm}
            />
            <Route path="/add-job" exact component={MyApplications} />
            <Route
              path="/profile/add-education"
              exact
              component={AddEducationForm}
            />
            <Route
              path="/profile/add-experience"
              exact
              component={AddExperienceForm}
            />
            <Route path="/emp-profile" exact component={EmployerProfile} />
            <Route
              path="/create-edit-employer-profile"
              exact
              component={CreateEmployerProfileForm}
            />
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
