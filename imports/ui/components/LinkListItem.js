import React, { Component } from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import { Meteor } from "meteor/meteor";
import moment from "moment";
class LinkListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { copy: false };
  }
  toggleLink(_id, visible) {
    Meteor.call("links.setVisible", _id, visible);
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard
      .on("success", () => {
        this.setState({ copy: true });
        setInterval(() => {
          this.setState({ copy: false });
        }, 3000);
      })
      .on("error", () => {
        alert("errro");
      });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats = (visitedCount, lastVisited) => {
    return <p>{}</p>;
  };
  render() {
    let { _id, url, shortUrl, visible, visitedCount, lastVisited } = this.props;
    return (
      <div>
        <p>{url}</p>
        <p>{shortUrl}</p>
        <p>{visible.toString()}</p>
        <a href={shortUrl} target="_blank">
          Visit Link
        </a>
        {this.renderStats(visitedCount, lastVisited)}
        <button ref="copy" data-clipboard-text={shortUrl}>
          {this.state.copy ? "Copied" : "Copy"}
        </button>
        <button onClick={() => this.toggleLink(_id, !visible)}>
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    );
  }
}

export default LinkListItem;
LinkListItem.propTypes = {
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  lastVisited: PropTypes.number,
  visitedCount: PropTypes.number.isRequired
};
