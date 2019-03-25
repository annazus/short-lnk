import React, { Component } from "react";

import { Session } from "meteor/session";
export default class FilterLinks extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
  }

  toggleShowHidden = e => {
    // e.preventDefault();
    console.log(e.target.checked);
    Session.set("showHidden", e.target.checked);
  };

  render() {
    return (
      <form>
        <label className="checkbox">
          <input
            type="checkbox"
            name="showHidden"
            id="showHidden"
            className="checkbox__box"
            defaultChecked={!!Session.get("showHidden")}
            onChange={this.toggleShowHidden}
          />
          Show Hidden
        </label>
      </form>
    );
  }
}
