import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Signup from "../ui/components/Signup";
import NotFound from "../ui/components/NotFound";
import Login from "../ui/components/Login";
import Link from "../ui/components/Link";

export class PrivateRoute extends Component {
  render() {
    let { component: Component, ...rest } = this.props;
    const isAuthenticated = !!Meteor.userId();
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
    );
  }
}
export class PublicRoute extends Component {
  render() {
    let { component: Component, ...rest } = this.props;
    const isAuthenticated = !!Meteor.userId();
    return (
      <Route
        {...rest}
        render={props => {
          return !isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/link" />
          );
        }}
      />
    );
  }
}
export class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute path="/signup" component={Signup} />
          <PrivateRoute path="/link" component={Link} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
