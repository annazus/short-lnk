import React, { Component } from "react";
import { Links } from "../../api/links";
import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import LinkListItem from "./LinkListItem";
import FlipMove from "react-flip-move";
export default class LinksList extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
  }
  componentDidMount() {
    const tracker = Tracker.autorun(() => {
      Meteor.subscribe("mylinks");
      let filterCriteria = { visible: true };
      if (!!Session.get("showHidden")) {
        filterCriteria = {};
      }
      console.log(filterCriteria);
      const links = Links.find(filterCriteria).fetch();
      console.log(links);
      this.setState({ links: links });
    });
    this.tracker = tracker;
  }

  componentWillUnmount() {
    this.tracker.stop();
  }
  renderLinks = () => {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status--message">No links found.</p>
        </div>
      );
    } else
      return (
        <div>
          {this.state.links.map((link, key) => (
            <LinkListItem
              key={key}
              {...link}
              shortUrl={Meteor.absoluteUrl(link._id)}
            />
          ))}
        </div>
      );
  };
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>{this.renderLinks()}</FlipMove>
      </div>
    );
  }
}
