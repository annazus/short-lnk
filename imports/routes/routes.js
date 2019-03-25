import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Signup from "../ui/components/Signup";
import NotFound from "../ui/components/NotFound";
import Login from "../ui/components/Login";
import Link from "../ui/components/Link";
import { Meteor } from "meteor/meteor";

const authenticatedPages = ["/link"];
const unauthenticatedPages = ["/", "/signup"];

export const authenticatePage = isAuthenticated => {
  const history = createBrowserHistory();

  console.log("Authenticated " + isAuthenticated);

  const currentPage = history.location.pathname;
  console.log("CurrentPage " + currentPage);

  isAuthenticatedPage = authenticatedPages.includes(currentPage);
  isUnAuthetnicatedPage = unauthenticatedPages.includes(currentPage);

  if (isAuthenticated && isUnAuthetnicatedPage) {
    history.replace("/link");
    history.go();
  } else if (!isAuthenticated && isAuthenticatedPage) {
    history.replace("/");
    history.go();
  }
};

export class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />

          <Route path="/signup" component={Signup} />
          <Route path="/link" component={Link} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
