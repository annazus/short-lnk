import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Tracker } from "meteor/tracker";
import Signup from "../imports/ui/components/Signup";
import NotFound from "../imports/ui/components/NotFound";
import Login from "../imports/ui/components/Login";

import Link from "../imports/ui/components/Link";
// Meteor.startup(() => {
//   console.log("here");

const authenticatedPages = ["/link"];
const unauthenticatedPages = ["/", "/signup"];
const history = createBrowserHistory();

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  console.log("Authenticated " + isAuthenticated);

  const currentPage = history.location.pathname;
  console.log("CurrentPage " + currentPage);

  isAuthenticatedPage = authenticatedPages.includes(currentPage);
  isUnAuthetnicatedPage = unauthenticatedPages.includes(currentPage);

  if (isAuthenticated && isUnAuthetnicatedPage) {
    history.push("/link");
    history.go();
  }
  if (!isAuthenticated && isAuthenticatedPage) {
    history.push("/");
    history.go();
  }
});
onEnter = () => {
  if (Meteor.userId()) {
    console.log("going");
    history.push("/link");
    history.go();
  }
};
const routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} onEnter={onEnter} />

      <Route path="/signup" component={Signup} onEnter={onEnter} />
      <Route path="/link" component={Link} onEnter={onEnter} />
      <Route component={NotFound} onEnter={onEnter} />
    </Switch>
  </Router>
);
ReactDOM.render(routes, document.getElementById("render-app"));
// });
