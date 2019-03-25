import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Tracker } from "meteor/tracker";
import { Routes, authenticatePage } from "../imports/routes/routes";
import { Session } from "meteor/session";
import "../imports/startup/simpl-schema-configuration";
// import { Links } from "../imports/api/links";
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  authenticatePage(isAuthenticated);
});

// Tracker.autorun(() => {
//   const links = Links.find().fetch();
//   console.log(links);
// });
Meteor.startup(() => {
  Session.set("showHidden", true);
  ReactDOM.render(<Routes />, document.getElementById("render-app"));
});
