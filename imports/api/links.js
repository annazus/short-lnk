import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import shortid from "shortid";
export const Links = new Mongo.Collection("links");

if (Meteor.isServer) {
  Meteor.publish("mylinks", function links() {
    return Links.find({ owner: this.userId });
  });
  Meteor.methods({
    "links.insert"(url) {
      if (!this.userId) {
        throw new Meteor.Error("not-authorized");
      }

      let urlschema = new SimpleSchema({
        url: {
          type: String,
          regEx: SimpleSchema.RegEx.Url,
          label: "Your url"
        }
      });
      urlschema.validate({ url });
      const id = shortid.generate();
      Links.insert({
        _id: id,
        url,
        visible: true,
        lastVisited: null,
        visitedCount: 0,
        owner: this.userId
      });
    },
    "links.setVisible"(_id, visible = true) {
      if (!this.userId) {
        throw new Meteor.Error("not-authorized");
      }

      let visibleSchema = new SimpleSchema({
        _id: {
          type: String,
          min: "1"
        },
        visible: {
          type: Boolean
        }
      });
      visibleSchema.validate({ _id, visible });
      Links.update(
        { _id: _id, owner: this.userId },
        { $set: { visible: visible } }
      );
    },
    "links.trackVisit"(_id) {
      let schema = new SimpleSchema({
        _id: {
          type: String,
          min: 1
        }
      });
      schema.validate({ _id });
      Links.update(_id, {
        $inc: { visitedCount: 1 },
        $set: { lastVisited: new Date().getTime() }
      });
    }
  });
}
