import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
// import { createBrowserHistory } from "history";
export default class Link extends React.Component {
  onClickLogout = () => {
    Meteor.logout(err => {
      console.log("logged out");
      console.log(err);
    });
  };
  render() {
    return (
      <div>
        <h1>Links</h1>
        <button onClick={this.onClickLogout}>Logout</button>
      </div>
    );
  }
}
