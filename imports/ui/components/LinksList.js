import React, { Component } from "react";
import { Links } from "../../api/links";
import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import LinkListItem from "./LinkListItem";
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
    this.state.tracker.stop();
  }
  renderLinks = () => {
    return this.state.links.map((link, key) => (
      <LinkListItem
        key={key}
        {...link}
        shortUrl={Meteor.absoluteUrl(link._id)}
      />
    ));
  };
  render() {
    return (
      <div>
        <p>Links List</p>
        {this.renderLinks()}
      </div>
    );
  }
}
