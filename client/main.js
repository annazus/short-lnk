import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "../imports/routes/routes";
import { Session } from "meteor/session";
import "../imports/startup/simpl-schema-configuration";

Meteor.startup(() => {
  Session.set("showHidden", true);
  ReactDOM.render(<Routes />, document.getElementById("render-app"));
});
