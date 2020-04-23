import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import { logout } from "./store/actions";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VideoList from "./components/VideoList";

function App(props) {
  return (
    <Router>
      <Switch>
        <PrivateRoute
          path="/"
          exact
          component={localStorage.getItem("token") ? VideoList : Signup}
        />
        <PrivateRoute
          path="/create"
          exact
          component={localStorage.getItem("token") ? CreateVideo : Signup}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("token") ? (
              <Redirect to="/" />
            ) : (
              <Signup />
            )
          }
        />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loginStart: state.loginStart,
  token: state.token,
});

export default connect(mapStateToProps, { logout })(withRouter(App));
