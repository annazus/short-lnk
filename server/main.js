import { Meteor } from "meteor/meteor";
import "../imports/api/users";
import { Links } from "../imports/api/links";
import "../imports/startup/simpl-schema-configuration";
import { WebApp } from "meteor/webapp";
import { runInNewContext } from "vm";
Meteor.startup(() => {
  // code to run on server at startup

  WebApp.connectHandlers.use((req, res, next) => {
    console.log(req.url);
    const _id = req.url.slice(1);
    const link = Links.findOne(_id);
    if (link) {
      res.statusCode = "302";
      res.setHeader("Location", link.url);
      res.end();
      Meteor.call("links.trackVisit", _id);
    } else {
      next();
    }
  });
});
